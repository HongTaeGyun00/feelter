"use client";

import { useState } from "react";
import Image from "next/image";
import MyLayout from "@/components/my/MyLayout";
import { Movie } from "@/components/common/model/types";
import { movies } from "@/components/common/model/data/movies";

export default function HistoryPage() {
  const [viewMode, setViewMode] = useState("grid");
  const [filter, setFilter] = useState("all");
  const [watchHistory] = useState<Movie[]>(
    movies.filter((movie) => movie.watchDate)
  );

  const filteredHistory = watchHistory.filter((movie) => {
    if (filter === "all") return true;
    if (filter === "recent") return true;
    if (filter === "high-rated") return movie.rating >= 4.5;
    return true;
  });

  return (
    <MyLayout>
      <div className="w-full max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-white">시청 이력</h1>
          </div>

          {/* Filter Options */}
          {/* Controls */}
          <div className="flex items-center space-x-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-white text-center text-sm"
            >
              <option value="all">전체</option>
              <option value="recent">최근 시청</option>
              <option value="high-rated">높은 평점</option>
            </select>

            <div className="flex overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1 border-r border-gray-200 text-sm ${
                  viewMode === "grid"
                    ? "text-white"
                    : "text-neutral-400 text-xs"
                }`}
              >
                격자
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-1 text-sm ${
                  viewMode === "list"
                    ? "text-white"
                    : "text-neutral-400 text-xs"
                }`}
              >
                목록
              </button>
            </div>

            <button className="px-4 py-2 bg-rose-800 text-sm text-neutral-300 hover:bg-rose-600 hover:text-white rounded-lg transition-colors">
              전체 삭제
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">
          <div
            className="bg-neutral-900 rounded-lg 
            inset-shadow-xs inset-shadow-white/30
            shadow-xs shadow-white/30 p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-2">
              총 시청 영화
            </h3>
            <p className="text-3xl font-bold text-[#ccff00]">
              {watchHistory.length}편
            </p>
          </div>
          <div
            className="bg-neutral-900 rounded-lg 
            inset-shadow-xs inset-shadow-white/30
            shadow-xs shadow-white/30 p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-2">평균 평점</h3>
            <p className="text-3xl font-bold text-yellow-500">
              {(
                watchHistory.reduce((sum, movie) => sum + movie.rating, 0) /
                watchHistory.length
              ).toFixed(1)}
            </p>
          </div>
          <div
            className="bg-neutral-900 rounded-lg 
            inset-shadow-xs inset-shadow-white/30
            shadow-xs shadow-white/30 p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-2">
              이번 달 시청
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {watchHistory.length}편
            </p>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {filteredHistory.map((movie) => (
              <div
                key={movie.id}
                className="group bg-neutral-900 rounded-lg 
            inset-shadow-xs inset-shadow-white/30
            shadow-xs shadow-white/30 overflow-hidden border-0 outline-none"
              >
                <div className="relative w-full aspect-[2/3] overflow-hidden">
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-2 truncate">
                    {movie.title}
                  </h3>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < movie.rating ? "text-yellow-400" : "text-gray-400"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-xs text-gray-400 ml-1">
                      {movie.rating}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">
                    {movie.watchDate}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {movie.genre}
                  </p>
                  <div className="flex space-x-1 mt-3">
                    <button className="flex-1 px-2 py-1 text-xs bg-[#dde66e] hover:bg-[#b8e600] text-black rounded transition-colors">
                      다시보기
                    </button>
                    <button className="px-2 py-1 text-xs border border-gray-600 text-gray-300 rounded hover:bg-gray-700 transition-colors">
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === "list" && (
          <div
            className="bg-neutral-900 rounded-lg 
            inset-shadow-xs inset-shadow-white/30
            shadow-xs shadow-white/30"
          >
            <div className="p-6 border-b border-neutral-700">
              <h2 className="text-xl font-semibold text-white">
                시청 목록 ({filteredHistory.length}편)
              </h2>
            </div>
            <div className="divide-y divide-neutral-700">
              {filteredHistory.map((movie) => (
                <div
                  key={movie.id}
                  className="p-6 hover:bg-neutral-800 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    {/* Movie Poster */}
                    <div className="relative w-24 h-36">
                      <Image
                        src={movie.poster}
                        alt={movie.title}
                        fill
                        className="object-cover rounded-lg"
                        sizes="96px"
                      />
                    </div>

                    {/* Movie Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">
                            {movie.title}
                          </h3>
                          <p className="text-gray-400 mb-1">
                            감독: {movie.director} • {movie.duration}
                          </p>
                          <p className="text-gray-400 mb-3">
                            장르: {movie.genre}
                          </p>
                          <p className="text-sm text-gray-500">
                            시청일: {movie.watchDate}
                          </p>
                        </div>

                        {/* Rating and Actions */}
                        <div className="text-right">
                          <div className="flex items-center mb-3">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-5 h-5 ${
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
                            <span className="ml-2 text-sm text-gray-400">
                              {movie.rating}
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            <button className="px-3 py-1 text-sm bg-[#DDE66E] hover:bg-[#b8e600] text-black rounded transition-colors">
                              다시 보기
                            </button>
                            <button className="px-3 py-1 text-sm border border-gray-600 text-gray-300 rounded hover:bg-gray-700 transition-colors">
                              삭제
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </MyLayout>
  );
}
