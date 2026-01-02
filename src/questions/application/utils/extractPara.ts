import path from 'path';
import * as fs from 'fs-extra';
import { ExtractedData } from 'src/questions/domain/document.entity';
import { v4 } from 'uuid';

export default function ExtractPara(
  content: any[],
  resBase: ExtractedData,
  uploadDir: string,
) {
  // Xử lý câu hỏi
  // Có thể là p thuần hoặc lồng math
  if (content.length > 1) {
    content.forEach((raw) => {
      if (raw.t === 'Str') resBase.question.template += raw.c;
      else if (raw.t === 'Space') resBase.question.template += ' ';
      else if (raw.t === 'Math') {
        const curVarIndex = Object.keys(resBase.question.variables.math).length;
        resBase.question.template += `<math_${curVarIndex}>`;
        resBase.question.variables.math[`math_${curVarIndex}`] = raw.c[1];
      }
    });
  }
  // Xử lý ảnh
  else if (content[0].t === 'Image') {
    const curVarIndex = Object.keys(resBase.question.variables.image).length;
    resBase.question.template += ` \n<img_${curVarIndex}>\n `;

    const rawSrc = content[0].c[2][0];
    const sourcePath = path.resolve(rawSrc);

    const extension = path.extname(rawSrc);
    const newFileName = `${v4()}${extension}`;

    const destPath = path.join(uploadDir, newFileName);

    try {
      fs.moveSync(sourcePath, destPath, { overwrite: true });
      const publicUrl = `/static/${newFileName}`;
      resBase.question.variables.image[`img_${curVarIndex}`] = publicUrl;
    } catch (err) {
      console.error(`Lỗi di chuyển ảnh ${rawSrc}:`, err);
    }
  }
}
