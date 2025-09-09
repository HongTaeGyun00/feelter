"use client";

import { useState } from "react";
import MyLayout from "@/components/my/MyLayout";

export default function PointsPage() {
  const [currentPoints] = useState(2450);

  const [pointHistory] = useState([
    {
      id: 1,
      type: "earn",
      amount: 100,
      description: "영화 리뷰 작성",
      date: "2024.08.10",
      movieTitle: "인터스텔라",
    },
    {
      id: 2,
      type: "earn",
      amount: 50,
      description: "영화 평점 등록",
      date: "2024.08.08",
      movieTitle: "기생충",
    },
    {
      id: 3,
      type: "use",
      amount: -200,
      description: "프리미엄 영화 대여",
      date: "2024.08.07",
      movieTitle: "타이타닉",
    },
    {
      id: 4,
      type: "earn",
      amount: 300,
      description: "설문조사 참여",
      date: "2024.08.05",
      movieTitle: null,
    },
    {
      id: 5,
      type: "use",
      amount: -150,
      description: "할인 쿠폰",
      date: "2024.08.03",
      movieTitle: null,
    },
    {
      id: 6,
      type: "earn",
      amount: 250,
      description: "추천 영화 등록",
      date: "2024.08.01",
      movieTitle: "라라랜드",
    },
  ]);

  const [filter, setFilter] = useState("all");

  const filteredHistory = pointHistory.filter((item) => {
    if (filter === "all") return true;
    if (filter === "earn") return item.type === "earn";
    if (filter === "use") return item.type === "use";
    return true;
  });

  const totalEarned = pointHistory
    .filter((item) => item.type === "earn")
    .reduce((sum, item) => sum + item.amount, 0);
  const totalUsed = pointHistory
    .filter((item) => item.type === "use")
    .reduce((sum, item) => sum + Math.abs(item.amount), 0);

  return (
    <MyLayout>
      <div className="w-full max-w-4xl mx-auto px-4 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-white">포인트 관리</h1>
          </div>
        </div>

        {/* Points Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-[#404400] rounded-lg mr-4">
                <svg
                  className="w-6 h-6 text-[#e6ff4d]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  현재 포인트
                </h3>
                <p className="text-2xl font-bold text-[#ccff00]">
                  {currentPoints.toLocaleString()} P
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-green-900 rounded-lg mr-4">
                <svg
                  className="w-6 h-6 text-green-300"
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
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">총 적립</h3>
                <p className="text-2xl font-bold text-green-600">
                  +{totalEarned.toLocaleString()} P
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-red-900 rounded-lg mr-4">
                <svg
                  className="w-6 h-6 text-red-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 12H4"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">총 사용</h3>
                <p className="text-2xl font-bold text-red-600">
                  -{totalUsed.toLocaleString()} P
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Point Earning Methods */}
        <div className="bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            포인트 적립 방법
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-white">영화 리뷰 작성</h3>
                  <p className="text-sm text-gray-400">
                    상세한 리뷰를 작성하세요
                  </p>
                </div>
                <span className="text-green-600 font-bold">+100P</span>
              </div>
            </div>

            <div className="border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-white">영화 평점 등록</h3>
                  <p className="text-sm text-gray-400">
                    시청한 영화에 평점을 주세요
                  </p>
                </div>
                <span className="text-green-600 font-bold">+50P</span>
              </div>
            </div>

            <div className="border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-white">영화 추천</h3>
                  <p className="text-sm text-gray-400">
                    다른 사용자에게 영화 추천
                  </p>
                </div>
                <span className="text-green-600 font-bold">+250P</span>
              </div>
            </div>

            <div className="border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-white">로그인 보상</h3>
                  <p className="text-sm text-gray-400">
                    매일 로그인하면 적립됩니다
                  </p>
                </div>
                <span className="text-green-600 font-bold">+10P</span>
              </div>
            </div>
          </div>
        </div>

        {/* History Section */}
        <div className="bg-gray-800 rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">포인트 내역</h2>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white text-sm"
              >
                <option value="all">전체</option>
                <option value="earn">적립</option>
                <option value="use">사용</option>
              </select>
            </div>
          </div>

          <div className="divide-y divide-gray-700">
            {filteredHistory.map((item) => (
              <div
                key={item.id}
                className="p-6 hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`p-2 rounded-lg ${
                        item.type === "earn" ? "bg-green-900" : "bg-red-900"
                      }`}
                    >
                      {item.type === "earn" ? (
                        <svg
                          className="w-5 h-5 text-green-300"
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
                      ) : (
                        <svg
                          className="w-5 h-5 text-red-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 12H4"
                          />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-white">
                        {item.description}
                      </h3>
                      {item.movieTitle && (
                        <p className="text-sm text-gray-400">
                          영화: {item.movieTitle}
                        </p>
                      )}
                      <p className="text-sm text-gray-500">{item.date}</p>
                    </div>
                  </div>
                  <div
                    className={`text-lg font-bold ${
                      item.type === "earn" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {item.type === "earn" ? "+" : ""}
                    {item.amount.toLocaleString()} P
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MyLayout>
  );
}
