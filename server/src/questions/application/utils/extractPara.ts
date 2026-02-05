import path from 'path';
import * as fs from 'fs-extra';
import { v4 } from 'uuid';
import { QuestionEntity } from 'src/questions/domain/entities/question.entity';

export default function ExtractPara(
  content: any[],
  currentQuestion: number,
  resBase: QuestionEntity,
  chapter: string,
  lesson: string,
  uploadDir: string,
) {
  // Xử lý câu hỏi
  // Xử lý ảnh
  if (content[0].t === 'Image') {
    const curVarIndex = Object.keys(resBase.question.variables.image).length;
    resBase.question.template += ` \n<img_${curVarIndex}>\n `;

    const rawSrc = content[0].c[2][0];
    const sourcePath = path.resolve(rawSrc);

    const extension = path.extname(rawSrc);
    const newFileName = `${v4()}${extension}`;

    const destPath = path.join(
      uploadDir,
      chapter,
      lesson,
      'question',
      currentQuestion.toString(),
      newFileName,
    );

    try {
      fs.moveSync(sourcePath, destPath, { overwrite: true });

      const staticIndex = destPath.indexOf('static');
      let relativePart = '';

      if (staticIndex !== -1) {
        relativePart = destPath.substring(staticIndex + 7);
      }

      const normalizedPath = relativePart.split(path.sep).join('/');
      const publicUrl = `/${encodeURI('static/' + normalizedPath)}`;

      resBase.question.variables.image[`img_${curVarIndex}`] = publicUrl;
    } catch (err) {
      console.error(`Lỗi di chuyển ảnh ${rawSrc}:`, err);
    }
  }
  // Xử lý option tích hợp ký tự, công thức
  else {
    content.forEach((raw) => {
      if (raw.t === 'Str') resBase.question.template += raw.c;
      else if (raw.t === 'Space') resBase.question.template += ' ';
      else if (raw.t === 'LineBreak') resBase.question.template += ' \n';
      else if (raw.t === 'Math') {
        const curVarIndex = Object.keys(resBase.question.variables.math).length;
        resBase.question.template += `<math_${curVarIndex}>`;
        resBase.question.variables.math[`math_${curVarIndex}`] = raw.c[1];
      }
    });
  }
}
