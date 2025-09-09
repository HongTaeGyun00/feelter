import { Movie } from "./movie";

export interface Category {
  id: number;
  name: string;
  description: string;
  movieCount: number;
  isPublic: boolean;
  createdDate: string;
  movies: Pick<Movie, "id" | "title" | "poster">[];
}
