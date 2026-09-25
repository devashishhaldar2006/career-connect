import { Link, useLocation } from "react-router";
import { BookOpen, Terminal, Sparkles, Radio } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";

function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[#141519]/90 backdrop-blur-md border-b border-[#252830] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* LOGO */}
        <Link
          to="/"
          className="group flex items-center gap-3 transition-opacity duration-150 hover:opacity-95"
        >
          <img
            src="/forest-logo.svg"
            alt="CareerConnect Logo"
            className="size-9 rounded-lg object-contain shadow-sm"
          />

          <div className="flex flex-col">
            <span className="font-bold text-base tracking-tight text-[#FAFAFA]">
              CareerConnect
            </span>
            <span className="text-[11px] text-[#71717A] tracking-normal -mt-0.5">
              Collaborative Interview Platform
            </span>
          </div>
        </Link>

        {/* NAVIGATION LINKS */}
        <div className="flex items-center gap-2">
          <Link
            to="/problems"
            className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-all duration-150 flex items-center gap-2 border ${
              isActive("/problems")
                ? "bg-[#252830] text-[#FAFAFA] border-[#393E4A]"
                : "text-[#A1A1AA] hover:text-[#FAFAFA] border-transparent hover:bg-[#1A1C22]"
            }`}
          >
            <BookOpen className="size-3.5" />
            <span className="hidden sm:inline">Problem Bank</span>
          </Link>

          <Link
            to="/dashboard"
            className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-all duration-150 flex items-center gap-2 border ${
              isActive("/dashboard")
                ? "bg-[#252830] text-[#FAFAFA] border-[#393E4A]"
                : "text-[#A1A1AA] hover:text-[#FAFAFA] border-transparent hover:bg-[#1A1C22]"
            }`}
          >
            <Radio className="size-3.5 text-[#60A5FA]" />
            <span className="hidden sm:inline">Workspace</span>
          </Link>

          <div className="h-4 w-px bg-[#262830] mx-2" />

          <div className="flex items-center">
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;