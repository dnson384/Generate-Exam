import { Injectable } from '@nestjs/common';
import { Document, Packer, Paragraph, HeadingLevel, AlignmentType } from 'docx';
import * as JSZip from 'jszip';
import { WordPayloadDTO } from './dtos/exporter.dto';
import { getQuestionImageBuffer } from '../infrastructure/utils/Get/getQuestionImageBuffer';
import { BuildQuestion } from '../infrastructure/utils/Build/buildQuestion';
import { BuildOption } from '../infrastructure/utils/Build/buildOption';
import { getOptionImageBuffer } from '../infrastructure/utils/Get/getOptionImageBuffer';

interface MathContext {
  map: Record<string, string>;
  counter: number;
}
interface MathOptionContext {
  [questionId: string]: MathContext;
}

@Injectable()
export class ExporterUsecase {
  async generateWordFile(data: WordPayloadDTO): Promise<Buffer> {
    const children: any[] = [];

    const regex = /(<(?:math|img)_\d+>)/g;

    const mathContext: MathContext = {
      map: {},
      counter: 0,
    };

    const mathOptionContext: MathOptionContext = {};

    const imageQuestionCache: Record<string, Buffer> =
      await getQuestionImageBuffer(data.questionsSorted);

    // Tiêu đề
    children.push(
      new Paragraph({
        text: data.title,
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
      }),
    );

    for (const [index, [lessonName, questions]] of Object.entries(
      data.questionsSorted,
    ).entries()) {
      // Phần
      children.push(
        new Paragraph({
          text: `Phần ${index + 1}. ${lessonName}`,
          heading: HeadingLevel.HEADING_2,
        }),
      );

      // Câu hỏi
      for (const [index, q] of questions.entries()) {
        const currentQuestion = BuildQuestion(
          index,
          q.question,
          regex,
          imageQuestionCache,
          mathContext,
        );

        const imageOptionCache = await getOptionImageBuffer(q.options);

        q.options.forEach((opt, index) => {
          const currentOption = BuildOption(
            q.id,
            index,
            q.questionType,
            opt,
            regex,
            imageOptionCache,
            mathOptionContext,
          );

          currentQuestion.push(...currentOption);
        });

        children.push(...currentQuestion);
      }
    }

    const doc = new Document({
      styles: {
        default: {
          document: {
            run: {
              size: 26,
              font: 'Times New Roman',
              color: '000000',
            },
            paragraph: {
              alignment: AlignmentType.JUSTIFIED,
              spacing: {
                before: 120,
                after: 120,
                line: 312,
                lineRule: 'auto',
              },
              indent: { left: 0, right: 0 },
            },
          },
          heading1: {
            run: {
              size: 34,
              font: 'Times New Roman',
              color: '000000',
              allCaps: true,
              bold: true
            },
            paragraph: {
              alignment: AlignmentType.JUSTIFIED,
              spacing: {
                before: 0,
                after: 360,
                line: 312,
                lineRule: 'auto',
              },
              indent: { left: 0, right: 0 },
            },
          },
          heading2: {
            run: {
              size: 30,
              font: 'Times New Roman',
              color: '000000',
              bold: true
            },
            paragraph: {
              alignment: AlignmentType.JUSTIFIED,
              spacing: {
                before: 120,
                after: 120,
                line: 312,
                lineRule: 'auto',
              },
              indent: { left: 0, right: 0 },
            },
          },
        },
      },
      sections: [
        {
          properties: {
            page: {
              size: {
                width: 11907,
                height: 16840,
              },
              margin: {
                top: 1134,
                bottom: 1134,
                left: 1701,
                right: 851,
              },
            },
          },
          children: children,
        },
      ],
    });

    const rawBuffer = await Packer.toBuffer(doc);
    const zip = await JSZip.loadAsync(rawBuffer);
    let documentXml = await zip.file('word/document.xml')?.async('string');

    if (documentXml) {
      Object.entries(mathContext.map).forEach(([placeholderId, omml]) => {
        const runRegex = new RegExp(
          `<w:r\\b[^>]*>(?:(?!<\\/w:r>)[\\s\\S])*?${placeholderId}(?:(?!<\\/w:r>)[\\s\\S])*?<\\/w:r>`,
          'g',
        );

        documentXml = documentXml!.replace(runRegex, omml);
      });

      Object.entries(mathOptionContext).forEach(([questionId, context]) => {
        Object.entries(context.map).forEach(([placeholderId, omml]) => {
          const runRegex = new RegExp(
            `<w:r\\b[^>]*>(?:(?!<\\/w:r>)[\\s\\S])*?${placeholderId}(?:(?!<\\/w:r>)[\\s\\S])*?<\\/w:r>`,
            'g',
          );
          documentXml = documentXml!.replace(runRegex, omml);
        });
      });

      zip.file('word/document.xml', documentXml);
    }

    return await zip.generateAsync({
      type: 'nodebuffer',
    });
  }
}
