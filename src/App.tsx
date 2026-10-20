import React, { useState, useEffect, useRef } from 'react';

// 3D Interactive Wireframe & Particle Background Component
const Interactive3DBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX - width / 2) * 0.002;
      mouse.targetY = (e.clientY - height / 2) * 0.002;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 3D Icosahedron / Octahedron vertices
    const t = (1 + Math.sqrt(5)) / 2;
    const rawVertices = [
      [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
      [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
      [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]
    ];
    const scale = 130;
    const vertices = rawVertices.map(([x, y, z]) => ({
      x: x * scale,
      y: y * scale,
      z: z * scale,
    }));

    // Edges connecting close vertices
    const edges: [number, number][] = [];
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const dx = vertices[i].x - vertices[j].x;
        const dy = vertices[i].y - vertices[j].y;
        const dz = vertices[i].z - vertices[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < scale * 2.1) {
          edges.push([i, j]);
        }
      }
    }

    // Floating 3D particles
    const particles = Array.from({ length: 70 }, () => ({
      x: (Math.random() - 0.5) * width * 1.5,
      y: (Math.random() - 0.5) * height * 1.5,
      z: Math.random() * 600 + 100,
      size: Math.random() * 1.8 + 0.5,
    }));

    let angleX = 0;
    let angleY = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      angleX += 0.003 + mouse.y * 0.08;
      angleY += 0.004 + mouse.x * 0.08;

      const cx = width > 768 ? width * 0.72 : width * 0.5;
      const cy = height * 0.42;
      const fov = 500;

      // Render Particles
      particles.forEach((p) => {
        p.z -= 0.6;
        if (p.z <= 10) p.z = 700;
        const perspective = fov / (fov + p.z);
        const px = width / 2 + (p.x - mouse.x * 120) * perspective;
        const py = height / 2 + (p.y - mouse.y * 120) * perspective;

        ctx.beginPath();
        ctx.arc(px, py, p.size * perspective, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${0.15 + perspective * 0.35})`;
        ctx.fill();
      });

      // Rotate and Project 3D Core Vertices
      const projected = vertices.map((v) => {
        // Rotate Y
        const x1 = v.x * Math.cos(angleY) - v.z * Math.sin(angleY);
        const z1 = v.z * Math.cos(angleY) + v.x * Math.sin(angleY);
        // Rotate X
        const y2 = v.y * Math.cos(angleX) - z1 * Math.sin(angleX);
        const z2 = z1 * Math.cos(angleX) + v.y * Math.sin(angleX);

        const perspective = fov / (fov + z2 + 250);
        return {
          x: cx + x1 * perspective,
          y: cy + y2 * perspective,
          z: z2,
          p: perspective,
        };
      });

      // Draw Edges
      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        const alpha = Math.max(0.06, ((p1.p + p2.p) / 2 - 0.4) * 0.45);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw Nodes
      projected.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5 * p.p, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(16, 185, 129, 0.75)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-75"
    />
  );
};

// 3D Tilt Wrapper Component
const TiltCard: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState(
    'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    setTransform(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(
        2
      )}deg) scale3d(1.015, 1.015, 1.015)`
    );
  };

  const handleMouseLeave = () => {
    setTransform(
      'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    );
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: 'transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export function App() {
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'JARVIS OS v2.6 initialized...',
    'Type "help" to explore available commands.',
  ]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let reply = '';
    switch (cmd) {
      case 'help':
        reply = 'Available commands: whoami, skills, projects, nexantix, contact, clear';
        break;
      case 'whoami':
        reply =
          'Dharshan — B.E. CSE Undergraduate @ PTR College of Engineering & Technology, Madurai. AI Systems & Full-Stack Builder.';
        break;
      case 'skills':
        reply =
          'Core: Python, C++, Java, TypeScript, React, Tailwind CSS | AI: Ollama, LangChain, LangGraph, MCP.';
        break;
      case 'projects':
        reply =
          '1. JARVIS Local AI Controller | 2. HabitIO (AMOLED App) | 3. Self-Correcting LangGraph Agents | 4. Nexantix Web Suite';
        break;
      case 'nexantix':
        reply =
          'Nexantix — Next-gen software & AI automation brand founded by Dharshan.';
        break;
      case 'contact':
        reply = 'GitHub: github.com/dharshan555-code | Location: Madurai, TN, India';
        break;
      case 'clear':
        setTerminalLogs([]);
        setTerminalInput('');
        return;
      default:
        reply = `Command not recognized: "${cmd}". Type "help" for a list of commands.`;
    }

    setTerminalLogs((prev) => [...prev, `> ${terminalInput}`, reply]);
    setTerminalInput('');
  };

  const projects = [
    {
      title: 'JARVIS — Local AI System Controller',
      tag: 'AI / Automation',
      description:
        'Offline voice assistant and system automation engine powered by local LLMs via Ollama and Llama architectures with speech-to-text integration.',
      tech: ['Python', 'Ollama', 'Llama', 'System Automation'],
      link: 'https://github.com/dharshan555-code',
    },
    {
      title: 'HabitIO — AMOLED Habit Tracker',
      tag: 'Mobile & UI/UX',
      description:
        'Minimalist, distraction-free habit tracking application crafted with a true-black AMOLED interface and streak analytics.',
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'AMOLED UI'],
      link: 'https://github.com/dharshan555-code',
    },
    {
      title: 'Self-Correcting Agent Architecture',
      tag: 'Agentic AI',
      description:
        'Autonomous multi-step AI workflow utilizing LangGraph and Model Context Protocol (MCP) for dynamic tool execution and self-reflection.',
      tech: ['Python', 'LangGraph', 'LangChain', 'MCP'],
      link: 'https://github.com/dharshan555-code',
    },
    {
      title: 'Nexantix — Digital Brand & Web Platform',
      tag: 'Founder Project',
      description:
        'Modern web architecture, minimalist design system, and automated GitHub Pages deployment pipeline for the Nexantix software brand.',
      tech: ['HTML5', 'Tailwind CSS', 'JavaScript', 'GitHub Actions'],
      link: 'https://github.com/dharshan555-code',
    },
  ];

  const skillGroups = [
    {
      category: 'Languages & Core',
      items: ['Python', 'C++', 'Java', 'JavaScript', 'TypeScript', 'DSA'],
    },
    {
      category: 'AI & Agentic Frameworks',
      items: ['Ollama', 'Llama Models', 'LangChain', 'LangGraph', 'MCP', 'Voice AI'],
    },
    {
      category: 'Web & UI Engineering',
      items: ['React', 'Tailwind CSS', 'HTML5 / CSS3', 'Vite', 'Minimalist UI/UX', 'Figma'],
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden">
      {/* 3D Interactive Canvas Background */}
      <Interactive3DBackground />

      {/* Subtle Ambient Glow */}
      <div className="fixed top-[-15%] left-[-10%] w-[420px] h-[420px] rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none" />
      <div className="fixed bottom-[-15%] right-[-10%] w-[420px] h-[420px] rounded-full bg-emerald-500/10 blur-[130px] pointer-events-none" />

      {/* Minimalist Floating Navbar */}
      <header className="sticky top-4 z-50 mx-auto max-w-5xl px-4">
        <nav className="flex items-center justify-between px-6 py-3 rounded-2xl bg-zinc-900/60 backdrop-blur-md border border-zinc-800/80 shadow-2xl">
          <a
            href="#top"
            className="text-sm font-bold tracking-widest uppercase text-white flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            DHARSHAN<span className="text-cyan-400">.DEV</span>
          </a>
          <div className="hidden sm:flex items-center gap-6 text-xs uppercase tracking-wider text-zinc-400">
            <a href="#about" className="hover:text-white transition-colors">
              About
            </a>
            <a href="#projects" className="hover:text-white transition-colors">
              Projects
            </a>
            <a href="#terminal" className="hover:text-white transition-colors">
              JARVIS CLI
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>
          <a
            href="https://github.com/dharshan555-code"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-medium px-3.5 py-1.5 rounded-lg bg-zinc-100 text-zinc-950 hover:bg-cyan-400 transition-colors"
          >
            GitHub ↗
          </a>
        </nav>
      </header>

      {/* Main Container */}
      <main id="top" className="relative z-10 max-w-5xl mx-auto px-6 pt-16 pb-24 space-y-28">
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-6">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs text-cyan-400">
              <span>⚡ Founder @ Nexantix</span>
              <span className="text-zinc-600">•</span>
              <span>B.E. CSE Undergraduate</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Architecting{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                Autonomous AI
              </span>{' '}
              & Minimalist Web Systems.
            </h1>

            <p className="text-zinc-400 text-base sm:text-lg max-w-2xl leading-relaxed">
              Hi, I&apos;m <span className="text-zinc-100 font-medium">Dharshan</span> — a Computer
              Science & Engineering student at PTR College of Engineering and Technology, Madurai.
              I build local AI assistants, self-correcting agent workflows, and ultra-clean digital
              products.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-zinc-950 font-semibold text-sm hover:opacity-95 transition-all shadow-lg shadow-cyan-500/20"
              >
                Explore Projects
              </a>
              <a
                href="https://github.com/dharshan555-code"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-200 hover:border-cyan-500/50 text-sm font-medium transition-all"
              >
                github.com/dharshan555-code
              </a>
            </div>
          </div>

          {/* 3D Tilt Profile Card */}
          <div className="lg:col-span-4 flex justify-center">
            <TiltCard className="w-64 sm:w-72 rounded-3xl p-4 bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/90 shadow-2xl">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800">
                <img
                  src={`${import.meta.env.BASE_URL}profile-color.jpeg`}
                  alt="Dharshan"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://avatars.githubusercontent.com/u/9919?v=4';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">Dharshan</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Online
                  </span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-zinc-400 px-1">
                <span>Madurai, TN</span>
                <span className="text-cyan-400 font-mono">Class of 2029</span>
              </div>
            </TiltCard>
          </div>
        </section>

        {/* Bento Grid: About & Technical Arsenal */}
        <section id="about" className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">01 / System Architecture & Skills</h2>
            <span className="text-xs font-mono text-zinc-500 uppercase">Bento Overview</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {skillGroups.map((group) => (
              <TiltCard
                key={group.category}
                className="p-6 rounded-2xl bg-zinc-900/50 backdrop-blur-md border border-zinc-800/80 hover:border-cyan-500/40 transition-colors"
              >
                <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-4">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg bg-zinc-950/90 border border-zinc-800 text-xs text-zinc-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* Featured Projects Section */}
        <section id="projects" className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">02 / Featured Works</h2>
            <a
              href="https://github.com/dharshan555-code?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono text-cyan-400 hover:underline"
            >
              View All Repos →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <TiltCard
                key={project.title}
                className="group p-6 rounded-2xl bg-zinc-900/50 backdrop-blur-md border border-zinc-800/80 hover:border-cyan-500/50 flex flex-col justify-between transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      {project.tag}
                    </span>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-zinc-400 group-hover:text-cyan-400 transition-colors"
                    >
                      Source ↗
                    </a>
                  </div>

                  <h3 className="text-lg font-bold text-zinc-100 group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-zinc-400 leading-relaxed">{project.description}</p>
                </div>

                <div className="flex flex-wrap gap-2 pt-6 mt-4 border-t border-zinc-800/60">
                  {project.tech.map((t) => (
                    <span key={t} className="text-[11px] font-mono text-zinc-400">
                      #{t}
                    </span>
                  ))}
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* Interactive JARVIS Command Terminal (Bonus Choice Addition) */}
        <section id="terminal" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">03 / Interactive JARVIS Terminal</h2>
            <span className="text-xs font-mono text-emerald-400">● LOCAL_SYS_READY</span>
          </div>

          <div className="rounded-2xl bg-zinc-950/90 border border-zinc-800 overflow-hidden shadow-2xl font-mono text-xs sm:text-sm">
            <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-zinc-400 text-xs">dharshan@nexantix-core:~</span>
              <span className="text-zinc-600 text-xs">bash</span>
            </div>

            <div className="p-5 space-y-2 max-h-60 overflow-y-auto text-zinc-300">
              {terminalLogs.map((log, index) => (
                <div
                  key={index}
                  className={log.startsWith('>') ? 'text-cyan-400 font-semibold' : 'text-zinc-300'}
                >
                  {log}
                </div>
              ))}
            </div>

            <form
              onSubmit={handleCommand}
              className="flex items-center border-t border-zinc-800/80 px-4 py-3 bg-zinc-900/40"
            >
              <span className="text-emerald-400 mr-2">$</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="Type a command (help, whoami, skills, projects, nexantix, clear)..."
                className="w-full bg-transparent text-zinc-100 focus:outline-none placeholder:text-zinc-600"
              />
            </form>
          </div>
        </section>

        {/* Contact & Links Section */}
        <section id="contact" className="pt-4">
          <TiltCard className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-zinc-900/90 via-zinc-900/60 to-zinc-950 border border-zinc-800 text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Let&apos;s Build Something Extraordinary
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
              Open to collaborating on AI agent architectures, open-source Python tools, and
              minimalist full-stack web experiences.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <a
                href="https://github.com/dharshan555-code"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-zinc-100 text-zinc-950 font-semibold text-xs sm:text-sm hover:bg-cyan-400 transition-colors"
              >
                GitHub (@dharshan555-code)
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 hover:border-cyan-400 text-xs sm:text-sm transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="mailto:dharshan@nexantix.com"
                className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 hover:border-emerald-400 text-xs sm:text-sm transition-colors"
              >
                Email Me
              </a>
            </div>
          </TiltCard>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-900 py-8 text-center text-xs text-zinc-500">
        <p>© {new Date().getFullYear()} Dharshan • Powered by Nexantix & React 3D Canvas</p>
      </footer>
    </div>
  );
}

export default App;
