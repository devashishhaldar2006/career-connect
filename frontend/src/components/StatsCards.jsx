import { Radio, History, CheckCircle2, ShieldCheck, Flame } from "lucide-react";

export default function StatsCards({ activeSessionsCount, recentSessionsCount }) {
  return (
    <div className="lg:col-span-1 flex flex-col gap-4">
      {/* Active Rooms Telemetry Card */}
      <div className="p-5 rounded-xl bg-[#16171C] border border-[#24262E] transition-colors hover:border-[#2F323D]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-[#1B281F] border border-[#273E2E] flex items-center justify-center text-[#7FD69E]">
              <Radio className="size-4" />
            </div>
            <span className="text-xs font-semibold text-[#E4E4E7]">Live Rooms</span>
          </div>

          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#1B281F] text-[#7FD69E] border border-[#273E2E]">
            <span className="size-1.5 rounded-full bg-[#10B981] animate-pulse" />
            ONLINE
          </span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold font-mono tracking-tight text-[#FAFAFA]">
            {activeSessionsCount}
          </span>
          <span className="text-xs text-[#71717A]">ongoing pair sessions</span>
        </div>
        <p className="text-[11px] text-[#A1A1AA] mt-2">
          Peers actively engaged in real-time technical problem solving.
        </p>
      </div>

      {/* Total Sessions Card */}
      <div className="p-5 rounded-xl bg-[#16171C] border border-[#24262E] transition-colors hover:border-[#2F323D]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-[#20222A] border border-[#2C303B] flex items-center justify-center text-[#A1A1AA]">
              <History className="size-4" />
            </div>
            <span className="text-xs font-semibold text-[#E4E4E7]">Completed Interviews</span>
          </div>

          <span className="px-2 py-0.5 rounded text-[10px] font-mono text-[#9CA3AF] bg-[#202229] border border-[#2B2D37]">
            ARCHIVE
          </span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold font-mono tracking-tight text-[#FAFAFA]">
            {recentSessionsCount}
          </span>
          <span className="text-xs text-[#71717A]">total completed</span>
        </div>
        <p className="text-[11px] text-[#A1A1AA] mt-2">
          Archived technical rounds and post-session evaluations.
        </p>
      </div>
    </div>
  );
}
