"use client";

import { Spinner } from "@heroui/spinner";

import { title } from "./primitives";

export const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px] w-full py-16">
      <div className="flex flex-row flex-wrap items-center justify-center gap-6">
        {/* Main spinner with glow effect */}
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-primary-400/10 blur-2xl animate-pulse" />
          <Spinner color="secondary" size="md" />
        </div>

        {/* Text with bouncing dots */}
        <div className="flex items-center gap-1 text-lg font-medium text-default-600">
          <div>
            Chờ{" "}
            <span
              className={title({ color: "violet" })}
              style={{ fontSize: "1.25rem" }}
            >
              Daily English
            </span>{" "}
            chút xíu nhé
          </div>
          <div className="flex gap-1">
            {[0, 1, 2].map((index) => (
              <span
                key={index}
                className="inline-block animate-bounce"
                style={{
                  animationDelay: `${index * 0.2}s`,
                  animationDuration: "1.4s",
                }}
              >
                .
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
