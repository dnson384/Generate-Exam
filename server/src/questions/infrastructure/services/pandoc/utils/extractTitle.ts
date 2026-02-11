import { PandocEleOutput } from '../dto/pandocOutput';

export default function ExtractTitle(content: any[]) {
  const rawText: string = content.reduce(
    (text: string, cur: PandocEleOutput) => {
      if (cur.t === 'Str') text += cur.c;
      else if (cur.t === 'Space') text += ' ';

      return text;
    },
    '',
  );
  return rawText;
}
