#!/usr/bin/env bash
# Aiden Lab 웹사이트 → GitHub 업로드 스크립트
# 사용법: 터미널에서 이 폴더로 이동 후  ->  bash upload_to_github.sh
set -e
cd "$(dirname "$0")"
REPO="https://github.com/agentcharlie7542/aidenlabweb.git"

echo "▶ (1/5) 기존 git 흔적 정리..."
rm -rf .git aidenlab-web/.git

echo "▶ (2/5) 새 저장소 초기화 + 커밋..."
git init -q
git config user.name  "agentcharlie7542"
git config user.email "agentkang0331@gmail.com"
git add .
git commit -q -m "Aiden Lab 웹사이트: 다국어 프로토타입 + 로고 + Next.js 앱"

echo "▶ (3/5) main 브랜치 설정..."
git branch -M main

echo "▶ (4/5) 원격 저장소 연결..."
git remote remove origin 2>/dev/null || true
git remote add origin "$REPO"

echo "▶ (5/5) 푸시... (GitHub 사용자명 + Personal Access Token 입력이 필요할 수 있습니다)"
git push -u origin main

echo ""
echo "✅ 업로드 완료!"
echo "이제 GitHub 저장소 → Settings → Pages 에서"
echo "  Source: Deploy from a branch / Branch: main / Folder: /(root) → Save"
echo "잠시 후 아래 주소에서 확인됩니다:"
echo "  랜딩:     https://agentcharlie7542.github.io/aidenlabweb/"
echo "  프로토타입: https://agentcharlie7542.github.io/aidenlabweb/prototype.html"
