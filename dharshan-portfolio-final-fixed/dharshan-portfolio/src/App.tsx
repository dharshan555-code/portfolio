import React, { useEffect, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";

const useReveal = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
};

function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com/dharshanprabath",
    icon: Instagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/dharshan-p-ba4734370/",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/dharshan555-code",
    icon: Github,
  },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    ["Work", "#work"],
    ["About", "#about"],
    ["Stack", "#stack"],
    ["Journey", "#journey"],
    ["Contact", "#contact"],
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 md:px-6">
      <nav className="mx-auto mt-4 flex w-full max-w-7xl items-center justify-between rounded-full border border-black/10 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-xl md:px-6">
        <a href="#top" className="text-base font-semibold tracking-tight">
          Dharshan P
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-sm text-black/55 transition-colors hover:text-black"
            >
              {label}
            </a>
          ))}
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="rounded-full p-2 md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="mx-4 mt-2 rounded-3xl border border-black/5 bg-white p-5 shadow-xl md:hidden">
          <div className="flex flex-col gap-1">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-lg transition-colors hover:bg-black/[0.04]"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="mx-auto flex min-h-screen w-full max-w-7xl items-center overflow-hidden px-6 pb-20 pt-32 md:px-12">
      <div className="grid w-full items-center gap-12 md:grid-cols-[1.12fr_.88fr] md:gap-10 lg:gap-16">
        <Reveal>
          <div className="max-w-4xl">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-black/45">
              Dharshan P · Developer
            </p>

            <h1 className="max-w-4xl text-[clamp(3.3rem,8vw,7.8rem)] font-semibold leading-[0.92] tracking-[-0.055em]">
              I build digital products that feel simple.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-black/55 md:text-xl">
              Developer focused on software, AI, web experiences and digital
              products — turning ideas into useful things.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="#work"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-3.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
              >
                View work <ArrowUpRight size={16} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-black/15 px-7 py-3.5 text-sm font-medium transition-colors hover:bg-black/[0.04]"
              >
                Let's talk <ArrowDownRight size={16} />
              </a>
            </div>

            <div className="mt-10 flex items-center gap-3 text-sm text-black/50">
              <span className="h-2 w-2 rounded-full bg-black" />
              Available for selected projects
            </div>
          </div>
        </Reveal>

        <Reveal className="md:justify-self-end">
          <div className="mx-auto w-full max-w-[340px] md:ml-auto">
            <div className="overflow-hidden rounded-[2rem] bg-black">
              <img
                src="/profile-color.jpeg"
                alt="Dharshan P"
                className="profile-photo aspect-[4/5] w-full object-cover saturate-[1.08] contrast-[1.02]"
              />
            </div>
            <div className="mt-4 flex justify-between text-xs uppercase tracking-[0.2em] text-black/40">
              <span>Developer</span>
              <span>Madurai, India</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-[#f7f7f7] p-8 md:p-14">
        <div className="grid gap-12 lg:grid-cols-[.6fr_1.4fr]">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/40">
              About
            </p>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              A little about me.
            </h2>
          </Reveal>

          <Reveal className="space-y-6">
            <p className="text-xl leading-9 text-black/65 md:text-2xl">
              I'm Dharshan, a developer interested in software, AI, product
              design and building useful digital experiences from the ground up.
            </p>
            <p className="text-lg leading-8 text-black/50">
              I like simple interfaces, clean code and ambitious ideas that can
              become real products.
            </p>

            <div className="grid gap-6 border-t border-black/10 pt-8 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-black/35">Currently</p>
                <p className="mt-2 font-medium">B.E. Computer Science</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-black/35">Focus</p>
                <p className="mt-2 font-medium">Software · AI · Web · Products</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-black/35">Location</p>
                <p className="mt-2 font-medium">Madurai, Tamil Nadu, India</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-black/35">Interests</p>
                <p className="mt-2 font-medium">Technology · Design · Building</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function WhatIBuild() {
  const items = [
    ["01", "Websites", "Modern responsive websites and digital experiences."],
    ["02", "Web Applications", "Useful applications, dashboards and tools."],
    ["03", "AI Products", "AI assistants, automation and intelligent software."],
    ["04", "Product Development", "Turning ideas into functional digital products."],
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/40">
          Capabilities
        </p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
          What I build.
        </h2>
      </Reveal>

      <div className="mt-14 divide-y divide-black/10 border-y border-black/10">
        {items.map(([num, title, description]) => (
          <Reveal key={num}>
            <div className="grid gap-4 py-8 md:grid-cols-[80px_1fr_1fr] md:items-center">
              <span className="text-sm text-black/35">{num}</span>
              <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
              <p className="max-w-md text-black/50">{description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Work() {
  const projects = [
    {
      number: "01",
      name: "HabitIQ",
      type: "Product · Productivity",
      description: "A minimalist habit and productivity experience.",
      tech: "React · Tailwind · Capacitor",
    },
    {
      number: "02",
      name: "JARVIS",
      type: "AI · Automation",
      description:
        "An AI assistant exploring computer control, automation, agents and intelligent workflows.",
      tech: "Python · AI · Automation",
    },
    {
      number: "03",
      name: "Py-Sec-Lint",
      type: "Developer Tool · Security",
      description:
        "A security-focused concept for auditing Python dependencies.",
      tech: "Python · Security · AI",
    },
  ];

  return (
    <section id="work" className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/40">
          Portfolio
        </p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
          Selected work.
        </h2>
      </Reveal>

      <div className="mt-16 space-y-20">
        {projects.map((project) => (
          <Reveal key={project.name}>
            <article className="group">
              <div className="relative flex aspect-[16/8] items-center justify-center overflow-hidden rounded-[1.75rem] bg-[#f3f3f3]">
                <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-black/[0.06]" />
                <div className="relative text-center">
                  <p className="text-xs uppercase tracking-[0.3em] text-black/30">
                    Project {project.number}
                  </p>
                  <h3 className="mt-4 text-4xl font-semibold tracking-[-0.05em] transition-transform duration-500 group-hover:scale-[1.03] md:text-7xl">
                    {project.name}
                  </h3>
                </div>
              </div>

              <div className="mt-7 grid gap-5 md:grid-cols-[1fr_auto] md:items-start">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-black/35">
                    {project.type}
                  </p>
                  <p className="mt-3 max-w-2xl text-xl leading-8 text-black/60">
                    {project.description}
                  </p>
                  <p className="mt-4 text-sm text-black/40">{project.tech}</p>
                </div>

                <div className="flex gap-3">
                  <a
                    href="https://github.com/dharshan555-code"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 px-5 py-2.5 text-sm font-medium hover:bg-black hover:text-white"
                  >
                    GitHub <Github size={15} />
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Stack() {
  const groups = [
    ["Languages", "C · C++ · Python · JavaScript"],
    ["Frontend", "HTML · CSS · React · Next.js · Tailwind CSS"],
    ["Backend / Data", "Node.js · Supabase · Firebase"],
    ["Tools", "Git · GitHub · Android Studio · VS Code"],
  ];

  return (
    <section id="stack" className="border-y border-black/10 bg-[#fafafa]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/40">
            Technology
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Tools I work with.
          </h2>
        </Reveal>

        <div className="mt-14 grid overflow-hidden rounded-3xl border border-black/10 bg-[#fafafa] md:grid-cols-2">
          {groups.map(([name, value], index) => (
            <Reveal key={name}>
              <div
                className={`min-h-[150px] bg-[#fafafa] p-7 md:p-9 ${
                  index < 2 ? "border-b border-black/10" : ""
                } ${index % 2 === 0 ? "md:border-r md:border-black/10" : ""}`}
              >
                <p className="text-xs uppercase tracking-[0.2em] text-black/40">{name}</p>
                <p className="mt-5 max-w-md text-base font-medium leading-7 text-black/80 md:text-lg md:leading-8">{value}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journey() {
  const stages = [
    ["01", "Learn", "Learning computer science and software development."],
    ["02", "Build", "Turning ideas into working products."],
    ["03", "Experiment", "Exploring AI, automation and new technologies."],
    ["04", "Ship", "Turning experiments into usable products."],
  ];

  return (
    <section id="journey" className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/40">
          Journey
        </p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
          Learning by building.
        </h2>
      </Reveal>

      <div className="mt-14 border-t border-black/10">
        {stages.map(([num, title, description]) => (
          <Reveal key={num}>
            <div className="grid gap-4 border-b border-black/10 py-8 md:grid-cols-[80px_1fr_1fr] md:items-center">
              <span className="text-sm text-black/35">{num}</span>
              <h3 className="text-2xl font-semibold">{title}</h3>
              <p className="text-black/50">{description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-black px-7 py-14 text-white md:px-14 md:py-20">
        <div className="grid gap-14 lg:grid-cols-[1fr_.8fr]">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-white/45">Contact</p>
            <h2 className="mt-5 max-w-3xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl">
              Have something worth building?
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/55">
              Let's turn an idea into something useful.
            </p>

            <a
              href="mailto:dharshan2008p@gmail.com"
              className="mt-10 inline-flex items-center gap-2 border-b border-white/30 pb-2 text-lg hover:border-white"
            >
              dharshan2008p@gmail.com <ExternalLink size={16} />
            </a>
          </Reveal>

          <Reveal>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const data = new FormData(form);
                const name = String(data.get("name") || "");
                const email = String(data.get("email") || "");
                const message = String(data.get("message") || "");
                const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
                const body = encodeURIComponent(
                  `Name: ${name}\nEmail: ${email}\n\n${message}`
                );
                window.location.href = `mailto:dharshan2008p@gmail.com?subject=${subject}&body=${body}`;
              }}
              className="space-y-7"
            >
              {[
                ["name", "Name", "Your name"],
                ["email", "Email", "you@example.com"],
              ].map(([id, label, placeholder]) => (
                <label key={id} className="block">
                  <span className="text-sm text-white/55">{label}</span>
                  <input
                    required
                    name={id}
                    type={id === "email" ? "email" : "text"}
                    placeholder={placeholder}
                    className="mt-2 w-full border-b border-white/20 bg-transparent py-3 outline-none placeholder:text-white/25 focus:border-white"
                  />
                </label>
              ))}

              <label className="block">
                <span className="text-sm text-white/55">Message</span>
                <textarea
                  required
                  name="message"
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="mt-2 w-full resize-none border-b border-white/20 bg-transparent py-3 outline-none placeholder:text-white/25 focus:border-white"
                />
              </label>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90"
              >
                Send message <ArrowUpRight size={16} />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto flex max-w-7xl flex-col gap-8 border-t border-black/10 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-12">
      <div>
        <p className="font-semibold">Dharshan P</p>
        <p className="mt-1 text-sm text-black/45">
          Built with curiosity. Designed with intention.
        </p>
      </div>

      <div className="flex items-center gap-3">
        {socials.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            title={label}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-black/65 transition-all hover:-translate-y-0.5 hover:bg-black hover:text-white"
          >
            <Icon size={18} strokeWidth={1.8} />
          </a>
        ))}
        <a
          href="mailto:dharshan2008p@gmail.com"
          aria-label="Email"
          title="Email"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-black/65 transition-all hover:-translate-y-0.5 hover:bg-black hover:text-white"
        >
          <Mail size={18} strokeWidth={1.8} />
        </a>
      </div>

      <p className="text-sm text-black/35">© 2026 Dharshan P</p>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white text-black selection:bg-black selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <WhatIBuild />
        <Work />
        <Stack />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
