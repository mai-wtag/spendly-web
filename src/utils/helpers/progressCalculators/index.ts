export const calculateProgress = (current: number, target: number): number => {
  return Math.round((current / target) * 100);
};

export const calculateRemaining = (current: number, target: number): number => {
  return target - current;
};

export const getProgressColor = (progress: number): string => {
  if (progress >= 100) {
    return "bg-green-500";
  }
  if (progress >= 75) {
    return "bg-teal-500";
  }
  if (progress >= 50) {
    return "bg-blue-500";
  }
  if (progress >= 25) {
    return "bg-yellow-500";
  }

  return "bg-gray-400";
};
