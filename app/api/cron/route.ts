import { NextResponse } from "next/server";

function calculateWorkingDays(startDate: Date, endDate = new Date()) {
  let count = 0;
  const current = new Date(startDate);
  
  current.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);
  
  while (current <= endDate) {
    const dayOfWeek = current.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }
  
  return count;
}

export async function GET() {
  try {
    const discordWebhookUrl = "https://discord.com/api/webhooks/1402137172483768332/8irZRAm0m8XwI-QZ5JyqhsAYs5xA9uju5nVFclfYah1M2vJJpajrtgnJdxwpsIsSDYIe";

    if (!discordWebhookUrl) {
      console.error("DISCORD_WEBHOOK_URL không được cấu hình");
      return NextResponse.json(
        { error: "DISCORD_WEBHOOK_URL không được cấu hình" },
        { status: 500 }
      );
    }

    const startDate = new Date("2025-07-01");
    const today = new Date();
    const workingDays = calculateWorkingDays(startDate, today);
    
    const formatDate = (date: Date) => {
      return date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      });
    };

    const message = `📅 **Báo cáo ngày làm việc**
📆 Ngày bắt đầu: ${formatDate(startDate)}
📆 Hôm nay: ${formatDate(today)}
💼 Tổng số ngày làm việc: **${workingDays} ngày**`;

    const response = await fetch(discordWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: message,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Discord webhook error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      });
      
      return NextResponse.json(
        { 
          error: `Discord webhook error: ${response.status} ${response.statusText}`,
          details: errorText
        },
        { status: response.status }
      );
    }

    console.log("Đã gửi thông báo Discord thành công");
    
    return NextResponse.json({
      success: true,
      message: "Đã gửi thông báo Discord thành công"
    });
  } catch (error) {
    console.error("Error sending Discord message:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Có lỗi xảy ra khi gửi thông báo Discord"
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  return GET();
}

