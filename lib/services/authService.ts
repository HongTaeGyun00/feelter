import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInAnonymously,
  signOut,
  updateProfile,
  updatePassword,
  updateEmail,
  deleteUser,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  AuthError,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { auth, db, storage } from "../firebase";
import {
  UserProfile,
  LoginCredentials,
  RegisterCredentials,
  UpdateProfileData,
} from "../types/auth";

class AuthService {
  private googleProvider: GoogleAuthProvider;

  constructor() {
    this.googleProvider = new GoogleAuthProvider();
    this.googleProvider.setCustomParameters({
      prompt: "select_account",
    });
  }

  // 이메일/비밀번호로 회원가입
  async register(credentials: RegisterCredentials): Promise<UserProfile> {
    try {
      if (credentials.password !== credentials.confirmPassword) {
        throw new Error("비밀번호가 일치하지 않습니다.");
      }

      if (credentials.password.length < 6) {
        throw new Error("비밀번호는 최소 6자 이상이어야 합니다.");
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth!,
        credentials.email,
        credentials.password
      );

      const user = userCredential.user;

      // 사용자 프로필 업데이트
      await updateProfile(user, {
        displayName: credentials.displayName,
      });

      // Firestore에 사용자 프로필 저장
      const userProfile = await this.createUserProfile(user, {
        displayName: credentials.displayName,
      });

      return userProfile;
    } catch (error) {
      console.error("Registration error:", error);
      throw this.handleAuthError(error as AuthError);
    }
  }

  // 이메일/비밀번호로 로그인
  async login(credentials: LoginCredentials): Promise<UserProfile> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth!,
        credentials.email,
        credentials.password
      );

      const userProfile = await this.getUserProfile(userCredential.user.uid);
      if (!userProfile) {
        // 프로필이 없으면 생성
        return await this.createUserProfile(userCredential.user);
      }

      return userProfile;
    } catch (error) {
      console.error("Login error:", error);
      throw this.handleAuthError(error as AuthError);
    }
  }

  // Google로 로그인
  async loginWithGoogle(): Promise<UserProfile> {
    try {
      const userCredential = await signInWithPopup(auth!, this.googleProvider);
      const user = userCredential.user;

      let userProfile = await this.getUserProfile(user.uid);
      if (!userProfile) {
        // 새 사용자인 경우 프로필 생성
        userProfile = await this.createUserProfile(user);
      } else {
        // 기존 사용자인 경우 정보 업데이트
        await this.updateUserProfile(user.uid, {
          displayName: user.displayName,
          photoURL: user.photoURL,
          updatedAt: new Date(),
        });
        userProfile = await this.getUserProfile(user.uid);
      }

      return userProfile!;
    } catch (error) {
      console.error("Google login error:", error);
      throw this.handleAuthError(error as AuthError);
    }
  }

  // 익명으로 로그인
  async loginAnonymously(): Promise<UserProfile> {
    try {
      const userCredential = await signInAnonymously(auth!);
      const user = userCredential.user;

      const userProfile = await this.createUserProfile(user, {
        displayName: `익명사용자_${user.uid.substring(0, 8)}`,
      });

      return userProfile;
    } catch (error) {
      console.error("Anonymous login error:", error);
      throw this.handleAuthError(error as AuthError);
    }
  }

  // 로그아웃
  async logout(): Promise<void> {
    try {
      await signOut(auth!);
    } catch (error) {
      console.error("Logout error:", error);
      throw new Error("로그아웃에 실패했습니다.");
    }
  }

  // 사용자 프로필 생성
  private async createUserProfile(
    user: User,
    additionalData?: Partial<UserProfile>
  ): Promise<UserProfile> {
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      isAnonymous: user.isAnonymous,
      createdAt: new Date(),
      updatedAt: new Date(),
      nickname: additionalData?.displayName || user.displayName || undefined,
      bio: "",
      favoriteGenres: [],
      favoriteActors: [],
      favoriteDirectors: [],
      stats: {
        postsCount: 0,
        reviewsCount: 0,
        discussionsCount: 0,
        emotionsCount: 0,
        likesReceived: 0,
        commentsReceived: 0,
      },
      preferences: {
        notifications: {
          comments: true,
          likes: true,
          mentions: true,
          newPosts: false,
        },
        privacy: {
          showEmail: false,
          showStats: true,
        },
      },
      ...additionalData,
    };

    await setDoc(doc(db, "users", user.uid), {
      ...userProfile,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return userProfile;
  }

  // 사용자 프로필 조회
  async getUserProfile(uid: string): Promise<UserProfile | null> {
    try {
      const docSnap = await getDoc(doc(db, "users", uid));
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as UserProfile;
      }
      return null;
    } catch (error) {
      console.error("Get user profile error:", error);
      return null;
    }
  }

  // 사용자 프로필 업데이트
  async updateUserProfile(
    uid: string,
    updates: Partial<UserProfile>
  ): Promise<void> {
    try {
      await updateDoc(doc(db, "users", uid), {
        ...updates,
        updatedAt: serverTimestamp(),
      });

      // Firebase Auth 프로필도 업데이트
      if (auth!.currentUser && (updates.displayName || updates.photoURL)) {
        await updateProfile(auth!.currentUser, {
          displayName: updates.displayName || auth!.currentUser.displayName,
          photoURL: updates.photoURL || auth!.currentUser.photoURL,
        });
      }
    } catch (error) {
      console.error("Update profile error:", error);
      throw new Error("프로필 업데이트에 실패했습니다.");
    }
  }

  // 프로필 이미지 업로드
  async uploadProfileImage(uid: string, file: File): Promise<string> {
    try {
      const imageRef = ref(
        storage,
        `profile-images/${uid}/${Date.now()}_${file.name}`
      );
      const snapshot = await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // 프로필 업데이트
      await this.updateUserProfile(uid, { photoURL: downloadURL });

      return downloadURL;
    } catch (error) {
      console.error("Upload profile image error:", error);
      throw new Error("프로필 이미지 업로드에 실패했습니다.");
    }
  }

  // 비밀번호 변경
  async changePassword(newPassword: string): Promise<void> {
    try {
      if (!auth!.currentUser) {
        throw new Error("로그인이 필요합니다.");
      }

      if (newPassword.length < 6) {
        throw new Error("비밀번호는 최소 6자 이상이어야 합니다.");
      }

      await updatePassword(auth!.currentUser, newPassword);
    } catch (error) {
      console.error("Change password error:", error);
      throw this.handleAuthError(error as AuthError);
    }
  }

  // 이메일 변경
  async changeEmail(newEmail: string): Promise<void> {
    try {
      if (!auth!.currentUser) {
        throw new Error("로그인이 필요합니다.");
      }

      await updateEmail(auth!.currentUser, newEmail);
      await this.updateUserProfile(auth!.currentUser.uid, { email: newEmail });
    } catch (error) {
      console.error("Change email error:", error);
      throw this.handleAuthError(error as AuthError);
    }
  }

  // 계정 삭제
  async deleteAccount(): Promise<void> {
    try {
      if (!auth!.currentUser) {
        throw new Error("로그인이 필요합니다.");
      }

      const uid = auth!.currentUser.uid;

      // Firestore에서 사용자 데이터 삭제
      await deleteDoc(doc(db, "users", uid));

      // 프로필 이미지가 있다면 삭제
      const userProfile = await this.getUserProfile(uid);
      if (userProfile?.photoURL) {
        try {
          const imageRef = ref(storage, userProfile.photoURL);
          await deleteObject(imageRef);
        } catch (error) {
          console.log("Profile image deletion failed:", error);
        }
      }

      // Firebase Auth에서 계정 삭제
      await deleteUser(auth!.currentUser);
    } catch (error) {
      console.error("Delete account error:", error);
      throw this.handleAuthError(error as AuthError);
    }
  }

  // 인증 상태 변경 리스너
  onAuthStateChanged(callback: (user: UserProfile | null) => void) {
    return onAuthStateChanged(auth!, async (user) => {
      if (user) {
        const userProfile = await this.getUserProfile(user.uid);
        callback(userProfile);
      } else {
        callback(null);
      }
    });
  }

  // 현재 사용자 정보 가져오기
  getCurrentUser(): User | null {
    return auth!.currentUser;
  }

  // 에러 처리
  private handleAuthError(error: AuthError): Error {
    switch (error.code) {
      case "auth/user-not-found":
        return new Error("등록되지 않은 이메일입니다.");
      case "auth/wrong-password":
        return new Error("비밀번호가 올바르지 않습니다.");
      case "auth/email-already-in-use":
        return new Error("이미 사용 중인 이메일입니다.");
      case "auth/weak-password":
        return new Error("비밀번호가 너무 약합니다.");
      case "auth/invalid-email":
        return new Error("올바르지 않은 이메일 형식입니다.");
      case "auth/too-many-requests":
        return new Error(
          "너무 많은 시도를 했습니다. 잠시 후 다시 시도해주세요."
        );
      case "auth/network-request-failed":
        return new Error("네트워크 오류가 발생했습니다.");
      case "auth/popup-closed-by-user":
        return new Error("로그인 창이 닫혔습니다.");
      default:
        return new Error(error.message || "인증 오류가 발생했습니다.");
    }
  }
}

export const authService = new AuthService();
