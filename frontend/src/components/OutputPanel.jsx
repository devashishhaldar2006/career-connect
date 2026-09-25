import { useState } from "react";
import { 
  CheckCircle2, 
  AlertCircle, 
  Terminal, 
  Clock, 
  ChevronRight, 
  Cpu, 
  Code2, 
  Sparkles,
  Maximize2
} from "lucide-react";

export default function OutputPanel({ output, isRunning, expectedOutput }) {
  const [activeTab, setActiveTab] = useState("console"); // console | telemetry

  return (
    <div className="h-full bg-[#141519] border-t border-[#23252C] flex flex-col font-sans select-text">
      {/* Top action / tab bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#18191E] border-b border-[#23252C] text-xs">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab("console")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              activeTab === "console"
                ? "bg-[#252832] text-[#FAFAFA] border border-[#343846]"
                : "text-[#8E929E] hover:text-[#FAFAFA]"
            }`}
          >
            <Terminal className="size-3 text-[#A1A1AA]" />
            Execution Output
          </button>

          <button
            onClick={() => setActiveTab("telemetry")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              activeTab === "telemetry"
                ? "bg-[#252832] text-[#FAFAFA] border border-[#343846]"
                : "text-[#8E929E] hover:text-[#FAFAFA]"
            }`}
          >
            <Cpu className="size-3 text-[#A1A1AA]" />
            Runtime Telemetry
          </button>
        </div>

        {/* Execution status indicator badge */}
        <div className="flex items-center gap-2">
          {isRunning ? (
            <span className="flex items-center gap-1.5 text-[11px] text-[#60A5FA]">
              <span className="size-1.5 rounded-full bg-[#60A5FA] animate-ping" />
              Running in sandbox...
            </span>
          ) : output ? (
            output.success ? (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-[#1A2E20] text-[#7FD69E] border border-[#2B4633]">
                <CheckCircle2 className="size-3" />
                Zero Exit Code (Success)
              </span>
            ) : (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-[#361E21] text-[#F87171] border border-[#522A2F]">
                <AlertCircle className="size-3" />
                Runtime / Syntax Error
              </span>
            )
          ) : (
            <span className="text-[11px] text-[#686C78]">Ready to execute</span>
          )}
        </div>
      </div>

      {/* Main output console content */}
      <div className="flex-1 overflow-auto p-4 font-mono text-[12.5px] leading-relaxed">
        {activeTab === "console" ? (
          output === null && !isRunning ? (
            <div className="h-full flex flex-col items-center justify-center text-[#555964] space-y-2 select-none">
              <Code2 className="size-8 stroke-[1.2] text-[#3D404A]" />
              <p className="text-xs">Run code to see stdout, test assertions, or errors</p>
              <kbd className="px-2 py-0.5 text-[10px] rounded bg-[#1C1E24] border border-[#282B34] text-[#868A98]">
                Ctrl + Enter or Run Code
              </kbd>
            </div>
          ) : isRunning ? (
            <div className="h-full flex flex-col items-center justify-center text-[#787D8E] space-y-2">
              <div className="size-5 border-2 border-[#3F4452] border-t-[#60A5FA] rounded-full animate-spin" />
              <p className="text-xs">Compiling & executing in isolated Piston container...</p>
            </div>
          ) : output?.success ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[11px] text-[#6B7280] pb-2 border-b border-[#202229]">
                <span>Process finished with exit code 0</span>
              </div>
              <pre className="text-[#A7F3D0] whitespace-pre-wrap font-mono">
                {output.output || "[Empty output with status 0]"}
              </pre>
            </div>
          ) : (
            <div className="space-y-3">
              {output?.output && (
                <div className="p-2.5 rounded bg-[#1C1D24] border border-[#292C37]">
                  <div className="text-[11px] text-[#9CA3AF] mb-1 font-sans font-semibold">Standard Output:</div>
                  <pre className="text-[#D1D5DB] whitespace-pre-wrap">{output.output}</pre>
                </div>
              )}
              {output?.error && (
                <div className="p-3 rounded bg-[#271719] border border-[#442226]">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#F87171] mb-1.5 font-sans font-semibold">
                    <AlertCircle className="size-3.5" />
                    Standard Error:
                  </div>
                  <pre className="text-[#FCA5A5] whitespace-pre-wrap">{output.error}</pre>
                </div>
              )}
            </div>
          )
        ) : (
          /* Runtime Telemetry Tab */
          <div className="space-y-4 font-sans text-xs">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-[#181920] border border-[#262833]">
                <div className="text-[#71717A] text-[11px] mb-1">Execution Engine</div>
                <div className="text-[#E4E4E7] font-semibold">Piston Isolated Runtime</div>
              </div>
              <div className="p-3 rounded-lg bg-[#181920] border border-[#262833]">
                <div className="text-[#71717A] text-[11px] mb-1">Memory Isolation</div>
                <div className="text-[#E4E4E7] font-semibold">Cgroup Sandboxed (512MB)</div>
              </div>
              <div className="p-3 rounded-lg bg-[#181920] border border-[#262833]">
                <div className="text-[#71717A] text-[11px] mb-1">Timeout Constraint</div>
                <div className="text-[#E4E4E7] font-semibold">10,000 ms wall clock</div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#181920] border border-[#262833] space-y-1">
              <div className="text-[#71717A] text-[11px]">Evaluation Strategy</div>
              <p className="text-[#A1A1AA] text-xs">
                Code is dispatched to our isolated evaluation cluster, executes against test vectors, and streams standard IO in real time to both participants.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}