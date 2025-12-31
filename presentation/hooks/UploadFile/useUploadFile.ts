import { uploadDocxFile } from "@/presentation/services/uploadFile..service";
import { useState, useRef, ChangeEvent } from "react";

export default function useDocxUpload() {
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);
  const handleInputClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleSelectedFile = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file: File = event.target.files[0];
    try {
      const formData = new FormData();
      formData.append("file", file);
      const data = await uploadDocxFile(formData);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
  return {
    hiddenFileInput,
    handleInputClick,
    handleSelectedFile,
  };
}
