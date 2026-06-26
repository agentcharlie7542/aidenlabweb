# Aiden Lab 웹사이트 — GitHub 업로드 & 웹 공개 가이드

> 이 작업은 **본인 컴퓨터의 터미널**에서 진행해야 합니다.
> (보안상 비밀번호·토큰은 제가 대신 입력할 수 없고, 작업 샌드박스에서는 GitHub 접속이 막혀 있습니다.)

대상 저장소: `https://github.com/agentcharlie7542/aidenlabweb.git`

---

## 방법 A — 터미널 (스크립트 한 번 실행)

1. **터미널(Terminal)** 을 엽니다.
2. 아래를 복사해 실행합니다 (폴더 경로에 공백이 있어 따옴표 필요):

   ```bash
   cd "/Users/charlie/Desktop/에이든랩 업무 /에이드랩 AX 관련 /aidenlab homepage/aidenlab homepage"
   bash upload_to_github.sh
   ```

3. push 단계에서 GitHub **사용자명**과 **Personal Access Token**(비밀번호 대신)을 물어보면 입력합니다.
   - 토큰 발급: GitHub → Settings → Developer settings → **Personal access tokens (classic)**
     → Generate new token → `repo` 권한 체크 → 생성된 토큰을 비밀번호 칸에 붙여넣기.
   - 더 간편하게는 `gh auth login` (GitHub CLI) 한 번 해두면 토큰 입력이 자동입니다.

---

## 방법 B — GitHub Desktop (마우스로, 토큰 불필요)

1. **GitHub Desktop** 설치 후 본인 계정으로 로그인.
2. 먼저 터미널에서 기존 git 흔적만 정리:
   ```bash
   cd "/Users/charlie/Desktop/에이든랩 업무 /에이드랩 AX 관련 /aidenlab homepage/aidenlab homepage"
   rm -rf .git aidenlab-web/.git
   ```
3. GitHub Desktop → File → **Add local repository** → 위 폴더 선택 →
   "create a repository" 제안이 뜨면 수락 → **Publish repository**.
4. Publish 시 저장소 이름을 `aidenlabweb` 로 맞추거나, 기존 빈 저장소에 연결합니다.

---

## 웹으로 보이게 하기 — GitHub Pages 켜기

업로드가 끝나면:

1. GitHub에서 `aidenlabweb` 저장소 → **Settings** → 왼쪽 **Pages**.
2. **Source**: `Deploy from a branch`
3. **Branch**: `main` / Folder: **/(root)** → **Save**.
4. 1~2분 후 아래 주소에서 열립니다:

   - 랜딩(산출물 인덱스): **https://agentcharlie7542.github.io/aidenlabweb/**
   - 프로토타입(다국어+로고): **https://agentcharlie7542.github.io/aidenlabweb/prototype.html**

---

## 참고

- `node_modules`, `.next` 등 무거운 빌드 폴더는 `.gitignore`로 자동 제외됩니다.
- 프로토타입의 실사 이미지는 외부 CDN을, 로고는 저장소 내 `aidenlab logo .png`를 사용하므로 웹에서 정상 표시됩니다.
- `aidenlab-web`(Next.js 앱) 소스도 함께 올라가지만, GitHub Pages는 정적 파일만 서빙하므로 **앱 자체가 라이브로 실행되지는 않습니다**. 앱까지 라이브로 띄우려면 Vercel 배포를 권장합니다.
