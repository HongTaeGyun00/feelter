import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  CommunityPost,
  Comment,
  Cat,
  EmotionRecord,
  CommunityFilters,
} from "../types/community";
import {
  postService,
  commentService,
  catService,
  emotionService,
} from "../services/communityService";
import { useAuthStore } from "./authStore";

interface CommunityState {
  // 기존 상태들...
  posts: CommunityPost[];
  currentPost: CommunityPost | null;
  postsLoading: boolean;
  postsError: string | null;
  filters: CommunityFilters;
  lastDoc: any;
  hasMorePosts: boolean;

  comments: Comment[];
  commentsLoading: boolean;
  commentsError: string | null;

  cats: Cat[];
  catsLoading: boolean;
  catsError: string | null;

  emotions: EmotionRecord[];
  emotionsLoading: boolean;
  emotionsError: string | null;

  // 액션들 (인증 확인 로직 포함)
  fetchPosts: (reset?: boolean) => Promise<void>;
  fetchPostById: (id: string) => Promise<void>;
  searchPosts: (filters: CommunityFilters, reset?: boolean) => Promise<void>;
  loadMorePosts: () => Promise<void>;
  addPost: (
    post: Omit<
      CommunityPost,
      | "id"
      | "createdAt"
      | "updatedAt"
      | "authorId"
      | "authorName"
      | "authorAvatar"
    >
  ) => Promise<string>;
  updatePost: (id: string, updates: Partial<CommunityPost>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  togglePostLike: (postId: string) => Promise<void>;
  incrementPostViews: (postId: string) => Promise<void>;
  setCurrentPost: (post: CommunityPost | null) => void;
  setFilters: (filters: CommunityFilters) => void;

  fetchComments: (postId: string) => Promise<void>;
  addComment: (
    comment: Omit<
      Comment,
      | "id"
      | "createdAt"
      | "updatedAt"
      | "authorId"
      | "authorName"
      | "authorAvatar"
    >
  ) => Promise<string>;
  updateComment: (id: string, updates: Partial<Comment>) => Promise<void>;
  deleteComment: (id: string, postId: string) => Promise<void>;
  toggleCommentLike: (commentId: string) => Promise<void>;

  fetchCats: (userId?: string) => Promise<void>;
  addCat: (
    cat: Omit<Cat, "id" | "createdAt" | "updatedAt" | "userId">
  ) => Promise<string>;
  updateCat: (id: string, updates: Partial<Cat>) => Promise<void>;

  fetchEmotions: (userId?: string) => Promise<void>;
  addEmotion: (
    emotion: Omit<EmotionRecord, "id" | "createdAt" | "updatedAt" | "userId">
  ) => Promise<string>;
  updateEmotion: (id: string, updates: Partial<EmotionRecord>) => Promise<void>;
  deleteEmotion: (id: string) => Promise<void>;

  clearErrors: () => void;
}

// 인증 확인 헬퍼 함수
const requireAuth = () => {
  const user = useAuthStore.getState().user;
  if (!user) {
    throw new Error("로그인이 필요한 기능입니다.");
  }
  return user;
};

export const useCommunityStore = create<CommunityState>()(
  devtools(
    (set, get) => ({
      // 초기 상태
      posts: [],
      currentPost: null,
      postsLoading: false,
      postsError: null,
      filters: {},
      lastDoc: null,
      hasMorePosts: true,

      comments: [],
      commentsLoading: false,
      commentsError: null,

      cats: [],
      catsLoading: false,
      catsError: null,

      emotions: [],
      emotionsLoading: false,
      emotionsError: null,

      // 게시글 관련 액션들
      fetchPosts: async (reset = true) => {
        set({ postsLoading: true, postsError: null });
        try {
          const { posts, lastDoc } = await postService.getAllPosts();

          if (reset) {
            set({
              posts,
              lastDoc,
              hasMorePosts: posts.length === 20,
              postsLoading: false,
            });
          } else {
            set((state) => ({
              posts: [...state.posts, ...posts],
              lastDoc,
              hasMorePosts: posts.length === 20,
              postsLoading: false,
            }));
          }
        } catch (error) {
          set({
            postsError:
              error instanceof Error
                ? error.message
                : "게시글을 불러오는데 실패했습니다.",
            postsLoading: false,
          });
        }
      },

      fetchPostById: async (id: string) => {
        set({ postsLoading: true, postsError: null });
        try {
          const post = await postService.getPostById(id);
          set({ currentPost: post, postsLoading: false });
        } catch (error) {
          set({
            postsError:
              error instanceof Error
                ? error.message
                : "게시글을 불러오는데 실패했습니다.",
            postsLoading: false,
          });
        }
      },

      searchPosts: async (filters: CommunityFilters, reset = true) => {
        set({ postsLoading: true, postsError: null, filters });
        try {
          const { posts, lastDoc } = await postService.getFilteredPosts(
            filters
          );

          if (reset) {
            set({
              posts,
              lastDoc,
              hasMorePosts: posts.length === 20,
              postsLoading: false,
            });
          } else {
            set((state) => ({
              posts: [...state.posts, ...posts],
              lastDoc,
              hasMorePosts: posts.length === 20,
              postsLoading: false,
            }));
          }
        } catch (error) {
          set({
            postsError:
              error instanceof Error ? error.message : "검색에 실패했습니다.",
            postsLoading: false,
          });
        }
      },

      loadMorePosts: async () => {
        const { lastDoc, hasMorePosts, filters } = get();
        if (!hasMorePosts || !lastDoc) return;

        set({ postsLoading: true });
        try {
          const { posts, lastDoc: newLastDoc } =
            Object.keys(filters).length > 0
              ? await postService.getFilteredPosts(filters, 20, lastDoc)
              : await postService.getAllPosts(20, lastDoc);

          set((state) => ({
            posts: [...state.posts, ...posts],
            lastDoc: newLastDoc,
            hasMorePosts: posts.length === 20,
            postsLoading: false,
          }));
        } catch (error) {
          set({
            postsError:
              error instanceof Error
                ? error.message
                : "더 많은 게시글을 불러오는데 실패했습니다.",
            postsLoading: false,
          });
        }
      },

      addPost: async (postData) => {
        try {
          const user = requireAuth();

          const post = {
            ...postData,
            authorId: user.uid,
            authorName: user.nickname || user.displayName || "사용자",
            authorAvatar: user.photoURL ? "🖼️" : "👤", // 실제로는 이미지 URL 처리
          };

          const postId = await postService.addPost(post);

          // 고양이 경험치 추가
          if (post.type === "review") {
            await catService.addExperience(user.uid, "review", 20);
          } else if (post.type === "discussion") {
            await catService.addExperience(user.uid, "discussion", 15);
          } else if (post.type === "emotion") {
            await catService.addExperience(user.uid, "emotion", 10);
          }

          // 새 게시글을 목록 맨 앞에 추가
          const newPost: CommunityPost = {
            ...post,
            id: postId,
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          set((state) => ({
            posts: [newPost, ...state.posts],
          }));

          return postId;
        } catch (error) {
          set({
            postsError:
              error instanceof Error
                ? error.message
                : "게시글 작성에 실패했습니다.",
          });
          throw error;
        }
      },

      updatePost: async (id, updates) => {
        try {
          const user = requireAuth();

          // 작성자 확인
          const currentPost =
            get().posts.find((p) => p.id === id) || get().currentPost;
          if (currentPost && currentPost.authorId !== user.uid) {
            throw new Error("본인의 게시글만 수정할 수 있습니다.");
          }

          await postService.updatePost(id, updates);

          set((state) => ({
            posts: state.posts.map((post) =>
              post.id === id
                ? { ...post, ...updates, updatedAt: new Date() }
                : post
            ),
            currentPost:
              state.currentPost?.id === id
                ? { ...state.currentPost, ...updates, updatedAt: new Date() }
                : state.currentPost,
          }));
        } catch (error) {
          set({
            postsError:
              error instanceof Error
                ? error.message
                : "게시글 수정에 실패했습니다.",
          });
          throw error;
        }
      },

      deletePost: async (id) => {
        try {
          const user = requireAuth();

          // 작성자 확인
          const currentPost =
            get().posts.find((p) => p.id === id) || get().currentPost;
          if (currentPost && currentPost.authorId !== user.uid) {
            throw new Error("본인의 게시글만 삭제할 수 있습니다.");
          }

          await postService.deletePost(id);

          set((state) => ({
            posts: state.posts.filter((post) => post.id !== id),
            currentPost:
              state.currentPost?.id === id ? null : state.currentPost,
          }));
        } catch (error) {
          set({
            postsError:
              error instanceof Error
                ? error.message
                : "게시글 삭제에 실패했습니다.",
          });
          throw error;
        }
      },

      togglePostLike: async (postId) => {
        try {
          const user = requireAuth();

          await postService.toggleLike(postId, user.uid);

          set((state) => ({
            posts: state.posts.map((post) => {
              if (post.id === postId) {
                const likedBy = post.likedBy || [];
                const isLiked = likedBy.includes(user.uid);

                return {
                  ...post,
                  likes: isLiked ? post.likes - 1 : post.likes + 1,
                  likedBy: isLiked
                    ? likedBy.filter((id) => id !== user.uid)
                    : [...likedBy, user.uid],
                };
              }
              return post;
            }),
            currentPost:
              state.currentPost?.id === postId
                ? (() => {
                    const likedBy = state.currentPost.likedBy || [];
                    const isLiked = likedBy.includes(user.uid);

                    return {
                      ...state.currentPost,
                      likes: isLiked
                        ? state.currentPost.likes - 1
                        : state.currentPost.likes + 1,
                      likedBy: isLiked
                        ? likedBy.filter((id) => id !== user.uid)
                        : [...likedBy, user.uid],
                    };
                  })()
                : state.currentPost,
          }));
        } catch (error) {
          set({
            postsError:
              error instanceof Error
                ? error.message
                : "좋아요 처리에 실패했습니다.",
          });
          throw error;
        }
      },

      incrementPostViews: async (postId) => {
        try {
          await postService.incrementViews(postId);

          set((state) => ({
            posts: state.posts.map((post) =>
              post.id === postId ? { ...post, views: post.views + 1 } : post
            ),
            currentPost:
              state.currentPost?.id === postId
                ? { ...state.currentPost, views: state.currentPost.views + 1 }
                : state.currentPost,
          }));
        } catch (error) {
          // 조회수 증가 실패는 조용히 처리
          console.error("Failed to increment views:", error);
        }
      },

      setCurrentPost: (post) => {
        set({ currentPost: post });
      },

      setFilters: (filters) => {
        set({ filters });
      },

      // 댓글 관련 액션들
      fetchComments: async (postId) => {
        set({ commentsLoading: true, commentsError: null });
        try {
          const comments = await commentService.getCommentsByPostId(postId);
          set({ comments, commentsLoading: false });
        } catch (error) {
          set({
            commentsError:
              error instanceof Error
                ? error.message
                : "댓글을 불러오는데 실패했습니다.",
            commentsLoading: false,
          });
        }
      },

      addComment: async (commentData) => {
        try {
          const user = requireAuth();

          const comment = {
            ...commentData,
            authorId: user.uid,
            authorName: user.nickname || user.displayName || "사용자",
            authorAvatar: user.photoURL ? "🖼️" : "👤",
          };

          const commentId = await commentService.addComment(comment);

          const newComment: Comment = {
            ...comment,
            id: commentId,
            createdAt: new Date(),
            updatedAt: new Date(),
            replies: [],
          };

          set((state) => ({
            comments: comment.parentCommentId
              ? state.comments.map((c) =>
                  c.id === comment.parentCommentId
                    ? { ...c, replies: [...(c.replies || []), newComment] }
                    : c
                )
              : [...state.comments, newComment],
            posts: state.posts.map((post) =>
              post.id === comment.postId
                ? { ...post, comments: post.comments + 1 }
                : post
            ),
            currentPost:
              state.currentPost?.id === comment.postId
                ? {
                    ...state.currentPost,
                    comments: state.currentPost.comments + 1,
                  }
                : state.currentPost,
          }));

          return commentId;
        } catch (error) {
          set({
            commentsError:
              error instanceof Error
                ? error.message
                : "댓글 작성에 실패했습니다.",
          });
          throw error;
        }
      },

      // 나머지 액션들도 유사하게 인증 확인 로직 추가...
      updateComment: async (id, updates) => {
        try {
          const user = requireAuth();
          await commentService.updateComment(id, updates);

          const updateCommentInTree = (comments: Comment[]): Comment[] => {
            return comments.map((comment) => {
              if (comment.id === id) {
                return { ...comment, ...updates, updatedAt: new Date() };
              }
              if (comment.replies && comment.replies.length > 0) {
                return {
                  ...comment,
                  replies: updateCommentInTree(comment.replies),
                };
              }
              return comment;
            });
          };

          set((state) => ({
            comments: updateCommentInTree(state.comments),
          }));
        } catch (error) {
          set({
            commentsError:
              error instanceof Error
                ? error.message
                : "댓글 수정에 실패했습니다.",
          });
          throw error;
        }
      },

      deleteComment: async (id, postId) => {
        try {
          const user = requireAuth();
          await commentService.deleteComment(id, postId);

          const removeCommentFromTree = (comments: Comment[]): Comment[] => {
            return comments.filter((comment) => {
              if (comment.id === id) {
                return false;
              }
              if (comment.replies && comment.replies.length > 0) {
                comment.replies = removeCommentFromTree(comment.replies);
              }
              return true;
            });
          };

          set((state) => ({
            comments: removeCommentFromTree(state.comments),
            posts: state.posts.map((post) =>
              post.id === postId
                ? { ...post, comments: post.comments - 1 }
                : post
            ),
            currentPost:
              state.currentPost?.id === postId
                ? {
                    ...state.currentPost,
                    comments: state.currentPost.comments - 1,
                  }
                : state.currentPost,
          }));
        } catch (error) {
          set({
            commentsError:
              error instanceof Error
                ? error.message
                : "댓글 삭제에 실패했습니다.",
          });
          throw error;
        }
      },

      toggleCommentLike: async (commentId) => {
        try {
          const user = requireAuth();
          await commentService.toggleCommentLike(commentId, user.uid);

          const updateCommentLikes = (comments: Comment[]): Comment[] => {
            return comments.map((comment) => {
              if (comment.id === commentId) {
                const likedBy = comment.likedBy || [];
                const isLiked = likedBy.includes(user.uid);

                return {
                  ...comment,
                  likes: isLiked ? comment.likes - 1 : comment.likes + 1,
                  likedBy: isLiked
                    ? likedBy.filter((id) => id !== user.uid)
                    : [...likedBy, user.uid],
                };
              }
              if (comment.replies && comment.replies.length > 0) {
                return {
                  ...comment,
                  replies: updateCommentLikes(comment.replies),
                };
              }
              return comment;
            });
          };

          set((state) => ({
            comments: updateCommentLikes(state.comments),
          }));
        } catch (error) {
          set({
            commentsError:
              error instanceof Error
                ? error.message
                : "댓글 좋아요 처리에 실패했습니다.",
          });
        }
      },

      // 고양이 관련 액션들
      fetchCats: async (userId) => {
        try {
          const user = userId ? { uid: userId } : requireAuth();

          set({ catsLoading: true, catsError: null });
          const cats = await catService.getCatsByUserId(user.uid);
          set({ cats, catsLoading: false });
        } catch (error) {
          set({
            catsError:
              error instanceof Error
                ? error.message
                : "고양이 정보를 불러오는데 실패했습니다.",
            catsLoading: false,
          });
        }
      },

      addCat: async (catData) => {
        try {
          const user = requireAuth();

          const cat = {
            ...catData,
            userId: user.uid,
          };

          const catId = await catService.addCat(cat);

          const newCat: Cat = {
            ...cat,
            id: catId,
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          set((state) => ({
            cats: [...state.cats, newCat],
          }));

          return catId;
        } catch (error) {
          set({
            catsError:
              error instanceof Error
                ? error.message
                : "고양이 추가에 실패했습니다.",
          });
          throw error;
        }
      },

      updateCat: async (id, updates) => {
        try {
          await catService.updateCat(id, updates);

          set((state) => ({
            cats: state.cats.map((cat) =>
              cat.id === id
                ? { ...cat, ...updates, updatedAt: new Date() }
                : cat
            ),
          }));
        } catch (error) {
          set({
            catsError:
              error instanceof Error
                ? error.message
                : "고양이 정보 수정에 실패했습니다.",
          });
          throw error;
        }
      },

      // 감정 기록 관련 액션들
      fetchEmotions: async (userId) => {
        try {
          const user = userId ? { uid: userId } : requireAuth();

          set({ emotionsLoading: true, emotionsError: null });
          const emotions = await emotionService.getEmotionsByUserId(user.uid);
          set({ emotions, emotionsLoading: false });
        } catch (error) {
          set({
            emotionsError:
              error instanceof Error
                ? error.message
                : "감정 기록을 불러오는데 실패했습니다.",
            emotionsLoading: false,
          });
        }
      },

      addEmotion: async (emotionData) => {
        try {
          const user = requireAuth();

          const emotion = {
            ...emotionData,
            userId: user.uid,
          };

          const emotionId = await emotionService.addEmotionRecord(emotion);

          const newEmotion: EmotionRecord = {
            ...emotion,
            id: emotionId,
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          set((state) => ({
            emotions: [newEmotion, ...state.emotions],
          }));

          return emotionId;
        } catch (error) {
          set({
            emotionsError:
              error instanceof Error
                ? error.message
                : "감정 기록 추가에 실패했습니다.",
          });
          throw error;
        }
      },

      updateEmotion: async (id, updates) => {
        try {
          await emotionService.updateEmotionRecord(id, updates);

          set((state) => ({
            emotions: state.emotions.map((emotion) =>
              emotion.id === id
                ? { ...emotion, ...updates, updatedAt: new Date() }
                : emotion
            ),
          }));
        } catch (error) {
          set({
            emotionsError:
              error instanceof Error
                ? error.message
                : "감정 기록 수정에 실패했습니다.",
          });
          throw error;
        }
      },

      deleteEmotion: async (id) => {
        try {
          await emotionService.deleteEmotionRecord(id);

          set((state) => ({
            emotions: state.emotions.filter((emotion) => emotion.id !== id),
          }));
        } catch (error) {
          set({
            emotionsError:
              error instanceof Error
                ? error.message
                : "감정 기록 삭제에 실패했습니다.",
          });
          throw error;
        }
      },

      // 유틸리티
      clearErrors: () => {
        set({
          postsError: null,
          commentsError: null,
          catsError: null,
          emotionsError: null,
        });
      },
    }),
    {
      name: "community-store",
    }
  )
);
