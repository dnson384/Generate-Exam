"use client";

import ChapterSelect from "@/presentation/components/Category/chapterSelect";
import LessonOptionSelect from "@/presentation/components/Category/lessonOptionSelect";
import LessonSelect from "@/presentation/components/Category/lessonSelect";
import LessonBlock from "@/presentation/components/Generate-Practice/LessonBlock";
import useCategory from "@/presentation/hooks/Generate-Practice/useCategory";

export default function GeneratePractice() {
  const {
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
    handleLessonOptionSelect,
    handleAddLesson,
  } = useCategory();

  const chapters = categories.map((category) => category.chapter);
  const filteredChapters = chapters.filter((chapter) =>
    chapter.toLowerCase().includes(searchChapter.toLowerCase()),
  );

  const lessonsData =
    categories.find((category) => category.chapter === selectedChapter)
      ?.lessons || [];
  const filteredLessons = lessonsData.filter((lesson) =>
    lesson.name.toLowerCase().includes(searchLesson.toLowerCase()),
  );

  const icons = {
    add: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
      >
        <g fill="none">
          <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
          <path
            fill="currentColor"
            d="M10.5 20a1.5 1.5 0 0 0 3 0v-6.5H20a1.5 1.5 0 0 0 0-3h-6.5V4a1.5 1.5 0 0 0-3 0v6.5H4a1.5 1.5 0 0 0 0 3h6.5z"
          />
        </g>
      </svg>
    ),
    del: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 14 14"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M13.655 1.335a.7.7 0 0 0-.99-.99L7 6.01L1.335.345a.7.7 0 0 0-.99.99L6.01 7L.345 12.665a.7.7 0 0 0 .99.99L7 7.99l5.665 5.665a.7.7 0 1 0 .99-.99L7.99 7z"
          clipRule="evenodd"
        />
      </svg>
    ),
  };

  return (
    <main className="mt-20 mb-20 flex justify-center items-center">
      <div>
        <div className="mb-3">
          <ChapterSelect
            chapters={filteredChapters}
            searchChapter={searchChapter}
            isOpen={isOpenChapter}
            onSearchChange={(value) => {
              setSearchChapter(value);
              setIsOpenChapter(true);
              if (value.trim() === "") {
                setSelectedChapter("");
                setSelectedLessons([]);
                setSearchLesson("");
              }
            }}
            onSelect={handleChapterSelect}
            onOpen={() => setIsOpenChapter(true)}
            onClose={() => setIsOpenChapter(false)}
          />
        </div>
        {selectedChapter.trim() && (
          <div className="flex flex-col gap-10">
            {selectedLessons.map((lesson, index) => {
              return (
                <LessonBlock
                  key={index}
                  lesson={lesson}
                  selectedLessonsCount={selectedLessons.length}
                  index={index}
                  lessonsData={lessonsData}
                  handleLessonSelect={handleLessonSelect}
                  handleLessonOptionSelect={handleLessonOptionSelect}
                  handleAddLesson={handleAddLesson}
                />
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
