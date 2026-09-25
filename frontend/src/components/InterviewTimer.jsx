import { useEffect, useState } from "react";
import { Clock, Play, Pause, RotateCcw, AlertTriangle } from "lucide-react";

export default function InterviewTimer({
  initialMinutes = 45,
  isActive = true,
  onStageChange,
}) {
  const [secondsRemaining, setSecondsRemaining] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(isActive);

  const totalSeconds = initialMinutes * 60;
  const elapsedSeconds = totalSeconds - secondsRemaining;
  const progressRatio = Math.min(1, Math.max(0, elapsedSeconds / totalSeconds));

  useEffect(() => {
    let timer;
    if (isRunning && secondsRemaining > 0) {
      timer = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsRemaining]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  // Interview stage calculation
  // Stage 1: Clarification & Approach (first 15%)
  // Stage 2: Implementation & Coding (15% to 75%)
  // Stage 3: Testing & Edge Cases (75% to 90%)
  // Stage 4: Wrap-up & Evaluation (last 10%)
  let currentStage = "Implementation";
  let stageColor = "text-[#A1A1AA]";
  if (progressRatio < 0.15) {
    currentStage = "Problem Review & Approach";
    stageColor = "text-[#7FD69E]";
  } else if (progressRatio < 0.75) {
    currentStage = "Active Implementation";
    stageColor = "text-[#60A5FA]";
  } else if (progressRatio < 0.9) {
    currentStage = "Verification & Edge Cases";
    stageColor = "text-[#E5BA73]";
  } else {
    currentStage = "Final Review & Wrap-up";
    stageColor = "text-[#F87171]";
  }

  const isLowTime = secondsRemaining <= 300 && secondsRemaining > 0; // <= 5 mins

  return (
    <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-[#18191E] border border-[#262832]">
      {/* Progress pill indicator */}
      <div className="flex items-center gap-2">
        <div className="relative size-6 flex items-center justify-center">
          <svg className="size-6 -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-[#252830]"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className={
                isLowTime
                  ? "text-[#F87171] transition-all duration-300"
                  : "text-[#60A5FA] transition-all duration-300"
              }
              strokeDasharray={`${(1 - progressRatio) * 100}, 100`}
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <Clock className="size-3 text-[#A1A1AA] absolute" />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-[#FAFAFA] tracking-wide">
            {formattedTime}
            {isLowTime && (
              <span className="flex h-1.5 w-1.5 rounded-full bg-[#F87171] animate-ping" />
            )}
          </div>
          <span className={`text-[10px] ${stageColor} tracking-tight font-medium -mt-0.5`}>
            {currentStage}
          </span>
        </div>
      </div>

      <button
        onClick={() => setIsRunning(!isRunning)}
        className="size-6 rounded flex items-center justify-center text-[#71717A] hover:text-[#FAFAFA] hover:bg-[#23252E] transition-colors"
        title={isRunning ? "Pause interview timer" : "Resume interview timer"}
      >
        {isRunning ? <Pause className="size-3" /> : <Play className="size-3" />}
      </button>
    </div>
  );
}
