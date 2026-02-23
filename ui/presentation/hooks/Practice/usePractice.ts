import { PracticeDetailEntity } from "@/domain/entities/practice.entity";
import {
  OptionsData,
  QuestionContent,
} from "@/domain/entities/question.entity";
import { getPracticeByIdService } from "@/presentation/services/practice.service";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface QuestionData {
  id: string;
  questionType: string;
  question: QuestionContent;
  options: OptionsData[];
}

interface LessonData {
  [lesson: string]: QuestionData[];
}

export default function usePractice() {
  const pathname = usePathname();

  const [practice, setPractice] = useState<PracticeDetailEntity | null>(null);

  const questionsSorted: LessonData = {};
  practice?.questions.forEach((question) => {
    if (!questionsSorted[question.lesson]) {
      questionsSorted[question.lesson] = [];
    }

    questionsSorted[question.lesson].push({
      id: question.id,
      questionType: question.questionType,
      question: question.question,
      options: question.options,
    });
  });

  const parseQuestionTemplate = (template: string, variables: any) => {
    let htmlContent = template;

    if (variables && variables.image) {
      Object.entries(variables.image).forEach(([imgKey, imgUrl]) => {
        const placeholder = `<${imgKey}>`;
        const htmlImgTag = `<Image src={"/api/image${imgUrl}"} alt="${imgKey}" />
        `;
        htmlContent = htmlContent.split(placeholder).join(htmlImgTag);
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const id = pathname.split("/")[2];
      const response = await getPracticeByIdService(id);

      if (response) {
        setPractice({
          title: response.title,
          chapter: response.chapter,
          questionsCount: response.questionsCount,
          questions: response.questions,
        });
      }
    };
    fetchData();
  }, []);

  return { practice, questionsSorted };
}
