import { useUser } from "@clerk/clerk-react";
import { Plus, Radio, Users, Sparkles, Terminal } from "lucide-react";

export default function WelcomeSection({ onCreateSession }) {
  const { user } = useUser();

  return (
    <div className="border-b border-[#23252C] bg-[#141519]/70 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
            </span>
            <span className="text-xs font-mono tracking-wider uppercase text-[#7FD69E]">
              Studio Ready
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#FAFAFA]">
            Welcome back, {user?.firstName || "Engineer"}
          </h1>
          <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
            Host live collaborative interview sessions or join active coding rooms.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onCreateSession}
            className="px-4 py-2.5 rounded-lg bg-[#252832] hover:bg-[#2D313D] text-[#FAFAFA] text-xs font-semibold border border-[#3A3F4E] shadow-sm transition-all flex items-center gap-2 active:scale-[0.98]"
          >
            <Plus className="size-4 text-[#A1A1AA]" />
            <span>Launch Interview Room</span>
          </button>
        </div>
      </div>
    </div>
  );
}
