import { useState } from "react";
import { 
  FileText, 
  ListTree, 
  HelpCircle, 
  ChevronDown, 
  ChevronRight, 
  Check, 
  Copy,
  Lightbulb,
  AlertCircle
} from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";

export default function ProblemDescription({
  problem,
  currentProblemId,
  onProblemChange,
  allProblems,
}) {
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [showHints, setShowHints] = useState(false);

  const copyToClipboard = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  if (!problem) return null;

  return (
    <div className="h-full overflow-y-auto bg-[#141519] text-[#E4E4E7] font-sans selection:bg-[#2F333E]">
      {/* Header and metadata */}
      <div className="p-5 bg-[#17181D] border-b border-[#23252C]">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
              <h1 className="text-xl font-bold tracking-tight text-[#FAFAFA]">
                {problem.title}
              </h1>
              <span
                className={`px-2 py-0.5 rounded text-[11px] font-medium tracking-wide ${getDifficultyBadgeClass(
                  problem.difficulty
                )}`}
              >
                {problem.difficulty}
              </span>
            </div>
            <p className="text-xs text-[#9CA3AF] font-medium">{problem.category}</p>
          </div>

          {allProblems && onProblemChange && (
            <div className="min-w-[180px]">
              <select
                className="w-full bg-[#1F2128] border border-[#2B2E38] rounded-md px-2.5 py-1.5 text-xs text-[#E4E4E7] outline-none hover:border-[#3D4250] focus:border-[#4B5263] transition-colors"
                value={currentProblemId}
                onChange={(e) => onProblemChange(e.target.value)}
              >
                {allProblems.map((p) => (
                  <option key={p.id} value={p.id} className="bg-[#1A1C22]">
                    {p.title} ({p.difficulty})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-5 space-y-6">
        {/* Description Section */}
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] mb-2.5">
            <FileText className="size-3.5 text-[#71717A]" />
            <span>Problem Statement</span>
          </div>
          <div className="text-sm leading-relaxed text-[#D4D4D8] space-y-2.5 bg-[#17181E] p-4 rounded-lg border border-[#23252E]">
            <p>{problem.description?.text}</p>
            {problem.description?.notes?.map((note, idx) => (
              <p key={idx} className="text-[#A1A1AA] text-xs pl-2.5 border-l-2 border-[#383B47]">
                {note}
              </p>
            ))}
          </div>
        </div>

        {/* Examples Section */}
        {problem.examples && problem.examples.length > 0 && (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] mb-2.5">
              <ListTree className="size-3.5 text-[#71717A]" />
              <span>Test Vectors & Examples</span>
            </div>

            <div className="space-y-3">
              {problem.examples.map((example, idx) => (
                <div
                  key={idx}
                  className="rounded-lg bg-[#17181E] border border-[#23252E] overflow-hidden"
                >
                  <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#1B1D23] border-b border-[#24262F] text-[11px] text-[#A1A1AA]">
                    <span className="font-medium text-[#E4E4E7]">Example {idx + 1}</span>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          `Input: ${example.input}\nOutput: ${example.output}`,
                          idx
                        )
                      }
                      className="flex items-center gap-1 hover:text-[#FAFAFA] transition-colors"
                      title="Copy example"
                    >
                      {copiedIdx === idx ? (
                        <>
                          <Check className="size-3 text-[#10B981]" />
                          <span className="text-[#10B981]">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="size-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-3.5 space-y-2 font-mono text-xs">
                    <div className="flex items-start gap-2">
                      <span className="text-[#71717A] min-w-[55px] font-sans font-medium text-[11px] pt-0.5">
                        Input
                      </span>
                      <code className="text-[#ECEFF4] bg-[#111216] px-2 py-1 rounded flex-1">
                        {example.input}
                      </code>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="text-[#71717A] min-w-[55px] font-sans font-medium text-[11px] pt-0.5">
                        Output
                      </span>
                      <code className="text-[#7FD69E] bg-[#111216] px-2 py-1 rounded flex-1">
                        {example.output}
                      </code>
                    </div>

                    {example.explanation && (
                      <div className="pt-2 mt-2 border-t border-[#23252E] font-sans text-xs text-[#9CA3AF] flex items-start gap-1.5">
                        <span className="font-medium text-[#D1D5DB]">Explanation:</span>
                        <span>{example.explanation}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Constraints */}
        {problem.constraints && problem.constraints.length > 0 && (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] mb-2.5">
              <AlertCircle className="size-3.5 text-[#71717A]" />
              <span>Execution Constraints</span>
            </div>

            <div className="rounded-lg bg-[#17181E] border border-[#23252E] p-3.5">
              <ul className="space-y-2 text-xs">
                {problem.constraints.map((constraint, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-[#CBD5E1]">
                    <span className="size-1 rounded-full bg-[#64748B]" />
                    <code className="font-mono text-xs text-[#E2E8F0]">{constraint}</code>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}