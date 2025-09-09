export interface Movie {
  id: string;
  title: string;
  release: string; // 개봉일
  age: string; // 연령 등급
  genre: string; // 장르
  runningTime: string; // 상영시간
  country: string; // 제작국가
  director: string; // 감독
  actor: string; // 배우
  overview: string; // 줄거리
  streaming: string; // 스트리밍 플랫폼
  streamingUrl: string; // 스트리밍 URL
  youtubeUrl: string; // 유튜브 예고편 URL
  imgUrl: string; // 포스터 이미지 URL
  bgUrl: string; // 배경 이미지 URL
  feelterTime: string; // 필터 추천 시간대
  feelterPurpose: string; // 필터 추천 목적
  feelterOccasion: string; // 필터 추천 상황
  createdAt: Date;
  updatedAt: Date;
}

export interface MovieFilters {
  genre?: string;
  streaming?: string;
  age?: string;
  country?: string;
  feelterTime?: string;
  feelterPurpose?: string;
  feelterOccasion?: string;
  sortBy?: "release" | "title";
  sortOrder?: "asc" | "desc";
}

export interface MovieRanking {
  id: string;
  rank: number;
  movieId: string;
  movie: Movie;
  bestComment: string;
  createdAt: Date;
}
