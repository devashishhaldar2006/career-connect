import Editor from "@monaco-editor/react";
import { Loader2, Play, Code2, Sparkles, Terminal } from "lucide-react";
import { LANGUAGE_CONFIG } from "../data/problems";

function CodeEditorPanel({
  selectedLanguage,
  code,
  isRunning,
  onLanguageChange,
  onCodeChange,
  onRunCode,
}) {
  return (
    <div className="h-full bg-[#131418] flex flex-col font-sans">
      {/* Precision Editor Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#17181D] border-b border-[#24262E]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#1F2128] border border-[#2D3039]">
            <img
              src={LANGUAGE_CONFIG[selectedLanguage]?.icon}
              alt={LANGUAGE_CONFIG[selectedLanguage]?.name}
              className="size-4 object-contain"
            />
            <select
              className="bg-transparent text-xs text-[#E4E4E7] font-medium outline-none cursor-pointer pr-1 focus:ring-0"
              value={selectedLanguage}
              onChange={onLanguageChange}
            >
              {Object.entries(LANGUAGE_CONFIG).map(([key, lang]) => (
                <option key={key} value={key} className="bg-[#1C1E24] text-[#E4E4E7]">
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-[#71717A]">
            <span className="size-1.5 rounded-full bg-[#34D399]" />
            <span>Monaco Environment Ready</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onRunCode}
            disabled={isRunning}
            className={`group px-3.5 py-1.5 rounded-md text-xs font-semibold flex items-center gap-2 transition-all duration-150 ${
              isRunning
                ? "bg-[#252832] text-[#71717A] cursor-not-allowed border border-[#323642]"
                : "bg-[#2E6B48] hover:bg-[#347A53] text-[#ECFDF5] border border-[#3E8B5E] shadow-sm active:scale-[0.98]"
            }`}
          >
            {isRunning ? (
              <>
                <Loader2 className="size-3.5 animate-spin text-[#94A3B8]" />
                <span>Executing...</span>
              </>
            ) : (
              <>
                <Play className="size-3.5 fill-current" />
                <span>Run Solution</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex-1 bg-[#121316]">
        <Editor
          height={"100%"}
          language={LANGUAGE_CONFIG[selectedLanguage]?.monacoLang || "javascript"}
          value={code}
          onChange={onCodeChange}
          theme="vs-dark"
          options={{
            fontSize: 14,
            lineHeight: 22,
            fontFamily: "'JetBrains Mono', Consolas, monospace",
            lineNumbers: "on",
            renderLineHighlight: "all",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            minimap: { enabled: false },
            padding: { top: 12, bottom: 12 },
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            smoothScrolling: true,
            bracketPairColorization: { enabled: true },
          }}
        />
      </div>
    </div>
  );
}

export default CodeEditorPanel;