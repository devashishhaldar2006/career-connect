import { Link } from "react-router";
import {
  ArrowRight,
  Terminal,
  Users,
  Video,
  Code2,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  Clock,
  Radio,
  Sparkles,
  Zap,
  Play
} from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";
import InteractiveNeuralFlowBackground from "../components/InteractiveNeuralFlowBackground";

function HomePage() {
  return (
    <div className="min-h-screen bg-[#0E0F12] text-[#ECEFF4] font-sans antialiased relative overflow-hidden selection:bg-[#323644] selection:text-[#FAFAFA]">
      {/* Real-time Interactive Liquid Neural Stream Canvas (responds live to cursor movement) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <InteractiveNeuralFlowBackground />

        {/* Ambient Dark Overlay to ensure 100% typography contrast & readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E0F12]/60 via-[#0E0F12]/75 to-[#0E0F12] pointer-events-none z-[1]" />

        {/* Perspective Grid Texture */}
        <div className="absolute inset-0 perspective-grid opacity-40 pointer-events-none z-[2]" />
      </div>

      {/* Top Navbar */}
      <nav className="bg-[#141519]/80 backdrop-blur-md border-b border-[#23252C] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/forest-logo.svg"
              alt="CareerConnect Logo"
              className="size-9 rounded-lg object-contain shadow-sm"
            />
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-[#FAFAFA]">
                CareerConnect
              </span>
              <span className="text-[11px] text-[#71717A] -mt-0.5">
                Technical Interview Workspace
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/problems"
              className="text-xs font-medium text-[#A1A1AA] hover:text-[#FAFAFA] px-3 py-1.5 transition-colors hidden sm:inline-block"
            >
              Problem Bank
            </Link>

            <SignInButton mode="modal">
              <button className="px-4 py-2 rounded-lg bg-[#252832] hover:bg-[#2F3340] text-[#FAFAFA] text-xs font-semibold border border-[#3A3E4E] transition-all flex items-center gap-2 active:scale-95 shadow-sm">
                <span>Sign In to Studio</span>
                <ArrowRight className="size-3.5" />
              </button>
            </SignInButton>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 pt-16 pb-24 relative z-10">
        {/* Status Pill */}
        <div className="flex items-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181A22]/90 border border-[#262934] text-xs text-[#A1A1AA] shadow-sm backdrop-blur-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
            </span>
            <span className="font-mono text-[11px] text-[#7FD69E] uppercase tracking-wide">
              REAL-TIME PEER INTERVIEW ROOMS READY
            </span>
          </div>
        </div>

        {/* Hero Headline */}
        <div className="max-w-3xl space-y-6 mb-16">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#FAFAFA] leading-[1.12]">
            Real-time collaborative workspace for technical interviews.
          </h1>

          <p className="text-base sm:text-lg text-[#9CA3AF] max-w-2xl leading-relaxed">
            Connect face-to-face with low-latency WebRTC video, synchronized coding challenges, isolated remote execution, and structured evaluation rubrics.
          </p>

          {/* CTA Group */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <SignInButton mode="modal">
              <button className="px-5 py-3 rounded-lg bg-[#2E6B48] hover:bg-[#357B54] text-[#ECFDF5] text-xs sm:text-sm font-semibold border border-[#3E8B5E] shadow-lg shadow-[#2E6B48]/15 transition-all flex items-center gap-2 active:scale-95">
                <Play className="size-3.5 fill-current" />
                <span>Launch Interview Room</span>
              </button>
            </SignInButton>

            <Link
              to="/problems"
              className="px-5 py-3 rounded-lg bg-[#181920] hover:bg-[#20222B] text-[#D4D4D8] text-xs sm:text-sm font-semibold border border-[#272935] transition-all flex items-center gap-2 active:scale-95"
            >
              <Code2 className="size-4 text-[#A1A1AA]" />
              <span>Explore Problem Bank</span>
            </Link>
          </div>
        </div>

        {/* Platform Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-xl bg-[#16171C]/90 border border-[#24262E] backdrop-blur-md hover:border-[#333742] transition-colors">
            <div className="size-10 rounded-lg bg-[#1B281F] border border-[#273E2E] flex items-center justify-center text-[#7FD69E] mb-4">
              <Users className="size-5" />
            </div>
            <h3 className="text-base font-semibold text-[#FAFAFA] mb-2">Live Peer Pair Environment</h3>
            <p className="text-xs text-[#8E929E] leading-relaxed">
              Designed specifically for host-interviewer and candidate collaboration with presence detection and WebRTC audio/video feeds.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#16171C]/90 border border-[#24262E] backdrop-blur-md hover:border-[#333742] transition-colors">
            <div className="size-10 rounded-lg bg-[#20222A] border border-[#2C303B] flex items-center justify-center text-[#60A5FA] mb-4">
              <Cpu className="size-5" />
            </div>
            <h3 className="text-base font-semibold text-[#FAFAFA] mb-2">Sandboxed Code Studio</h3>
            <p className="text-xs text-[#8E929E] leading-relaxed">
              Full Monaco editor experience supporting JavaScript, Python, and Java with isolated remote execution and live stdout/stderr streams.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#16171C]/90 border border-[#24262E] backdrop-blur-md hover:border-[#333742] transition-colors">
            <div className="size-10 rounded-lg bg-[#26221B] border border-[#3D3325] flex items-center justify-center text-[#E5BA73] mb-4">
              <Clock className="size-5" />
            </div>
            <h3 className="text-base font-semibold text-[#FAFAFA] mb-2">Structured Phase Assessment</h3>
            <p className="text-xs text-[#8E929E] leading-relaxed">
              Synchronized phase timer progressing from approach review to edge-case verification, concluding with actionable performance debriefs.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
