import { ParsedDataOutput } from "../dtos/parse-docx.dto";

export abstract class IFileParser {
  abstract parse(buffer: Buffer): Promise<ParsedDataOutput>;
}
