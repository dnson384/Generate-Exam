"use client";
import useDashboard from "@/presentation/hooks/Dashboard/useDashboard";

export default function Home() {
  const { redirect } = useDashboard();
  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center">
        <button
          id="generate-practice"
          className="bg-yellow-200 px-4 py-2 rounded-full text-blue-600 font-bold cursor-pointer"
          onClick={(e) => redirect(e)}
        >
          Tạo đề ôn tập
        </button>
        <button
          id="upload"
          className="bg-yellow-200 px-4 py-2 rounded-full text-blue-600 font-bold cursor-pointer"
          onClick={(e) => redirect(e)}
        >
          Tải lên câu hỏi
        </button>
      </div>
    </>
  );
}
