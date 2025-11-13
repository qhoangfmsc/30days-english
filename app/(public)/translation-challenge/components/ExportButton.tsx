"use client";

import * as XLSX from "xlsx";
import type { ExportButtonProps } from "../common/type";

export default function ExportButton({ days }: ExportButtonProps) {
  const handleExportToExcel = () => {
    if (!days || days.length === 0) {
      return;
    }

    // Chuẩn bị dữ liệu cho Excel
    const excelData = days.map((day) => {
      // Format từ vựng mới
      const newVocabText = day.newVocabulary
        .map((vocab) => `${vocab.word} (${vocab.type}): ${vocab.translation}`)
        .join("; ");

      // Format từ cần ôn
      const reviewVocabText = day.reviewVocabulary.join(", ");

      return {
        "Ngày": day.day,
        "Thì sử dụng": day.tense,
        "Câu cần dịch": day.vietnameseText,
        "Câu dịch mẫu": day.englishText,
        "Từ vựng mới": newVocabText,
        "Từ cần ôn": reviewVocabText,
      };
    });

    // Tạo workbook và worksheet
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "15 Ngày Dịch Thuật");

    // Điều chỉnh độ rộng cột
    const colWidths = [
      { wch: 8 },  // Ngày
      { wch: 20 }, // Thì
      { wch: 50 }, // Câu tiếng Việt
      { wch: 50 }, // Câu tiếng Anh
      { wch: 60 }, // Từ vựng mới
      { wch: 40 }, // Từ cần ôn
    ];
    ws["!cols"] = colWidths;

    // Xuất file Excel
    const fileName = `15-ngay-dich-thuat-${new Date().toISOString().split("T")[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  return (
    <button
      onClick={handleExportToExcel}
      className="flex h-12 items-center justify-center gap-2 rounded-full bg-green-600 px-5 text-white transition-colors hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
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
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      Export Excel
    </button>
  );
}

