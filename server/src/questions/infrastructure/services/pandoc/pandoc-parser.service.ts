import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';
import { v4 } from 'uuid';
import { PandocContents } from './dto/pandocOutput';
import ExtractHeader from './utils/extractHeader';
import ExtractPara from './utils/extractPara';
import ExtractOptions from './utils/extractOptions';
import ExtractTitle from './utils/extractTitle';
import { IFileParser } from './../../../application/ports/file-parser.port';
import {
  OptionsData,
  QuestionEntity,
} from 'src/questions/domain/entities/question.entity';
import {
  LessonData,
  CategoryEntity,
} from 'src/questions/domain/entities/category.entity';
import { ParsedDataOutput } from 'src/questions/application/dtos/parse-docx.dto';
import { toArray } from 'rxjs';
const pandoc = require('node-pandoc-promise');

@Injectable()
export class PandocParserService implements IFileParser {
  private readonly uploadDir: string;
  private readonly staticDir: string;
  constructor() {
    this.staticDir = path.join(process.cwd(), 'static');
    this.uploadDir = path.join(this.staticDir, 'uploads');

    fs.ensureDirSync(this.uploadDir);
  }

  async parse(buffer: Buffer): Promise<ParsedDataOutput> {
    const tempFileName = `temp_${v4()}.docx`;
    const tempFilePath = path.join(this.uploadDir, tempFileName);

    try {
      await fs.writeFile(tempFilePath, buffer);

      const args = [
        '-f',
        'docx',
        '-t',
        'json',
        '--mathjax',
        `--extract-media=${this.uploadDir}`,
      ];
      const result = await pandoc(tempFilePath, args);
      const AST = JSON.parse(result);
      const meta = AST.meta;
      const html: any[] = AST.blocks;
      const hasOptions = html.find((ele) => ele.t === 'BulletList');

      const initialOption = (): OptionsData => ({
        template: '',
        variables: {
          math: {},
          image: {},
        },
      });

      let initialQuestionRes = (
        chapter: string = '',
        lesson: string = '',
      ): QuestionEntity => ({
        chapter: chapter,
        lesson: lesson,
        exerciseType: '',
        difficultyLevel: '',
        learningOutcomes: [],
        questionType: '',
        question: {
          template: '',
          variables: {
            math: {},
            image: {},
          },
        },
        options: [],
      });

      let initialLessonData = (name: string): LessonData => ({
        name: name,
        exerciseTypes: [],
        difficultyLevels: [],
        learningOutcomes: [],
        questionTypes: [],
      });

      let chapter: string = '';
      let lesson: string = '';

      const questionsRes: QuestionEntity[] = [];
      const categoryRes: CategoryEntity = {
        chapter: '',
        lessons: [],
      };
      Object.entries(meta).forEach(([key, value]: [string, any]) => {
        const content: any[] = value.c;
        // Chapter
        if (key === 'title') {
          chapter = ExtractTitle(content);
        }
        // Lesson
        else if (key === 'subtitle') {
          lesson = ExtractTitle(content);
        }
      });

      // Tạo cate cho chương và bài
      categoryRes.chapter = chapter;
      categoryRes.lessons.push(initialLessonData(lesson));

      html.forEach((element) => {
        const title = element.t;
        const content = element.c;

        // Category & Level & LearningOutcomes
        if (title === 'Header') {
          const { level, text } = ExtractHeader(content);

          // Dạng bài
          if (level === 1) {
            questionsRes.push(initialQuestionRes(chapter, lesson));
            questionsRes[questionsRes.length - 1].exerciseType = text;
            categoryRes.lessons[
              categoryRes.lessons.length - 1
            ].exerciseTypes.push(text);
          }
          // Độ khó
          else if (level === 2) {
            questionsRes[questionsRes.length - 1].difficultyLevel = text;
            categoryRes.lessons[
              categoryRes.lessons.length - 1
            ].difficultyLevels.push(text);
          }
          // Yêu cầu cần đạt
          else if (level === 3) {
            questionsRes[questionsRes.length - 1].learningOutcomes.push(text);
            categoryRes.lessons[
              categoryRes.lessons.length - 1
            ].learningOutcomes.push(text);
          } else if (level === 4) {
            questionsRes[questionsRes.length - 1].questionType = text;
            categoryRes.lessons[
              categoryRes.lessons.length - 1
            ].questionTypes.push(text);
          }
        }
        // Question
        else if (title === 'Para') {
          ExtractPara(
            content,
            questionsRes.length,
            questionsRes[questionsRes.length - 1],
            chapter,
            lesson,
            this.uploadDir,
          );
        }
        // Options
        else if (hasOptions && title === 'BulletList') {
          content.forEach((raw: PandocContents) => {
            questionsRes[questionsRes.length - 1].options.push(initialOption());
            ExtractOptions(
              raw[0].c,
              questionsRes[questionsRes.length - 1],
              questionsRes.length,
              questionsRes[questionsRes.length - 1].options.length - 1,
              chapter,
              lesson,
              this.uploadDir,
            );
          });
        }
      });

      if (questionsRes.length > 0) {
        const curLesson = categoryRes.lessons.length - 1;
        categoryRes.lessons[curLesson].exerciseTypes = Array.from(
          new Set(categoryRes.lessons[curLesson].exerciseTypes),
        );
        categoryRes.lessons[curLesson].difficultyLevels = Array.from(
          new Set(categoryRes.lessons[curLesson].difficultyLevels),
        );
        categoryRes.lessons[curLesson].learningOutcomes = Array.from(
          new Set(categoryRes.lessons[curLesson].learningOutcomes),
        );
        categoryRes.lessons[curLesson].questionTypes = Array.from(
          new Set(categoryRes.lessons[curLesson].questionTypes),
        );

        return { questions: questionsRes, category: categoryRes };
      } else {
        throw Error('File rỗng');
      }
    } catch (err) {
      console.error('Lỗi Pandoc:', err);
      throw new Error('Lỗi chuyển đổi file.');
    } finally {
      await fs.remove(tempFilePath).catch(() => {});
    }
  }
}
