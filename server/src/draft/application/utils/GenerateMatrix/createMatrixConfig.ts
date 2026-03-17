export default function createMatrixConfig(
  questionTypes: string[],
  questionsCount: number,
  config: Record<string, number>,
): Record<string, number> {
  const hasTF = questionTypes.length > 3;

  let total = 0;

  questionTypes.forEach((type) => {
    let percent = 0;

    if (type === 'Nhiều lựa chọn') percent = 0.3;
    else if (type === 'Đúng sai') percent = hasTF ? 0.3 : 0.4;
    else if (hasTF && type === 'Trả lời ngắn') percent = 0.2;
    else percent = 0.3;

    const count = Math.floor(questionsCount * percent);
    config[type] = count;
    total += count;
  });

  const remain = questionsCount - total;

  if (remain > 0) {
    const lastType = questionTypes[questionTypes.length - 1];
    config[lastType] += remain;
  }

  return config;
}
