import { ExtractedData } from 'src/questions/domain/document.entity';

export default function ExtractOptions(
  content: any[],
  resBase: ExtractedData,
  curOptionIndex: number,
) {
  if (!resBase.options) return;
  let template = '';
  const variables = {};

  content.forEach((raw) => {
    if (raw.t === 'Str') template += raw.c;
    else if (raw.t === 'Space') template += ' ';
    else if (raw.t === 'Math') {
      let curVarIndex = 0;
      if (resBase.options![curOptionIndex]) {
        curVarIndex = Object.keys(
          resBase.options![curOptionIndex].variables,
        ).length;
      }
      template += `<math_${curVarIndex}>`;
      variables[`math_${curVarIndex}`] = raw.c[1];
    }
  });
  resBase.options!.push({ template: template, variables: variables });
}
