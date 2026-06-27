/**
 * Aiden Lab 상담폼 중계 Worker
 * ------------------------------------------------------------------
 * 흐름:  방문자 폼(파일첨부) ──POST──▶ 이 Worker
 *          1) 첨부파일을 R2 버킷에 저장하고 다운로드 링크 생성
 *          2) 입력값 + 다운로드 버튼을 Lark 커스텀봇 카드로 포맷
 *          3) Lark 웹훅으로 전송
 *          4) 브라우저에 JSON 결과 반환 (AJAX)
 *
 * 필요한 바인딩/시크릿 (wrangler.toml 및 `wrangler secret put` 참고):
 *   - R2 버킷 바인딩:  BRAND_FILES
 *   - 시크릿:          LARK_WEBHOOK_URL   (Lark 그룹 커스텀봇 웹훅 주소)
 *   - 시크릿(선택):    LARK_SIGN_SECRET   (봇에 "서명 검증"을 켰을 때만)
 *   - 변수:            ALLOWED_ORIGIN     (폼이 올라간 도메인. 쉼표로 여러 개 가능)
 *
 * 다운로드 라우트:  GET /d/<key>  → R2에서 파일을 스트리밍 (UUID 키라 링크 추측 불가)
 */

const MAX_FILE_BYTES = 25 * 1024 * 1024; // 25MB

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(request, env) });
    }

    // 파일 다운로드 (Lark 카드의 버튼이 가리키는 주소)
    if (request.method === 'GET' && url.pathname.startsWith('/d/')) {
      return handleDownload(url, env);
    }

    if (request.method === 'POST') {
      return handleSubmit(request, url, env);
    }

    return new Response('Aiden Lab contact relay is running.', {
      status: 200,
      headers: corsHeaders(request, env),
    });
  },
};

/* ---------------------------------------------------------------- */

async function handleSubmit(request, url, env) {
  const cors = corsHeaders(request, env);

  if (!env.LARK_WEBHOOK_URL) {
    return json({ ok: false, error: 'server_not_configured' }, 500, cors);
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: 'invalid_form' }, 400, cors);
  }

  // 스팸 봇 차단용 허니팟: 사람에게는 안 보이는 칸. 값이 차 있으면 조용히 성공 처리.
  if ((form.get('_gotcha') || '').toString().trim() !== '') {
    return json({ ok: true }, 200, cors);
  }

  const f = (k) => (form.get(k) || '').toString().trim();
  const fields = {
    service: f('service'),
    company: f('company'),
    contact_name: f('contact_name'),
    position: f('position'),
    email: f('email'),
    phone: f('phone'),
    revenue: f('revenue'),
    message: f('message'),
  };

  // 첨부파일 → R2 업로드
  let downloadUrl = '';
  let fileLabel = '';
  const file = form.get('brand_file');
  if (file && typeof file === 'object' && file.size > 0) {
    if (file.size > MAX_FILE_BYTES) {
      return json({ ok: false, error: 'file_too_large' }, 413, cors);
    }
    const now = new Date();
    const yyyymm = `${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, '0')}`;
    const key = `submissions/${yyyymm}/${crypto.randomUUID()}/${safeName(file.name)}`;
    try {
      await env.BRAND_FILES.put(key, file.stream(), {
        httpMetadata: { contentType: file.type || 'application/octet-stream' },
      });
    } catch {
      return json({ ok: false, error: 'upload_failed' }, 502, cors);
    }
    downloadUrl = `${url.origin}/d/${key}`;
    fileLabel = `${safeName(file.name)} (${formatBytes(file.size)})`;
  }

  // Lark 카드 전송
  try {
    const payload = await buildLarkPayload(fields, fileLabel, downloadUrl, env);
    const res = await fetch(env.LARK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const out = await res.json().catch(() => ({}));
    // Lark는 성공 시 {"code":0,...} 또는 {"StatusCode":0,...} 형태를 반환
    const okCode = out.code === 0 || out.StatusCode === 0 || out.code === undefined;
    if (!res.ok || !okCode) {
      return json({ ok: false, error: 'lark_rejected', detail: out }, 502, cors);
    }
  } catch {
    return json({ ok: false, error: 'lark_unreachable' }, 502, cors);
  }

  return json({ ok: true }, 200, cors);
}

async function handleDownload(url, env) {
  const key = decodeURIComponent(url.pathname.slice('/d/'.length));
  if (!key) return new Response('Not found', { status: 404 });
  const obj = await env.BRAND_FILES.get(key);
  if (!obj) return new Response('Not found', { status: 404 });

  const headers = new Headers();
  obj.writeHttpMetadata(headers);
  headers.set('etag', obj.httpEtag);
  const name = key.split('/').pop() || 'download';
  headers.set('content-disposition', `attachment; filename*=UTF-8''${encodeURIComponent(name)}`);
  headers.set('cache-control', 'private, max-age=3600');
  return new Response(obj.body, { headers });
}

/* ---------------------------------------------------------------- */

async function buildLarkPayload(fields, fileLabel, downloadUrl, env) {
  const row = (label, val) => ({
    is_short: true,
    text: { tag: 'lark_md', content: `**${label}**\n${mdEscape(val) || '—'}` },
  });

  const elements = [
    {
      tag: 'div',
      fields: [
        row('관심 서비스', fields.service),
        row('월매출/카테고리', fields.revenue),
        row('회사/브랜드', fields.company),
        row('담당자', `${fields.contact_name} ${fields.position ? `(${fields.position})` : ''}`.trim()),
        row('이메일', fields.email),
        row('전화', fields.phone),
      ],
    },
    {
      tag: 'div',
      text: { tag: 'lark_md', content: `**문의 내용**\n${mdEscape(fields.message) || '—'}` },
    },
  ];

  if (downloadUrl) {
    elements.push({ tag: 'hr' });
    elements.push({
      tag: 'div',
      text: { tag: 'lark_md', content: `📎 **첨부 파일**\n${mdEscape(fileLabel)}` },
    });
    elements.push({
      tag: 'action',
      actions: [
        {
          tag: 'button',
          text: { tag: 'plain_text', content: '브랜드 자료 다운로드' },
          url: downloadUrl,
          type: 'primary',
        },
      ],
    });
  } else {
    elements.push({
      tag: 'div',
      text: { tag: 'lark_md', content: '📎 **첨부 파일**\n(없음)' },
    });
  }

  const card = {
    config: { wide_screen_mode: true },
    header: {
      template: 'blue',
      title: { tag: 'plain_text', content: '🔔 새 상담 신청 — Aiden Lab' },
    },
    elements,
  };

  const payload = { msg_type: 'interactive', card };

  // 봇에 "서명 검증"을 켰을 때만 timestamp/sign 추가
  if (env.LARK_SIGN_SECRET) {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    payload.timestamp = timestamp;
    payload.sign = await larkSign(timestamp, env.LARK_SIGN_SECRET);
  }

  return payload;
}

// Lark 커스텀봇 서명: base64( HMAC-SHA256( key = `${timestamp}\n${secret}`, msg = "" ) )
async function larkSign(timestamp, secret) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(`${timestamp}\n${secret}`),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new Uint8Array(0));
  return btoa(String.fromCharCode(...new Uint8Array(sig)));
}

/* ---------------------------------------------------------------- */

function corsHeaders(request, env) {
  const origin = request.headers.get('Origin') || '';
  const allowed = (env.ALLOWED_ORIGIN || '*')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  let allowOrigin = '*';
  if (!allowed.includes('*')) {
    allowOrigin = allowed.includes(origin) ? origin : allowed[0] || '*';
  }
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

function json(obj, status, cors) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json', ...cors },
  });
}

function safeName(name) {
  return (name || 'file')
    .replace(/[^\w.\-가-힣ぁ-んァ-ヶ一-龯]+/g, '_')
    .replace(/_+/g, '_')
    .slice(-120);
}

function mdEscape(s) {
  // Lark lark_md에서 의도치 않은 서식/주입 방지용 최소 이스케이프
  return (s || '').toString().replace(/[<>]/g, (c) => (c === '<' ? '&lt;' : '&gt;'));
}

function formatBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}
