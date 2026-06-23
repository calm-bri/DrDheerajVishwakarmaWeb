import { useEffect, useRef } from "react";

export default function BioBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates for interactive sway
    const mouse = { x: width / 2, y: height / 2, tx: width / 2, ty: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Dynamic node structures representing neuro-synapses
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      pulseRate: number;
      pulsePhase: number;
    }> = [];

    const nodeCount = Math.min(60, Math.floor((width * height) / 25000) + 15);

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.7 ? "rgba(193, 161, 113, 0.45)" : "rgba(14, 165, 233, 0.45)",
        pulseRate: Math.random() * 0.02 + 0.005,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // Main particle feedback loop
    const animate = () => {
      // Lerp mouse coordinates
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      ctx.fillStyle = "#030509";
      ctx.fillRect(0, 0, width, height);

      // Create micro-grid matching clinical tech theme
      ctx.strokeStyle = "rgba(255, 255, 255, 0.015)";
      ctx.lineWidth = 1;
      const gridSize = 60;
      const xOffset = (mouse.x * 0.01) % gridSize;
      const yOffset = (mouse.y * 0.01) % gridSize;

      for (let x = xOffset; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = yOffset; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw global cosmic radial gradients manually for high performant bloom
      const goldRadial = ctx.createRadialGradient(
        width * 0.7 + (mouse.x - width / 2) * 0.05,
        height * 0.3 + (mouse.y - height / 2) * 0.05,
        10,
        width * 0.7,
        height * 0.3,
        height * 0.6
      );
      goldRadial.addColorStop(0, "rgba(193, 161, 113, 0.06)");
      goldRadial.addColorStop(0.5, "rgba(9, 14, 24, 0.02)");
      goldRadial.addColorStop(1, "transparent");
      ctx.fillStyle = goldRadial;
      ctx.fillRect(0, 0, width, height);

      const blueRadial = ctx.createRadialGradient(
        width * 0.2 + (mouse.x - width / 2) * 0.08,
        height * 0.75 + (mouse.y - height / 2) * 0.08,
        10,
        width * 0.2,
        height * 0.75,
        height * 0.7
      );
      blueRadial.addColorStop(0, "rgba(14, 165, 233, 0.08)");
      blueRadial.addColorStop(0.5, "rgba(3, 5, 9, 0.01)");
      blueRadial.addColorStop(1, "transparent");
      ctx.fillStyle = blueRadial;
      ctx.fillRect(0, 0, width, height);

      // Update and draw surgical neural synapse nodes
      nodes.forEach((node, idx) => {
        // Move nodes with fluid float physics
        node.x += node.vx;
        node.y += node.vy;

        // Interactive gravity reaction (nodes drift slightly away or pull based on mouse proximity)
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 250) {
          const force = (250 - dist) / 250;
          node.x -= (dx / dist) * force * 0.15;
          node.y -= (dy / dist) * force * 0.15;
        }

        // Boundary bounce
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Update pulsation phase representing electrical nerve signals
        node.pulsePhase += node.pulseRate;
        const currentRadius = node.radius + Math.sin(node.pulsePhase) * 0.6;

        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Draw connections with adjacent items to outline structural synapses
        for (let j = idx + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const connDx = other.x - node.x;
          const connDy = other.y - node.y;
          const connDist = Math.sqrt(connDx * connDx + connDy * connDy);

          if (connDist < 130) {
            const alpha = (130 - connDist) / 130 * 0.12;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      // Ambient laser scan lines representing neurological depth sensing
      const scanY = (Date.now() * 0.035) % (height * 2.5);
      if (scanY < height) {
        ctx.beginPath();
        ctx.moveTo(0, scanY);
        ctx.lineTo(width, scanY);
        const grad = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 2);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(0.5, "rgba(14, 165, 233, 0.012)");
        grad.addColorStop(1, "rgba(193, 161, 113, 0.04)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
      <canvas ref={canvasRef} className="block h-full w-full" />
      {/* Soft noise layer & vignette overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-cosmic-bg via-transparent to-cosmic-bg/40 opacity-80" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_20%,#030509_90%)]" />
    </div>
  );
}
