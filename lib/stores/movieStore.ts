import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Movie, MovieFilters } from "../types/movie";
import { movieService } from "../services/movieService";

interface MovieState {
  movies: Movie[];
  currentMovie: Movie | null;
  loading: boolean;
  error: string | null;
  filters: MovieFilters;
  lastDoc: any;
  hasMore: boolean;

  // Actions
  fetchMovies: () => Promise<void>;
  fetchMovieById: (id: string) => Promise<void>;
  searchMovies: (filters: MovieFilters, reset?: boolean) => Promise<void>;
  loadMoreMovies: () => Promise<void>;
  setCurrentMovie: (movie: Movie | null) => void;
  setFilters: (filters: MovieFilters) => void;
  clearError: () => void;
  subscribeToMovies: () => void;
  unsubscribeFromMovies: () => void;
}

export const useMovieStore = create<MovieState>()(
  devtools(
    (set, get) => ({
      movies: [],
      currentMovie: null,
      loading: false,
      error: null,
      filters: {},
      lastDoc: null,
      hasMore: true,
      unsubscribe: null as any,

      fetchMovies: async () => {
        set({ loading: true, error: null });
        try {
          const movies = await movieService.getAllMovies();
          set({ movies, loading: false });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "영화를 불러오는데 실패했습니다.",
            loading: false,
          });
        }
      },

      fetchMovieById: async (id: string) => {
        set({ loading: true, error: null });
        try {
          const movie = await movieService.getMovieById(id);
          set({ currentMovie: movie, loading: false });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "영화를 불러오는데 실패했습니다.",
            loading: false,
          });
        }
      },

      searchMovies: async (filters: MovieFilters, reset: boolean = true) => {
        set({ loading: true, error: null });
        try {
          const { movies, lastDoc } = await movieService.getFilteredMovies(
            filters
          );

          if (reset) {
            set({
              movies,
              lastDoc,
              hasMore: movies.length === 20, // pageSize가 20
              loading: false,
            });
          } else {
            set((state) => ({
              movies: [...state.movies, ...movies],
              lastDoc,
              hasMore: movies.length === 20,
              loading: false,
            }));
          }
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "검색에 실패했습니다.",
            loading: false,
          });
        }
      },

      loadMoreMovies: async () => {
        const { lastDoc, hasMore, filters } = get();
        if (!hasMore || !lastDoc) return;

        set({ loading: true });
        try {
          const { movies, lastDoc: newLastDoc } =
            await movieService.getFilteredMovies(filters, 20, lastDoc);

          set((state) => ({
            movies: [...state.movies, ...movies],
            lastDoc: newLastDoc,
            hasMore: movies.length === 20,
            loading: false,
          }));
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "더 많은 영화를 불러오는데 실패했습니다.",
            loading: false,
          });
        }
      },

      setCurrentMovie: (movie: Movie | null) => {
        set({ currentMovie: movie });
      },

      setFilters: (filters: MovieFilters) => {
        set({ filters });
      },

      clearError: () => {
        set({ error: null });
      },

      subscribeToMovies: () => {
        const unsubscribe = movieService.subscribeToMovies((movies) => {
          set({ movies });
        });
        set({ unsubscribe });
      },

      unsubscribeFromMovies: () => {
        const { unsubscribe } = get();
        if (unsubscribe) {
          unsubscribe();
          set({ unsubscribe: null });
        }
      },
    }),
    {
      name: "movie-store",
    }
  )
);
