import { Link } from "react-router";
import Navbar from "../components/Navbar";
import { PROBLEMS } from "../data/problems";
import { ChevronRight, Code2, BookOpen, Layers, CheckCircle2 } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";

function ProblemsPage() {
  const problems = Object.values(PROBLEMS);

  const easyProblemsCount = problems.filter((p) => p.difficulty === "Easy").length;
  const mediumProblemsCount = problems.filter((p) => p.difficulty === "Medium").length;
  const hardProblemsCount = problems.filter((p) => p.difficulty === "Hard").length;

  return (
    <div className="min-h-screen bg-[#111215] text-[#ECEFF4] font-sans">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="size-2 rounded-full bg-[#60A5FA]" />
              <span className="text-xs font-mono uppercase tracking-wider text-[#93C5FD]">
                Curated Technical Library
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#FAFAFA]">
              Technical Problem Bank
            </h1>
            <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
              Select any benchmark challenge to launch directly in solo practice or collaborative mode.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#16171C] border border-[#24262E] text-xs">
            <span className="text-[#71717A]">Catalog:</span>
            <span className="font-mono text-[#FAFAFA] font-semibold">{problems.length} problems</span>
            <span className="text-[#3A3D48]">|</span>
            <span className="text-[#7FD69E]">{easyProblemsCount} Easy</span>
            <span className="text-[#3A3D48]">|</span>
            <span className="text-[#E5BA73]">{mediumProblemsCount} Med</span>
            <span className="text-[#3A3D48]">|</span>
            <span className="text-[#F87171]">{hardProblemsCount} Hard</span>
          </div>
        </div>

        {/* Problems List */}
        <div className="space-y-3">
          {problems.map((problem) => (
            <Link
              key={problem.id}
              to={`/problem/${problem.id}`}
              className="p-5 rounded-xl bg-[#16171C] border border-[#24262E] hover:border-[#383C4B] transition-all flex items-center justify-between gap-4 group"
            >
              {/* Left Side */}
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className="size-10 rounded-lg bg-[#1F2128] border border-[#2B2E38] flex items-center justify-center text-[#A1A1AA] shrink-0 mt-0.5">
                  <Code2 className="size-5 text-[#9CA3AF]" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                    <h2 className="text-base font-semibold text-[#FAFAFA] group-hover:text-white transition-colors">
                      {problem.title}
                    </h2>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-medium tracking-wide ${getDifficultyBadgeClass(
                        problem.difficulty
                      )}`}
                    >
                      {problem.difficulty}
                    </span>
                    <span className="text-xs text-[#71717A]">•</span>
                    <span className="text-xs text-[#8E929E] font-medium">
                      {problem.category}
                    </span>
                  </div>

                  <p className="text-xs text-[#A1A1AA] line-clamp-2 leading-relaxed">
                    {problem.description.text}
                  </p>
                </div>
              </div>

              {/* Right Side */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#9CA3AF] group-hover:text-[#FAFAFA] transition-colors shrink-0">
                <span>Solve in Studio</span>
                <ChevronRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ProblemsPage;