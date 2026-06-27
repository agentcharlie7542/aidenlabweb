# 상담폼 중계 Worker (Cloudflare + R2 + Lark)

상담폼 제출을 받아 **첨부파일을 R2에 저장**하고, **Lark 그룹 커스텀봇**으로 입력값과 다운로드 버튼을 보내는 중계기입니다.

```
방문자 폼(파일첨부) → 이 Worker → R2 저장(링크 생성) → Lark 웹훅 카드 전송
```

> GitHub Pages는 정적이라 파일/웹훅을 직접 처리할 수 없어, 이 작은 Worker가 그 역할을 합니다.

---

## 사전 준비

- Cloudflare 계정 (무료) — R2를 처음 쓰면 대시보드에서 **R2 활성화**가 필요합니다(결제수단 등록 요구될 수 있으나 **무료 한도 10GB 내에서는 청구되지 않음**).
- Lark 그룹 커스텀봇 **웹훅 주소**. (Lark 그룹 → 설정 → 봇 → 커스텀봇 추가 → Webhook URL 복사. "서명 검증"을 켰다면 그 Secret도 복사)
- Node.js 설치.

---

## 배포 (터미널에서 6단계)

```bash
cd "/Users/charlie/Desktop/에이든랩 업무/에이든랩 AX 관련 /aidenlab homepage/aidenlab homepage/contact-worker"

# 1) Cloudflare 로그인 (브라우저 열림)
npx wrangler login

# 2) R2 버킷 생성
npx wrangler r2 bucket create aidenlab-brand-files

# 3) Lark 웹훅 주소 등록 (붙여넣기 입력창이 뜸)
npx wrangler secret put LARK_WEBHOOK_URL

# 4) (봇에 서명검증을 켰을 때만) 서명 시크릿 등록 — 안 켰으면 이 줄은 건너뜀
npx wrangler secret put LARK_SIGN_SECRET

# 5) 배포
npx wrangler deploy

# 6) 출력된 주소를 복사
#    예: https://aidenlab-contact-relay.<계정서브도메인>.workers.dev
```

배포가 끝나면 출력된 **Worker 주소**를 복사해서, `prototype.html` 상단의

```js
const CONTACT_ENDPOINT = "https://PASTE-YOUR-WORKER-URL-HERE.workers.dev";
```

에 붙여넣고 커밋·푸시하면 폼이 실제로 동작합니다.

---

## 동작 확인

- `https://<worker-url>/` 를 브라우저로 열면 `Aiden Lab contact relay is running.` 표시 → 살아있음.
- 폼에서 테스트 제출 → Lark 그룹에 카드 알림 도착 + 첨부 시 "브랜드 자료 다운로드" 버튼.
- 로그 보기: `npx wrangler tail`

## 참고 / 보안

- 첨부파일 다운로드 링크는 `…/d/submissions/<랜덤 UUID>/<파일명>` 형태라 **추측 불가**합니다.
- 파일 용량 상한 25MB (`worker.js`의 `MAX_FILE_BYTES`에서 조정).
- 허니팟(`_gotcha`) 필드로 1차 스팸 차단. 더 강하게 막으려면 Cloudflare Turnstile 추가 가능.
- `ALLOWED_ORIGIN`(wrangler.toml)을 운영 도메인으로 두면 타 사이트의 무단 POST를 차단합니다.
- 보관 파일 자동 삭제가 필요하면 R2 **수명 주기 규칙(Lifecycle)**으로 N일 후 삭제 설정 가능.
