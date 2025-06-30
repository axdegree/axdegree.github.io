# 🤖 스마트 스쿼트 트래커 (Smart Squat Tracker)

AI(Teachable Machine)로 스쿼트 동작을 자동 감지하여 습관을 만들 수 있는 웹앱입니다. 웹캠을 통해 '앉기-서기' 동작을 인식하여 자동으로 카운트하고, 50회마다 세트가 자동으로 증가합니다.

## 주요 기능
- **AI 스쿼트 감지**: Teachable Machine 모델로 '앉기'와 '서기' 동작을 실시간 감지
- **자동 카운트**: 앉기-서기 1회마다 1씩 자동 증가
- **세트 관리**: 50회 달성 시 세트가 1 증가하고 카운트는 0으로 초기화
- **진행률 표시**: 예쁜 막대 그래프와 실시간 숫자 표시
- **동기부여 메시지**: 랜덤 동기부여 문구 제공
- **반응형 UI**: PC/모바일 모두 사용 가능

## 사용 방법
1. `smart-squat-tracker.html` 파일을 웹 브라우저(Chrome 권장)로 엽니다.
2. "카메라 시작" 버튼을 누르고 웹캠 권한을 허용합니다.
3. 화면의 안내에 따라 스쿼트(앉기-서기) 동작을 하면 자동으로 카운트됩니다.
4. 50회가 되면 세트가 1 증가하고, 카운트는 0으로 초기화됩니다.

## GitHub Pages 배포 방법
1. 이 프로젝트 파일들을 깃허브 저장소에 업로드합니다.
2. `smart-squat-tracker.html` 파일을 `index.html`로 이름을 바꾸면, 기본 주소로 바로 접속할 수 있습니다.
3. 저장소의 **Settings > Pages**에서 branch와 폴더를 지정해 GitHub Pages를 활성화합니다.
4. 배포 주소 예시:
   - `https://your-username.github.io/your-repo/` (index.html일 때)
   - `https://your-username.github.io/your-repo/smart-squat-tracker.html` (파일명 그대로일 때)

## 참고 및 주의사항
- **웹캠 권한**: 브라우저에서 웹캠 접근 권한을 허용해야 합니다.
- **모델 경로**: Teachable Machine 모델은 코드 내에 이미 포함되어 있습니다.
- **브라우저**: Chrome, Edge 등 최신 브라우저에서 사용하세요.

## 라이선스
MIT License

---

문의/피드백은 이슈로 남겨주세요! 🏋️‍♂️ 