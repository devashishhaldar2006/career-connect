import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, 
  CheckCircle2, 
  Clock, 
  Code2, 
  ArrowRight, 
  Flame, 
  TrendingUp, 
  Sparkles, 
  Check, 
  Target 
} from "lucide-react";
import { Link } from "react-router";

export default function InterviewSummaryModal({
  isOpen,
  onClose,
  session,
  problemData,
  onReturnToDashboard,
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="w-full max-w-2xl bg-[#16171C] border border-[#2B2E38] rounded-xl shadow-2xl overflow-hidden font-sans"
        >
          {/* Header */}
          <div className="p-6 bg-[#1A1C22] border-b border-[#252832] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-[#1F2C23] border border-[#2D4534] flex items-center justify-center text-[#7FD69E]">
                <CheckCircle2 className="size-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#FAFAFA] tracking-tight">
                  Interview Concluded
                </h2>
                <p className="text-xs text-[#9CA3AF]">
                  Session finalized • Summary & Performance Debrief
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#202229] border border-[#2C2F3A] text-xs font-mono text-[#CBD5E1]">
              <span>STATUS:</span>
              <span className="text-[#7FD69E] font-semibold">COMPLETED</span>
            </div>
          </div>

          {/* Body stats & qualitative points */}
          <div className="p-6 space-y-6">
            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-lg bg-[#1B1D23] border border-[#262832]">
                <div className="text-[11px] text-[#71717A] mb-1 font-medium">Problem Solved</div>
                <div className="text-sm font-semibold text-[#FAFAFA] truncate">
                  {session?.problem || "Coding Challenge"}
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#1B1D23] border border-[#262832]">
                <div className="text-[11px] text-[#71717A] mb-1 font-medium">Difficulty Level</div>
                <div className="text-sm font-semibold text-[#E5BA73] capitalize">
                  {session?.difficulty || "Medium"}
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#1B1D23] border border-[#262832]">
                <div className="text-[11px] text-[#71717A] mb-1 font-medium">Format</div>
                <div className="text-sm font-semibold text-[#60A5FA]">
                  Live Peer Pair
                </div>
              </div>
            </div>

            {/* Assessment & Strengths Analysis */}
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-[#191A20] border border-[#242630]">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#E4E4E7] mb-2">
                  <Check className="size-4 text-[#7FD69E]" />
                  <span>Demonstrated Core Strengths</span>
                </div>
                <ul className="text-xs text-[#A1A1AA] space-y-1.5 pl-6 list-disc">
                  <li>Structured verbalization of time & space complexity constraints</li>
                  <li>Clean separation of helper logic and edge case guards</li>
                  <li>Effective collaboration during real-time peer code exploration</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-[#191A20] border border-[#242630]">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#E4E4E7] mb-2">
                  <Target className="size-4 text-[#E5BA73]" />
                  <span>Target Growth & Next Steps</span>
                </div>
                <ul className="text-xs text-[#A1A1AA] space-y-1.5 pl-6 list-disc">
                  <li>Validate extreme constraints (e.g. empty arrays or 10^9 values) before running tests</li>
                  <li>Practice dry-running with boundary test vectors on whiteboard/scratchpad</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="p-4 bg-[#141519] border-t border-[#23252C] flex items-center justify-end gap-3">
            <button
              onClick={onReturnToDashboard}
              className="px-4 py-2 rounded-md bg-[#252832] hover:bg-[#2F3340] text-[#FAFAFA] text-xs font-medium border border-[#3A3E4E] transition-colors flex items-center gap-2"
            >
              <span>Return to Workspace</span>
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
