"use client";

import type { GrammarChallenge, ApiResponse } from "./common/type";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { Alert } from "@heroui/alert";
import { Card, CardBody } from "@heroui/card";

import { GrammarChallengeDisplay } from "./components/GrammarChallengeDisplay";

import { Loading } from "@/components/Loading";
import { title } from "@/components/primitives";

export default function GrammarFindCorrect() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [challenge, setChallenge] = useState<GrammarChallenge | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCreateChallenge = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/grammar-find-correct/create", {
        method: "POST",
      });

      const result: ApiResponse<GrammarChallenge> = await response.json();

      if (!response.ok || !result.success || !result.data) {
        throw new Error(
          result.error || "Có lỗi xảy ra khi tạo thử thách tìm câu đúng",
        );
      }

      setChallenge(result.data);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Có lỗi xảy ra khi tạo thử thách tìm câu đúng";

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error && !challenge) {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <h1 className={title({ size: "sm" })}>Tìm câu đúng</h1>
        </div>
        <Alert color="danger" variant="flat">
          {error}
        </Alert>
        <Button
          className="w-fit"
          color="default"
          variant="light"
          onPress={() => router.push("/")}
        >
          Quay lại
        </Button>
      </div>
    );
  }

  if (challenge) {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-start gap-2">
          <Button
            color="default"
            variant="light"
            onPress={() => router.push("/")}
          >
            Trang chủ
          </Button>
          <div>/</div>
          <h1 className={title({ size: "sm" })}>Tìm câu đúng</h1>
        </div>
        <GrammarChallengeDisplay challenge={challenge} />
        <div className="flex gap-4">
          <Button
            color="primary"
            variant="solid"
            onPress={handleCreateChallenge}
            isLoading={isLoading}
          >
            Tạo thử thách mới
          </Button>
          <Button
            color="default"
            variant="light"
            onPress={() => router.push("/")}
          >
            Quay lại
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className={title({ size: "lg" })}>Tìm câu đúng</h1>
        <p className="text-default-500 mt-2 text-sm">
          Thử thách tìm câu có ngữ pháp đúng trong các câu cho trước
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-6 py-16">
        <Card className="w-full bg-gradient-to-br from-primary-50 via-purple-50 to-secondary-50 border-none shadow-xl">
          <CardBody className="p-12 flex flex-col items-center gap-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full blur-2xl opacity-30 animate-pulse" />
              <div className="relative text-8xl animate-bounce">🔍</div>
            </div>

            <div className="flex flex-col items-center gap-4 text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 via-purple-600 to-secondary-600 bg-clip-text text-transparent">
                Sẵn sàng tìm câu đúng?
              </h2>
              <p className="text-lg text-default-600 max-w-md">
                Tạo một thử thách mới để luyện tập kỹ năng nhận biết ngữ pháp
                đúng trong tiếng Anh!
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-default-500">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/60 rounded-full backdrop-blur-sm">
                <span>✨</span>
                <span>Luyện ngữ pháp</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/60 rounded-full backdrop-blur-sm">
                <span>🎯</span>
                <span>Nhận biết lỗi sai</span>
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
              onPress={handleCreateChallenge}
            >
              {isLoading ? "Đang tạo..." : "✨ Tạo thử thách"}
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

