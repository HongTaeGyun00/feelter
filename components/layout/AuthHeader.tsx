"use client";

import { useState } from "react";
import { useAuthStore } from "@/lib/stores/authStore";
import LoginModal from "../auth/LoginModal";
import UserProfile from "../auth/UserProfile";

export default function AuthHeader() {
  const { user, isAuthenticated } = useAuthStore();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  if (isAuthenticated && user) {
    return (
      <>
        <div className="flex items-center gap-4">
          {/* User Avatar */}
          <button
            onClick={() => setIsProfileOpen(true)}
            className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 
                       hover:bg-white/20 transition-all duration-300 group"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm overflow-hidden"
              style={{
                background: user.photoURL
                  ? `url(${user.photoURL}) center/cover`
                  : "linear-gradient(135deg, #CCFF00 0%, #99CC00 100%)",
                color: user.photoURL ? "transparent" : "#111111",
              }}
            >
              {!user.photoURL &&
                (user.displayName?.[0] || user.email?.[0] || "?")}
            </div>

            <div className="hidden md:block text-left">
              <div className="text-white font-medium text-sm">
                {user.nickname || user.displayName || "사용자"}
              </div>
              {user.isAnonymous && (
                <div className="text-gray-400 text-xs">게스트</div>
              )}
            </div>

            <svg
              className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        <UserProfile
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
        />
      </>
    );
  }

  return (
    <>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsLoginModalOpen(true)}
          className="px-6 py-2 text-gray-300 hover:text-white font-medium 
                     transition-colors duration-300"
        >
          로그인
        </button>

        <button
          onClick={() => setIsLoginModalOpen(true)}
          className="px-6 py-2 rounded-lg font-medium text-black
                     hover:shadow-lg transition-all duration-300"
          style={{
            backgroundColor: "#CCFF00",
            boxShadow: "0 2px 10px rgba(204, 255, 0, 0.3)",
          }}
        >
          회원가입
        </button>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}
