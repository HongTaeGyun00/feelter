# Feelter - OTT 콘텐츠 추천 플랫폼

OTT 콘텐츠를 추천해주는 프로젝트입니다. Zustand와 Firebase를 사용하여 데이터를 관리합니다.

## 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript
- **State Management**: Zustand
- **Backend**: Firebase (Firestore, Auth, Storage)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React, React Icons

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. Firebase 설정

1. [Firebase Console](https://console.firebase.google.com/)에서 새 프로젝트를 생성합니다.
2. Firestore Database를 활성화합니다.
3. Authentication을 활성화하고 이메일/비밀번호 로그인을 설정합니다.
4. 프로젝트 설정에서 웹 앱을 추가하고 설정 정보를 복사합니다.

### 3. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가합니다:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

## 프로젝트 구조

```
lib/
├── firebase.ts          # Firebase 설정
├── services/
│   └── firebase.ts      # Firebase 서비스 함수들
├── stores/              # Zustand 스토어들
│   ├── contentStore.ts  # 콘텐츠 관리
│   ├── userStore.ts     # 사용자 관리
│   ├── reviewStore.ts   # 리뷰 관리
│   ├── recommendationStore.ts # 추천 시스템
│   └── index.ts         # 스토어 export
└── types/
    └── content.ts       # 타입 정의
```

## Zustand 스토어 사용법

### 콘텐츠 스토어

```typescript
import { useContentStore } from "@/lib/stores";

const { contents, loading, fetchContents } = useContentStore();

// 콘텐츠 목록 가져오기
useEffect(() => {
  fetchContents();
}, []);
```

### 사용자 스토어

```typescript
import { useUserStore } from "@/lib/stores";

const { currentUser, signIn, signUp } = useUserStore();

// 로그인
const handleLogin = async () => {
  await signIn(email, password);
};
```

### 리뷰 스토어

```typescript
import { useReviewStore } from "@/lib/stores";

const { reviews, addReview } = useReviewStore();

// 리뷰 추가
const handleAddReview = async () => {
  await addReview({
    contentId: "content-id",
    userId: "user-id",
    rating: 5,
    comment: "좋은 영화입니다!",
    emotions: ["즐거움", "감동"],
    spoiler: false,
  });
};
```

### 추천 스토어

```typescript
import { useRecommendationStore } from "@/lib/stores";

const { recommendedContents, generateRecommendations } =
  useRecommendationStore();

// 추천 생성
const handleGenerateRecommendations = async () => {
  await generateRecommendations(userId);
};
```

## 주요 기능

- **콘텐츠 관리**: 영화, 시리즈, 다큐멘터리 등 OTT 콘텐츠 정보 관리
- **사용자 관리**: 회원가입, 로그인, 선호도 설정
- **리뷰 시스템**: 콘텐츠별 리뷰 작성 및 관리
- **추천 시스템**: 사용자 선호도 기반 콘텐츠 추천
- **검색 및 필터링**: 장르, 플랫폼, 평점 등으로 콘텐츠 검색
- **즐겨찾기**: 관심 콘텐츠 즐겨찾기 기능
- **시청 기록**: 사용자 시청 기록 관리

## 데이터 모델

### Content (콘텐츠)

- 제목, 설명, 포스터 URL
- 장르, 플랫폼, 평점
- 감독, 배우, 태그
- 시리즈 정보 (시즌, 에피소드 수)

### User (사용자)

- 기본 정보 (이메일, 이름, 프로필 사진)
- 선호도 (장르, 플랫폼, 선호 배우/감독)
- 시청 기록, 즐겨찾기, 평점

### Review (리뷰)

- 콘텐츠별 리뷰
- 평점, 댓글, 감정 태그
- 스포일러 여부

### Recommendation (추천)

- 사용자별 추천 콘텐츠
- 추천 점수 및 이유

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
