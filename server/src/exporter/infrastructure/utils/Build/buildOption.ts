import sizeOf from 'image-size';
import {
  AlignmentType,
  BorderStyle,
  HeightRule,
  ImageRun,
  Paragraph,
  Tab,
  Table,
  TableCell,
  TableLayoutType,
  TableRow,
  TabStopPosition,
  TabStopType,
  TextRun,
  VerticalAlign,
  WidthType,
} from 'docx';
import { ContentDTO } from 'src/exporter/application/dtos/exporter.dto';
import { latexToOmml } from '../Converter/mathConverter';

interface MathContext {
  map: Record<string, string>;
  counter: number;
}
interface MathOptionContext {
  [questionId: string]: MathContext;
}

export function BuildOption(
  questionId: string,
  index: number,
  questionType: string,
  option: ContentDTO,
  regex: RegExp,
  imageCache: Record<string, Buffer>,
  mathOptionContext: MathOptionContext,
): any[] {
  if (!mathOptionContext[questionId]) {
    mathOptionContext[questionId] = {
      map: {},
      counter: 0,
    };
  }

  const currentQuestion: any[] = [];

  const template = option.template;
  const mathVars = option.variables.math;
  const imageVars = option.variables.image;

  let questionsNode: any[] = [];

  if (questionType === 'Trắc nghiệm') {
    questionsNode.push(
      new TextRun({
        text: `${String.fromCharCode(65 + index)}. `,
        bold: true,
      }),
    );
  } else if (questionType === 'Đúng sai') {
    questionsNode.push(
      new TextRun({
        text: `${String.fromCharCode(97 + index)}. `,
        bold: true,
      }),
    );
  }

  const parts = template.split(regex);

  parts.forEach((part) => {
    // Công thức toán học
    if (part.startsWith('<math_') && part.endsWith('>')) {
      const mathKey = part.replace(/[<>]/g, '');
      const latex = mathVars[mathKey];
      const omml = latexToOmml(latex);
      const placeholderId = `MMMMATH_${questionId}_${mathOptionContext[questionId].counter++}_MMMM`;
      mathOptionContext[questionId].map[placeholderId] = omml;
      questionsNode.push(new TextRun(placeholderId));
    }
    // Ảnh
    else if (part.startsWith('<img_') && part.endsWith('>')) {
      if (questionsNode.length > 0) {
        currentQuestion.push(new Paragraph({ children: questionsNode }));
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
        const imageType =
          dimensions.type === 'jpg' ? 'jpeg' : dimensions.type || 'png';

        currentQuestion.push(
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
    if (questionType === 'Đúng sai') {
      const boxWidth = 567;

      const allBorders = {
        top: { style: BorderStyle.SINGLE, size: 6 },
        bottom: { style: BorderStyle.SINGLE, size: 6 },
        left: { style: BorderStyle.SINGLE, size: 6 },
        right: { style: BorderStyle.SINGLE, size: 6 },
      };

      const noBorders = {
        top: { style: BorderStyle.NONE },
        bottom: { style: BorderStyle.NONE },
        left: { style: BorderStyle.NONE },
        right: { style: BorderStyle.NONE },
      };

      currentQuestion.push(
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: {
            top: { style: BorderStyle.NONE },
            bottom: { style: BorderStyle.NONE },
            left: { style: BorderStyle.NONE },
            right: { style: BorderStyle.NONE },
            insideVertical: { style: BorderStyle.NONE },
            insideHorizontal: { style: BorderStyle.NONE },
          },
          rows: [
            new TableRow({
              height: { value: 500, rule: HeightRule.ATLEAST },
              children: [
                // Cột 1
                new TableCell({
                  borders: noBorders,
                  children: [
                    new Paragraph({
                      children: questionsNode,
                      alignment: AlignmentType.JUSTIFIED,
                    }),
                  ],
                  verticalAlign: VerticalAlign.CENTER,
                }),
                // Cột 2
                new TableCell({
                  width: { size: boxWidth, type: WidthType.DXA },
                  borders: allBorders,
                  children: [
                    new Paragraph({
                      text: 'Đ',
                      alignment: AlignmentType.CENTER,
                    }),
                  ],
                  verticalAlign: VerticalAlign.CENTER,
                }),
                // Cột 3
                new TableCell({
                  width: { size: boxWidth, type: WidthType.DXA },
                  borders: allBorders,
                  children: [
                    new Paragraph({
                      text: '\u00A0',
                      alignment: AlignmentType.CENTER,
                    }),
                  ],
                }),
                // Cột 4: Ô S
                new TableCell({
                  width: { size: boxWidth, type: WidthType.DXA },
                  borders: allBorders,
                  children: [
                    new Paragraph({
                      text: 'S',
                      alignment: AlignmentType.CENTER,
                    }),
                  ],
                  verticalAlign: VerticalAlign.CENTER,
                }),
              ],
            }),
          ],
        }),
      );
    } else {
      currentQuestion.push(new Paragraph({ children: questionsNode }));
    }
  }

  return currentQuestion;
}
