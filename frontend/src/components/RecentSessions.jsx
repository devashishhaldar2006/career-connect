import { Code2, Clock, Users, Trophy, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router";

export default function RecentSessions({ sessions, isLoading }) {
  return (
    <div className="rounded-xl bg-[#16171C] border border-[#24262E] overflow-hidden mt-6">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#24262E] bg-[#181A20]">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-lg bg-[#20222A] border border-[#2C303B] flex items-center justify-center text-[#A1A1AA]">
            <Clock className="size-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#FAFAFA] tracking-tight">
              Session History & Past Debriefs
            </h2>
            <p className="text-[11px] text-[#71717A]">
              Review previously completed interview rounds and outcomes
            </p>
          </div>
        </div>

        <span className="text-xs text-[#71717A] font-mono">
          {sessions.length} Recorded
        </span>
      </div>

      {/* Grid */}
      <div className="p-5">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 text-[#71717A] space-y-2">
            <Loader2 className="size-6 animate-spin text-[#9CA3AF]" />
            <span className="text-xs">Loading session history...</span>
          </div>
        ) : sessions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sessions.map((session) => (
              <div
                key={session._id}
                className="p-4 rounded-lg bg-[#191B22] border border-[#262832] hover:border-[#383C4B] transition-all flex flex-col justify-between gap-3 group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-medium tracking-wide ${getDifficultyBadgeClass(
                        session.difficulty
                      )}`}
                    >
                      {session.difficulty}
                    </span>

                    <span className="text-[11px] text-[#71717A] font-mono">
                      {formatDistanceToNow(new Date(session.createdAt), { addSuffix: true })}
                    </span>
                  </div>

                  <h3 className="font-semibold text-sm text-[#FAFAFA] truncate">
                    {session.problem}
                  </h3>

                  <p className="text-xs text-[#8E929E] mt-1">
                    Host: <span className="text-[#ECEFF4]">{session.host?.name || "Anonymous"}</span>
                  </p>
                </div>

                <div className="pt-3 border-t border-[#23252E] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#7FD69E]">
                    <CheckCircle2 className="size-3.5" />
                    <span>Concluded</span>
                  </div>

                  <Link
                    to={`/session/${session._id}`}
                    className="text-[#9CA3AF] hover:text-[#FAFAFA] transition-colors flex items-center gap-1 font-medium text-xs"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-[#71717A] space-y-1.5">
            <p className="text-sm font-medium text-[#9CA3AF]">No completed sessions yet</p>
            <p className="text-xs text-[#6B7280]">
              Once you conduct or participate in an interview, debrief logs will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
