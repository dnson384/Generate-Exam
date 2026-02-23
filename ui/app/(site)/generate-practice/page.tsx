"use client";

import ChapterSelect from "@/presentation/components/Category/chapterSelect";
import LessonBlock from "@/presentation/components/Generate-Practice/LessonBlock";
import useCategory from "@/presentation/hooks/Generate-Practice/useCategory";
import useGeneratePractice from "@/presentation/hooks/Generate-Practice/useGeneratePractice";

export default function GeneratePractice() {
  const { categories } = useCategory();
  const {
    // Title
    practiceTitle,
    setPracticeTitle,
    // Chương
    searchChapter,
    selectedChapter,
    isOpenChapter,
    setIsOpenChapter,
    setSearchChapter,
    setSelectedChapter,
    handleChapterSelect,
    // Bài
    selectedLessons,
    setSelectedLessons,
    handleLessonSelect,
    handleLessonOptionSelect,
    handleAddLesson,
    // UI
    error,
    // Func
    handleGeneratePractice,
  } = useGeneratePractice();

  const chapters = categories.map((category) => category.chapter);
  const filteredChapters = chapters.filter((chapter) =>
    chapter.toLowerCase().includes(searchChapter.toLowerCase()),
  );

  const lessonsData =
    categories.find((category) => category.chapter === selectedChapter)
      ?.lessons || [];

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
    <main className="mt-25 mb-50 flex justify-center items-center">
      {error && (
        <div className="fixed inset-0 h-fit top-5 flex justify-center">
          <div className="bg-red-100 px-3 py-1 rounded-md flex items-center gap-2">
            {icons.error}
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      )}

      <div className="fixed top-25 right-20">
        <div
          className="bg-blue-100 font-medium h-fit w-fit px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600 hover:text-white"
          onClick={handleGeneratePractice}
        >
          <p>Tạo đề ôn tập</p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="practice_name" className="flex items-center gap-4">
          <span className="w-40 text-lg font-semibold text-blue-600">
            Tiêu đề
          </span>
          <input
            type="text"
            id="practice_name"
            placeholder="Tiêu đề ôn tập"
            className="min-w-lg px-3 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={practiceTitle}
            onChange={(e) => {
              setPracticeTitle(e.target.value);
            }}
          />
        </label>

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
            }
          }}
          onSelect={handleChapterSelect}
          onOpen={() => setIsOpenChapter(true)}
          onClose={() => setIsOpenChapter(false)}
        />

        {selectedChapter.trim() && (
          <div className="flex flex-col gap-10">
            {selectedLessons.map((lesson, index) => {
              return (
                <LessonBlock
                  key={index}
                  lesson={lesson}
                  selectedLessons={selectedLessons}
                  index={index}
                  lessonsData={lessonsData}
                  setSelectedLessons={setSelectedLessons}
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
