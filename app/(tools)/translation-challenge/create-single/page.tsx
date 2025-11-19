"use client";

import type { Lesson, ApiResponse } from "../common/type";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { Alert } from "@heroui/alert";

import { SingleChallengeDisplay } from "../components/SingleChallengeDisplay";

import { title } from "@/components/primitives";

export default function CreateSingleChallenge() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCreateSingleChallenge = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/translation-challenge/create", {
        method: "POST",
      });

      const result: ApiResponse<Lesson> = await response.json();

      if (!response.ok || !result.success || !result.data) {
        throw new Error(result.error || "Có lỗi xảy ra khi tạo thử thách đơn");
      }

      setLesson(result.data);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Có lỗi xảy ra khi tạo thử thách đơn";

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center justify-center gap-4 py-12">
          <Spinner color="primary" size="lg" />
          <p className="text-default-500">Đang tạo thử thách...</p>
        </div>
      </div>
    );
  }

  if (error && !lesson) {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <h1 className={title({ size: "sm" })}>Thử thách đơn</h1>
        </div>
        <Alert color="danger" variant="flat">
          {error}
        </Alert>
        <Button
          className="w-fit"
          color="default"
          variant="light"
          onPress={() => router.push("/translation-challenge")}
        >
          Quay lại
        </Button>
      </div>
    );
  }

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
          <h1 className={title({ size: "sm" })}>Thử thách đơn</h1>
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
        <h1 className={title({ size: "sm" })}>Thử thách đơn</h1>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <Button
          color="primary"
          isLoading={isLoading}
          size="lg"
          onPress={handleCreateSingleChallenge}
        >
          Tạo thử thách đơn
        </Button>
      </div>
    </div>
  );
}
