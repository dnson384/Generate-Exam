import sizeOf from 'image-size';
import { AlignmentType, ImageRun, Paragraph, TextRun } from 'docx';
import { QuestionContentDTO } from 'src/exporter/application/dtos/exporter.dto';
import { latexToOmml } from './mathConverter';

interface MathContext {
  map: Record<string, string>;
  counter: number;
}

export function BuildQuestionPara(
  children: any[],
  index: number,
  question: QuestionContentDTO,
  regex: RegExp,
  imageCache: Record<string, Buffer>,
  mathContext: MathContext,
) {
  const template = question.template;
  const mathVars = question.variables.math;
  const imageVars = question.variables.image;

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
      const placeholderId = `MMMMATH_${mathContext.counter++}MMMM`;
      mathContext.map[placeholderId] = omml;
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
        const imageType =
          dimensions.type === 'jpg' ? 'jpeg' : dimensions.type || 'png';

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

  return children;
}
