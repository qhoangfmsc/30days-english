"use client";

import { useState } from "react";

interface DayChallenge {
    day: number;
    tense: string;
    vietnameseText: string;
    englishText: string;
    newVocabulary: {
        word: string;
        type: string;
        translation: string;
    }[];
    reviewVocabulary: string[];
}

interface ShareButtonProps {
    day: DayChallenge;
}

export default function ShareButton({ day }: ShareButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [webhookUrl, setWebhookUrl] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [sendStatus, setSendStatus] = useState<"success" | "error" | null>(null);

    const formatDiscordMessage = () => {
        // Format message with embed for Discord - single day, daily quiz style
        interface DiscordField {
            name: string;
            value: string;
            inline?: boolean;
        }
        const fields: DiscordField[] = [];

        fields.push({
            name: "",
            value: "\u200b",
            inline: false,
        });

        // Words to review
        if (day.reviewVocabulary && day.reviewVocabulary.length > 0) {
            const reviewText = day.reviewVocabulary
                .map((word) => {
                    const cambridgeUrl = `https://dictionary.cambridge.org/dictionary/english/${encodeURIComponent(word.toLowerCase())}`;
                    return `[${word}](${cambridgeUrl})`;
                })
                .join(", ");
            fields.push({
                name: "🔄 Words to Review",
                value: `${reviewText || "None"}`,
                inline: false,
            });

            // Add empty field to create spacing
            fields.push({
                name: "",
                value: "\u200b",
                inline: false,
            });
        }

        // New vocabulary with Cambridge Dictionary links
        if (day.newVocabulary && day.newVocabulary.length > 0) {
            const vocabText = day.newVocabulary
                .map((v) => {
                    const cambridgeUrl = `https://dictionary.cambridge.org/dictionary/english/${encodeURIComponent(v.word.toLowerCase())}`;
                    return `[**${v.word}**](${cambridgeUrl}) (${v.type}) - ${v.translation}`;
                })
                .join("\n");
            fields.push({
                name: "✨ Today's New Vocabulary",
                value: vocabText,
                inline: false,
            });

            fields.push({
                name: "",
                value: "\u200b",
                inline: false,
            });
        }

        // Sentence to translate
        fields.push({
            name: "📝 Sentence to Translate",
            value: `\`\`\`\n${day.vietnameseText}\n\`\`\``,
            inline: false,
        });

        // Add empty field to create spacing
        fields.push({
            name: "",
            value: "\u200b",
            inline: false,
        });

        // Sample translation with spoiler
        fields.push({
            name: "💡 Sample Translation (Click to reveal)",
            value: `||\`\`\`\n${day.englishText}\n\`\`\`||`,
            inline: false,
        });

        const embed = {
            title: `📅 Day ${day.day} Challenge`,
            description: `Translate the following sentence into English using the **${day.tense}** tense!`,
            color: 0x0C8C5F,
            fields: fields,
            footer: {
                text: `\n\nNote: Make sure to translate the sentence into English before revealing the sample translation.`,
            },
        };

        return {
            content: `# 🎯 **DAILY CHALLENGE**`,
            embeds: [embed],
        };
    };

    const generateCurlCommand = () => {
        const message = formatDiscordMessage();
        const jsonPayload = JSON.stringify(message);
        // Escape single quotes and backslashes for shell command
        const escapedJson = jsonPayload
            .replace(/\\/g, "\\\\")
            .replace(/'/g, "'\\''");
        return `curl -X POST "${webhookUrl || "YOUR_WEBHOOK_URL"}" \\
  -H "Content-Type: application/json" \\
  -d '${escapedJson}'`;
    };

    const handleSend = async () => {
        if (!webhookUrl.trim()) {
            setSendStatus("error");
            setTimeout(() => setSendStatus(null), 3000);
            return;
        }

        setIsSending(true);
        setSendStatus(null);

        try {
            const message = formatDiscordMessage();
            const response = await fetch(webhookUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(message),
            });

            if (response.ok) {
                setSendStatus("success");
                setTimeout(() => {
                    setIsOpen(false);
                    setSendStatus(null);
                }, 2000);
            } else {
                setSendStatus("error");
            }
        } catch {
            setSendStatus("error");
        } finally {
            setIsSending(false);
            setTimeout(() => setSendStatus(null), 3000);
        }
    };

    const copyCurlCommand = () => {
        const curlCommand = generateCurlCommand();
        navigator.clipboard.writeText(curlCommand);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all duration-200"
                title="Share to Discord"
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70 backdrop-blur-sm">
                    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800">
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                                Share to Discord
                            </h2>
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    setSendStatus(null);
                                }}
                                className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto flex-1 space-y-4">
                            {/* Webhook URL Input */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                    Discord Webhook URL
                                </label>
                                <input
                                    type="text"
                                    value={webhookUrl}
                                    onChange={(e) => setWebhookUrl(e.target.value)}
                                    placeholder="https://discord.com/api/webhooks/..."
                                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                    Nhập Discord webhook URL để gửi thử thách
                                </p>
                            </div>

                            {/* Curl Command */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                        Curl Command
                                    </label>
                                    <button
                                        onClick={copyCurlCommand}
                                        className="text-xs px-3 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md text-zinc-700 dark:text-zinc-300 transition-colors"
                                    >
                                        Copy
                                    </button>
                                </div>
                                <pre className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-50 text-wrap">
                                    <code>{generateCurlCommand()}</code>
                                </pre>
                            </div>

                            {/* Status Message */}
                            {sendStatus && (
                                <div
                                    className={`p-3 rounded-lg ${sendStatus === "success"
                                        ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                                        : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                                        }`}
                                >
                                    <p
                                        className={`text-sm ${sendStatus === "success"
                                            ? "text-green-800 dark:text-green-200"
                                            : "text-red-800 dark:text-red-200"
                                            }`}
                                    >
                                        {sendStatus === "success"
                                            ? "✅ Đã gửi thành công đến Discord!"
                                            : "❌ Có lỗi xảy ra khi gửi. Vui lòng kiểm tra webhook URL."}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-end gap-3 p-6 border-t border-zinc-200 dark:border-zinc-800">
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    setSendStatus(null);
                                }}
                                className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                            >
                                Đóng
                            </button>
                            <button
                                onClick={handleSend}
                                disabled={isSending || !webhookUrl.trim()}
                                className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isSending ? (
                                    <>
                                        <svg
                                            className="animate-spin h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                        Đang gửi...
                                    </>
                                ) : (
                                    "Gửi đến Discord"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

