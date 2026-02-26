import { z } from "zod";

export const ContentSchema = z.object({
  template: z.string({ error: "Template câu hỏi không được để trống" }),
  variables: z.object({
    math: z.record(z.string(), z.string()),
    image: z.record(z.string(), z.string()),
  }),
});

export const QuestionExportPayload = z.object({
  id: z.string({ error: "Id không được để trống" }),
  questionType: z.string({ error: "Dạng câu hỏi không được để trống" }),
  question: ContentSchema,
  options: z.array(ContentSchema),
});

export const LessonExportPayload = z.record(
  z.string(),
  z.array(QuestionExportPayload),
);

export type QuestionExportPayload = z.infer<typeof QuestionExportPayload>;
export type LessonExportPayload = z.infer<typeof LessonExportPayload>;
