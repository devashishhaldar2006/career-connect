export const getDifficultyBadgeClass = (difficulty) => {
  switch (difficulty?.toLowerCase()) {
    case "easy":
      return "bg-[#1E2E24] text-[#7FD69E] border border-[#2E4837]";
    case "medium":
      return "bg-[#332A1D] text-[#E5BA73] border border-[#4D3F28]";
    case "hard":
      return "bg-[#351E20] text-[#F87171] border border-[#52292C]";
    default:
      return "bg-[#202227] text-[#9CA3AF] border border-[#2F333B]";
  }
};