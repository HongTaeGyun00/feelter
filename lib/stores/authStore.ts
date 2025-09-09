import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import {
  UserProfile,
  AuthState,
  LoginCredentials,
  RegisterCredentials,
  UpdateProfileData,
} from "../types/auth";
import { authService } from "../services/authService";

interface AuthStore extends AuthState {
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginAnonymously: () => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
  uploadProfileImage: (file: File) => Promise<void>;
  changePassword: (newPassword: string) => Promise<void>;
  changeEmail: (newEmail: string) => Promise<void>;
  deleteAccount: () => Promise<void>;
  initializeAuth: () => void;
  setUser: (user: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        // 초기 상태
        user: null,
        loading: false,
        error: null,
        isAuthenticated: false,
        isInitialized: false,

        // 로그인
        login: async (credentials: LoginCredentials) => {
          set({ loading: true, error: null });
          try {
            const user = await authService.login(credentials);
            set({
              user,
              isAuthenticated: true,
              loading: false,
              error: null,
            });
          } catch (error) {
            set({
              error:
                error instanceof Error
                  ? error.message
                  : "로그인에 실패했습니다.",
              loading: false,
              isAuthenticated: false,
              user: null,
            });
            throw error;
          }
        },

        // 회원가입
        register: async (credentials: RegisterCredentials) => {
          set({ loading: true, error: null });
          try {
            const user = await authService.register(credentials);
            set({
              user,
              isAuthenticated: true,
              loading: false,
              error: null,
            });
          } catch (error) {
            set({
              error:
                error instanceof Error
                  ? error.message
                  : "회원가입에 실패했습니다.",
              loading: false,
              isAuthenticated: false,
              user: null,
            });
            throw error;
          }
        },

        // Google 로그인
        loginWithGoogle: async () => {
          set({ loading: true, error: null });
          try {
            const user = await authService.loginWithGoogle();
            set({
              user,
              isAuthenticated: true,
              loading: false,
              error: null,
            });
          } catch (error) {
            set({
              error:
                error instanceof Error
                  ? error.message
                  : "Google 로그인에 실패했습니다.",
              loading: false,
              isAuthenticated: false,
              user: null,
            });
            throw error;
          }
        },

        // 익명 로그인
        loginAnonymously: async () => {
          set({ loading: true, error: null });
          try {
            const user = await authService.loginAnonymously();
            set({
              user,
              isAuthenticated: true,
              loading: false,
              error: null,
            });
          } catch (error) {
            set({
              error:
                error instanceof Error
                  ? error.message
                  : "익명 로그인에 실패했습니다.",
              loading: false,
              isAuthenticated: false,
              user: null,
            });
            throw error;
          }
        },

        // 로그아웃
        logout: async () => {
          set({ loading: true });
          try {
            await authService.logout();
            set({
              user: null,
              isAuthenticated: false,
              loading: false,
              error: null,
            });
          } catch (error) {
            set({
              error:
                error instanceof Error
                  ? error.message
                  : "로그아웃에 실패했습니다.",
              loading: false,
            });
            throw error;
          }
        },

        // 프로필 업데이트
        updateProfile: async (data: UpdateProfileData) => {
          const { user } = get();
          if (!user) {
            throw new Error("로그인이 필요합니다.");
          }

          set({ loading: true, error: null });
          try {
            await authService.updateUserProfile(user.uid, data);

            // 로컬 상태 업데이트
            set({
              user: { ...user, ...data, updatedAt: new Date() },
              loading: false,
            });
          } catch (error) {
            set({
              error:
                error instanceof Error
                  ? error.message
                  : "프로필 업데이트에 실패했습니다.",
              loading: false,
            });
            throw error;
          }
        },

        // 프로필 이미지 업로드
        uploadProfileImage: async (file: File) => {
          const { user } = get();
          if (!user) {
            throw new Error("로그인이 필요합니다.");
          }

          set({ loading: true, error: null });
          try {
            const photoURL = await authService.uploadProfileImage(
              user.uid,
              file
            );

            // 로컬 상태 업데이트
            set({
              user: { ...user, photoURL, updatedAt: new Date() },
              loading: false,
            });
          } catch (error) {
            set({
              error:
                error instanceof Error
                  ? error.message
                  : "프로필 이미지 업로드에 실패했습니다.",
              loading: false,
            });
            throw error;
          }
        },

        // 비밀번호 변경
        changePassword: async (newPassword: string) => {
          set({ loading: true, error: null });
          try {
            await authService.changePassword(newPassword);
            set({ loading: false });
          } catch (error) {
            set({
              error:
                error instanceof Error
                  ? error.message
                  : "비밀번호 변경에 실패했습니다.",
              loading: false,
            });
            throw error;
          }
        },

        // 이메일 변경
        changeEmail: async (newEmail: string) => {
          const { user } = get();
          if (!user) {
            throw new Error("로그인이 필요합니다.");
          }

          set({ loading: true, error: null });
          try {
            await authService.changeEmail(newEmail);

            // 로컬 상태 업데이트
            set({
              user: { ...user, email: newEmail, updatedAt: new Date() },
              loading: false,
            });
          } catch (error) {
            set({
              error:
                error instanceof Error
                  ? error.message
                  : "이메일 변경에 실패했습니다.",
              loading: false,
            });
            throw error;
          }
        },

        // 계정 삭제
        deleteAccount: async () => {
          set({ loading: true, error: null });
          try {
            await authService.deleteAccount();
            set({
              user: null,
              isAuthenticated: false,
              loading: false,
              error: null,
            });
          } catch (error) {
            set({
              error:
                error instanceof Error
                  ? error.message
                  : "계정 삭제에 실패했습니다.",
              loading: false,
            });
            throw error;
          }
        },

        // 인증 초기화
        initializeAuth: () => {
          if (get().isInitialized) return;

          set({ loading: true });

          const unsubscribe = authService.onAuthStateChanged((user) => {
            set({
              user,
              isAuthenticated: !!user,
              loading: false,
              isInitialized: true,
            });
          });

          // Cleanup function을 store에 저장할 수도 있음
          return unsubscribe;
        },

        // 유틸리티 함수들
        setUser: (user: UserProfile | null) => {
          set({ user, isAuthenticated: !!user });
        },

        setLoading: (loading: boolean) => {
          set({ loading });
        },

        setError: (error: string | null) => {
          set({ error });
        },

        clearError: () => {
          set({ error: null });
        },
      }),
      {
        name: "auth-store",
        // 민감한 정보는 persist하지 않음
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    {
      name: "auth-store",
    }
  )
);
