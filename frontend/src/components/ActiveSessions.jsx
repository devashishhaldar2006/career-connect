import {
  ArrowRight,
  Code2,
  Users,
  Radio,
  Loader2,
  CircleDot
} from "lucide-react";
import { Link } from "react-router";
import { getDifficultyBadgeClass } from "../lib/utils";

export default function ActiveSessions({ sessions, isLoading, isUserInSession }) {
  return (
    <div className="lg:col-span-2 rounded-xl bg-[#16171C] border border-[#24262E] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#24262E] bg-[#181A20]">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-lg bg-[#1B281F] border border-[#273E2E] flex items-center justify-center text-[#7FD69E]">
            <Radio className="size-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#FAFAFA] tracking-tight">
              Active Interview Rooms
            </h2>
            <p className="text-[11px] text-[#71717A]">
              Currently ongoing collaborative interview sessions
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
          </span>
          <span className="text-xs font-mono text-[#7FD69E] font-medium">
            {sessions.length} Live
          </span>
        </div>
      </div>

      {/* Sessions List */}
      <div className="p-4 space-y-3 flex-1 overflow-y-auto max-h-[460px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#71717A] space-y-2">
            <Loader2 className="size-6 animate-spin text-[#9CA3AF]" />
            <span className="text-xs">Fetching active rooms...</span>
          </div>
        ) : sessions.length > 0 ? (
          sessions.map((session) => {
            const inSession = isUserInSession(session);
            const isFull = Boolean(session.participant);

            return (
              <div
                key={session._id}
                className="p-4 rounded-lg bg-[#191B22] border border-[#262832] hover:border-[#383C4B] transition-all flex items-center justify-between gap-4 group"
              >
                {/* Left metadata */}
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <div className="size-10 rounded-lg bg-[#20222A] border border-[#2C303B] flex items-center justify-center text-[#A1A1AA] shrink-0">
                    <Code2 className="size-5 text-[#9CA3AF]" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-semibold text-sm text-[#FAFAFA] truncate">
                        {session.problem}
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-medium tracking-wide ${getDifficultyBadgeClass(
                          session.difficulty
                        )}`}
                      >
                        {session.difficulty}
                      </span>
                      {inSession && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-[#1F2C23] text-[#7FD69E] border border-[#2D4534]">
                          Your Room
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-[#8E929E]">
                      <span>Host: <span className="text-[#ECEFF4]">{session.host?.name || "Anonymous"}</span></span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Users className="size-3 text-[#64748B]" />
                        <span>{isFull ? "2/2 (In Progress)" : "1/2 (Candidate Open)"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Join / Resume Action */}
                <div>
                  <Link
                    to={`/session/${session._id}`}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      inSession
                        ? "bg-[#252832] hover:bg-[#2F3340] text-[#FAFAFA] border border-[#3A3E4E]"
                        : isFull
                        ? "bg-[#1E2027] text-[#6B7280] border border-[#292B34] hover:text-[#9CA3AF]"
                        : "bg-[#2E6B48] hover:bg-[#347A53] text-[#ECFDF5] border border-[#3E8B5E]"
                    }`}
                  >
                    <span>{inSession ? "Resume" : isFull ? "Spectate" : "Join Pair"}</span>
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-16 text-center text-[#71717A] space-y-2">
            <Radio className="size-8 mx-auto stroke-[1.2] text-[#3D404A]" />
            <p className="text-sm font-medium text-[#9CA3AF]">No active rooms at the moment</p>
            <p className="text-xs text-[#6B7280]">
              Create an interview session to start pair programming with a colleague.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
