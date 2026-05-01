import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useEffect(() => {
    // The full static cafe website lives in /public/index.html with all its
    // own assets (config/, css/, js/). Redirect the React preview to it so
    // the user sees the real site.
    window.location.replace("/index.html");
  }, []);
  return (
    <div style={{ minHeight: "100vh", background: "#121212", color: "#C69C6D",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "Georgia, serif" }}>
      Loading Maison Noir…
    </div>
  );
}
