"use client";

import type { Lesson, ApiResponse } from "../common/type";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { Alert } from "@heroui/alert";
import { Card, CardBody } from "@heroui/card";

import { SingleChallengeDisplay } from "../components/SingleChallengeDisplay";

import { Loading } from "@/components/Loading";
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
    return <Loading />;
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

      <div className="flex flex-col items-center justify-center gap-6 py-16">
        <Card className="w-full bg-gradient-to-br from-primary-50 via-purple-50 to-secondary-50 border-none shadow-xl">
          <CardBody className="p-12 flex flex-col items-center gap-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full blur-2xl opacity-30 animate-pulse" />
              <div className="relative text-8xl animate-bounce">📝</div>
            </div>

            <div className="flex flex-col items-center gap-4 text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 via-purple-600 to-secondary-600 bg-clip-text text-transparent">
                Sẵn sàng cho thử thách?
              </h2>
              <p className="text-lg text-default-600 max-w-md">
                Tạo một thử thách dịch thuật mới và bắt đầu hành trình học tiếng
                Anh của bạn ngay hôm nay!
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-default-500">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/60 rounded-full backdrop-blur-sm">
                <span>✨</span>
                <span>Học từ mới</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/60 rounded-full backdrop-blur-sm">
                <span>🎯</span>
                <span>Luyện dịch thuật</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/60 rounded-full backdrop-blur-sm">
                <span>🚀</span>
                <span>Nâng cao kỹ năng</span>
              </div>
            </div>

            <Button
              className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold text-lg px-12 py-4 h-auto hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
              color="primary"
              isLoading={isLoading}
              size="md"
              onPress={handleCreateSingleChallenge}
            >
              {isLoading ? "Đang tạo..." : "✨ Tạo thử thách đơn"}
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
