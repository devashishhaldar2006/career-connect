import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { PROBLEMS } from "../data/problems";
import Navbar from "../components/Navbar";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ProblemDescription from "../components/ProblemDescription";
import OutputPanel from "../components/OutputPanel";
import CodeEditorPanel from "../components/CodeEditorPanel";
import { executeCode } from "../lib/piston";

import toast from "react-hot-toast";
import confetti from "canvas-confetti";
import { CheckCircle2, ChevronRight, Play, Sparkles } from "lucide-react";

function ProblemPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentProblemId, setCurrentProblemId] = useState("two-sum");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(PROBLEMS[currentProblemId]?.starterCode.javascript || "");
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const currentProblem = PROBLEMS[currentProblemId] || PROBLEMS["two-sum"];

  useEffect(() => {
    if (id && PROBLEMS[id]) {
      setCurrentProblemId(id);
      setCode(PROBLEMS[id].starterCode[selectedLanguage]);
      setOutput(null);
    }
  }, [id, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    setCode(currentProblem.starterCode[newLang]);
    setOutput(null);
  };

  const handleProblemChange = (newProblemId) => navigate(`/problem/${newProblemId}`);

  const triggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const normalizeOutput = (output) => {
    return output
      .trim()
      .split("\n")
      .map((line) =>
        line
          .trim()
          .replace(/\[\s+/g, "[")
          .replace(/\s+\]/g, "]")
          .replace(/\s*,\s*/g, ",")
      )
      .filter((line) => line.length > 0)
      .join("\n");
  };

  const checkIfTestsPassed = (actualOutput, expectedOutput) => {
    const normalizedActual = normalizeOutput(actualOutput);
    const normalizedExpected = normalizeOutput(expectedOutput);
    return normalizedActual === normalizedExpected;
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);

    const result = await executeCode(selectedLanguage, code);
    setOutput(result);
    setIsRunning(false);

    if (result.success) {
      const expectedOutput = currentProblem.expectedOutput?.[selectedLanguage];
      if (expectedOutput) {
        const testsPassed = checkIfTestsPassed(result.output, expectedOutput);
        if (testsPassed) {
          triggerConfetti();
          toast.success("All test cases matched expected vectors!");
        }
      }
    }
  };

  return (
    <div className="h-screen bg-[#111215] text-[#ECEFF4] flex flex-col font-sans overflow-hidden">
      <Navbar />

      {/* Solo practice toolbar */}
      <div className="px-6 py-2 bg-[#15161A] border-b border-[#23252C] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-[#9CA3AF]">SOLO ENVIRONMENT</span>
          <span className="text-[#3A3D48]">/</span>
          <span className="text-xs text-[#FAFAFA] font-medium">{currentProblem.title}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-xs text-[#9CA3AF] hover:text-[#FAFAFA] px-2.5 py-1 rounded hover:bg-[#1E2028] transition-colors"
          >
            Switch to Collaborative Room
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">
          {/* LEFT: Problem specification */}
          <Panel defaultSize={42} minSize={25}>
            <ProblemDescription
              problem={currentProblem}
              currentProblemId={currentProblemId}
              onProblemChange={handleProblemChange}
              allProblems={Object.values(PROBLEMS)}
            />
          </Panel>

          <PanelResizeHandle className="w-1 bg-[#23252E] hover:bg-[#3E4352] transition-colors cursor-col-resize" />

          {/* RIGHT: Editor + Output */}
          <Panel defaultSize={58} minSize={30}>
            <PanelGroup direction="vertical">
              <Panel defaultSize={68} minSize={30}>
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

              <Panel defaultSize={32} minSize={15}>
                <OutputPanel
                  output={output}
                  isRunning={isRunning}
                  expectedOutput={currentProblem.expectedOutput?.[selectedLanguage]}
                />
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}

export default ProblemPage;