export const calculateRewards = (amount) => {
  if (amount <= 50) return 0;

  let points = 0;

  if (amount > 100) {
    points += Math.floor(amount - 100) * 2;
    points += 50;
  } else {
    points += Math.floor(amount - 50);
  }

  return points;
};
