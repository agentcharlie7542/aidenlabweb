# 다국어(i18n) 구성 안내

**URL 로케일 + 서버 렌더링** 방식입니다. 한국어 원문이 곧 번역 키이므로,
페이지 JSX에는 한국어를 그대로 쓰고 렌더 시점에 번역됩니다.

| URL | 언어 |
|---|---|
| `/ko/...` | 한국어 (원문) |
| `/en/...` | English |
| `/zh/...` | 简体中文 |
| `/ja/...` | 日本語 |

`/` 로 들어오면 `middleware.ts`가 쿠키(`locale`) → `Accept-Language` → 한국어
순으로 판단해 해당 로케일로 리다이렉트합니다. 언어 버튼을 누르면 URL이 바뀌고
선택이 쿠키에 1년간 저장됩니다.

## 구성 파일
- `dictionary.json` — `{ "한국어 원문": { en, zh, ja } }`
- `config.ts` — 로케일 목록, `<html lang>` 태그, 경로 헬퍼
- `translate.tsx` — `t()` 단일 문자열, `tx()` JSX 트리 전체 번역
- `LocaleProvider.tsx` — 클라이언트 컴포넌트용 `useT()` (`t`, `tx`, `locale`)
- `Link.tsx` — 현재 로케일을 자동으로 붙이는 `next/link` 대체
- `../middleware.ts` — 로케일 없는 요청 리다이렉트

## 사용법

서버 컴포넌트(페이지)는 반환 JSX를 `tx()`로 한 번 감쌉니다.

```tsx
type PageProps = { params: Promise<{ locale: Locale }> };

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  return tx(<main>…한국어 그대로…</main>, locale);
}
```

`tx()`는 텍스트 노드뿐 아니라 **자식 컴포넌트에 넘기는 한국어 prop**
(`title="…"`, `kpis={[{label:'카테고리'}]}` 등)까지 번역합니다.
`className`/`href`/`src`/`value` 같은 식별자 prop은 건드리지 않습니다.

클라이언트 컴포넌트는 `useT()`를 씁니다.

```tsx
const { t, tx } = useT();
return tx(<form>…</form>);          // 트리 전체
<span>{t('전송 중…')}</span>         // 단일 문자열
```

## 강조·줄바꿈 표기

번역문 안에서 `**…**`는 그라디언트 강조 `<span>`, `\n`은 `<br>`이 됩니다.
언어마다 강조 위치와 줄바꿈 지점을 **직접** 정하기 때문에, 한국어 어순에
맞춘 `<br/>`을 다른 언어가 물려받는 문제가 생기지 않습니다.

```json
"K-브랜드의 **글로벌 매출**을 설계합니다.": {
  "en": "We engineer **global revenue**\nfor Korean brands.",
  "ja": "Kブランドの\n**グローバル売上**を\n設計します。"
}
```

문장은 **한 문장 = 한 키**로 유지하세요. 조각으로 쪼개면
(`"가 되도록." → "."`) 다른 언어에서 어순이 무너집니다.

## 검수

서버를 띄운 뒤 커버리지를 검사합니다. 미번역 한국어가 남아 있으면 실패합니다.

```bash
npm run dev
node scripts/i18n-audit.mjs
```

개발 모드에서는 사전에 없는 키를 만나면 콘솔에 `[i18n] missing <locale>: …`
경고가 찍힙니다.

## 타이포그래피

`<html data-locale="…">`에 따라 언어별 폰트 스택과 줄바꿈 규칙이 적용됩니다
(`globals.css` 상단). 중국어·일본어는 전용 폰트 스택 + `line-break: strict`,
한국어는 `word-break: keep-all`을 씁니다. CJK 제목은 같은 px에서 더 크게
보이므로 `h1`/`h2` 크기를 따로 낮춥니다.

## 이미지 안의 텍스트

캠페인 썸네일 등 이미지에 구워진 문구는 번역되지 않습니다. 언어별로 바꿔야
하는 문구는 이미지가 아니라 DOM 텍스트로 올려주세요.
