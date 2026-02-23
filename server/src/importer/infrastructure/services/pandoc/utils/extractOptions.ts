import path from 'path';
import * as fs from 'fs-extra';
import { v4 } from 'uuid';
import { NewQuestionImporterDTO } from 'src/importer/application/dtos/parse-docx.dto';

export default function ExtractOptions(
  content: any[],
  resBase: NewQuestionImporterDTO,
  curOptionIndex: number,
  uploadDir: string,
) {
  let template = '';
  const variables = {
    math: {},
    image: {},
  };

  // Xử lý option chỉ ảnh
  if (content[0].t === 'Image') {
    const curVarIndex = Object.keys(
      resBase.options[curOptionIndex].variables.image,
    ).length;
    template += `<image_${curVarIndex}>`;
    const rawSrc = content[0].c[2][0];
    const sourcePath = path.resolve(rawSrc);
    const extension = path.extname(rawSrc);
    const newFileName = `${v4()}${extension}`;
    const destPath = path.join(
      uploadDir,
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

      variables.image[`<image_${curVarIndex}>`] = publicUrl;
    } catch (err) {
      console.error(`Lỗi di chuyển ảnh ${rawSrc}:`, err);
    }
  }
  // Xử lý option tích hợp ký tự, công thức
  else {
    content.forEach((raw) => {
      if (raw.t === 'Str') template += raw.c;
      else if (raw.t === 'Space') template += ' ';
      else if (raw.t === 'Math') {
        let curVarIndex = 0;
        if (resBase.options[curOptionIndex]) {
          curVarIndex = Object.keys(
            resBase.options[curOptionIndex].variables,
          ).length;
        }
        template += `<math_${curVarIndex}>`;
        variables.math[`math_${curVarIndex}`] = raw.c[1];
      }
    });
  }

  resBase.options[curOptionIndex].template = template;
  resBase.options[curOptionIndex].variables = variables;
  // resBase.options.push({ template: template, variables: variables });
}
