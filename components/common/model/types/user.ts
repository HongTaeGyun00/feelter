import { Genre, Director } from "../constants";

export interface User {
  id: number;
  profileImage: string;
  nickname: string;
  email: string;
  bio: string;
  joinDate: string;
  favoriteGenres: Genre[];
  favoriteDirectors: Director[];
}
