"use client";

import { useState, useRef } from "react";
import { useAuthStore } from "@/lib/stores/authStore";

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserProfile({ isOpen, onClose }: UserProfileProps) {
  const {
    user,
    loading,
    error,
    updateProfile,
    uploadProfileImage,
    logout,
    clearError,
  } = useAuthStore();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    nickname: user?.nickname || "",
    bio: user?.bio || "",
    favoriteGenres: user?.favoriteGenres || [],
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    clearError();
  };

  const handleGenreToggle = (genre: string) => {
    setFormData((prev) => ({
      ...prev,
      favoriteGenres: prev.favoriteGenres.includes(genre)
        ? prev.favoriteGenres.filter((g) => g !== genre)
        : [...prev.favoriteGenres, genre],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      // 에러는 store에서 처리됨
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 크기 체크 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("파일 크기는 5MB 이하여야 합니다.");
      return;
    }

    try {
      await uploadProfileImage(file);
    } catch (error) {
      // 에러는 store에서 처리됨
    }
  };

  const handleLogout = async () => {
    if (confirm("정말 로그아웃하시겠습니까?")) {
      try {
        await logout();
        onClose();
      } catch (error) {
        // 에러는 store에서 처리됨
      }
    }
  };

  if (!isOpen || !user) return null;

  const genres = [
    "액션",
    "드라마",
    "코미디",
    "로맨스",
    "스릴러",
    "SF",
    "공포",
    "애니메이션",
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 backdrop-blur-lg border border-white/20 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-sm">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-white/20 
                     rounded-full flex items-center justify-center text-gray-400 hover:text-white"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2" style={{ color: "#CCFF00" }}>
            {isEditing ? "프로필 편집" : "내 프로필"}
          </h2>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Profile Image */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div
              className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl overflow-hidden"
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

            {isEditing && (
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={loading}
                className="absolute bottom-0 right-0 w-8 h-8 bg-yellow-500 hover:bg-yellow-600 
                          text-black rounded-full flex items-center justify-center text-sm
                          transition-colors duration-300 disabled:opacity-50"
              >
                📷
              </button>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

          {!isEditing && (
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                {user.nickname || user.displayName || "사용자"}
              </h3>
              {user.isAnonymous && (
                <span className="inline-block px-3 py-1 bg-gray-600 text-gray-300 text-sm rounded-full">
                  게스트 사용자
                </span>
              )}
            </div>
          )}
        </div>

        {/* Profile Content */}
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                표시 이름
              </label>
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg
                          text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500
                          transition-colors duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                닉네임
              </label>
              <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg
                          text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500
                          transition-colors duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                자기소개
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg
                          text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500
                          transition-colors duration-300 resize-none"
                placeholder="자신을 소개해주세요"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                선호 장르
              </label>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => handleGenreToggle(genre)}
                    className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                      formData.favoriteGenres.includes(genre)
                        ? "text-black"
                        : "text-gray-300 hover:text-white hover:bg-white/20"
                    }`}
                    style={{
                      backgroundColor: formData.favoriteGenres.includes(genre)
                        ? "#CCFF00"
                        : "rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 px-4 font-bold text-black rounded-lg
                          hover:shadow-lg transition-all duration-300
                          disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: "#CCFF00",
                  boxShadow: "0 4px 20px rgba(204, 255, 0, 0.3)",
                }}
              >
                {loading ? "저장 중..." : "저장"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    displayName: user?.displayName || "",
                    nickname: user?.nickname || "",
                    bio: user?.bio || "",
                    favoriteGenres: user?.favoriteGenres || [],
                  });
                  clearError();
                }}
                className="flex-1 py-3 px-4 bg-white/10 hover:bg-white/20 text-white 
                          font-bold rounded-lg transition-all duration-300"
              >
                취소
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            {/* User Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-bold mb-2" style={{ color: "#CCFF00" }}>
                  기본 정보
                </h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-400">이메일: </span>
                    <span className="text-white">
                      {user.email || "설정되지 않음"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">가입일: </span>
                    <span className="text-white">
                      {user.createdAt.toLocaleDateString("ko-KR")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-bold mb-2" style={{ color: "#CCFF00" }}>
                  활동 통계
                </h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-400">작성 게시글: </span>
                    <span className="text-white">
                      {user.stats?.postsCount || 0}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">받은 좋아요: </span>
                    <span className="text-white">
                      {user.stats?.likesReceived || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            {user.bio && (
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-bold mb-2" style={{ color: "#CCFF00" }}>
                  자기소개
                </h4>
                <p className="text-gray-300">{user.bio}</p>
              </div>
            )}

            {/* Favorite Genres */}
            {user.favoriteGenres && user.favoriteGenres.length > 0 && (
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-bold mb-3" style={{ color: "#CCFF00" }}>
                  선호 장르
                </h4>
                <div className="flex flex-wrap gap-2">
                  {user.favoriteGenres.map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 rounded-full text-sm text-black"
                      style={{ backgroundColor: "#CCFF00" }}
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => setIsEditing(true)}
                className="w-full py-3 px-4 font-bold text-black rounded-lg
                          hover:shadow-lg transition-all duration-300"
                style={{
                  backgroundColor: "#CCFF00",
                  boxShadow: "0 4px 20px rgba(204, 255, 0, 0.3)",
                }}
              >
                프로필 편집
              </button>

              <button
                onClick={handleLogout}
                className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white 
                          font-bold rounded-lg transition-all duration-300"
              >
                로그아웃
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
