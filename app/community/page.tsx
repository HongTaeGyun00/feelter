"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/authStore";
import CommunityTabs from "@/components/community/CommunityTabs";
import FeedTab from "@/components/community/FeedTab";
import DiscussionTab from "@/components/community/DiscussionTab";
import ReviewTab from "@/components/community/ReviewTab";
import CatsTab from "@/components/community/CatsTab";
import EmotionsTab from "@/components/community/EmotionsTab";
import LoginModal from "@/components/auth/LoginModal";
import AuthHeader from "@/components/layout/AuthHeader";

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("feed");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  const handleCreatePost = () => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }
    router.push("/community/create");
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "feed":
        return <FeedTab onCreatePost={handleCreatePost} />;
      case "discussion":
        return <DiscussionTab onCreatePost={handleCreatePost} />;
      case "review":
        return <ReviewTab onCreatePost={handleCreatePost} />;
      case "cats":
        return isAuthenticated ? (
          <CatsTab />
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🐱</div>
            <h3 className="text-xl font-bold mb-2" style={{ color: "#CCFF00" }}>
              로그인이 필요합니다
            </h3>
            <p className="text-gray-400 mb-6">
              고양이 식구들을 만나려면 로그인해주세요.
            </p>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="px-6 py-3 rounded-lg font-medium hover:shadow-lg 
                         transition-all duration-300"
              style={{
                backgroundColor: "#CCFF00",
                color: "#111111",
                boxShadow: "0 4px 20px rgba(204, 255, 0, 0.3)",
              }}
            >
              로그인하기
            </button>
          </div>
        );
      case "emotions":
        return isAuthenticated ? (
          <EmotionsTab onCreatePost={handleCreatePost} />
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">💙</div>
            <h3 className="text-xl font-bold mb-2" style={{ color: "#CCFF00" }}>
              로그인이 필요합니다
            </h3>
            <p className="text-gray-400 mb-6">
              감정 기록을 보려면 로그인해주세요.
            </p>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="px-6 py-3 rounded-lg font-medium hover:shadow-lg 
                         transition-all duration-300"
              style={{
                backgroundColor: "#CCFF00",
                color: "#111111",
                boxShadow: "0 4px 20px rgba(204, 255, 0, 0.3)",
              }}
            >
              로그인하기
            </button>
          </div>
        );
      default:
        return <FeedTab onCreatePost={handleCreatePost} />;
    }
  };

  return (
    <main
      className="min-h-screen pt-[130px] px-4 lg:px-10"
      style={{ backgroundColor: "#111111" }}
    >
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <h1
              className="text-4xl lg:text-6xl font-bold mb-4"
              style={{ color: "#CCFF00" }}
            >
              커뮤니티
            </h1>
            <p
              className="text-lg lg:text-xl opacity-80"
              style={{ color: "#CCFF00" }}
            >
              함께 이야기하고 공유하는 공간
            </p>
          </div>

          {/* Auth Header */}
          <div className="hidden lg:block">
            <AuthHeader />
          </div>
        </div>

        {/* Mobile Auth Header */}
        <div className="lg:hidden flex justify-center mb-6">
          <AuthHeader />
        </div>

        {/* Welcome Message for Authenticated Users */}
        {isAuthenticated && user && (
          <div className="text-center mb-6">
            <p className="text-gray-300">
              안녕하세요, {user.nickname || user.displayName || "사용자"}님! 🎬
            </p>
          </div>
        )}
      </div>

      {/* Sub Navigation */}
      <div className="max-w-7xl mx-auto">
        <CommunityTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto mt-8">{renderActiveTab()}</div>

      {/* Floating Action Button */}
      <button
        onClick={handleCreatePost}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl z-50 flex items-center justify-center"
        style={{
          backgroundColor: "#CCFF00",
          color: "#111111",
        }}
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </main>
  );
}
