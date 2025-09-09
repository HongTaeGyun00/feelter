import { Category } from "../types/category";

export const defaultCategories: Category[] = [
  {
    id: 1,
    name: "내가 만든 영화 리스트",
    description: "개인적으로 추천하고 싶은 영화들을 모아둔 리스트",
    movieCount: 15,
    isPublic: true,
    createdDate: "2024.07.10",
    movies: [
      { id: 6, title: "인셉션", poster: "/img/jjangu.png" },
      { id: 1, title: "인터스텔라", poster: "/img/jjangu.png" },
      { id: 7, title: "다크 나이트", poster: "/among-us-poster.png" },
    ],
  },
  {
    id: 2,
    name: "한국 명작 영화",
    description: "꼭 봐야 할 한국 영화들을 정리한 컬렉션",
    movieCount: 8,
    isPublic: false,
    createdDate: "2024.06.25",
    movies: [
      { id: 2, title: "기생충", poster: "/img/jjanga.png" },
      { id: 8, title: "올드보이", poster: "/among-us-poster.png" },
      { id: 9, title: "타는 것들", poster: "/among-us-poster.png" },
    ],
  },
  {
    id: 3,
    name: "주말에 보기 좋은 코미디",
    description: "가벼운 마음으로 볼 수 있는 재밌는 영화들",
    movieCount: 12,
    isPublic: true,
    createdDate: "2024.08.01",
    movies: [
      { id: 10, title: "극한직업", poster: "/among-us-poster.png" },
      { id: 11, title: "걸캅스", poster: "/among-us-poster.png" },
      { id: 12, title: "엑시트", poster: "/among-us-poster.png" },
    ],
  },
];
