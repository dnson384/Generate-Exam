"use client";
import usePractice from "@/presentation/hooks/Practice/usePractice";
import QuestionContent from "@/presentation/components/Practice/questionContent";
import MultipleChoiceContent from "@/presentation/components/Practice/multipleChoiceContent";

export default function Practice() {
  const { practice, questionsSorted } = usePractice();
  let questionOrder = 0;
  const multipleChoiceOrder = ["A", "B", "C", "D", "E"];

  return (
    <>
      {practice && questionsSorted ? (
        <>
          <h1 className="font-bold text-3xl text-center my-5">{practice.title}</h1>
          {Object.entries(questionsSorted).map(([lesson, questions], index) => {
            return (
              <main key={lesson} className="w-4xl mx-auto">
                <h2 className="font-bold text-xl">Phần {index+1}. {lesson}</h2>
                <div>
                  {questions.map((question) => {
                    questionOrder += 1;
                    const template = question.question.template;
                    const variables = question.question.variables;
                    const type = question.questionType;
                    return (
                      <div key={question.id} className="mb-3">
                        {/* Câu hỏi */}
                        <QuestionContent
                          order={questionOrder}
                          template={template}
                          variables={variables}
                        />

                        {/* Phương án trả lời */}
                        {type === "Trắc nghiệm" && (
                          <div className="ml-5">
                            {question.options.map((option, index) => {
                              return (
                                <div key={index}>
                                  <span>{multipleChoiceOrder[index]}. </span>
                                  <MultipleChoiceContent
                                    template={option.template}
                                    variables={option.variables}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        )}
                        {type === "Đúng sai" && <></>}
                      </div>
                    );
                  })}
                </div>
              </main>
            );
          })}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
