import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';
import { v4 } from 'uuid';
import { PandocContents } from './dto/pandocOutput';
import ExtractHeader from './utils/extractHeader';
import ExtractPara from './utils/extractPara';
import ExtractOptions from './utils/extractOptions';
import ExtractTitle from './utils/extractTitle';
import {
  OptionsData,
  QuestionEntity,
} from '../domain/entities/question.entity';
import { IQuestionRepository } from '../domain/repositories/question.repository';
import { retry } from 'rxjs';
const pandoc = require('node-pandoc-promise');

@Injectable()
export class DocumentService {
  private readonly uploadDir: string;
  private readonly staticDir: string;
  constructor(private readonly questionRepo: IQuestionRepository) {
    this.staticDir = path.join(process.cwd(), 'static');
    this.uploadDir = path.join(this.staticDir, 'uploads');

    fs.ensureDirSync(this.uploadDir);
  }

  async parseDocx(file: Express.Multer.File): Promise<boolean> {
    if (!file) throw new Error('File không tồn tại');

    const tempFileName = `temp_${v4()}.docx`;
    const tempFilePath = path.join(this.uploadDir, tempFileName);
    try {
      await fs.writeFile(tempFilePath, file.buffer);

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

      let initialResEle = (
        chapter: string = '',
        lesson: string = '',
      ): QuestionEntity => ({
        chapter: chapter,
        lesson: lesson,
        category: '',
        level: '',
        learningOutcome: [],
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

      let chapter: string = '';
      let lesson: string = '';

      const res: QuestionEntity[] = [];
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

      html.forEach((element) => {
        const title = element.t;
        const content = element.c;

        // Category & Level & LearningOutcomes
        if (title === 'Header') {
          const { level, text } = ExtractHeader(content);

          if (level === 1) {
            res.push(initialResEle(chapter, lesson));
            res[res.length - 1].chapter = chapter;
            res[res.length - 1].lesson = lesson;
            res[res.length - 1].category = text;
          } else if (level === 2) {
            res[res.length - 1].level = text;
          } else if (level === 3) {
            res[res.length - 1].learningOutcome.push(text);
          } else if (level === 4) {
            res[res.length - 1].questionType = text;
          }
        }
        // Question
        else if (title === 'Para') {
          ExtractPara(
            content,
            res.length,
            res[res.length - 1],
            chapter,
            lesson,
            this.uploadDir,
          );
        }
        // Options
        else if (hasOptions && title === 'BulletList') {
          content.forEach((raw: PandocContents) => {
            res[res.length - 1].options.push(initialOption());
            ExtractOptions(
              raw[0].c,
              res[res.length - 1],
              res.length,
              res[res.length - 1].options.length - 1,
              chapter,
              lesson,
              this.uploadDir,
            );
          });
        }
      });

      if (res.length > 0) {
        return await this.questionRepo.saveQuestions(res);
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
