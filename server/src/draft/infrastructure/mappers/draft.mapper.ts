import {
  ChapterDraft,
  DraftEntity,
  LessonDraft,
} from 'src/draft/domain/entities/draft.entity';
import {
  DraftDocument,
  Drafts,
  LessonDraftSch,
  ChapterDraftSch,
} from '../schemas/draft.schema';
import { Types } from 'mongoose';

export class DraftMapper {
  static toDomain(raw: DraftDocument): DraftEntity {
    const rawContent = raw.toObject();

    const chapterDomain: ChapterDraft[] = rawContent.chapters.map((chapter) => {
      let lessonsDomain: LessonDraft[] = chapter.lessons.map((lesson) => ({
        id: lesson.id.toString(),
        name: lesson.name,
        matrix: lesson.matrix,
        matrixDetails: lesson.matrixDetails,
      }));

      return {
        id: chapter.id.toString(),
        name: chapter.name,
        lessons: lessonsDomain,
      };
    });

    return {
      id: rawContent._id.toString(),
      questionsCount: rawContent.questionsCount,
      questionTypes: rawContent.questionTypes,
      chapters: chapterDomain,
    };
  }

  static toSchema(entity: DraftEntity): Partial<Drafts> {
    const chaptersSchema: ChapterDraftSch[] = entity.chapters.map((chapter) => {
      const lessonsSchema: LessonDraftSch[] = chapter.lessons.map((lesson) => ({
        id: new Types.ObjectId(lesson.id),
        name: lesson.name,
        matrix: lesson.matrix,
        matrixDetails: lesson.matrixDetails,
      }));

      return {
        id: new Types.ObjectId(chapter.id),
        name: chapter.name,
        lessons: lessonsSchema,
      };
    });

    return {
      questionsCount: entity.questionsCount,
      questionTypes: entity.questionTypes,
      chapters: chaptersSchema,
    };
  }
}
