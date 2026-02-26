"use client";
import NavBar from "@/presentation/components/layout/navbar";
import useDocxUpload from "@/presentation/hooks/UploadFile/useUploadFile";

export default function Upload() {
  const { resultHTML, hiddenFileInput, handleInputClick, handleSelectedFile } =
    useDocxUpload();

  const icons = {
    success: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="#00c951"
          fill-rule="evenodd"
          d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-1.177-7.86l-2.765-2.767L7 12.431l3.119 3.121a1 1 0 0 0 1.414 0l5.952-5.95l-1.062-1.062z"
        />
      </svg>
    ),
    error: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="#fb2c36"
          d="M12 4c-4.419 0-8 3.582-8 8s3.581 8 8 8s8-3.582 8-8s-3.581-8-8-8m3.707 10.293a.999.999 0 1 1-1.414 1.414L12 13.414l-2.293 2.293a.997.997 0 0 1-1.414 0a1 1 0 0 1 0-1.414L10.586 12L8.293 9.707a.999.999 0 1 1 1.414-1.414L12 10.586l2.293-2.293a.999.999 0 1 1 1.414 1.414L13.414 12z"
        />
      </svg>
    ),
  };

  return (
    <main className="h-screen flex justify-center items-center">
      <NavBar />
      <div className="">
        <div className="flex items-center gap-3 mb-3">
          <p className="text-lg text-blue-600 font-bold">Tên môn học</p>
          <input
            type="text"
            placeholder="Nhập tên môn học"
            className="border-b border-b-blue-600 focus:outline-0 px-2 py-1"
          />
        </div>
        <div className="flex justify-center gap-2 bg-yellow-200 w-full px-4 py-2 rounded-full cursor-pointer">
          <input
            ref={hiddenFileInput}
            type="file"
            id="docx-input"
            accept=".docx, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
            onClick={handleInputClick}
            onChange={handleSelectedFile}
          />

          <label
            htmlFor="docx-input"
            className="text-blue-600 font-bold cursor-pointer"
          >
            Chọn tài liệu Word (.docx)
          </label>
        </div>
      </div>
      {resultHTML && (
        <>
          <div dangerouslySetInnerHTML={{ __html: resultHTML }}></div>
        </>
      )}
    </main>
  );
}
