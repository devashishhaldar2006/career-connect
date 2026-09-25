import { useState } from "react";
import { 
  Users, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Circle, 
  Sparkles, 
  ShieldCheck, 
  UserCheck 
} from "lucide-react";

export default function CollaborativePresenceBar({
  session,
  isHost,
  isParticipant,
  participantCount = 1,
  activeSpeaker = null,
}) {
  const hostName = session?.host?.name || "Host Interviewer";
  const participantName = session?.participant?.name || "Candidate Participant";
  const hasBoth = Boolean(session?.participant);

  return (
    <div className="flex items-center justify-between px-4 py-2.5 bg-[#17181D] border-b border-[#24262E] text-xs">
      {/* Presence Avatars and Connection Status */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {/* Host Tag */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#1F2128] border border-[#2B2E37]">
            <div className="relative">
              {session?.host?.profileImage ? (
                <img
                  src={session.host.profileImage}
                  alt={hostName}
                  className="size-5 rounded-full object-cover"
                />
              ) : (
                <div className="size-5 rounded-full bg-[#2A2E39] text-[#CBD5E1] flex items-center justify-center font-bold text-[10px]">
                  {hostName.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="absolute -bottom-0.5 -right-0.5 size-2 rounded-full bg-[#10B981] ring-1 ring-[#17181D]" />
            </div>

            <span className="font-medium text-[#ECEFF4] max-w-[120px] truncate">
              {hostName}
            </span>
            <span className="px-1 py-0.5 rounded text-[9px] font-mono uppercase bg-[#282C37] text-[#94A3B8]">
              Interviewer
            </span>
          </div>

          <span className="text-[#4B5563]">/</span>

          {/* Participant Tag */}
          <div
            className={`flex items-center gap-2 px-2.5 py-1 rounded-md border transition-colors ${
              hasBoth
                ? "bg-[#1F2128] border-[#2B2E37]"
                : "bg-[#1A1B20]/60 border-[#23252E] text-[#6B7280]"
            }`}
          >
            <div className="relative">
              {session?.participant?.profileImage ? (
                <img
                  src={session.participant.profileImage}
                  alt={participantName}
                  className="size-5 rounded-full object-cover"
                />
              ) : (
                <div className="size-5 rounded-full bg-[#242731] text-[#9CA3AF] flex items-center justify-center font-bold text-[10px]">
                  {hasBoth ? participantName.charAt(0).toUpperCase() : "?"}
                </div>
              )}
              <span
                className={`absolute -bottom-0.5 -right-0.5 size-2 rounded-full ring-1 ring-[#17181D] ${
                  hasBoth ? "bg-[#10B981]" : "bg-[#6B7280]"
                }`}
              />
            </div>

            <span className="font-medium text-[#E5E7EB] max-w-[120px] truncate">
              {hasBoth ? participantName : "Awaiting Candidate"}
            </span>
            <span className="px-1 py-0.5 rounded text-[9px] font-mono uppercase bg-[#282C37] text-[#94A3B8]">
              Candidate
            </span>
          </div>
        </div>

        {/* Live status badge */}
        <div className="hidden md:flex items-center gap-1.5 text-[11px] text-[#9CA3AF]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
          </span>
          <span className="font-mono text-[10px] tracking-wide text-[#7FD69E]">
            PEER CONNECTION ENCRYPTED
          </span>
        </div>
      </div>

      {/* Room metadata */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1C1E24] border border-[#282B34] text-[#A1A1AA] text-[11px]">
          <Users className="size-3.5 text-[#71717A]" />
          <span>
            {participantCount} {participantCount === 1 ? "person present" : "people present"}
          </span>
        </div>
      </div>
    </div>
  );
}
