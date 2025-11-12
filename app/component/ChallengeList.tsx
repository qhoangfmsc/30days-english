"use client";

import { useState } from "react";
import ShareButton from "./ShareButton";

interface DayChallenge {
  day: number;
  tense: string;
  vietnameseText: string;
  englishText: string;
  newVocabulary: {
    word: string;
    type: string;
    translation: string;
  }[];
  reviewVocabulary: string[];
}

interface ChallengeListProps {
  days: DayChallenge[];
}

export default function ChallengeList({ days }: ChallengeListProps) {
  const [showExample, setShowExample] = useState<Record<number, boolean>>({});

  const toggleExample = (day: number) => {
    setShowExample((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  return (
    <div className="mt-2 w-full space-y-4">
      <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
        {days.map((day) => (
          <div
            key={day.day}
            className="p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="space-y-4">
              {/* 1. Ngày thứ */}
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-zinc-200 dark:border-zinc-700">
                <span className="px-4 py-1.5 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-bold shadow-sm">
                  Ngày {day.day}
                </span>
                <ShareButton day={day} />
              </div>

              {/* 2. Từ cần ôn */}
              {day.reviewVocabulary && day.reviewVocabulary.length > 0 && (
                <div className="bg-orange-50 dark:bg-orange-900/10 p-4 rounded-lg border border-orange-200 dark:border-orange-800/50">
                  <p className="text-sm font-semibold text-orange-900 dark:text-orange-200 mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    Từ cần ôn
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {day.reviewVocabulary.map((word, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 rounded-md text-sm font-medium border border-orange-200 dark:border-orange-800/50"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Từ vựng mới */}
              {day.newVocabulary && day.newVocabulary.length > 0 && (
                <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-lg border border-purple-200 dark:border-purple-800/50">
                  <p className="text-sm font-semibold text-purple-900 dark:text-purple-200 mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                    Từ vựng mới
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {day.newVocabulary.map((vocab, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded-md text-sm font-medium border border-purple-200 dark:border-purple-800/50"
                      >
                        <span className="font-semibold">{vocab.word}</span>
                        <span className="mx-1.5 text-purple-500 dark:text-purple-400 text-xs italic">({vocab.type})</span>
                        <span className="mx-1.5 text-purple-600 dark:text-purple-400">•</span>
                        <span className="text-purple-700 dark:text-purple-300">{vocab.translation}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Thì cần sử dụng */}
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 min-w-[120px]">
                  Thì cần sử dụng:
                </p>
                <span className="px-4 py-1.5 bg-linear-to-r from-green-500 to-emerald-600 text-white rounded-full text-sm font-semibold shadow-sm">
                  {day.tense}
                </span>
              </div>

              {/* 5. Câu cần dịch */}
              <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
                <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                  Câu cần dịch:
                </p>
                <p className="text-base leading-relaxed text-black dark:text-zinc-50">
                  {day.vietnameseText}
                </p>
              </div>

              {/* 6. Nút + câu trả lời mẫu */}
              <div className="pt-2">
                <button
                  onClick={() => toggleExample(day.day)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                >
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${showExample[day.day] ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  {showExample[day.day] ? "Ẩn câu trả lời mẫu" : "Xem câu trả lời mẫu"}
                </button>
                {showExample[day.day] && (
                  <div className="mt-3 bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-200 dark:border-blue-800/50 animate-in fade-in duration-200">
                    <p className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">
                      Câu dịch mẫu:
                    </p>
                    <p className="text-base leading-relaxed text-blue-800 dark:text-blue-300 italic">
                      {day.englishText}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

