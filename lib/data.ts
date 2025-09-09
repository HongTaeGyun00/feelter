// src/lib/data.ts

export interface ContentItem {
  title: string;
  year: number;
  genre: string;
  imageUrl: string;
  rating?: number;
  popularity?: number;
}

export const sampleContent: ContentItem[] = [
  {
    title: "밴드센트",
    year: 2023,
    genre: "드라마",
    imageUrl:
      "https://cdn.pixabay.com/photo/2025/08/21/09/51/rouen-cathedral-9787080_1280.jpg",
    rating: 8.8,
    popularity: 100,
  },
  {
    title: "JUNG",
    year: 2023,
    genre: "뮤지컬",
    imageUrl:
      "https://cdn.pixabay.com/photo/2025/08/17/22/55/samarkand-9780493_1280.jpg",
    rating: 8.5,
    popularity: 90,
  },
  {
    title: "코미디 버라이어티 쇼",
    year: 2023,
    genre: "코미디",
    imageUrl:
      "https://cdn.pixabay.com/photo/2021/02/27/13/42/comedy-6054626_1280.jpg",
    rating: 9.0,
    popularity: 120,
  },
  {
    title: "개발자의",
    year: 2023,
    genre: "SF",
    imageUrl:
      "https://media.istockphoto.com/id/2169448370/ko/%EC%82%AC%EC%A7%84/%EC%82%AC%EB%AC%B4%EC%8B%A4-%EB%B3%B5%EB%8F%84%EB%A5%BC-%EA%B1%B7%EB%8A%94-%EB%8F%99%EC%95%88-%EB%85%B8%ED%8A%B8%EB%B6%81%EC%9D%84-%ED%86%B5%ED%95%B4-%EC%98%A8%EB%9D%BC%EC%9D%B8-%EC%97%B0%EA%B5%AC%EB%A5%BC-%ED%95%98%EA%B3%A0-%EB%AF%B8%EC%86%8C-%EC%A7%93%EB%8A%94-%EA%B0%9C%EB%B0%9C%EC%9E%90%EC%9D%98-%EC%B4%88%EC%83%81%ED%99%94.jpg?s=1024x1024&w=is&k=20&c=ckKAQjClxtmvvQ0vot2coIl4m_0MTMiGXke-rfZlY-w=",
    rating: 8.9,
    popularity: 110,
  },
  {
    title: "마스터의 하우스",
    year: 2023,
    genre: "스릴러",
    imageUrl:
      "https://media.istockphoto.com/id/175740202/ko/%EC%82%AC%EC%A7%84/%EC%8A%A4%ED%88%AC%EC%BD%94-%ED%99%88%ED%99%94%EB%A9%B4.jpg?s=1024x1024&w=is&k=20&c=2Rx_4ZjcahE4-jPzPlZpMfpEYtj2XoAPEow30mX478o=",
    rating: 9.2,
    popularity: 150,
  },
  {
    title: "로맨틱 스토리",
    year: 2023,
    genre: "로맨스",
    imageUrl:
      "https://media.istockphoto.com/id/656146184/ko/%EC%82%AC%EC%A7%84/%EB%B0%A4%EC%97%90-%EC%B4%9B%EB%B6%88%EB%A1%9C-%EC%98%88%EC%95%BD%ED%95%98%EC%8B%AD%EC%8B%9C%EC%98%A4.jpg?s=1024x1024&w=is&k=20&c=2gsl7LYxpy2sO932sOI1C1MDkl1tU54C7aaNPaxGhc4=",
    rating: 8.7,
    popularity: 95,
  },
  {
    title: "액션 히어로",
    year: 2024,
    genre: "액션",
    imageUrl:
      "https://cdn.pixabay.com/photo/2011/12/21/00/58/action-hero-11214_1280.jpg",
    rating: 9.5,
    popularity: 200,
  },
];

export const MASTER_DATA = {
  platforms: ["넷플릭스", "디즈니+", "웨이브", "티빙", "쿠팡플레이"],
  genres: [
    "액션",
    "드라마",
    "코미디",
    "SF",
    "스릴러",
    "로맨스",
    "공포",
    "다큐멘터리",
  ],
  ratings: ["6점 이상", "7점 이상", "8점 이상", "9점 이상"],
  years: [
    "2020 이상 최신작",
    "2015 이상",
    "2010 이상",
    "2005 이상",
    "2000 이상",
    "2000 이전작",
  ],
};
