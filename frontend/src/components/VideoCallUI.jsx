import { useState } from "react";
import {
  CallControls,
  CallingState,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import {
  Loader2,
  MessageSquare,
  Users,
  X,
  Radio,
  Minimize2,
  Maximize2,
  Mic,
  Video,
  Sparkles,
  ShieldAlert
} from "lucide-react";
import { useNavigate } from "react-router";
import { Channel, Chat, MessageInput, MessageList, Thread, Window } from "stream-chat-react";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "stream-chat-react/dist/css/v2/index.css";

function VideoCallUI({ chatClient, channel }) {
  const navigate = useNavigate();
  const { useCallCallingState, useParticipantCount } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();
  const [isChatOpen, setIsChatOpen] = useState(false);

  if (callingState === CallingState.JOINING) {
    return (
      <div className="h-full flex items-center justify-center bg-[#15161A] rounded-lg border border-[#24262E]">
        <div className="text-center p-6 space-y-3">
          <div className="size-10 rounded-full bg-[#1F2129] border border-[#2C2F3A] flex items-center justify-center mx-auto">
            <Loader2 className="w-5 h-5 animate-spin text-[#9CA3AF]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#FAFAFA]">Connecting Audio & Video Stream</p>
            <p className="text-xs text-[#71717A] mt-0.5">Negotiating WebRTC peer connections...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex gap-3 relative str-video font-sans">
      <div className="flex-1 flex flex-col gap-3 min-w-0">
        {/* Top Control Bar: Participants & Chat Toggle */}
        <div className="flex items-center justify-between px-3.5 py-2 bg-[#17181D] rounded-lg border border-[#24262E]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
              </span>
              <span className="text-xs font-semibold text-[#E4E4E7]">
                Live Feed
              </span>
            </div>

            <div className="h-3.5 w-px bg-[#262832]" />

            <div className="flex items-center gap-1.5 text-xs text-[#9CA3AF]">
              <Users className="size-3.5 text-[#71717A]" />
              <span>{participantCount} {participantCount === 1 ? "person" : "people"}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {chatClient && channel && (
              <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  isChatOpen
                    ? "bg-[#2A2E3A] text-[#FAFAFA] border border-[#3E4354]"
                    : "text-[#9CA3AF] hover:text-[#FAFAFA] hover:bg-[#202229]"
                }`}
                title={isChatOpen ? "Hide interview chat" : "Show interview chat"}
              >
                <MessageSquare className="size-3.5" />
                <span>Room Notes & Chat</span>
              </button>
            )}
          </div>
        </div>

        {/* Video Canvas Container */}
        <div className="flex-1 bg-[#121316] rounded-lg overflow-hidden border border-[#23252E] relative flex flex-col justify-center">
          <SpeakerLayout />
        </div>

        {/* Call Controls Dock */}
        <div className="bg-[#17181D] px-4 py-2.5 rounded-lg border border-[#24262E] flex justify-center items-center shadow-lg">
          <CallControls onLeave={() => navigate("/dashboard")} />
        </div>
      </div>

      {/* Slide-out Session Chat Sidebar */}
      {chatClient && channel && (
        <div
          className={`flex flex-col rounded-lg border border-[#24262E] overflow-hidden bg-[#16171C] transition-all duration-200 ease-in-out ${
            isChatOpen ? "w-80 opacity-100" : "w-0 opacity-0 pointer-events-none"
          }`}
        >
          {isChatOpen && (
            <>
              <div className="bg-[#1A1C22] px-3.5 py-2.5 border-b border-[#262832] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="size-3.5 text-[#A1A1AA]" />
                  <span className="font-semibold text-xs text-[#FAFAFA]">Interview Chat & Links</span>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="size-6 rounded flex items-center justify-center text-[#71717A] hover:text-[#FAFAFA] hover:bg-[#252832] transition-colors"
                  title="Close sidebar"
                >
                  <X className="size-3.5" />
                </button>
              </div>

              <div className="flex-1 overflow-hidden stream-chat-dark">
                <Chat client={chatClient} theme="str-chat__theme-dark">
                  <Channel channel={channel}>
                    <Window>
                      <MessageList />
                      <MessageInput />
                    </Window>
                    <Thread />
                  </Channel>
                </Chat>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default VideoCallUI;