"use client";

import { useState } from "react";
import Image from "next/image";
import MyLayout from "@/components/my/MyLayout";
import { Movie } from "@/components/common/model/types";
import { movies } from "@/components/common/model/data/movies";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Movie[]>(
    movies.filter((movie) => movie.addedDate)
  );

  const [sortBy, setSortBy] = useState("recent");
  const [viewMode, setViewMode] = useState("grid");

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter((movie) => movie.id !== id));
  };

  const sortedFavorites = [...favorites].sort((a, b) => {
    if (sortBy === "recent")
      return (
        new Date(b.addedDate || "").getTime() -
        new Date(a.addedDate || "").getTime()
      );
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "title") return a.title.localeCompare(b.title);
    if (sortBy === "year") return (b.year || 0) - (a.year || 0);
    return 0;
  });

  return (
    <MyLayout>
      <div className="w-full max-w-4xl mx-auto px-4 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-white">즐겨찾기</h1>
            <span className="bg-[#404400] text-[#e6ff4d] text-sm font-medium px-2.5 py-0.5 rounded">
              {favorites.length}편
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white text-sm"
            >
              <option value="recent">최근 추가</option>
              <option value="rating">평점순</option>
              <option value="title">제목순</option>
              <option value="year">연도순</option>
            </select>

            <div className="flex border border-gray-600 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2 text-sm ${
                  viewMode === "grid"
                    ? "bg-[#ccff00] text-black"
                    : "bg-gray-800 text-gray-300"
                }`}
              >
                격자
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-2 text-sm ${
                  viewMode === "list"
                    ? "bg-[#ccff00] text-black"
                    : "bg-gray-800 text-gray-300"
                }`}
              >
                목록
              </button>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {favorites.length === 0 && (
          <div className="text-center py-16">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <h3 className="text-lg font-medium text-white mb-2">
              즐겨찾기가 없습니다
            </h3>
            <p className="text-gray-400">좋아하는 영화를 추가해보세요.</p>
          </div>
        )}

        {/* Grid View */}
        {viewMode === "grid" && favorites.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {sortedFavorites.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-800 rounded-lg shadow-sm overflow-hidden group hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    width={200}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={() => removeFavorite(movie.id)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-1 truncate">
                    {movie.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    {movie.year || "연도 미상"} • {movie.genre}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-yellow-400 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm text-gray-400">
                        {movie.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === "list" && favorites.length > 0 && (
          <div className="bg-gray-800 rounded-lg shadow-sm">
            <div className="divide-y divide-gray-700">
              {sortedFavorites.map((movie) => (
                <div
                  key={movie.id}
                  className="p-6 hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <Image
                      src={movie.poster}
                      alt={movie.title}
                      width={64}
                      height={96}
                      className="w-16 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {movie.title}
                      </h3>
                      <p className="text-gray-400 mb-1">
                        감독: {movie.director} • {movie.year || "연도 미상"}
                      </p>
                      <p className="text-gray-400 mb-2">장르: {movie.genre}</p>
                      <p className="text-sm text-gray-500">
                        추가일: {movie.addedDate}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center mb-2">
                        <svg
                          className="w-5 h-5 text-yellow-400 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-white font-medium">
                          {movie.rating}
                        </span>
                      </div>
                      <button
                        onClick={() => removeFavorite(movie.id)}
                        className="px-3 py-1 text-sm text-red-600 hover:text-red-700 border border-red-300 hover:border-red-400 rounded transition-colors"
                      >
                        삭제
                      </button>
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
