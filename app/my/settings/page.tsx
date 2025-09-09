"use client";

import { useState } from "react";
import MyLayout from "@/components/my/MyLayout";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      movieRecommendations: true,
      reviewComments: true,
      newReleases: false,
    },
    privacy: {
      profileVisibility: "public",
      showWatchHistory: false,
      showFavorites: true,
      allowRecommendations: true,
    },
    display: {
      theme: "system",
      language: "ko",
    },
  });

  const updateSetting = (
    category: string,
    key: string,
    value: string | boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }));
  };

  return (
    <MyLayout>
      <div className="w-full max-w-4xl mx-auto px-4 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-white">설정</h1>
          </div>
        </div>

        <div className="space-y-8">
          {/* Notifications Settings */}
          <div className="bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-white mb-6">알림 설정</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-white">
                    이메일 알림
                  </h3>
                  <p className="text-sm text-gray-400">
                    새로운 소식을 이메일로 받아보세요
                  </p>
                </div>
                <button
                  onClick={() =>
                    updateSetting(
                      "notifications",
                      "email",
                      !settings.notifications.email
                    )
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.notifications.email
                      ? "bg-[#ccff00]"
                      : "bg-gray-700"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.notifications.email
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-white">푸시 알림</h3>
                  <p className="text-sm text-gray-400">
                    실시간 푸시 알림을 받아보세요
                  </p>
                </div>
                <button
                  onClick={() =>
                    updateSetting(
                      "notifications",
                      "push",
                      !settings.notifications.push
                    )
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.notifications.push ? "bg-[#ccff00]" : "bg-gray-700"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.notifications.push
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-white">영화 추천</h3>
                  <p className="text-sm text-gray-400">
                    맞춤형 영화 추천을 받아보세요
                  </p>
                </div>
                <button
                  onClick={() =>
                    updateSetting(
                      "notifications",
                      "movieRecommendations",
                      !settings.notifications.movieRecommendations
                    )
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.notifications.movieRecommendations
                      ? "bg-[#ccff00]"
                      : "bg-gray-700"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.notifications.movieRecommendations
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-white">리뷰 댓글</h3>
                  <p className="text-sm text-gray-400">
                    내 리뷰에 댓글이 달릴 때 알림을 받습니다
                  </p>
                </div>
                <button
                  onClick={() =>
                    updateSetting(
                      "notifications",
                      "reviewComments",
                      !settings.notifications.reviewComments
                    )
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.notifications.reviewComments
                      ? "bg-[#ccff00]"
                      : "bg-gray-700"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.notifications.reviewComments
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-white">신작 영화</h3>
                  <p className="text-sm text-gray-400">
                    새로운 영화 출시 소식을 받아보세요
                  </p>
                </div>
                <button
                  onClick={() =>
                    updateSetting(
                      "notifications",
                      "newReleases",
                      !settings.notifications.newReleases
                    )
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.notifications.newReleases
                      ? "bg-[#ccff00]"
                      : "bg-gray-700"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.notifications.newReleases
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-white mb-6">
              개인정보 설정
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  프로필 공개 범위
                </label>
                <select
                  value={settings.privacy.profileVisibility}
                  onChange={(e) =>
                    updateSetting(
                      "privacy",
                      "profileVisibility",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
                >
                  <option value="public">전체 공개</option>
                  <option value="friends">친구만</option>
                  <option value="private">비공개</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-white">
                    시청 이력 공개
                  </h3>
                  <p className="text-sm text-gray-400">
                    다른 사용자가 내 시청 이력을 볼 수 있습니다
                  </p>
                </div>
                <button
                  onClick={() =>
                    updateSetting(
                      "privacy",
                      "showWatchHistory",
                      !settings.privacy.showWatchHistory
                    )
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.privacy.showWatchHistory
                      ? "bg-[#ccff00]"
                      : "bg-gray-700"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.privacy.showWatchHistory
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-white">
                    즐겨찾기 공개
                  </h3>
                  <p className="text-sm text-gray-400">
                    다른 사용자가 내 즐겨찾기 목록을 볼 수 있습니다
                  </p>
                </div>
                <button
                  onClick={() =>
                    updateSetting(
                      "privacy",
                      "showFavorites",
                      !settings.privacy.showFavorites
                    )
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.privacy.showFavorites
                      ? "bg-[#ccff00]"
                      : "bg-gray-700"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.privacy.showFavorites
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-white">추천 허용</h3>
                  <p className="text-sm text-gray-400">
                    시청 기록을 기반으로 맞춤형 추천을 받습니다
                  </p>
                </div>
                <button
                  onClick={() =>
                    updateSetting(
                      "privacy",
                      "allowRecommendations",
                      !settings.privacy.allowRecommendations
                    )
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.privacy.allowRecommendations
                      ? "bg-[#ccff00]"
                      : "bg-gray-700"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.privacy.allowRecommendations
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Display Settings */}
          <div className="bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-white mb-6">화면 설정</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  테마 설정
                </label>
                <select
                  value={settings.display.theme}
                  onChange={(e) =>
                    updateSetting("display", "theme", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
                >
                  <option value="system">시스템 설정 따르기</option>
                  <option value="light">밝은 테마</option>
                  <option value="dark">어두운 테마</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  언어 설정
                </label>
                <select
                  value={settings.display.language}
                  onChange={(e) =>
                    updateSetting("display", "language", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
                >
                  <option value="ko">한국어</option>
                  <option value="en">English</option>
                  <option value="ja">日本語</option>
                </select>
              </div>
            </div>
          </div>

          {/* Account Management */}
          <div className="bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-white mb-6">계정 관리</h2>

            <div className="space-y-4">
              <button className="w-full text-left px-4 py-3 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-white">
                      비밀번호 변경
                    </h3>
                    <p className="text-sm text-gray-400">
                      계정 보안을 위해 주기적으로 변경해주세요
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>

              <button className="w-full text-left px-4 py-3 border border-red-600 rounded-lg hover:bg-red-900/20 transition-colors text-red-400">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">계정 탈퇴하기</h3>
                    <p className="text-sm opacity-75">
                      계정과 모든 데이터를 삭제합니다
                    </p>
                  </div>
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
                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636A9 9 0 015.636 18.364"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </MyLayout>
  );
}
