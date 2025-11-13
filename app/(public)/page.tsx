"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const tools = [
    {
      id: "translation-challenge",
      title: "Translation Challenge",
      description: "Thử thách dịch từ tiếng Việt sang tiếng Anh trong 15 ngày",
      path: "/translation-challenge",
    },
    // Có thể thêm các tool khác ở đây
    // {
    //   id: "reading-challenge",
    //   title: "Reading Challenge",
    //   description: "Thử thách đọc hiểu tiếng Anh",
    //   path: "/reading-challenge",
    // },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex h-full w-full max-w-4xl flex-col items-center justify-center gap-8 p-8">
        <div className="flex flex-col items-center gap-2 text-center w-full">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50">
            Daily English
          </h1>
          <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Chọn công cụ bạn muốn sử dụng
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => router.push(tool.path)}
              className="flex flex-col gap-3 p-6 rounded-lg border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-left transition-all hover:border-foreground hover:bg-zinc-50 dark:hover:bg-zinc-800 dark:hover:border-zinc-600 group"
            >
              <h2 className="text-xl font-semibold text-black dark:text-zinc-50 group-hover:text-foreground transition-colors">
                {tool.title}
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {tool.description}
              </p>
              <div className="mt-2 text-sm text-foreground font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Bắt đầu →
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
