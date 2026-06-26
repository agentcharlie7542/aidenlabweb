# 다국어(i18n) 구성 안내

한국어 원문을 **키**로 사용하는 번역 딕셔너리 + 클라이언트 언어 전환 방식입니다.
페이지 코드를 거의 건드리지 않고 사이트 전체를 한·영·중·일 4개 언어로 전환합니다.

## 구성 파일
- `dictionary.json` — `{ "한국어 원문": { en, zh, ja } }` (318개 항목)
- `LanguageProvider.tsx` — 언어 상태 + DOM 텍스트/속성 번역, localStorage 저장
- `../components/layout/LangSwitcher.tsx` — 상단 국기 토글 (🇰🇷 🇺🇸 🇨🇳 🇯🇵)

## 동작 방식
1. `LanguageProvider`가 `app/layout.tsx`에서 전체를 감쌉니다.
2. 국기를 누르면 `setLocale`로 언어가 바뀌고, DOM의 한국어 텍스트 노드와
   `placeholder/title/alt/aria-label` 속성을 딕셔너리로 치환합니다.
3. 선택 언어는 `localStorage('locale')`에 저장되어 재방문 시 유지됩니다.
4. 번역 제외가 필요한 요소에는 `data-no-i18n` 속성을 붙이세요.

## 번역 추가/수정
- 새 한국어 문구가 생기면 `dictionary.json`의 `map`에 키를 추가하면 끝입니다.
- 전문 번역본은 `aidenlab_번역시트.xlsx`에서 관리 → 시트→JSON 재생성 스크립트
  (`outputs/build_dict.py`)로 갱신할 수 있습니다.

## 한계와 다음 단계(SEO)
현재는 클라이언트에서 텍스트를 치환하므로 SSR HTML 원문은 한국어입니다.
영어·중국어·일본어 시장에서 검색 노출까지 노린다면, 2단계로
URL 기반 라우팅(`/en`, `/zh`, `/ja`) + 서버 렌더링으로 전환하는 것을 권장합니다.
이때도 이 딕셔너리(키=한국어)를 그대로 재사용할 수 있습니다.
