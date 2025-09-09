"use client";

import { useState } from "react";
import { useAuthStore } from "@/lib/stores/authStore";
import { LoginCredentials, RegisterCredentials } from "@/lib/types/auth";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const {
    login,
    register,
    loginWithGoogle,
    loginAnonymously,
    loading,
    error,
    clearError,
  } = useAuthStore();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    displayName: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (mode === "login") {
        const credentials: LoginCredentials = {
          email: formData.email,
          password: formData.password,
        };
        await login(credentials);
      } else {
        const credentials: RegisterCredentials = {
          email: formData.email,
          password: formData.password,
          displayName: formData.displayName,
          confirmPassword: formData.confirmPassword,
        };
        await register(credentials);
      }

      onClose();
      resetForm();
    } catch (error) {
      // 에러는 store에서 처리됨
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      onClose();
      resetForm();
    } catch (error) {
      // 에러는 store에서 처리됨
    }
  };

  const handleAnonymousLogin = async () => {
    try {
      await loginAnonymously();
      onClose();
      resetForm();
    } catch (error) {
      // 에러는 store에서 처리됨
    }
  };

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      displayName: "",
      confirmPassword: "",
    });
    clearError();
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 backdrop-blur-lg border border-white/20 rounded-3xl p-8 max-w-md w-full shadow-sm relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-white/20 
                     rounded-full flex items-center justify-center text-gray-400 hover:text-white
                     transition-colors duration-300"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2" style={{ color: "#CCFF00" }}>
            {mode === "login" ? "로그인" : "회원가입"}
          </h2>
          <p className="text-gray-400">
            {mode === "login" ? "계정에 로그인하세요" : "새 계정을 만드세요"}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Social Login Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-3 px-4 bg-white hover:bg-gray-100 text-black 
                       font-bold rounded-lg transition-all duration-300 flex items-center 
                       justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {loading ? "처리 중..." : "Google로 계속"}
          </button>

          <button
            onClick={handleAnonymousLogin}
            disabled={loading}
            className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-white 
                       font-bold rounded-lg transition-all duration-300 
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "처리 중..." : "게스트로 계속"}
          </button>
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-gray-800 text-gray-400">또는</span>
          </div>
        </div>

        {/* Login/Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div>
              <input
                type="text"
                name="displayName"
                placeholder="이름"
                value={formData.displayName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg
                          text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500
                          transition-colors duration-300"
              />
            </div>
          )}

          <div>
            <input
              type="email"
              name="email"
              placeholder="이메일"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg
                        text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500
                        transition-colors duration-300"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={handleInputChange}
              required
              minLength={6}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg
                        text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500
                        transition-colors duration-300"
            />
          </div>

          {mode === "register" && (
            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="비밀번호 확인"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                minLength={6}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg
                          text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500
                          transition-colors duration-300"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 font-bold text-black rounded-lg
                      hover:shadow-lg transition-all duration-300
                      disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: "#CCFF00",
              boxShadow: "0 4px 20px rgba(204, 255, 0, 0.3)",
            }}
          >
            {loading ? "처리 중..." : mode === "login" ? "로그인" : "회원가입"}
          </button>
        </form>

        {/* Mode Toggle */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            {mode === "login"
              ? "계정이 없으신가요?"
              : "이미 계정이 있으신가요?"}{" "}
            <button
              type="button"
              onClick={() => {
                setMode(mode === "login" ? "register" : "login");
                resetForm();
              }}
              className="font-bold transition-colors duration-300 hover:text-white"
              style={{ color: "#CCFF00" }}
            >
              {mode === "login" ? "회원가입" : "로그인"}
            </button>
          </p>
        </div>

        {/* Terms */}
        {mode === "register" && (
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              회원가입시{" "}
              <a href="#" className="text-yellow-400 hover:text-yellow-300">
                이용약관
              </a>{" "}
              및{" "}
              <a href="#" className="text-yellow-400 hover:text-yellow-300">
                개인정보처리방침
              </a>
              에 동의하게 됩니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
