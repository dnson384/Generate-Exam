"use client";
import useDocxUpload from "@/presentation/hooks/UploadFile/useUploadFile";

export default function Upload() {
  const { resultHTML, hiddenFileInput, handleInputClick, handleSelectedFile } =
    useDocxUpload();

  return (
    <main className="h-screen flex justify-center items-center">
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
