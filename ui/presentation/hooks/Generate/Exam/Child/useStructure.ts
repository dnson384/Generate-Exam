import { CreateDraftPayload } from "@/presentation/schemas/draft.schema";
import { CreateDraftService } from "@/presentation/services/draft.service";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function useStructure() {
  const router = useRouter();
  const pathname = usePathname();

  const [questionsCount, setQuestionsCount] = useState<number>(0);
  const [questionTypes, setQuestionTypes] = useState<Record<string, boolean>>({
    "Nhiều lựa chọn": true,
    "Đúng sai": true,
    "Trả lời ngắn": false,
    "Tự luận": true,
  });

  const [error, setError] = useState<string | null>(null);

  const handleQuestionsCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuestionsCount(Number(value));
  };

  const handleQuestionTypesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setQuestionTypes((prev) => ({ ...prev, [id]: checked }));
  };

  const handleContinueClick = async () => {
    if (!questionsCount) {
      setError("Phải có ít nhất 1 câu hỏi");
      return;
    }

    const questionTypesArr: string[] = Object.entries(questionTypes)
      .filter(([_, value]) => value === true)
      .map(([key]) => key);

    if (questionTypesArr.length < 3) {
      setError("Bắt buộc phải có 3 loại câu hỏi");
      return;
    } else if (
      !questionTypesArr.includes("Nhiều lựa chọn") ||
      !questionTypesArr.includes("Đúng sai") ||
      !questionTypesArr.includes("Tự luận")
    ) {
      setError("Bắt buộc phải có 3 loại: Nhiều lựa chọn, Đúng sai, Tự luận");
      return;
    }

    const payload: CreateDraftPayload = {
      questionsCount: questionsCount,
      questionTypes: questionTypesArr,
    };

    const draftId = await CreateDraftService(payload);

    if (draftId) {
      router.push(`${pathname}/${draftId}`);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (error !== null) {
        setError(null);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  return {
    questionsCount,
    questionTypes,
    error,
    handleQuestionsCountChange,
    handleQuestionTypesChange,
    handleContinueClick,
  };
}
