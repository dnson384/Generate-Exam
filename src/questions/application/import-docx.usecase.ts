import { Injectable } from '@nestjs/common';
import mammoth from 'mammoth';

@Injectable()
export class DocumentService {
  async parseDocx(file: Express.Multer.File): Promise<string> {
    if (!file) throw new Error('File không tồn tại');
    try {
      const result = await mammoth.convertToHtml({ buffer: file.buffer });
      return result.value;
    } catch (err) {
      console.error('Lỗi chuyển đổi Docx:', err);
      throw new Error('Không thể chuyển đổi file sang HTML');
    }
  }
}
