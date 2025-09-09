"use client";

import { useState } from "react";
import MyLayout from "@/components/my/MyLayout";

export default function SurveyPage() {
  const [currentSurvey] = useState({
    id: 1,
    title: "2024 연말 영화 시청 패턴 조사",
    description:
      "올해 영화 시청 패턴과 선호도를 파악해 더 나은 서비스를 제공하기 위한 설문입니다.",
    reward: 500,
    timeEstimate: "5-7분",
    questions: [
      {
        id: 1,
        type: "multiple",
        question: "가장 자주 시청하는 영화 장르는 무엇인가요?",
        options: [
          "액션",
          "로맨스",
          "코미디",
          "스릴러",
          "범죄",
          "SF",
          "드라마",
          "공포",
          "다큐멘터리",
          "애니",
        ],
        required: true,
      },
      {
        id: 2,
        type: "multiple",
        question:
          "영화 시청에 주로 사용하는 플랫폼을 모두 선택해주세요. (복수 선택 가능)",
        options: [
          "넷플릭스",
          "웨이브",
          "티빙",
          "왓챠",
          "디즈니+",
          "쿠팡플레이",
          "영화관",
          "기타",
        ],
        required: true,
      },
      {
        id: 3,
        type: "single",
        question: "일주일에 평균 몇 편의 영화를 시청하시나요?",
        options: [
          "1시간 미만",
          "1-2시간",
          "2-3시간",
          "3-4시간",
          "4-5시간",
          "5시간 이상",
        ],
        required: true,
      },
      {
        id: 4,
        type: "text",
        question:
          "개선됐으면 하는 기능이나 새로 원하는 기능에 대해 자유롭게 적어주세요.",
        required: false,
      },
    ],
  });

  const [answers, setAnswers] = useState<{
    [key: number]: string | string[] | number;
  }>({});
  const [completedSurveys] = useState([
    {
      id: 1,
      title: "영화 선호도 조사",
      completedDate: "2024.07.15",
      reward: 300,
      status: "completed",
    },
    {
      id: 2,
      title: "OTT 서비스 이용행태 조사",
      completedDate: "2024.06.20",
      reward: 250,
      status: "completed",
    },
  ]);

  const [currentStep, setCurrentStep] = useState(0);
  const [showSurveyDetail, setShowSurveyDetail] = useState(false);

  const handleAnswer = (
    questionId: number,
    answer: string | string[] | number
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmitSurvey = () => {
    alert("설문조사가 완료되었습니다! 500 포인트가 적립되었습니다.");
    setShowSurveyDetail(false);
    setCurrentStep(0);
    setAnswers({});
  };

  const progress = ((currentStep + 1) / currentSurvey.questions.length) * 100;

  return (
    <MyLayout>
      <div className="w-full max-w-4xl mx-auto px-4 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-white">설문조사</h1>
          </div>
        </div>

        {!showSurveyDetail ? (
          <div className="space-y-8">
            {/* Current Survey */}
            <div className="bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-white mb-2">
                    {currentSurvey.title}
                  </h2>
                  <p className="text-gray-400 mb-4">
                    {currentSurvey.description}
                  </p>
                </div>
                <span className="bg-green-900 text-green-300 text-sm font-medium px-2.5 py-0.5 rounded">
                  새 설문
                </span>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-6 text-sm text-gray-400">
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
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
                    +{currentSurvey.reward} 포인트
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    예상 소요시간 {currentSurvey.timeEstimate}
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    {currentSurvey.questions.length} 문항
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowSurveyDetail(true)}
                className="w-full bg-[#ccff00] hover:bg-[#b8e600] text-black py-3 px-4 rounded-lg font-medium transition-colors"
              >
                설문 시작하기
              </button>
            </div>

            {/* Completed Surveys */}
            <div className="bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-white mb-6">
                완료한 설문조사
              </h2>

              {completedSurveys.length === 0 ? (
                <div className="text-center py-8">
                  <svg
                    className="w-12 h-12 text-gray-400 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  <p className="text-gray-400">완료한 설문조사가 없습니다.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {completedSurveys.map((survey) => (
                    <div
                      key={survey.id}
                      className="border border-gray-700 rounded-lg p-4 hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-white">
                            {survey.title}
                          </h3>
                          <p className="text-sm text-gray-400 mt-1">
                            완료일: {survey.completedDate}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-green-600 font-medium">
                            +{survey.reward} P
                          </span>
                          <p className="text-sm text-gray-400">완료</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg shadow-sm">
            {/* Survey Header */}
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">
                  {currentSurvey.title}
                </h2>
                <button
                  onClick={() => {
                    setShowSurveyDetail(false);
                    setCurrentStep(0);
                    setAnswers({});
                  }}
                  className="text-gray-400 hover:text-gray-300"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                  <span>
                    {currentStep + 1} / {currentSurvey.questions.length}
                  </span>
                  <span>{Math.round(progress)}% 완료</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-[#ccff00] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Question */}
            <div className="p-6">
              <div className="mb-8">
                <h3 className="text-lg font-medium text-white mb-4">
                  {currentSurvey.questions[currentStep].question}
                  {currentSurvey.questions[currentStep].required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </h3>

                {/* Different question types */}
                {currentSurvey.questions[currentStep].type === "single" && (
                  <div className="space-y-3">
                    {currentSurvey.questions[currentStep].options?.map(
                      (option, index) => (
                        <label
                          key={index}
                          className="flex items-center p-3 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-700"
                        >
                          <input
                            type="radio"
                            name={`question-${currentSurvey.questions[currentStep].id}`}
                            value={option}
                            onChange={(e) =>
                              handleAnswer(
                                currentSurvey.questions[currentStep].id,
                                e.target.value
                              )
                            }
                            className="mr-3"
                          />
                          <span className="text-white">{option}</span>
                        </label>
                      )
                    )}
                  </div>
                )}

                {currentSurvey.questions[currentStep].type === "multiple" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {currentSurvey.questions[currentStep].options?.map(
                      (option, index) => (
                        <label
                          key={index}
                          className="flex items-center p-3 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-700"
                        >
                          <input
                            type="checkbox"
                            value={option}
                            onChange={(e) => {
                              const currentAnswers =
                                (answers[
                                  currentSurvey.questions[currentStep].id
                                ] as string[]) || [];
                              if (e.target.checked) {
                                handleAnswer(
                                  currentSurvey.questions[currentStep].id,
                                  [...currentAnswers, option]
                                );
                              } else {
                                handleAnswer(
                                  currentSurvey.questions[currentStep].id,
                                  currentAnswers.filter(
                                    (a: string) => a !== option
                                  )
                                );
                              }
                            }}
                            className="mr-3"
                          />
                          <span className="text-white">{option}</span>
                        </label>
                      )
                    )}
                  </div>
                )}

                {currentSurvey.questions[currentStep].type === "scale" && (
                  <div>
                    <input
                      type="number"
                      onChange={(e) =>
                        handleAnswer(
                          currentSurvey.questions[currentStep].id,
                          parseInt(e.target.value)
                        )
                      }
                      className="w-32 px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
                      placeholder="숫자 입력"
                    />
                  </div>
                )}

                {currentSurvey.questions[currentStep].type === "text" && (
                  <textarea
                    rows={4}
                    onChange={(e) =>
                      handleAnswer(
                        currentSurvey.questions[currentStep].id,
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
                    placeholder="의견을 자유롭게 입력해주세요..."
                  />
                )}
              </div>

              {/* Navigation */}
              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  이전
                </button>

                {currentStep < currentSurvey.questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="px-4 py-2 bg-[#ccff00] hover:bg-[#b8e600] text-black rounded-lg transition-colors"
                  >
                    다음
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitSurvey}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    제출하기
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </MyLayout>
  );
}
