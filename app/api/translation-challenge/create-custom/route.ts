import { NextResponse } from "next/server";
import { z } from "zod";

import { createCustomChallenge } from "./service";

const RequestSchema = z.object({
  goal: z.string().min(1, "Chủ đề không được để trống"),
  newVocabulary: z.array(z.string()).default([]),
  reviewVocabulary: z.array(z.string()).default([]),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedBody = RequestSchema.parse(body);

    const challenge = await createCustomChallenge({
      goal: validatedBody.goal,
      newVocabulary: validatedBody.newVocabulary,
      reviewVocabulary: validatedBody.reviewVocabulary,
    });

    return NextResponse.json({
      success: true,
      data: challenge,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error creating custom lesson:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: error.errors.map((e) => e.message).join(", "),
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra khi tạo bài học",
      },
      { status: 500 },
    );
  }
}
