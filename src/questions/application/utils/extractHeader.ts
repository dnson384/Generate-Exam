import { PandocEleOutput } from '../dto/pandocOutput';

export default function ExtractHeader(content: any[]) {
  const headerLevel = content[0];
  const rawText = content[2].reduce((text: string, cur: PandocEleOutput) => {
    if (cur.t === 'Str') text += cur.c;
    else if (cur.t === 'Space') text += ' ';

    return text;
  }, '');

  return {
    level: headerLevel,
    text: rawText,
  };
}
