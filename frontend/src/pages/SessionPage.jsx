import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useEndSession, useJoinSession, useSessionById } from "../hooks/useSessions";
import { PROBLEMS } from "../data/problems";
import { executeCode } from "../lib/piston";
import Navbar from "../components/Navbar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { getDifficultyBadgeClass } from "../lib/utils";
import { 
  Loader2, 
  LogOut, 
  PhoneOff, 
  Users, 
  CheckCircle, 
  Terminal, 
  Code2, 
  FileText,
  Volume2,
  Columns,
  Maximize2
} from "lucide-react";
import CodeEditorPanel from "../components/CodeEditorPanel";
import OutputPanel from "../components/OutputPanel";
import ProblemDescription from "../components/ProblemDescription";
import InterviewTimer from "../components/InterviewTimer";
import CollaborativePresenceBar from "../components/CollaborativePresenceBar";
import InterviewSummaryModal from "../components/InterviewSummaryModal";

import useStreamClient from "../hooks/useStreamClient";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import VideoCallUI from "../components/VideoCallUI";

function SessionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  // Active view tab for left panel on mobile / smaller viewports
  const [leftTab, setLeftTab] = useState("problem"); // problem | editor

  const { data: sessionData, isLoading: loadingSession, refetch } = useSessionById(id);

  const joinSessionMutation = useJoinSession();
  const endSessionMutation = useEndSession();

  const session = sessionData?.session;
  const isHost = session?.host?.clerkId === user?.id;
  const isParticipant = session?.participant?.clerkId === user?.id;

  const { call, channel, chatClient, isInitializingCall, streamClient } = useStreamClient(
    session,
    loadingSession,
    isHost,
    isParticipant
  );

  // find the problem data based on session problem title
  const problemData = session?.problem
    ? Object.values(PROBLEMS).find((p) => p.title === session.problem)
    : null;

  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(problemData?.starterCode?.[selectedLanguage] || "");

  // auto-join session if user is not already a participant and not the host
  useEffect(() => {
    if (!session || !user || loadingSession) return;
    if (isHost || isParticipant) return;
    if (session.status !== "active" || session.participant) return;
    if (joinSessionMutation.isPending) return;

    joinSessionMutation.mutate(id, { onSuccess: refetch });
  }, [session?.status, session?.participant, user?.id, loadingSession, isHost, isParticipant, id]);

  // show completion summary when session ends
  useEffect(() => {
    if (!session || loadingSession) return;

    if (session.status === "completed") {
      setShowSummaryModal(true);
    }
  }, [session, loadingSession]);

  // update code when problem loads or changes
  useEffect(() => {
    if (problemData?.starterCode?.[selectedLanguage]) {
      setCode(problemData.starterCode[selectedLanguage]);
    }
  }, [problemData, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    const starterCode = problemData?.starterCode?.[newLang] || "";
    setCode(starterCode);
    setOutput(null);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);

    const result = await executeCode(selectedLanguage, code);
    setOutput(result);
    setIsRunning(false);
  };

  const handleEndSession = () => {
    if (confirm("End this interview session? Both participants will be notified and transitioned to summary.")) {
      endSessionMutation.mutate(id, {
        onSuccess: () => {
          setShowSummaryModal(true);
        },
      });
    }
  };

  return (
    <div className="h-screen bg-[#111215] text-[#ECEFF4] flex flex-col overflow-hidden font-sans select-none">
      <Navbar />

      {/* Real-time collaborative presence bar */}
      <CollaborativePresenceBar
        session={session}
        isHost={isHost}
        isParticipant={isParticipant}
        participantCount={session?.participant ? 2 : 1}
      />

      {/* Main Room Workspace Header & Tools */}
      <div className="px-4 py-2 bg-[#15161A] border-b border-[#23252C] flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <h1 className="font-semibold text-sm text-[#FAFAFA] tracking-tight">
              {session?.problem || "Interview Session"}
            </h1>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-medium tracking-wide ${getDifficultyBadgeClass(
                session?.difficulty
              )}`}
            >
              {session?.difficulty?.toUpperCase() || "EASY"}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-[#71717A]">
            <span>•</span>
            <span>Room ID: <span className="font-mono text-[#A1A1AA]">{id?.slice(-6)}</span></span>
          </div>
        </div>

        {/* Center / Right controls: Timer & End Session */}
        <div className="flex items-center gap-3">
          <InterviewTimer initialMinutes={45} isActive={session?.status === "active"} />

          {isHost && session?.status === "active" && (
            <button
              onClick={handleEndSession}
              disabled={endSessionMutation.isPending}
              className="px-3 py-1.5 rounded-md text-xs font-semibold bg-[#361E21] hover:bg-[#4A262A] text-[#FCA5A5] border border-[#552A30] transition-colors flex items-center gap-2"
            >
              {endSessionMutation.isPending ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <LogOut className="size-3.5" />
              )}
              <span>Conclude Interview</span>
            </button>
          )}

          {session?.status === "completed" && (
            <button
              onClick={() => setShowSummaryModal(true)}
              className="px-3 py-1.5 rounded-md text-xs font-semibold bg-[#1F2C23] text-[#7FD69E] border border-[#2D4534] hover:bg-[#26372B] transition-colors"
            >
              View Summary
            </button>
          )}
        </div>
      </div>

      {/* Core Split Workspace */}
      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">
          {/* LEFT PRIMARY PANEL - PROBLEM & CODE STUDIO */}
          <Panel defaultSize={55} minSize={35}>
            <PanelGroup direction="vertical">
              {/* Problem Specification Panel */}
              <Panel defaultSize={45} minSize={25}>
                <div className="h-full overflow-hidden select-text">
                  <ProblemDescription problem={problemData} />
                </div>
              </Panel>

              {/* Vertical Resize Grip */}
              <PanelResizeHandle className="h-1 bg-[#23252E] hover:bg-[#3E4352] transition-colors cursor-row-resize" />

              {/* Code Editor & Execution Panel */}
              <Panel defaultSize={55} minSize={30}>
                <PanelGroup direction="vertical">
                  {/* Editor */}
                  <Panel defaultSize={68} minSize={35}>
                    <CodeEditorPanel
                      selectedLanguage={selectedLanguage}
                      code={code}
                      isRunning={isRunning}
                      onLanguageChange={handleLanguageChange}
                      onCodeChange={(value) => setCode(value)}
                      onRunCode={handleRunCode}
                    />
                  </Panel>

                  <PanelResizeHandle className="h-1 bg-[#23252E] hover:bg-[#3E4352] transition-colors cursor-row-resize" />

                  {/* Output Terminal Console */}
                  <Panel defaultSize={32} minSize={20}>
                    <OutputPanel
                      output={output}
                      isRunning={isRunning}
                      expectedOutput={problemData?.expectedOutput?.[selectedLanguage]}
                    />
                  </Panel>
                </PanelGroup>
              </Panel>
            </PanelGroup>
          </Panel>

          {/* Central Workspace Horizontal Resize Grip */}
          <PanelResizeHandle className="w-1 bg-[#23252E] hover:bg-[#3E4352] transition-colors cursor-col-resize" />

          {/* RIGHT PRIMARY PANEL - VIDEO FEEDS, AUDIO & COLLABORATIVE STREAM */}
          <Panel defaultSize={45} minSize={30}>
            <div className="h-full bg-[#131418] p-3 overflow-hidden select-text">
              {isInitializingCall ? (
                <div className="h-full flex items-center justify-center rounded-lg border border-[#23252E] bg-[#16171C]">
                  <div className="text-center p-6 space-y-3">
                    <Loader2 className="w-8 h-8 mx-auto animate-spin text-[#94A3B8]" />
                    <p className="text-sm font-semibold text-[#FAFAFA]">
                      Initializing WebRTC Real-Time Media...
                    </p>
                    <p className="text-xs text-[#71717A]">Setting up audio/video peers</p>
                  </div>
                </div>
              ) : !streamClient || !call ? (
                <div className="h-full flex items-center justify-center rounded-lg border border-[#23252E] bg-[#16171C]">
                  <div className="p-8 max-w-sm text-center space-y-3">
                    <div className="size-12 rounded-full bg-[#2C181A] border border-[#482025] flex items-center justify-center mx-auto text-[#F87171]">
                      <PhoneOff className="size-6" />
                    </div>
                    <h2 className="text-base font-bold text-[#FAFAFA]">Audio/Video Stream Inactive</h2>
                    <p className="text-xs text-[#9CA3AF]">
                      Unable to establish Stream media feed or credentials need verification. You can still code, run tests, and collaborate.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="h-full">
                  <StreamVideo client={streamClient}>
                    <StreamCall call={call}>
                      <VideoCallUI chatClient={chatClient} channel={channel} />
                    </StreamCall>
                  </StreamVideo>
                </div>
              )}
            </div>
          </Panel>
        </PanelGroup>
      </div>

      {/* Completion & Performance Debrief Modal */}
      <InterviewSummaryModal
        isOpen={showSummaryModal}
        onClose={() => setShowSummaryModal(false)}
        session={session}
        problemData={problemData}
        onReturnToDashboard={() => navigate("/dashboard")}
      />
    </div>
  );
}

export default SessionPage;