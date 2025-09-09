export interface Movie {
  id: number;
  title: string;
  poster: string;
  year?: number;
  genre: string;
  director: string;
  rating: number;
  duration?: string;
  watchDate?: string;
  addedDate?: string;
}
