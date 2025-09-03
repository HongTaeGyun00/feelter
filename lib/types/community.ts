export interface CommunityPost {
  id: string;
  type: "review" | "discussion" | "emotion" | "general";
  authorId: string;
  authorName: string;
  authorAvatar: string;
  title: string;
  content: string;
  movieTitle?: string; // 영화/드라마 제목 (리뷰, 감정 기록용)
  rating?: number; // 평점 (1-5)
  emotion?: string; // 감정 (감정 기록용)
  emotionEmoji?: string; // 감정 이모지
  emotionIntensity?: number; // 감정 강도 (1-5)
  tags: string[];
  likes: number;
  likedBy: string[]; // 좋아요 누른 사용자 ID 목록
  comments: number;
  views: number;
  isActive?: boolean; // 활발한 토론 여부
  status?: "hot" | "new" | "solved"; // 게시글 상태
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  likes: number;
  likedBy: string[];
  parentCommentId?: string; // 대댓글인 경우 부모 댓글 ID
  replies?: Comment[]; // 대댓글 목록
  createdAt: Date;
  updatedAt: Date;
}

export interface Cat {
  id: string;
  userId: string;
  name: string;
  emoji: string;
  level: number;
  type: string; // "영화평론가", "토론왕", "감정표현가"
  experience: number;
  maxExperience: number;
  description: string;
  specialty: string;
  achievements: string[];
  stats: {
    reviews: number;
    discussions: number;
    emotions: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface EmotionRecord {
  id: string;
  userId: string;
  movieTitle: string;
  emotion: string;
  emoji: string;
  text: string;
  intensity: number; // 1-5
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CommunityFilters {
  type?: "review" | "discussion" | "emotion" | "general";
  status?: "hot" | "new" | "solved";
  sortBy?: "createdAt" | "likes" | "comments" | "views";
  sortOrder?: "asc" | "desc";
  tags?: string[];
  authorId?: string;
}
