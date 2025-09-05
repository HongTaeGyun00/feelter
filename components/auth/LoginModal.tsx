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
      <div className="bg-gray-800 backdrop-blur-lg border border-white/20 rounded-3xl p-8 max-w-md w-full shadow-sm">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-white/20 
                     rounded-full flex items-center justify-center text-gray-400 hover:text-white"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2" style={{ color: "#CCFF00" }}>
            {mode === "login" ? "로그인" : "