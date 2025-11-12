"use client";

import ChallengeList from "./ChallengeList";

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

export default function MockupData() {
  // Mock data để mô phỏng data thật
  const mockDays: DayChallenge[] = [
    {
      day: 1,
      tense: "Present Simple",
      vietnameseText: "Tôi đi làm mỗi ngày.",
      englishText: "I go to work every day.",
      newVocabulary: [
        {
          word: "work",
          type: "noun",
          translation: "công việc",
        },
        {
          word: "every",
          type: "adjective",
          translation: "mỗi",
        },
      ],
      reviewVocabulary: [],
    },
    {
      day: 2,
      tense: "Present Continuous",
      vietnameseText: "Cô ấy đang đọc sách trong thư viện.",
      englishText: "She is reading a book in the library.",
      newVocabulary: [
        {
          word: "library",
          type: "noun",
          translation: "thư viện",
        },
        {
          word: "reading",
          type: "verb",
          translation: "đang đọc",
        },
      ],
      reviewVocabulary: ["work", "every"],
    },
  ];

  return (
    <>
      <div className="mb-3 p-3 bg-amber-50 dark:bg-amber-900/10 rounded-lg border border-amber-200 dark:border-amber-800/50">
        <p className="text-sm font-semibold text-amber-900 dark:text-amber-200 flex items-center gap-2">
          Dữ liệu mẫu
        </p>
      </div>
      <ChallengeList days={mockDays} />
    </>
  );
}

