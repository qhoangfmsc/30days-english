"use client";

import type { Schedule, ApiResponse } from "../common/type";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { Alert } from "@heroui/alert";

import { Challenge15DaysDisplay } from "../components/Challenge15DaysDisplay";

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
    return (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center justify-center gap-4 py-12">
          <Spinner color="primary" size="lg" />
          <p className="text-default-500">Đang tạo thử thách...</p>
        </div>
      </div>
    );
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

      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <Button
          color="primary"
          isLoading={isLoading}
          size="lg"
          onPress={handleCreate15DaysChallenge}
        >
          Tạo thử thách 15 ngày
        </Button>
      </div>
    </div>
  );
}
