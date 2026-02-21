import { CategoryEntity, LessonData } from "@/domain/entities/category.entity";
import { GeneratePracticeEntity } from "@/domain/entities/generate-practice.entity";
import { getAllCategoriesService } from "@/presentation/services/category.service";
import { ChangeEvent, useEffect, useState } from "react";

export default function useCategory() {
  const [categories, setCategories] = useState<CategoryEntity[]>([]);

  // Chương
  const [searchChapter, setSearchChapter] = useState<string>("");
  const [selectedChapter, setSelectedChapter] = useState<string>("");
  const [isOpenChapter, setIsOpenChapter] = useState(false);

  // Bài
  const [searchLesson, setSearchLesson] = useState<string>("");
  const [selectedLessons, setSelectedLessons] = useState<
    GeneratePracticeEntity[]
  >([]);
  const [isOpenLesson, setIsOpenLesson] = useState(false);

  const newLessonData = (): GeneratePracticeEntity => ({
    name: "",
    questionsCount: 10,
    exerciseTypes: [],
    difficultyLevels: [],
    learningOutcomes: [],
    questionTypes: [],
  });

  const handleChapterSelect = (chapter: string) => {
    setSelectedChapter(chapter);
    setSearchChapter(chapter);
    setIsOpenChapter(false);
  };

  const handleLessonSelect = (lesson: LessonData, index: number) => {
    setSelectedLessons((prev) => {
      const lessons = [...prev];
      lessons[index].name = lesson.name;
      return lessons;
    });
    setSearchLesson(lesson.name);
    setIsOpenLesson(false);
  };

  const handleLessonOptionSelect = (
    event: ChangeEvent<HTMLInputElement>,
    field: string,
    index: number,
  ) => {
    const { checked, value } = event.target;
    setSelectedLessons((prev) => {
      const lessonsCopy = [...prev];
      const currentLesson = { ...lessonsCopy[index] };

      if (field === "Dạng bài") {
        if (checked) {
          currentLesson.exerciseTypes = [...currentLesson.exerciseTypes, value];
        } else {
          currentLesson.exerciseTypes = currentLesson.exerciseTypes.filter(
            (type) => type != value,
          );
        }
      } else if (field === "Số lượng câu hỏi") {
        if (Number(value) >= 0) currentLesson.questionsCount = Number(value);
      } else if (field === "Độ khó") {
        if (checked) {
          currentLesson.difficultyLevels = [
            ...currentLesson.difficultyLevels,
            value,
          ];
        } else {
          currentLesson.difficultyLevels =
            currentLesson.difficultyLevels.filter((type) => type !== value);
        }
      } else if (field === "Yêu cầu cần đạt") {
        if (checked) {
          currentLesson.learningOutcomes = [
            ...currentLesson.learningOutcomes,
            value,
          ];
        } else {
          currentLesson.learningOutcomes =
            currentLesson.learningOutcomes.filter((type) => type !== value);
        }
      } else if (field === "Dạng câu hỏi") {
        if (checked) {
          currentLesson.questionTypes = [...currentLesson.questionTypes, value];
        } else {
          currentLesson.questionTypes = currentLesson.questionTypes.filter(
            (type) => type !== value,
          );
        }
      }

      lessonsCopy[index] = currentLesson;
      return lessonsCopy;
    });
  };

  const handleAddLesson = () => {
    setSelectedLessons((prev) => [...prev, newLessonData()]);
  };

  useEffect(() => {
    console.log(selectedLessons);
  }, [selectedLessons]);

  useEffect(() => {
    if (selectedChapter.trim().length > 0) {
      setSelectedLessons(() => {
        const lesson = [];
        lesson.push(newLessonData());
        return lesson;
      });
    }
  }, [selectedChapter]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getAllCategoriesService();
      if (categories) setCategories(categories);
    };

    fetchCategories();
  }, []);

  return {
    categories,
    // Chương
    searchChapter,
    selectedChapter,
    isOpenChapter,
    setIsOpenChapter,
    setSearchChapter,
    setSelectedChapter,
    handleChapterSelect,
    // Bài
    searchLesson,
    selectedLessons,
    isOpenLesson,
    setIsOpenLesson,
    setSearchLesson,
    setSelectedLessons,
    handleLessonSelect,
    // Các opiton của bài
    handleLessonOptionSelect,
    handleAddLesson,
  };
}
