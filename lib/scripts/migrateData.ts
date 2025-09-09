import {
  postService,
  catService,
  emotionService,
} from "../services/communityService";
import { CommunityPost, Cat, EmotionRecord } from "../types/community";

// 기존 목업 데이터를 Firebase 형태로 변환
const mockPostsData: Omit<CommunityPost, "id" | "createdAt" | "updatedAt">[] = [
  {
    type: "review",
    authorId: "user1",
    authorName: "시네마러버",
    authorAvatar: "🎬",
    title: "오펜하이머",
    content:
      "놀란 감독의 또 다른 걸작. 역사적 인물을 다룬 작품 중에서 가장 인상 깊었습니다. 특히 시각적 연출과 사운드 디자인이 정말 압도적이었어요. IMAX로 보시길 강력 추천합니다.",
    movieTitle: "오펜하이머",
    rating: 4,
    tags: ["크리스토퍼놀란", "역사", "전기영화", "IMAX"],
    likes: 24,
    likedBy: [],
    comments: 8,
    views: 156,
    status: "hot",
  },
  {
    type: "discussion",
    authorId: "user2",
    authorName: "드라마퀸",
    authorAvatar: "💭",
    title: "더 글로리 시즌2에 대한 여러분의 생각은?",
    content:
      "시즌1보다 더 강렬했던 것 같은데, 복수의 완성도 측면에서 어떻게 생각하시나요? 특히 마지막 에피소드가 정말 인상적이었습니다. 송혜교의 연기도 정말 대단했고요.",
    movieTitle: "더 글로리",
    tags: ["더글로리", "K드라마", "복수극", "송혜교"],
    likes: 12,
    likedBy: [],
    comments: 15,
    views: 89,
    isActive: true,
    status: "hot",
  },
  {
    type: "review",
    authorId: "user3",
    authorName: "무비크리틱",
    authorAvatar: "🎭",
    title: "스파이더맨: 어크로스 더 유니버스",
    content:
      "시각적으로는 혁신적이지만 스토리가 다소 복잡합니다. 애니메이션 기술은 정말 놀라운 수준이지만, 전작의 임팩트를 넘지는 못한 것 같아요. 그래도 볼거리는 충분합니다.",
    movieTitle: "스파이더맨: 어크로스 더 유니버스",
    rating: 3,
    tags: ["애니메이션", "스파이더맨", "마블", "멀티버스"],
    likes: 34,
    likedBy: [],
    comments: 28,
    views: 124,
    status: "new",
  },
  {
    type: "emotion",
    authorId: "user4",
    authorName: "감성충만",
    authorAvatar: "💙",
    title: "라라랜드",
    content:
      "😭 슬픔 | 마지막 장면에서 정말 많이 울었어요. 사랑과 꿈 사이의 선택이라는 주제가 너무 현실적이고 아프게 다가왔습니다. 음악도 정말 아름다웠고, 엠마 스톤과 라이언 고슬링의 케미가 완벽했어요.",
    movieTitle: "라라랜드",
    emotion: "슬픔",
    emotionEmoji: "😭",
    emotionIntensity: 5,
    tags: ["라라랜드", "뮤지컬", "감동", "로맨스"],
    likes: 9,
    likedBy: [],
    comments: 3,
    views: 45,
    status: "new",
  },
];

const mockCatsData: Omit<Cat, "id" | "createdAt" | "updatedAt">[] = [
  {
    userId: "user1",
    name: "나비",
    emoji: "🐱",
    level: 7,
    type: "영화평론가",
    experience: 70,
    maxExperience: 100,
    description: "리뷰 작성으로 성장 중인 똑똑한 고양이",
    specialty: "심도 있는 영화 분석",
    achievements: ["첫 리뷰 작성", "평점왕", "베스트 리뷰어"],
    stats: {
      reviews: 23,
      discussions: 8,
      emotions: 12,
    },
  },
  {
    userId: "user2",
    name: "토토",
    emoji: "😺",
    level: 5,
    type: "토론왕",
    experience: 45,
    maxExperience: 100,
    description: "열정적인 토론으로 레벨업!",
    specialty: "활발한 커뮤니티 참여",
    achievements: ["토론 마스터", "댓글왕", "인기글 작성자"],
    stats: {
      reviews: 12,
      discussions: 34,
      emotions: 6,
    },
  },
  {
    userId: "user3",
    name: "달키",
    emoji: "😸",
    level: 3,
    type: "감정표현가",
    experience: 30,
    maxExperience: 100,
    description: "감정 기록을 통해 천천히 성장 중",
    specialty: "섬세한 감정 표현",
    achievements: ["감정일기왕", "공감능력자"],
    stats: {
      reviews: 5,
      discussions: 2,
      emotions: 28,
    },
  },
];

const mockEmotionData: Omit<EmotionRecord, "id" | "createdAt" | "updatedAt">[] =
  [
    {
      userId: "user4",
      movieTitle: "라라랜드",
      emotion: "슬픔",
      emoji: "😭",
      text: "마지막 장면에서 정말 많이 울었어요. 사랑과 꿈 사이의 선택이라는 주제가 너무 현실적이고 아프게 다가왔습니다.",
      intensity: 5,
      tags: ["뮤지컬", "로맨스", "꿈과현실"],
    },
    {
      userId: "user4",
      movieTitle: "탑건: 매버릭",
      emotion: "흥분",
      emoji: "🔥",
      text: "액션 장면이 정말 숨막혔어요! 특히 마지막 미션 장면에서는 손에 땀을 쥐고 봤습니다. 톰 크루즈의 카리스마가 여전해요.",
      intensity: 4,
      tags: ["액션", "아드레날린", "톰크루즈"],
    },
    {
      userId: "user4",
      movieTitle: "어바웃 타임",
      emotion: "따뜻함",
      emoji: "💖",
      text: "일상의 소중함을 다시 한 번 느꼈습니다. 가족과 사랑에 대한 따뜻한 메시지가 마음 깊이 와닿았어요.",
      intensity: 4,
      tags: ["가족", "일상", "시간여행"],
    },
    {
      userId: "user4",
      movieTitle: "기생충",
      emotion: "불안",
      emoji: "😰",
      text: "계급사회의 현실을 너무 적나라하게 보여줘서 불편하면서도 깊이 생각하게 됐어요. 봉준호 감독의 연출력이 대단합니다.",
      intensity: 5,
      tags: ["사회비판", "계급갈등", "봉준호"],
    },
    {
      userId: "user4",
      movieTitle: "미나리",
      emotion: "그리움",
      emoji: "🥺",
      text: "할머니와의 추억이 생각나서 눈물이 났어요. 가족의 의미와 고향에 대한 그리움을 아름답게 그려낸 작품입니다.",
      intensity: 4,
      tags: ["가족", "이민", "할머니"],
    },
  ];

// 데이터 마이그레이션 함수
export async function migrateMockData() {
  try {
    console.log("Starting data migration...");

    // 게시글 데이터 마이그레이션
    console.log("Migrating posts...");
    for (const post of mockPostsData) {
      const postId = await postService.addPost(post);
      console.log(`Created post: ${postId}`);
    }

    // 고양이 데이터 마이그레이션
    console.log("Migrating cats...");
    for (const cat of mockCatsData) {
      const catId = await catService.addCat(cat);
      console.log(`Created cat: ${catId}`);
    }

    // 감정 기록 데이터 마이그레이션
    console.log("Migrating emotions...");
    for (const emotion of mockEmotionData) {
      const emotionId = await emotionService.addEmotionRecord(emotion);
      console.log(`Created emotion: ${emotionId}`);
    }

    console.log("Data migration completed successfully!");
  } catch (error) {
    console.error("Data migration failed:", error);
    throw error;
  }
}

// 개발 환경에서만 실행되는 함수
export async function initializeDevData() {
  if (process.env.NODE_ENV === "development") {
    console.log("Initializing development data...");
    await migrateMockData();
  }
}
