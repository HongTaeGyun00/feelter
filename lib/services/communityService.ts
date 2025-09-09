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
  increment,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase";
import {
  CommunityPost,
  Comment,
  Cat,
  EmotionRecord,
  CommunityFilters,
} from "../types/community";

// 게시글 관련 서비스
export const postService = {
  // 모든 게시글 가져오기 (페이지네이션 포함)
  async getAllPosts(
    pageSize: number = 20,
    lastDoc?: QueryDocumentSnapshot<DocumentData>
  ): Promise<{
    posts: CommunityPost[];
    lastDoc: QueryDocumentSnapshot<DocumentData> | null;
  }> {
    let q = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc"),
      limit(pageSize)
    );

    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as CommunityPost[];

    const lastVisible =
      querySnapshot.docs[querySnapshot.docs.length - 1] || null;
    return { posts, lastDoc: lastVisible };
  },

  // 필터링된 게시글 가져오기
  async getFilteredPosts(
    filters: CommunityFilters,
    pageSize: number = 20,
    lastDoc?: QueryDocumentSnapshot<DocumentData>
  ): Promise<{
    posts: CommunityPost[];
    lastDoc: QueryDocumentSnapshot<DocumentData> | null;
  }> {
    let q = collection(db, "posts");
    const constraints: any[] = [];

    if (filters.type) {
      constraints.push(where("type", "==", filters.type));
    }

    if (filters.status) {
      constraints.push(where("status", "==", filters.status));
    }

    if (filters.authorId) {
      constraints.push(where("authorId", "==", filters.authorId));
    }

    if (filters.tags && filters.tags.length > 0) {
      constraints.push(where("tags", "array-contains-any", filters.tags));
    }

    // 정렬
    if (filters.sortBy) {
      constraints.push(orderBy(filters.sortBy, filters.sortOrder || "desc"));
    } else {
      constraints.push(orderBy("createdAt", "desc"));
    }

    // 페이지네이션
    if (lastDoc) {
      constraints.push(startAfter(lastDoc));
    }

    constraints.push(limit(pageSize));

    const querySnapshot = await getDocs(query(q, ...constraints));
    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as CommunityPost[];

    const lastVisible =
      querySnapshot.docs[querySnapshot.docs.length - 1] || null;
    return { posts, lastDoc: lastVisible };
  },

  // 게시글 ID로 가져오기
  async getPostById(id: string): Promise<CommunityPost | null> {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      } as CommunityPost;
    }
    return null;
  },

  // 게시글 추가
  async addPost(
    post: Omit<CommunityPost, "id" | "createdAt" | "updatedAt">
  ): Promise<string> {
    const batch = writeBatch(db);

    // 게시글 추가
    const postRef = doc(collection(db, "posts"));
    batch.set(postRef, {
      ...post,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // 사용자 통계 업데이트
    const userRef = doc(db, "users", post.authorId);
    const statsUpdate: any = {
      "stats.postsCount": increment(1),
      updatedAt: new Date(),
    };

    if (post.type === "review") {
      statsUpdate["stats.reviewsCount"] = increment(1);
    } else if (post.type === "discussion") {
      statsUpdate["stats.discussionsCount"] = increment(1);
    } else if (post.type === "emotion") {
      statsUpdate["stats.emotionsCount"] = increment(1);
    }

    batch.update(userRef, statsUpdate);
    await batch.commit();

    return postRef.id;
  },

  // 게시글 업데이트
  async updatePost(id: string, updates: Partial<CommunityPost>): Promise<void> {
    const docRef = doc(db, "posts", id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date(),
    });
  },

  // 게시글 삭제
  async deletePost(id: string): Promise<void> {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
  },

  // 좋아요 토글 (수정된 부분)
  async toggleLike(postId: string, userId: string): Promise<void> {
    const postRef = doc(db, "posts", postId);
    const postSnap = await getDoc(postRef);

    if (postSnap.exists()) {
      const postData = postSnap.data() as CommunityPost;
      const likedBy = postData.likedBy || [];
      const isCurrentlyLiked = likedBy.includes(userId);

      const batch = writeBatch(db);

      // 게시글 좋아요 상태 업데이트
      if (isCurrentlyLiked) {
        // 좋아요 취소
        batch.update(postRef, {
          likes: increment(-1),
          likedBy: arrayRemove(userId),
          updatedAt: new Date(),
        });

        // 게시글 작성자의 받은 좋아요 수 감소
        if (postData.authorId !== userId) {
          const authorRef = doc(db, "users", postData.authorId);
          batch.update(authorRef, {
            "stats.likesReceived": increment(-1),
            updatedAt: new Date(),
          });
        }
      } else {
        // 좋아요 추가
        batch.update(postRef, {
          likes: increment(1),
          likedBy: arrayUnion(userId),
          updatedAt: new Date(),
        });

        // 게시글 작성자의 받은 좋아요 수 증가
        if (postData.authorId !== userId) {
          const authorRef = doc(db, "users", postData.authorId);
          batch.update(authorRef, {
            "stats.likesReceived": increment(1),
            updatedAt: new Date(),
          });
        }
      }

      await batch.commit();
    }
  },

  // 조회수 증가
  async incrementViews(postId: string): Promise<void> {
    const docRef = doc(db, "posts", postId);
    await updateDoc(docRef, {
      views: increment(1),
    });
  },

  // 실시간 게시글 구독
  subscribeToPost(
    postId: string,
    callback: (post: CommunityPost | null) => void
  ): Unsubscribe {
    const docRef = doc(db, "posts", postId);
    return onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        const post = {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate(),
        } as CommunityPost;
        callback(post);
      } else {
        callback(null);
      }
    });
  },
};

export const userStatsService = {
  // 게시글 작성 시 통계 업데이트
  async incrementPostCount(
    userId: string,
    postType: "review" | "discussion" | "emotion"
  ): Promise<void> {
    const userRef = doc(db, "users", userId);
    const updates: any = {
      "stats.postsCount": increment(1),
      updatedAt: new Date(),
    };

    if (postType === "review") {
      updates["stats.reviewsCount"] = increment(1);
    } else if (postType === "discussion") {
      updates["stats.discussionsCount"] = increment(1);
    } else if (postType === "emotion") {
      updates["stats.emotionsCount"] = increment(1);
    }

    await updateDoc(userRef, updates);
  },

  // 좋아요 받았을 때 통계 업데이트
  async incrementLikesReceived(
    userId: string,
    incrementValue: number = 1
  ): Promise<void> {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      "stats.likesReceived": increment(incrementValue),
      updatedAt: new Date(),
    });
  },

  // 댓글 받았을 때 통계 업데이트
  async incrementCommentsReceived(userId: string): Promise<void> {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      "stats.commentsReceived": increment(1),
      updatedAt: new Date(),
    });
  },
};

// 댓글 관련 서비스
export const commentService = {
  // 게시글의 댓글 가져오기
  async getCommentsByPostId(postId: string): Promise<Comment[]> {
    const q = query(
      collection(db, "comments"),
      where("postId", "==", postId),
      orderBy("createdAt", "asc")
    );

    const querySnapshot = await getDocs(q);
    const comments = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as Comment[];

    // 댓글을 계층구조로 변환
    const commentMap = new Map<string, Comment>();
    const rootComments: Comment[] = [];

    comments.forEach((comment) => {
      comment.replies = [];
      commentMap.set(comment.id, comment);

      if (comment.parentCommentId) {
        const parent = commentMap.get(comment.parentCommentId);
        if (parent) {
          parent.replies!.push(comment);
        }
      } else {
        rootComments.push(comment);
      }
    });

    return rootComments;
  },

  // 댓글 추가
  async addComment(
    comment: Omit<Comment, "id" | "createdAt" | "updatedAt">
  ): Promise<string> {
    const batch = writeBatch(db);

    // 댓글 추가
    const commentRef = doc(collection(db, "comments"));
    batch.set(commentRef, {
      ...comment,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // 게시글의 댓글 수 증가
    const postRef = doc(db, "posts", comment.postId);
    batch.update(postRef, {
      comments: increment(1),
    });

    // 게시글 작성자 정보 가져오기 위해 게시글 조회
    const postSnap = await getDoc(postRef);
    if (postSnap.exists()) {
      const postData = postSnap.data() as CommunityPost;

      // 게시글 작성자의 받은 댓글 수 증가 (본인 댓글은 제외)
      if (postData.authorId !== comment.authorId) {
        const authorRef = doc(db, "users", postData.authorId);
        batch.update(authorRef, {
          "stats.commentsReceived": increment(1),
          updatedAt: new Date(),
        });
      }
    }

    await batch.commit();
    return commentRef.id;
  },

  // 댓글 업데이트
  async updateComment(id: string, updates: Partial<Comment>): Promise<void> {
    const docRef = doc(db, "comments", id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date(),
    });
  },

  // 댓글 삭제
  async deleteComment(id: string, postId: string): Promise<void> {
    const batch = writeBatch(db);

    // 댓글 삭제
    const commentRef = doc(db, "comments", id);
    batch.delete(commentRef);

    // 게시글의 댓글 수 감소
    const postRef = doc(db, "posts", postId);
    batch.update(postRef, {
      comments: increment(-1),
    });

    await batch.commit();
  },

  // 댓글 좋아요 토글
  async toggleCommentLike(commentId: string, userId: string): Promise<void> {
    const docRef = doc(db, "comments", commentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as Comment;
      const likedBy = data.likedBy || [];

      if (likedBy.includes(userId)) {
        await updateDoc(docRef, {
          likes: increment(-1),
          likedBy: arrayRemove(userId),
          updatedAt: new Date(),
        });
      } else {
        await updateDoc(docRef, {
          likes: increment(1),
          likedBy: arrayUnion(userId),
          updatedAt: new Date(),
        });
      }
    }
  },
};

// 고양이 관련 서비스
export const catService = {
  // 사용자의 고양이들 가져오기
  async getCatsByUserId(userId: string): Promise<Cat[]> {
    const q = query(collection(db, "cats"), where("userId", "==", userId));

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as Cat[];
  },

  // 고양이 추가
  async addCat(
    cat: Omit<Cat, "id" | "createdAt" | "updatedAt">
  ): Promise<string> {
    const docRef = await addDoc(collection(db, "cats"), {
      ...cat,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return docRef.id;
  },

  // 고양이 업데이트 (경험치, 레벨, 스탯 등)
  async updateCat(id: string, updates: Partial<Cat>): Promise<void> {
    const docRef = doc(db, "cats", id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date(),
    });
  },

  // 활동에 따른 고양이 경험치 증가
  async addExperience(
    userId: string,
    activityType: "review" | "discussion" | "emotion",
    points: number
  ): Promise<void> {
    const cats = await this.getCatsByUserId(userId);

    for (const cat of cats) {
      const newExperience = cat.experience + points;
      const newLevel = Math.floor(newExperience / 100) + 1; // 100 경험치마다 레벨업

      const updates: Partial<Cat> = {
        experience: newExperience,
        level: newLevel,
        stats: {
          ...cat.stats,
          [activityType === "review"
            ? "reviews"
            : activityType === "discussion"
            ? "discussions"
            : "emotions"]:
            cat.stats[
              activityType === "review"
                ? "reviews"
                : activityType === "discussion"
                ? "discussions"
                : "emotions"
            ] + 1,
        },
      };

      await this.updateCat(cat.id, updates);
    }
  },
};

// 감정 기록 관련 서비스
export const emotionService = {
  // 사용자의 감정 기록 가져오기
  async getEmotionsByUserId(userId: string): Promise<EmotionRecord[]> {
    const q = query(
      collection(db, "emotions"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as EmotionRecord[];
  },

  // 감정 기록 추가
  async addEmotionRecord(
    emotion: Omit<EmotionRecord, "id" | "createdAt" | "updatedAt">
  ): Promise<string> {
    const docRef = await addDoc(collection(db, "emotions"), {
      ...emotion,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // 고양이 경험치 추가
    await catService.addExperience(emotion.userId, "emotion", 10);

    return docRef.id;
  },

  // 감정 기록 업데이트
  async updateEmotionRecord(
    id: string,
    updates: Partial<EmotionRecord>
  ): Promise<void> {
    const docRef = doc(db, "emotions", id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date(),
    });
  },

  // 감정 기록 삭제
  async deleteEmotionRecord(id: string): Promise<void> {
    const docRef = doc(db, "emotions", id);
    await deleteDoc(docRef);
  },
};
