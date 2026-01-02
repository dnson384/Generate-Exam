import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';
import { v4 } from 'uuid';
import { PandocContents } from './dto/pandocOutput';
import ExtractHeader from './utils/extractHeader';
import ExtractPara from './utils/extractPara';
import { ExtractedData } from '../domain/document.entity';
import ExtractOptions from './utils/extractOptions';
const pandoc = require('node-pandoc-promise');

@Injectable()
export class DocumentService {
  private readonly uploadDir: string;
  private readonly staticDir: string;

  constructor() {
    this.staticDir = path.join(process.cwd(), 'static');
    this.uploadDir = path.join(this.staticDir, 'uploads');

    fs.ensureDirSync(this.uploadDir);
  }

  async parseDocx(file: Express.Multer.File): Promise<ExtractedData[]> {
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
      const html: Array<any> = AST.blocks;
      const hasOptions = html.find((ele) => ele.t === 'BulletList');

      const initialResEle = (): ExtractedData => ({
        type: '',
        level: '',
        section: '',
        question: {
          template: '',
          variables: {
            math: {},
            image: {},
          },
        },
        ...(hasOptions && {
          options: [],
        }),
      });

      const res: ExtractedData[] = [];
      html.forEach((element) => {
        const title = element.t;
        const content = element.c;

        // Level & section
        if (title === 'Header') {
          const { level, text } = ExtractHeader(content);

          if (level === 1) {
            res.push(initialResEle());
            res[res.length - 1].type = text;
          } else if (level === 2) res[res.length - 1].level = text;
          else if (level === 3) res[res.length - 1].section = text;
        }
        // Content
        else if (title === 'Para') {
          ExtractPara(content, res[res.length - 1], this.uploadDir);
        }
        // Xử lý option (với các câu trắc nghiệm / đúng sai)
        else if (hasOptions && title === 'BulletList') {
          content.forEach((raw: PandocContents, index: number) => {
            ExtractOptions(raw[0].c, res[res.length - 1], index);
          });
        }
      });

      return res;
    } catch (err) {
      console.error('Lỗi Pandoc:', err);
      throw new Error(
        'Lỗi chuyển đổi file. Hãy chắc chắn đã cài Pandoc lên Server.',
      );
    } finally {
      await fs.remove(tempFilePath).catch(() => {});
    }
  }
}
