export const getRandomNumbers = (count: number, min: number, max: number) => {
  const range = Array.from({ length: max - min + 1 }, (_, i) => i + min);
  const shuffled = range.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
