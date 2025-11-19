"use client";

import type { Schedule, ApiResponse } from "../common/type";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { Alert } from "@heroui/alert";
import { Card, CardBody } from "@heroui/card";

import { Challenge15DaysDisplay } from "../components/Challenge15DaysDisplay";

import { Loading } from "@/components/Loading";
import { title } from "@/components/primitives";

export default function Create15DaysChallenge() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCreate15DaysChallenge = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/translation-challenge/create-15days", {
        method: "POST",
      });

      const result: ApiResponse<Schedule> = await response.json();

      if (!response.ok || !result.success || !result.data) {
        throw new Error(
          result.error || "Có lỗi xảy ra khi tạo thử thách 15 ngày",
        );
      }

      setSchedule(result.data);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Có lỗi xảy ra khi tạo thử thách 15 ngày";

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error && !schedule) {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <h1 className={title({ size: "sm" })}>Thử thách 15 ngày</h1>
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

  if (schedule) {
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
          <h1 className={title({ size: "sm" })}>Thử thách 15 ngày</h1>
        </div>
        <Challenge15DaysDisplay schedule={schedule} />
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
        <h1 className={title({ size: "sm" })}>Thử thách 15 ngày</h1>
      </div>

      <div className="flex flex-col items-center justify-center gap-6 py-16">
        <Card className="w-full bg-gradient-to-br from-yellow-50 via-indigo-50 to-red-50 border-none shadow-xl">
          <CardBody className="p-12 flex flex-col items-center gap-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-2xl opacity-30 animate-pulse" />
              <div className="relative text-8xl animate-bounce">📅</div>
            </div>

            <div className="flex flex-col items-center gap-4 text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-red-400 bg-clip-text text-transparent">
                Bắt đầu hành trình 15 ngày!
              </h2>
              <p className="text-lg text-default-600 max-w-md">
                Tạo lịch học 15 ngày với các thử thách dịch thuật được tối ưu
                hóa. Kiên trì mỗi ngày để đạt mục tiêu của bạn!
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 w-full max-w-md">
              <div className="flex flex-col items-center gap-2 p-4 bg-white/60 rounded-xl backdrop-blur-sm">
                <span className="text-3xl">🔥</span>
                <span className="text-xs font-semibold text-center">
                  15 Ngày
                </span>
                <span className="text-xs text-default-500 text-center">
                  Liên tục
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-white/60 rounded-xl backdrop-blur-sm">
                <span className="text-3xl">📚</span>
                <span className="text-xs font-semibold text-center">
                  15 Bài
                </span>
                <span className="text-xs text-default-500 text-center">
                  Học tập
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-white/60 rounded-xl backdrop-blur-sm">
                <span className="text-3xl">🎓</span>
                <span className="text-xs font-semibold text-center">
                  Tự động
                </span>
                <span className="text-xs text-default-500 text-center">
                  Hàng ngày
                </span>
              </div>
            </div>

            <Button
              className="bg-gradient-to-br from-yellow-500 to-red-400 text-white font-semibold text-lg px-12 py-4 h-auto hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
              color="primary"
              isLoading={isLoading}
              size="md"
              onPress={handleCreate15DaysChallenge}
            >
              {isLoading ? "Đang tạo..." : "🚀 Tạo thử thách 15 ngày"}
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
