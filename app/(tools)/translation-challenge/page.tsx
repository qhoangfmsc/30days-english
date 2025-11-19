"use client";

import Link from "next/link";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";

import { title } from "@/components/primitives";

export default function TranslationChallenge() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className={title({ size: "lg" })}>Thử thách dịch thuật</h1>
        <p className="text-default-500 mt-2 text-sm">
          Chọn loại thử thách bạn muốn tạo
        </p>
      </div>

      <div className="flex flex-row flex-wrap gap-4">
        <Card className="hover:scale-[1.02] transition-transform w-72">
          <CardBody className="p-6">
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold">Thử thách 15 ngày</h3>
              <p className="text-sm text-default-500">
                Tạo một chuỗi thử thách dịch thuật kéo dài 15 ngày liên tiếp
              </p>
              <Button
                as={Link}
                className="w-full mt-2"
                color="primary"
                href="/translation-challenge/create-15days"
                size="sm"
              >
                Tạo thử thách
              </Button>
            </div>
          </CardBody>
        </Card>

        <Card className="hover:scale-[1.02] transition-transform w-72">
          <CardBody className="p-6">
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold">Thử thách đơn</h3>
              <p className="text-sm text-default-500">
                Tạo một thử thách dịch thuật đơn lẻ để luyện tập
              </p>
              <Button
                as={Link}
                className="w-full mt-2"
                color="secondary"
                href="/translation-challenge/create-single"
                size="sm"
              >
                Tạo thử thách
              </Button>
            </div>
          </CardBody>
        </Card>

        <Card className="hover:scale-[1.02] transition-transform w-72">
          <CardBody className="p-6">
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold">Thử thách tự chọn</h3>
              <p className="text-sm text-default-500">
                Tự cấu hình chủ đề và từ vựng theo ý muốn
              </p>
              <Button
                as={Link}
                className="w-full mt-2"
                color="default"
                href="/translation-challenge/create-custom"
                size="sm"
              >
                Cấu hình
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
