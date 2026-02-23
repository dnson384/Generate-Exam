import { LessonData } from "@/domain/entities/category.entity";
import { Dispatch, SetStateAction, ChangeEvent, useState } from "react";
import LessonSelect from "../Category/lessonSelect";
import { GeneratePracticeEntity } from "@/domain/entities/generate-practice.entity";
import LessonOptionSelect from "../Category/lessonOptionSelect";

interface LessonBlockData {
  lesson: GeneratePracticeEntity;
  selectedLessons: GeneratePracticeEntity[];
  index: number;
  lessonsData: LessonData[];
  handleLessonSelect(lesson: LessonData, index: number): void;
  setSelectedLessons: Dispatch<SetStateAction<GeneratePracticeEntity[]>>;
  handleLessonOptionSelect(
    event: ChangeEvent<HTMLInputElement>,
    field: string,
    index: number,
  ): void;
  handleAddLesson(): void;
}
export default function LessonBlock({
  lesson,
  selectedLessons,
  index,
  lessonsData,
  setSelectedLessons,
  handleLessonSelect,
  handleLessonOptionSelect,
  handleAddLesson,
}: LessonBlockData) {
  const [search, setSearch] = useState<string>(lesson.name || "");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const selectedLessonNames = selectedLessons.map((sl) => sl.name);

  const filteredLessons = lessonsData.filter((l: LessonData) => {
    const matchesSearch = l.name.toLowerCase().includes(search.toLowerCase());

    const isSelected =
      selectedLessonNames.includes(l.name) && l.name !== lesson.name;

    return matchesSearch && !isSelected;
  });

  const currentLesson = lessonsData.find((l: any) => l.name === lesson.name);

  return (
    <div>
      <LessonSelect
        lessons={filteredLessons}
        searchLesson={search}
        isOpen={isOpen}
        onSearchChange={(value: string) => {
          setSearch(value);
          setIsOpen(true);
          if (value.trim() === "") {
            setSelectedLessons((prev) => prev.filter((_, i) => i !== index));
          }
        }}
        onSelect={(selectedOption) => {
          handleLessonSelect(selectedOption, index);
          setSearch(selectedOption.name);
          setIsOpen(false);
        }}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      />

      {currentLesson && (
        <>
          <div className="mt-5 flex flex-col gap-3">
            <div>
              <label className="flex items-center gap-4 w-full">
                <span className="w-40 font-semibold text-blue-500">
                  Số lượng câu hỏi
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Nhập số lượng câu hỏi"
                  className="min-w-lg px-3 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={lesson.questionsCount}
                  onChange={(e) =>
                    handleLessonOptionSelect(e, "Số lượng câu hỏi", index)
                  }
                />
              </label>
            </div>

            <LessonOptionSelect
              currentLesson={currentLesson}
              title="Dạng bài"
              index={index}
              handleLessonOptionSelect={handleLessonOptionSelect}
            />
            <LessonOptionSelect
              currentLesson={currentLesson}
              title="Độ khó"
              index={index}
              handleLessonOptionSelect={handleLessonOptionSelect}
            />
            <LessonOptionSelect
              currentLesson={currentLesson}
              title="Yêu cầu cần đạt"
              index={index}
              handleLessonOptionSelect={handleLessonOptionSelect}
            />
            <LessonOptionSelect
              currentLesson={currentLesson}
              title="Dạng câu hỏi"
              index={index}
              handleLessonOptionSelect={handleLessonOptionSelect}
            />
          </div>

          {index === selectedLessons.length - 1 &&
          selectedLessons.length < lessonsData.length ? (
            <div className="mt-5 w-full flex justify-center">
              <div
                className="bg-blue-100 w-70 py-2 font-medium rounded-lg cursor-pointer hover:bg-blue-700 hover:text-white"
                onClick={handleAddLesson}
              >
                <p className="text-center">Chọn thêm bài</p>
              </div>
            </div>
          ) : (
            <div className="border border-0.5 border-gray-300 mt-5"></div>
          )}
        </>
      )}
    </div>
  );
}
