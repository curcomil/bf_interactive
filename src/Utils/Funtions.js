export default function duplicateAndShuffle(array) {
  const shuffled = [...array].sort(() => Math.random() - 0.5);

  const selected = shuffled.slice(0, 9);

  const duplicated = selected.flatMap((item) => [
    { ...item, uid: `${item.id}-a` },
    { ...item, uid: `${item.id}-b` },
  ]);

  for (let i = duplicated.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [duplicated[i], duplicated[j]] = [duplicated[j], duplicated[i]];
  }

  return duplicated;
}
