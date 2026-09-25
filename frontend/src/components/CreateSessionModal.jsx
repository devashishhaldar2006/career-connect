import { Code2, Loader2, Plus, X, Layers, AlertCircle } from "lucide-react";
import { PROBLEMS } from "../data/problems";
import { getDifficultyBadgeClass } from "../lib/utils";

export default function CreateSessionModal({
  isOpen,
  onClose,
  roomConfig,
  setRoomConfig,
  onCreateRoom,
  isCreating,
}) {
  const problems = Object.values(PROBLEMS);

  if (!isOpen) return null;

  const selectedProblemData = problems.find((p) => p.title === roomConfig.problem);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm font-sans">
      <div className="w-full max-w-lg rounded-xl bg-[#16171C] border border-[#2B2E38] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#181A20] border-b border-[#24262E]">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-lg bg-[#20222A] border border-[#2D303B] flex items-center justify-center text-[#A1A1AA]">
              <Plus className="size-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#FAFAFA]">Configure Interview Room</h3>
              <p className="text-[11px] text-[#71717A]">Set up a live coding problem environment</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="size-7 rounded-md flex items-center justify-center text-[#71717A] hover:text-[#FAFAFA] hover:bg-[#23252E] transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Body Form */}
        <div className="p-6 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#D4D4D8] flex items-center justify-between">
              <span>Select Technical Challenge</span>
              <span className="text-[11px] text-[#71717A]">Standard Interview Set</span>
            </label>

            <select
              className="w-full bg-[#1A1C22] border border-[#282B34] rounded-lg px-3.5 py-2.5 text-xs text-[#E4E4E7] outline-none hover:border-[#3D4250] focus:border-[#4F5668] transition-colors cursor-pointer"
              value={roomConfig.problem}
              onChange={(e) => {
                const selectedProblem = problems.find((p) => p.title === e.target.value);
                setRoomConfig({
                  difficulty: selectedProblem.difficulty,
                  problem: e.target.value,
                });
              }}
            >
              <option value="" disabled className="bg-[#1A1C22]">
                Choose challenge problem...
              </option>
              {problems.map((problem) => (
                <option key={problem.id} value={problem.title} className="bg-[#1A1C22]">
                  {problem.title} ({problem.difficulty})
                </option>
              ))}
            </select>
          </div>

          {/* Selected problem preview */}
          {selectedProblemData && (
            <div className="p-4 rounded-lg bg-[#191B22] border border-[#262832] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#FAFAFA]">
                  {selectedProblemData.title}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-medium tracking-wide ${getDifficultyBadgeClass(
                    selectedProblemData.difficulty
                  )}`}
                >
                  {selectedProblemData.difficulty}
                </span>
              </div>
              <p className="text-xs text-[#A1A1AA] line-clamp-2">
                {selectedProblemData.description.text}
              </p>
              <div className="text-[11px] text-[#71717A] pt-1 border-t border-[#23252E]">
                Category: <span className="text-[#ECEFF4]">{selectedProblemData.category}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#141519] border-t border-[#23252C] flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 rounded-md text-xs font-medium text-[#9CA3AF] hover:text-[#FAFAFA] hover:bg-[#1E2028] transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!roomConfig.problem || isCreating}
            onClick={onCreateRoom}
            className={`px-4 py-2 rounded-md text-xs font-semibold flex items-center gap-2 transition-all ${
              !roomConfig.problem || isCreating
                ? "bg-[#202229] text-[#6B7280] border border-[#282A33] cursor-not-allowed"
                : "bg-[#2E6B48] hover:bg-[#347A53] text-[#ECFDF5] border border-[#3E8B5E] shadow-sm"
            }`}
          >
            {isCreating ? (
              <>
                <Loader2 className="size-3.5 animate-spin text-[#94A3B8]" />
                <span>Initializing Room...</span>
              </>
            ) : (
              <>
                <Plus className="size-3.5" />
                <span>Create & Join Room</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
