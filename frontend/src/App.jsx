import { useUser } from "@clerk/clerk-react";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import { Navigate, Route, Routes } from "react-router";
import ProblemsPage from "./pages/ProblemsPage";
import { Toaster } from "react-hot-toast";

function App() {
  const { isSignedIn } = useUser();
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route
        path="/problems"
        element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />}
      />
    </Routes>
    <Toaster/>
    </>
  );
}

export default App;
