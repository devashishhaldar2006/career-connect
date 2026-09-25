import { useEffect, useRef } from "react";

export default function CollaborativeCanvasBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Simulated peer cursor signals & network code graph nodes
    const nodes = Array.from({ length: 42 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.6 ? "#7FD69E" : Math.random() > 0.3 ? "#60A5FA" : "#A1A1AA",
    }));

    // Floating subtle code tokens in the background stream
    const codeTokens = [
      "const solve = (tree) =>",
      "peer.connect('candidate-room')",
      "O(log N) binary search",
      "webrtc.stream.active",
      "yield* dfs(graph)",
      "git commit -m 'feat: interview room'",
      "200 OK — zero exit code",
      "piston.execute(js, ctx)",
      "Map<Node, Integer>",
    ].map((text) => ({
      text,
      x: Math.random() * width,
      y: Math.random() * height,
      vy: -0.2 - Math.random() * 0.25,
      opacity: Math.random() * 0.18 + 0.05,
    }));

    // Simulated dual interviewer + candidate collaborative cursor vectors
    let t = 0;
    const render = () => {
      t += 0.015;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw drifting subtle code tokens
      ctx.font = "12px 'JetBrains Mono', Consolas, monospace";
      codeTokens.forEach((token) => {
        token.y += token.vy;
        if (token.y < -30) {
          token.y = height + 20;
          token.x = Math.random() * width;
        }
        ctx.fillStyle = `rgba(161, 161, 170, ${token.opacity})`;
        ctx.fillText(token.text, token.x, token.y);
      });

      // 2. Draw collaborative network nodes and connective lines
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            const alpha = (1 - dist / 130) * 0.09;
            ctx.strokeStyle = `rgba(127, 214, 158, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // 3. Simulated Candidate & Interviewer Real-Time Cursors
      const cur1X = width * 0.35 + Math.sin(t * 0.8) * 140 + Math.cos(t * 0.3) * 60;
      const cur1Y = height * 0.38 + Math.cos(t * 0.7) * 90;

      const cur2X = width * 0.65 + Math.cos(t * 0.9) * 160;
      const cur2Y = height * 0.45 + Math.sin(t * 0.6) * 110;

      // Draw Cursor 1 (Host Interviewer - Emerald)
      drawCollaborativeCursor(ctx, cur1X, cur1Y, "#10B981", "Interviewer (Host)");

      // Draw Cursor 2 (Candidate - Sky Blue)
      drawCollaborativeCursor(ctx, cur2X, cur2Y, "#38BDF8", "Candidate (Live)");

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
    />
  );
}

function drawCollaborativeCursor(ctx, x, y, color, label) {
  ctx.save();
  ctx.translate(x, y);

  // SVG-style pointer arrow
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, 15);
  ctx.lineTo(4, 12);
  ctx.lineTo(7, 18);
  ctx.lineTo(10, 16);
  ctx.lineTo(7, 10);
  ctx.lineTo(12, 10);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();

  // Name tag badge
  ctx.font = "10px 'Plus Jakarta Sans', sans-serif";
  const textWidth = ctx.measureText(label).width;
  ctx.fillStyle = "rgba(22, 23, 28, 0.92)";
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(14, 10, textWidth + 12, 18, 4);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#ECEFF4";
  ctx.fillText(label, 20, 23);

  ctx.restore();
}
