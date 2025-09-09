"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import MyLayout from "@/components/my/MyLayout";

export default function MyPage() {
  const [user, setUser] = useState({
    profileImage: "/api/placeholder/120/120",
    nickname: "영화매니아",
    joinDate: "2024.01.15",
    points: 2450,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedProfile = localStorage.getItem("userProfile");
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        setUser((prev) => ({
          ...prev,
          profileImage: profile.profileImage,
          nickname: profile.nickname,
        }));
      }
    }
  }, []);

  const [watchHistory] = useState([
    {
      id: 1,
      title: "인터스텔라",
      poster: "/among-us-poster.png",
      watchDate: "2024.08.10",
      rating: 4.5,
    },
    {
      id: 2,
      title: "기생충",
      poster: "/among-us-poster.png",
      watchDate: "2024.08.08",
      rating: 5.0,
    },
    {
      id: 3,
      title: "타이타닉",
      poster: "/among-us-poster.png",
      watchDate: "2024.08.05",
      rating: 4.0,
    },
  ]);

  const [favorites] = useState([
    {
      id: 1,
      title: "인셉션",
      poster: "/among-us-poster.png",
      year: 2010,
      genre: "SF/스릴러",
    },
    {
      id: 2,
      title: "라라랜드",
      poster: "/among-us-poster.png",
      year: 2016,
      genre: "뮤지컬/로맨스",
    },
    {
      id: 3,
      title: "어벤져스",
      poster: "/among-us-poster.png",
      year: 2012,
      genre: "액션/어드벤처",
    },
  ]);

  return (
    <MyLayout>
      <div className="w-full max-w-4xl mx-auto px-4 pb-8">
        {/* Profile Section */}
        <div
          className="bg-neutral-900 rounded-lg 
            inset-shadow-xs inset-shadow-white/30
            shadow-xs shadow-white/30 p-6 mb-4"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            {/* Profile Image */}
            <div>
              <Image
                src={user.profileImage}
                alt="프로필 이미지"
                width={96}
                height={96}
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
              />
            </div>

            {/* Profile Info */}
            <div className="text-center md:text-left flex-1">
              <h1 className="text-2xl font-bold text-white mb-2">
                {user.nickname}
              </h1>
              <p className="text-gray-400 mb-4">가입일: {user.joinDate}</p>
              <Link
                href="/my/profile"
                className="inline-flex items-center px-4 py-2 bg-[#DDE66E] hover:bg-[#b8e600] text-black rounded-lg transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                프로필 편집
              </Link>
            </div>
          </div>
        </div>

        {/* Points Section */}
        <div
          className="bg-neutral-900 rounded-lg
            inset-shadow-xs inset-shadow-white/30 shadow-xs shadow-white/30 p-6 mb-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">
                내 포인트
              </h2>
              <p className="text-3xl font-bold text-[#b8e600]">
                {user.points.toLocaleString()} P
              </p>
            </div>
            <div className="flex space-x-3">
              <Link
                href="/my/points"
                className="px-4 py-2 bg-neutral-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors"
              >
                포인트 내역
              </Link>
              <button className="px-4 py-2 bg-[#DDE66E] hover:bg-[#b8e600] text-black rounded-lg transition-colors">
                포인트 사용
              </button>
            </div>
          </div>
        </div>

        {/* Grid Layout for History and Favorites */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Watch History */}
          <div
            className="bg-neutral-900 rounded-lg 
              inset-shadow-xs inset-shadow-white/30
              shadow-xs shadow-white/30 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                최근 시청 이력
              </h2>
              <Link
                href="/my/history"
                className="text-[#DDE66E] hover:text-[#b8e600] text-sm font-medium"
              >
                전체보기
              </Link>
            </div>
            <div className="space-y-4">
              {watchHistory.map((movie) => (
                <div
                  key={movie.id}
                  className="flex items-center space-x-4 p-3 hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    width={48}
                    height={72}
                    className="w-12 h-18 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{movie.title}</h3>
                    <p className="text-sm text-gray-400">{movie.watchDate}</p>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < movie.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Favorites */}
          <div
            className="bg-neutral-900 rounded-lg
            inset-shadow-xs inset-shadow-white/30
            shadow-xs shadow-white/30 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">즐겨찾기</h2>
              <Link
                href="/my/favorites"
                className="text-[#DDE66E] hover:text-[#b8e600] text-sm font-medium"
              >
                전체보기
              </Link>
            </div>
            <div className="space-y-4">
              {favorites.map((movie) => (
                <div
                  key={movie.id}
                  className="flex items-center space-x-4 p-3 hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    width={48}
                    height={72}
                    className="w-12 h-18 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{movie.title}</h3>
                    <p className="text-sm text-gray-400">
                      {movie.year} • {movie.genre}
                    </p>
                  </div>
                  <button className="text-red-500 hover:text-red-600 transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MyLayout>
  );
}
