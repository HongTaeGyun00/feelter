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
import {
  Content,
  User,
  Review,
  Recommendation,
  SearchFilters,
} from "../types/content";

// 콘텐츠 관련 서비스
export const contentService = {
  // 모든 콘텐츠 가져오기
  async getAllContents(): Promise<Content[]> {
    const querySnapshot = await getDocs(collection(db, "contents"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as Content[];
  },

  // 콘텐츠 ID로 가져오기
  async getContentById(id: string): Promise<Content | null> {
    const docRef = doc(db, "contents", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      } as Content;
    }
    return null;
  },

  // 필터링된 콘텐츠 가져오기
  async getFilteredContents(
    filters: SearchFilters,
    pageSize: number = 20,
    lastDoc?: QueryDocumentSnapshot<DocumentData>
  ): Promise<{
    contents: Content[];
    lastDoc: QueryDocumentSnapshot<DocumentData> | null;
  }> {
    let q = collection(db, "contents");
    const constraints: any[] = [];

    if (filters.genres && filters.genres.length > 0) {
      constraints.push(where("genres", "array-contains-any", filters.genres));
    }

    if (filters.platforms && filters.platforms.length > 0) {
      constraints.push(
        where("platforms", "array-contains-any", filters.platforms)
      );
    }

    if (filters.type) {
      constraints.push(where("type", "==", filters.type));
    }

    if (filters.minRating !== undefined) {
      constraints.push(where("rating", ">=", filters.minRating));
    }

    if (filters.maxRating !== undefined) {
      constraints.push(where("rating", "<=", filters.maxRating));
    }

    if (filters.yearFrom) {
      constraints.push(where("releaseDate", ">=", `${filters.yearFrom}-01-01`));
    }

    if (filters.yearTo) {
      constraints.push(where("releaseDate", "<=", `${filters.yearTo}-12-31`));
    }

    if (filters.language) {
      constraints.push(where("language", "==", filters.language));
    }

    // 정렬
    if (filters.sortBy) {
      constraints.push(orderBy(filters.sortBy, filters.sortOrder || "desc"));
    } else {
      constraints.push(orderBy("rating", "desc"));
    }

    // 페이지네이션
    if (lastDoc) {
      constraints.push(startAfter(lastDoc));
    }

    constraints.push(limit(pageSize));

    const querySnapshot = await getDocs(query(q, ...constraints));
    const contents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as Content[];

    const lastVisible =
      querySnapshot.docs[querySnapshot.docs.length - 1] || null;

    return { contents, lastDoc: lastVisible };
  },

  // 콘텐츠 추가
  async addContent(
    content: Omit<Content, "id" | "createdAt" | "updatedAt">
  ): Promise<string> {
    const docRef = await addDoc(collection(db, "contents"), {
      ...content,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return docRef.id;
  },

  // 콘텐츠 업데이트
  async updateContent(id: string, updates: Partial<Content>): Promise<void> {
    const docRef = doc(db, "contents", id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date(),
    });
  },

  // 콘텐츠 삭제
  async deleteContent(id: string): Promise<void> {
    const docRef = doc(db, "contents", id);
    await deleteDoc(docRef);
  },

  // 실시간 콘텐츠 구독
  subscribeToContents(callback: (contents: Content[]) => void): Unsubscribe {
    return onSnapshot(collection(db, "contents"), (snapshot) => {
      const contents = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      })) as Content[];
      callback(contents);
    });
  },
};

// 사용자 관련 서비스
export const userService = {
  // 사용자 정보 가져오기
  async getUserById(id: string): Promise<User | null> {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      } as User;
    }
    return null;
  },

  // 사용자 생성/업데이트
  async upsertUser(
    user: Omit<User, "id" | "createdAt" | "updatedAt">
  ): Promise<string> {
    const docRef = doc(db, "users", user.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        ...user,
        updatedAt: new Date(),
      });
    } else {
      await updateDoc(docRef, {
        ...user,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return user.id;
  },

  // 사용자 선호도 업데이트
  async updateUserPreferences(
    userId: string,
    preferences: User["preferences"]
  ): Promise<void> {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, {
      preferences,
      updatedAt: new Date(),
    });
  },

  // 시청 기록 추가
  async addToWatchHistory(userId: string, contentId: string): Promise<void> {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data() as User;
      const watchHistory = userData.watchHistory || [];

      if (!watchHistory.includes(contentId)) {
        watchHistory.unshift(contentId); // 최신 항목을 앞에 추가
        if (watchHistory.length > 100) {
          // 최대 100개만 유지
          watchHistory.splice(100);
        }

        await updateDoc(docRef, {
          watchHistory,
          updatedAt: new Date(),
        });
      }
    }
  },

  // 즐겨찾기 토글
  async toggleFavorite(userId: string, contentId: string): Promise<void> {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data() as User;
      const favorites = userData.favorites || [];

      const index = favorites.indexOf(contentId);
      if (index > -1) {
        favorites.splice(index, 1);
      } else {
        favorites.push(contentId);
      }

      await updateDoc(docRef, {
        favorites,
        updatedAt: new Date(),
      });
    }
  },

  // 평점 추가/업데이트
  async updateRating(
    userId: string,
    contentId: string,
    rating: number
  ): Promise<void> {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data() as User;
      const ratings = userData.ratings || {};
      ratings[contentId] = rating;

      await updateDoc(docRef, {
        ratings,
        updatedAt: new Date(),
      });
    }
  },
};

// 리뷰 관련 서비스
export const reviewService = {
  // 콘텐츠의 리뷰 가져오기
  async getReviewsByContentId(contentId: string): Promise<Review[]> {
    const q = query(
      collection(db, "reviews"),
      where("contentId", "==", contentId),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as Review[];
  },

  // 사용자의 리뷰 가져오기
  async getReviewsByUserId(userId: string): Promise<Review[]> {
    const q = query(
      collection(db, "reviews"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as Review[];
  },

  // 리뷰 추가
  async addReview(
    review: Omit<Review, "id" | "createdAt" | "updatedAt">
  ): Promise<string> {
    const docRef = await addDoc(collection(db, "reviews"), {
      ...review,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return docRef.id;
  },

  // 리뷰 업데이트
  async updateReview(id: string, updates: Partial<Review>): Promise<void> {
    const docRef = doc(db, "reviews", id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date(),
    });
  },

  // 리뷰 삭제
  async deleteReview(id: string): Promise<void> {
    const docRef = doc(db, "reviews", id);
    await deleteDoc(docRef);
  },
};

// 추천 관련 서비스
export const recommendationService = {
  // 사용자별 추천 콘텐츠 가져오기
  async getRecommendationsByUserId(
    userId: string,
    limit: number = 20
  ): Promise<Recommendation[]> {
    const q = query(
      collection(db, "recommendations"),
      where("userId", "==", userId),
      orderBy("score", "desc"),
      limit(limit)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
    })) as Recommendation[];
  },

  // 추천 추가
  async addRecommendation(
    recommendation: Omit<Recommendation, "id" | "createdAt">
  ): Promise<string> {
    const docRef = await addDoc(collection(db, "recommendations"), {
      ...recommendation,
      createdAt: new Date(),
    });
    return docRef.id;
  },

  // 사용자의 모든 추천 삭제 (새로운 추천을 위해)
  async clearUserRecommendations(userId: string): Promise<void> {
    const q = query(
      collection(db, "recommendations"),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);

    const batch = writeBatch(db);
    querySnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
  },
};
