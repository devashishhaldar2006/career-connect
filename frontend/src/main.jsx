import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { dark } from "@clerk/themes";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ClerkProvider
          publishableKey={PUBLISHABLE_KEY}
          appearance={{
            baseTheme: dark,
            layout: {
              unsafe_disableDevelopmentModeWarnings: true,
            },
            variables: {
              colorPrimary: "#2E6B48",
              colorBackground: "#17181D",
              colorInputBackground: "#131418",
              colorInputText: "#ECEFF4",
              colorText: "#ECEFF4",
              colorTextSecondary: "#9CA3AF",
              borderRadius: "0.5rem",
            },
            elements: {
              footer: "hidden",
              footerAction__developmentMode: "hidden",
              developmentModeBadge: "hidden",
              badge: "hidden",
              card: "border border-[#282B34] shadow-2xl",
              userButtonPopoverCard: "border border-[#282B34] bg-[#17181D]",
              userButtonPopoverFooter: "hidden",
            },
          }}
        >
          <App />
        </ClerkProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
