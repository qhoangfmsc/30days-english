"use client";

import { useState } from "react";
import type { GenerateButtonProps, LessonData } from "../common/type";

export default function GenerateButton({ onGenerate, className, showStatus = true }: GenerateButtonProps) {
    const [isGenerating, setIsGenerating] = useState(false);
    const [generateStatus, setGenerateStatus] = useState<"success" | "error" | null>(null);

    const updateStatus = (status: "success" | "error" | null) => {
        setGenerateStatus(status);
        if (status) {
            setTimeout(() => {
                setGenerateStatus(null);
            }, 3000);
        }
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        updateStatus(null);

        try {
            const response = await fetch("/api/translation-challenge/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.error || "Failed to generate lesson");
            }

            if (result.data) {
                const generatedData = result.data;
                onGenerate({
                    tense: generatedData.tense || "",
                    vietnameseText: generatedData.vietnameseText || "",
                    englishText: generatedData.englishText || "",
                    newVocabulary: generatedData.newVocabulary || [],
                    reviewVocabulary: generatedData.reviewVocabulary || [],
                });
                updateStatus("success");
            } else {
                throw new Error("Invalid response from API");
            }
        } catch (error) {
            console.error("Error generating lesson:", error);
            updateStatus("error");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className={className}>
            <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
                {isGenerating ? (
                    <>
                        <svg
                            className="animate-spin h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        <span className="hidden sm:inline">Đang tạo...</span>
                    </>
                ) : (
                    <>
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                        </svg>
                        <span className="hidden sm:inline">Generate</span>
                    </>
                )}
            </button>

            {/* Generate Status Message - only show if showStatus is true */}
            {showStatus && generateStatus && (
                <div
                    className={`mt-2 p-3 rounded-lg ${generateStatus === "success"
                        ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                        : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                        }`}
                >
                    <p
                        className={`text-sm ${generateStatus === "success"
                            ? "text-green-800 dark:text-green-200"
                            : "text-red-800 dark:text-red-200"
                            }`}
                    >
                        {generateStatus === "success"
                            ? "✅ Đã tạo bài học thành công!"
                            : "❌ Có lỗi xảy ra khi tạo bài học. Vui lòng thử lại."}
                    </p>
                </div>
            )}
        </div>
    );
}

export type { LessonData };

