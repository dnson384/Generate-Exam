const LEVEL_RATIO: Record<string, number> = {
  'Nhận biết': 0.4,
  'Thông hiểu': 0.3,
  'Vận dụng': 0.2,
  'Vận dụng cao': 0.1,
};

export function createLevelConfig(totalQuestions: number) {
  const result: Record<string, number> = {};

  let assigned = 0;
  const remainders: { level: string; remainder: number }[] = [];

  Object.entries(LEVEL_RATIO).forEach(([level, ratio]) => {
    const exact = totalQuestions * ratio;
    const floorValue = Math.floor(exact);

    result[level] = floorValue;
    assigned += floorValue;

    remainders.push({
      level,
      remainder: exact - floorValue,
    });
  });

  let remain = totalQuestions - assigned;

  remainders.sort((a, b) => b.remainder - a.remainder);

  for (let i = 0; i < remain; i++) {
    const level = remainders[i % remainders.length].level;
    result[level]++;
  }

  return result;
}
