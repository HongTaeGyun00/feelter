export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isAnonymous: boolean;
  createdAt: Date;
  updatedAt: Date;

  // 추가 프로필 정보
  nickname?: string;
  bio?: string;
  favoriteGenres?: string[];
  favoriteActors?: string[];
  favoriteDirectors?: string[];

  // 통계 정보
  stats?: {
    postsCount: number;
    reviewsCount: number;
    discussionsCount: number;
    emotionsCount: number;
    likesReceived: number;
    commentsReceived: number;
  };

  // 설정
  preferences?: {
    notifications: {
      comments: boolean;
      likes: boolean;
      mentions: boolean;
      newPosts: boolean;
    };
    privacy: {
      showEmail: boolean;
      showStats: boolean;
    };
  };
}

export interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  displayName: string;
  confirmPassword: string;
}

export interface UpdateProfileData {
  displayName?: string;
  nickname?: string;
  bio?: string;
  favoriteGenres?: string[];
  favoriteActors?: string[];
  favoriteDirectors?: string[];
}
