import { useEffect, useRef } from "react";

export default function InteractiveNeuralFlowBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse interactive coordinates with physics easing
    const mouse = {
      x: width * 0.5,
      y: height * 0.4,
      targetX: width * 0.5,
      targetY: height * 0.4,
      radius: 200,
      active: false,
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    // 1200 fluid particle stream nodes
    const PARTICLE_COUNT = Math.min(1100, Math.floor((width * height) / 1400));
    const particles = new Float32Array(PARTICLE_COUNT * 6); // x, y, vx, vy, baseSpeed, hue

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 6;
      particles[idx] = Math.random() * width; // x
      particles[idx + 1] = Math.random() * height; // y
      particles[idx + 2] = 0; // vx
      particles[idx + 3] = 0; // vy
      particles[idx + 4] = 0.6 + Math.random() * 0.8; // baseSpeed
      // Palette: Emerald, Cyan, Slate, Warm Amber highlights
      particles[idx + 5] = Math.random() > 0.6 ? 152 : Math.random() > 0.3 ? 200 : 215; // hue
    }

    // Perlin-like 2D flow field angle calculation
    const getFlowAngle = (x, y, t) => {
      const scale = 0.0028;
      const angle1 = Math.sin(x * scale + t * 0.45) * Math.cos(y * scale + t * 0.35);
      const angle2 = Math.cos(x * scale * 1.5 - t * 0.25) * Math.sin(y * scale * 1.5 + t * 0.4);
      return (angle1 + angle2) * Math.PI * 2;
    };

    let time = 0;

    const render = () => {
      time += 0.008;

      // Mouse smooth interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Gentle trailing fade for liquid ribbon effect
      ctx.fillStyle = "rgba(14, 15, 18, 0.16)";
      ctx.fillRect(0, 0, width, height);

      // Render interactive fluid particles
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const idx = i * 6;
        let px = particles[idx];
        let py = particles[idx + 1];
        let vx = particles[idx + 2];
        let vy = particles[idx + 3];
        const baseSpeed = particles[idx + 4];
        const hue = particles[idx + 5];

        // Natural vector flow field force
        const angle = getFlowAngle(px, py, time);
        const flowFx = Math.cos(angle) * baseSpeed;
        const flowFy = Math.sin(angle) * baseSpeed;

        vx += (flowFx - vx) * 0.1;
        vy += (flowFy - vy) * 0.1;

        // Mouse interactive fluid repulsion / vortex swirl
        const dx = px - mouse.x;
        const dy = py - mouse.y;
        const distSq = dx * dx + dy * dy;
        const maxDist = mouse.radius;

        if (distSq < maxDist * maxDist && distSq > 4) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / maxDist) * 3.2;
          // Fluid swirl tangent force + mild outward deflection
          const perpX = -dy / dist;
          const perpY = dx / dist;
          const pushX = dx / dist;
          const pushY = dy / dist;

          vx += (perpX * 1.6 + pushX * 0.8) * force;
          vy += (perpY * 1.6 + pushY * 0.8) * force;
        }

        // Apply friction
        vx *= 0.94;
        vy *= 0.94;

        px += vx;
        py += vy;

        // Screen boundary wrap
        if (px < 0) px = width;
        if (px > width) px = 0;
        if (py < 0) py = height;
        if (py > height) py = 0;

        particles[idx] = px;
        particles[idx + 1] = py;
        particles[idx + 2] = vx;
        particles[idx + 3] = vy;

        // Velocity-driven luminescence & length
        const speed = Math.sqrt(vx * vx + vy * vy);
        const alpha = Math.min(0.7, 0.15 + speed * 0.12);

        ctx.strokeStyle = `hsla(${hue}, 65%, 60%, ${alpha})`;
        ctx.lineWidth = Math.min(2.2, 0.8 + speed * 0.4);

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px - vx * 2.8, py - vy * 2.8);
        ctx.stroke();
      }

      // Subtle interactive mouse ambient ripple
      if (mouse.active) {
        const glowGradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius
        );
        glowGradient.addColorStop(0, "rgba(46, 107, 72, 0.15)");
        glowGradient.addColorStop(0.5, "rgba(56, 189, 248, 0.05)");
        glowGradient.addColorStop(1, "rgba(14, 15, 18, 0)");

        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto cursor-default z-0"
    />
  );
}
