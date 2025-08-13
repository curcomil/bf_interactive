function duplicateAndShuffle(array) {
  const duplicated = [...array, ...array];

  for (let i = duplicated.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [duplicated[i], duplicated[j]] = [duplicated[j], duplicated[i]];
  }

  return duplicated;
}

export default duplicateAndShuffle;
