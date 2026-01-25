"use client";
import useDocxUpload from "@/presentation/hooks/UploadFile/useUploadFile";

export default function Home() {
  const { resultHTML, hiddenFileInput, handleInputClick, handleSelectedFile } =
    useDocxUpload();
  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="flex gap-2 bg-yellow-200 w-fit px-4 py-2 rounded-full cursor-pointer">
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
    </>
  );
}
