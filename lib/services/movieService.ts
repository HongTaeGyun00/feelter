import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
  writeBatch,
  onSnapshot,
  Unsubscribe,
} from "firebase/firestore";
import { db } from "../firebase";
import { Movie, MovieFilters, MovieRanking } from "../types/movie";

// 영화 관련 서비스
export const movieService = {
  // 모든 영화 가져오기
  async getAllMovies(): Promise<Movie[]> {
    const querySnapshot = await getDocs(collection(db, "movies"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as Movie[];
  },

  // 영화 ID로 가져오기
  async getMovieById(id: string): Promise<Movie | null> {
    const docRef = doc(db, "movies", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      } as Movie;
    }
    return null;
  },

  // 필터링된 영화 가져오기
  async getFilteredMovies(
    filters: MovieFilters,
    pageSize: number = 20,
    lastDoc?: QueryDocumentSnapshot<DocumentData>
  ): Promise<{
    movies: Movie[];
    lastDoc: QueryDocumentSnapshot<DocumentData> | null;
  }> {
    let q = collection(db, "movies");
    const constraints: any[] = [];

    if (filters.genre) {
      constraints.push(where("genre", "==", filters.genre));
    }

    if (filters.streaming) {
      constraints.push(where("streaming", "==", filters.streaming));
    }

    if (filters.age) {
      constraints.push(where("age", "==", filters.age));
    }

    if (filters.country) {
      constraints.push(where("country", "==", filters.country));
    }

    if (filters.feelterTime) {
      constraints.push(where("feelterTime", "==", filters.feelterTime));
    }

    if (filters.feelterPurpose) {
      constraints.push(where("feelterPurpose", "==", filters.feelterPurpose));
    }

    if (filters.feelterOccasion) {
      constraints.push(where("feelterOccasion", "==", filters.feelterOccasion));
    }

    // 정렬
    if (filters.sortBy) {
      constraints.push(orderBy(filters.sortBy, filters.sortOrder || "desc"));
    } else {
      constraints.push(orderBy("release", "desc"));
    }

    // 페이지네이션
    if (lastDoc) {
      constraints.push(startAfter(lastDoc));
    }

    constraints.push(limit(pageSize));

    const querySnapshot = await getDocs(query(q, ...constraints));
    const movies = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as Movie[];

    const lastVisible =
      querySnapshot.docs[querySnapshot.docs.length - 1] || null;

    return { movies, lastDoc: lastVisible };
  },

  // 영화 추가
  async addMovie(
    movie: Omit<Movie, "id" | "createdAt" | "updatedAt">
  ): Promise<string> {
    const docRef = await addDoc(collection(db, "movies"), {
      ...movie,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return docRef.id;
  },

  // 영화 업데이트
  async updateMovie(id: string, updates: Partial<Movie>): Promise<void> {
    const docRef = doc(db, "movies", id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date(),
    });
  },

  // 영화 삭제
  async deleteMovie(id: string): Promise<void> {
    const docRef = doc(db, "movies", id);
    await deleteDoc(docRef);
  },

  // 실시간 영화 구독
  subscribeToMovies(callback: (movies: Movie[]) => void): Unsubscribe {
    return onSnapshot(collection(db, "movies"), (snapshot) => {
      const movies = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      })) as Movie[];
      callback(movies);
    });
  },

  // 배치로 영화 추가 (초기 데이터 입력용)
  async addMoviesBatch(
    movies: Omit<Movie, "id" | "createdAt" | "updatedAt">[]
  ): Promise<void> {
    const batch = writeBatch(db);

    movies.forEach((movie) => {
      const docRef = doc(collection(db, "movies"));
      batch.set(docRef, {
        ...movie,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    await batch.commit();
  },
};

// 영화 순위 관련 서비스
export const movieRankingService = {
  // 모든 순위 가져오기
  async getAllRankings(): Promise<MovieRanking[]> {
    const querySnapshot = await getDocs(collection(db, "rankings"));
    const rankings = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
    })) as MovieRanking[];

    // 영화 정보도 함께 가져오기
    const rankingsWithMovies = await Promise.all(
      rankings.map(async (ranking) => {
        const movie = await movieService.getMovieById(ranking.movieId);
        return {
          ...ranking,
          movie: movie!,
        };
      })
    );

    return rankingsWithMovies;
  },

  // 순위 추가
  async addRanking(
    ranking: Omit<MovieRanking, "id" | "createdAt" | "movie">
  ): Promise<string> {
    const docRef = await addDoc(collection(db, "rankings"), {
      ...ranking,
      createdAt: new Date(),
    });
    return docRef.id;
  },

  // 배치로 순위 추가
  async addRankingsBatch(
    rankings: Omit<MovieRanking, "id" | "createdAt" | "movie">[]
  ): Promise<void> {
    const batch = writeBatch(db);

    rankings.forEach((ranking) => {
      const docRef = doc(collection(db, "rankings"));
      batch.set(docRef, {
        ...ranking,
        createdAt: new Date(),
      });
    });

    await batch.commit();
  },
};
