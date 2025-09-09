import { User } from "../types/user";

export const defaultUser: User = {
  id: 1,
  profileImage: "/api/placeholder/150/150",
  nickname: "영화매니아",
  email: "moviemania@feelter.com",
  bio: "영화를 사랑하는 평범한 직장인입니다. 특히 SF와 스릴러 장르를 좋아해요!",
  joinDate: "2024.01.15",
  favoriteGenres: ["SF", "스릴러", "드라마"],
  favoriteDirectors: ["크리스토퍼 놀란", "봉준호", "데니스 빌럼브"],
};
