import { Injectable } from '@nestjs/common';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  ImageRun,
} from 'docx';
import * as JSZip from 'jszip';
import sizeOf from 'image-size';
import { WordPayloadDTO } from './dtos/exporter.dto';
import { getImageBuffer } from '../infrastructure/utils/getImageBuffer';
import { latexToOmml } from '../infrastructure/utils/mathConverter';

@Injectable()
export class ExporterUsecase {
  async generateWordFile(data: WordPayloadDTO): Promise<Buffer> {
    const children: any[] = [];

    const regex = /(<(?:math|img)_\d+>)/g;

    const mathMap: Record<string, string> = {};
    let mathCounter = 0;

    const imageCache: Record<string, Buffer> = await getImageBuffer(
      data.questionsSorted,
    );

    // Tiêu đề
    children.push(
      new Paragraph({
        text: data.title,
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
      }),
    );

    Object.entries(data.questionsSorted).forEach(
      ([lessonName, questions], index) => {
        // Phần
        children.push(
          new Paragraph({
            text: `Phần ${index + 1}. ${lessonName}`,
            heading: HeadingLevel.HEADING_2,
          }),
        );

        // Câu hỏi
        questions.forEach((q, index) => {
          const template = q.question.template;
          const mathVars = q.question.variables.math;
          const imageVars = q.question.variables.image;

          // Đề bài
          let questionsNode: any[] = [];
          questionsNode.push(
            new TextRun({
              text: `Câu ${index + 1}. `,
              bold: true,
            }),
          );

          const parts = template.split(regex);

          parts.forEach((part) => {
            // Công thức toán học
            if (part.startsWith('<math_') && part.endsWith('>')) {
              const mathKey = part.replace(/[<>]/g, '');
              const latex = mathVars[mathKey];
              const omml = latexToOmml(latex);
              const placeholderId = `MMMMATH_${mathCounter++}MMMM`;
              mathMap[placeholderId] = omml;
              questionsNode.push(new TextRun(placeholderId));
            }
            // Ảnh
            else if (part.startsWith('<img_') && part.endsWith('>')) {
              if (questionsNode.length > 0) {
                children.push(new Paragraph({ children: questionsNode }));
                questionsNode = [];
              }

              const imageKey = part.replace(/[<>]/g, '');
              const imageURL = imageVars[imageKey];
              const buffer = imageCache[imageURL];

              if (buffer) {
                const dimensions = sizeOf(buffer);
                const width = Math.round(Math.min(dimensions.width, 151));
                const height = Math.round(
                  (width * dimensions.height) / dimensions.width,
                );
                const imageType = dimensions.type === 'jpg' ? 'jpeg' : (dimensions.type || 'png');

                children.push(
                  new Paragraph({
                    children: [
                      new ImageRun({
                        data: buffer,
                        transformation: {
                          width: width,
                          height: height,
                        },
                        type: imageType as any,
                      }),
                    ],
                    alignment: AlignmentType.CENTER,
                  }),
                );
              }
            }
            // Text
            else {
              questionsNode.push(new TextRun({ text: part }));
            }
          });

          if (questionsNode.length > 0) {
            children.push(new Paragraph({ children: questionsNode }));
          }
        });
      },
    );

    const doc = new Document({
      sections: [{ properties: {}, children }],
    });

    const rawBuffer = await Packer.toBuffer(doc);
    const zip = await JSZip.loadAsync(rawBuffer);
    let documentXml = await zip.file('word/document.xml')?.async('string');

    if (documentXml) {
      Object.entries(mathMap).forEach(([placeholderId, omml]) => {
        const runRegex = new RegExp(
          `<w:r\\b[^>]*>(?:(?!<\\/w:r>)[\\s\\S])*?${placeholderId}(?:(?!<\\/w:r>)[\\s\\S])*?<\\/w:r>`,
          'g',
        );

        documentXml = documentXml!.replace(runRegex, omml);
      });

      zip.file('word/document.xml', documentXml);
    }

    return await zip.generateAsync({
      type: 'nodebuffer',
    });
  }
}
