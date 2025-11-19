import { NextResponse } from "next/server";

import { createGrammarChallenge } from "./service";

export async function POST() {
  try {
    const challenge = await createGrammarChallenge();

    return NextResponse.json({
      success: true,
      data: challenge,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error creating grammar challenge:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra khi tạo thử thách",
      },
      { status: 500 },
    );
  }
}

