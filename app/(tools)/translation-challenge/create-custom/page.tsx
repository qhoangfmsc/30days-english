"use client";

import type { Lesson, ApiResponse } from "../common/type";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Chip } from "@heroui/chip";
import { Alert } from "@heroui/alert";

import { SingleChallengeDisplay } from "../components/SingleChallengeDisplay";

import { title } from "@/components/primitives";

export default function CreateCustomChallenge() {
  const router = useRouter();
  const [goal, setGoal] = useState("");
  const [newVocabInput, setNewVocabInput] = useState("");
  const [reviewVocabInput, setReviewVocabInput] = useState("");
  const [newVocabulary, setNewVocabulary] = useState<string[]>([]);
  const [reviewVocabulary, setReviewVocabulary] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAddNewVocabulary = () => {
    const words = newVocabInput
      .split(",")
      .map((word) => word.trim())
      .filter((word) => word.length > 0);

    if (words.length > 0) {
      setNewVocabulary((prev) => [...prev, ...words]);
      setNewVocabInput("");
    }
  };

  const handleRemoveNewVocabulary = (index: number) => {
    setNewVocabulary((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddReviewVocabulary = () => {
    const words = reviewVocabInput
      .split(",")
      .map((word) => word.trim())
      .filter((word) => word.length > 0);

    if (words.length > 0) {
      setReviewVocabulary((prev) => [...prev, ...words]);
      setReviewVocabInput("");
    }
  };

  const handleRemoveReviewVocabulary = (index: number) => {
    setReviewVocabulary((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreateLesson = async () => {
    if (!goal.trim()) {
      setError("Vui lòng nhập chủ đề");

      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/translation-challenge/create-custom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          goal: goal.trim(),
          newVocabulary,
          reviewVocabulary,
        }),
      });

      const result: ApiResponse<Lesson> = await response.json();

      if (!response.ok || !result.success || !result.data) {
        throw new Error(
          result.error || "Có lỗi xảy ra khi tạo thử thách tự chọn",
        );
      }

      setLesson(result.data);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Có lỗi xảy ra khi tạo thử thách tự chọn";

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (lesson) {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-start gap-2">
          <Button
            color="default"
            variant="light"
            onPress={() => router.push("/translation-challenge")}
          >
            Thử thách dịch thuật
          </Button>
          <div>/</div>
          <h1 className={title({ size: "sm" })}>Thử thách tự chọn</h1>
        </div>
        <SingleChallengeDisplay lesson={lesson} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-start gap-2">
        <Button
          color="default"
          variant="light"
          onPress={() => router.push("/translation-challenge")}
        >
          Thử thách dịch thuật
        </Button>
        <div>/</div>
        <h1 className={title({ size: "sm" })}>Thử thách tự chọn</h1>
      </div>

      {error && (
        <Alert color="danger" variant="flat">
          {error}
        </Alert>
      )}

      <Card>
        <CardBody className="p-6">
          <div className="flex flex-col gap-6">
            {/* Chủ đề */}
            <div className="flex flex-col gap-2">
              <label
                className="text-sm font-semibold text-foreground"
                htmlFor="goal"
              >
                Chủ đề <span className="text-danger">*</span>
              </label>
              <Input
                id="goal"
                placeholder="Nhập chủ đề bài học"
                value={goal}
                onValueChange={setGoal}
              />
            </div>

            {/* Từ vựng muốn học */}
            <div className="flex flex-col gap-3">
              <label
                className="text-sm font-semibold text-foreground"
                htmlFor="new-vocab"
              >
                Từ vựng bạn muốn học
              </label>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <Input
                    id="new-vocab"
                    placeholder="Nhập từ vựng, cách nhau bởi dấu phẩy"
                    size="sm"
                    value={newVocabInput}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddNewVocabulary();
                      }
                    }}
                    onValueChange={setNewVocabInput}
                  />
                  <Button
                    color="success"
                    isDisabled={!newVocabInput.trim()}
                    size="sm"
                    onPress={handleAddNewVocabulary}
                  >
                    Thêm
                  </Button>
                </div>
                {newVocabulary.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newVocabulary.map((word, index) => (
                      <Chip
                        key={index}
                        color="primary"
                        variant="flat"
                        onClose={() => handleRemoveNewVocabulary(index)}
                      >
                        {word}
                      </Chip>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Từ vựng muốn ôn lại */}
            <div className="flex flex-col gap-3">
              <label
                className="text-sm font-semibold text-foreground"
                htmlFor="review-vocab"
              >
                Từ vựng bạn muốn ôn lại
              </label>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <Input
                    id="review-vocab"
                    placeholder="Nhập từ vựng, cách nhau bởi dấu phẩy"
                    size="sm"
                    value={reviewVocabInput}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddReviewVocabulary();
                      }
                    }}
                    onValueChange={setReviewVocabInput}
                  />
                  <Button
                    color="warning"
                    isDisabled={!reviewVocabInput.trim()}
                    size="sm"
                    onPress={handleAddReviewVocabulary}
                  >
                    Thêm
                  </Button>
                </div>
                {reviewVocabulary.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {reviewVocabulary.map((word, index) => (
                      <Chip
                        key={index}
                        color="warning"
                        variant="bordered"
                        onClose={() => handleRemoveReviewVocabulary(index)}
                      >
                        {word}
                      </Chip>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Nút tạo bài học */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                color="default"
                variant="light"
                onPress={() => router.push("/translation-challenge")}
              >
                Hủy
              </Button>
              <Button
                color="primary"
                isDisabled={!goal.trim() || isLoading}
                isLoading={isLoading}
                onPress={handleCreateLesson}
              >
                Tạo bài học
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
