"use client";

import React, { useState } from "react";
import Image from "next/image";
import MyLayout from "@/components/my/MyLayout";
import { Category } from "@/components/common/model/types";
import { defaultCategories } from "@/components/common/model/data/categories";

export default function MyCatPage() {
  const [categories, setCategories] = useState<Category[]>(defaultCategories);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    isPublic: true,
  });

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleCreateCategory = () => {
    if (!newCategory.name) return;

    const category: Category = {
      id: categories.length + 1,
      name: newCategory.name,
      description: newCategory.description,
      movieCount: 0,
      isPublic: newCategory.isPublic,
      createdDate: new Date().toISOString().split("T")[0].replace(/-/g, "."),
      movies: [],
    };

    setCategories([...categories, category]);
    setNewCategory({ name: "", description: "", isPublic: true });
    setShowCreateModal(false);
  };

  const deleteCategory = (id: number) => {
    if (confirm("정말로 이 카테고리를 삭제하시겠습니까?")) {
      setCategories(categories.filter((cat) => cat.id !== id));
    }
  };

  const togglePublic = (id: number) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id ? { ...cat, isPublic: !cat.isPublic } : cat
      )
    );
  };

  return (
    <MyLayout>
      <div className="w-full max-w-4xl mx-auto px-4 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-white">나의 카테고리</h1>
            <span className="bg-[#404400] text-[#e6ff4d] text-sm font-medium px-2.5 py-0.5 rounded">
              {categories.length}개
            </span>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-[#ccff00] hover:bg-[#b8e600] text-black rounded-lg transition-colors flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            새 카테고리
          </button>
        </div>

        {/* Category List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-gray-800 rounded-lg shadow-sm overflow-hidden"
            >
              {/* Category Header */}
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-white mr-3">
                        {category.name}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          category.isPublic
                            ? "bg-green-900 text-green-300"
                            : "bg-gray-900 text-gray-300"
                        }`}
                      >
                        {category.isPublic ? "공개" : "비공개"}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">
                      {category.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <span>영화 {category.movieCount}편</span>
                      <span>생성일: {category.createdDate}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => togglePublic(category.id)}
                      className="p-2 text-gray-400 hover:text-gray-300 rounded-lg hover:bg-gray-700"
                      title={
                        category.isPublic ? "비공개로 변경" : "공개로 변경"
                      }
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {category.isPublic ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        ) : (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                          />
                        )}
                      </svg>
                    </button>

                    <button
                      onClick={() =>
                        setSelectedCategory(
                          selectedCategory === category.id ? null : category.id
                        )
                      }
                      className="p-2 text-gray-400 hover:text-gray-300 rounded-lg hover:bg-gray-700"
                      title="편집"
                    >
                      <svg
                        className="w-5 h-5"
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
                    </button>

                    <button
                      onClick={() => deleteCategory(category.id)}
                      className="p-2 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                      title="삭제"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Movie Preview */}
              <div className="p-4">
                {category.movies.length > 0 ? (
                  <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                    {category.movies.map((movie) => (
                      <div key={movie.id} className="aspect-[2/3]">
                        <Image
                          src={movie.poster}
                          alt={movie.title}
                          width={64}
                          height={96}
                          className="w-full h-full object-cover rounded shadow-sm"
                        />
                      </div>
                    ))}
                    {/* Show remaining count if there are more movies than displayed */}
                    {category.movieCount > category.movies.length && (
                      <div className="aspect-[2/3] bg-gray-700 rounded flex items-center justify-center">
                        <span className="text-gray-400 text-xs text-center">
                          +{category.movieCount - category.movies.length}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <svg
                      className="w-12 h-12 text-gray-400 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1l-.867 10.142A2 2 0 0118.138 18H5.862a2 2 0 01-1.995-1.858L3 6H2a1 1 0 110-2h4zM7 6v10h10V6H7z"
                      />
                    </svg>
                    <p className="text-gray-400 text-sm">
                      아직 영화가 없습니다
                    </p>
                    <button className="mt-2 text-[#ccff00] hover:text-[#b8e600] text-sm font-medium">
                      영화 추가하기
                    </button>
                  </div>
                )}
              </div>

              {/* Expanded Actions */}
              {selectedCategory === category.id && (
                <div className="border-t border-gray-700 p-4 bg-gray-700">
                  <div className="flex space-x-3">
                    <button className="flex-1 px-3 py-2 text-sm border border-gray-600 text-gray-300 rounded hover:bg-gray-600 transition-colors">
                      영화 추가
                    </button>
                    <button className="flex-1 px-3 py-2 text-sm border border-gray-600 text-gray-300 rounded hover:bg-gray-600 transition-colors">
                      순서 변경
                    </button>
                    <button className="flex-1 px-3 py-2 text-sm bg-[#ccff00] hover:bg-[#b8e600] text-black rounded transition-colors">
                      전체보기
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {categories.length === 0 && (
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
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <h3 className="text-lg font-medium text-white mb-2">
              아직 카테고리가 없습니다
            </h3>
            <p className="text-gray-400 mb-4">
              나만의 영화 컬렉션을 만들어보세요.
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-[#ccff00] hover:bg-[#b8e600] text-black rounded-lg transition-colors"
            >
              첫 번째 카테고리 만들기
            </button>
          </div>
        )}

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold text-white mb-4">
                새 카테고리 만들기
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    카테고리 이름 *
                  </label>
                  <input
                    type="text"
                    value={newCategory.name}
                    onChange={(e) =>
                      setNewCategory({ ...newCategory, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#ccff00]"
                    placeholder="예: 내가 좋아하는 액션 영화"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    설명
                  </label>
                  <textarea
                    value={newCategory.description}
                    onChange={(e) =>
                      setNewCategory({
                        ...newCategory,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#ccff00]"
                    placeholder="이 카테고리에 대한 간단한 설명"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newCategory.isPublic}
                    onChange={(e) =>
                      setNewCategory({
                        ...newCategory,
                        isPublic: e.target.checked,
                      })
                    }
                    className="mr-2"
                  />
                  <label className="text-sm text-gray-300">
                    다른 사용자에게 공개
                  </label>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewCategory({
                      name: "",
                      description: "",
                      isPublic: true,
                    });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleCreateCategory}
                  disabled={!newCategory.name}
                  className="flex-1 px-4 py-2 bg-[#ccff00] hover:bg-[#b8e600] disabled:bg-gray-600 text-black rounded-lg transition-colors"
                >
                  만들기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MyLayout>
  );
}
