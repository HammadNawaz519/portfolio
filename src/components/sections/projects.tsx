"use client";
import React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";
import { Badge } from "../ui/badge";
import { Trophy, Smartphone, Bot, Server } from "lucide-react";

type Project = {
  id: number;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  iconBg: string;
  description: string[];
  tech: string[];
  gradient: string;
};

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Weather App",
    subtitle: "Hackathon Winner — 1st Place 🏆",
    icon: <Trophy className="w-6 h-6" />,
    iconBg: "from-amber-500 to-yellow-400",
    description: [
      "Designed and built a highly responsive, pixel-perfect weather forecasting web application under strict hackathon time constraints.",
      "Implemented live location tracking, dynamic UI themes that adapt instantly to changing weather conditions.",
      "High-performance asynchronous data fetching for zero-latency updates.",
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "REST APIs", "Context API"],
    gradient: "from-amber-500/10 via-yellow-400/5 to-transparent",
  },
  {
    id: 2,
    title: "Connect",
    subtitle: "Mobile-First Social Platform",
    icon: <Smartphone className="w-6 h-6" />,
    iconBg: "from-violet-600 to-purple-500",
    description: [
      "Engineered an Instagram-style mobile interface with a zero-lag, instant-render startup via strategic local session caching.",
      "Developed a secure, 1-click multi-account switching system inside an animated, native-feeling bottom sheet layout.",
      "Integrated an intelligent, context-aware AI chat assistant utilizing the Groq API with conversation persistence.",
    ],
    tech: ["Next.js", "Tailwind CSS", "Prisma", "NextAuth.js", "Capacitor", "Groq AI API"],
    gradient: "from-violet-600/10 via-purple-500/5 to-transparent",
  },
  {
    id: 3,
    title: "Puff",
    subtitle: "Advanced PC Automation Assistant",
    icon: <Bot className="w-6 h-6" />,
    iconBg: "from-cyan-500 to-blue-500",
    description: [
      "Developed a lightweight system assistant executing automated machine workflows and custom scripts via precise voice triggers.",
    ],
    tech: ["Python", "Voice Recognition", "OS-Level Scripting"],
    gradient: "from-cyan-500/10 via-blue-500/5 to-transparent",
  },
  {
    id: 4,
    title: "Self-Hosted Cloud Infrastructure",
    subtitle: "Private Home Server",
    icon: <Server className="w-6 h-6" />,
    iconBg: "from-emerald-500 to-green-500",
    description: [
      "Configured a self-hosted home server using Docker to manage private data networks, localized event pipelines, and secure tunnel exposure.",
    ],
    tech: ["Ubuntu Linux", "Docker", "Apache Kafka", "Tailscale", "Cloudflare Tunnels"],
    gradient: "from-emerald-500/10 via-green-500/5 to-transparent",
  },
];

const ProjectsSection = () => {
  return (
    <SectionWrapper id="projects" className="min-h-screen py-20">
      <div className="w-full max-w-4xl px-4 md:px-8 mx-auto">
        <SectionHeader
          id="projects"
          title="Projects"
          desc="Impact-driven builds — from hackathon wins to production systems."
          className="mb-12 md:mb-20 mt-0"
        />
        <div className="flex flex-col gap-6">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      className={`
        relative rounded-2xl border border-border overflow-hidden
        bg-card hover:border-primary/20 transition-all duration-300
        shadow-sm hover:shadow-lg group
      `}
    >
      {/* Gradient accent */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
      />

      <div className="relative p-6 md:p-8">
        {/* Header */}
        <div className="flex items-start gap-4 mb-5">
          <div
            className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${project.iconBg} flex items-center justify-center text-white shadow-md`}
          >
            {project.icon}
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold tracking-tight text-foreground leading-tight">
              {project.title}
            </h3>
            {project.subtitle && (
              <p className="text-sm text-muted-foreground mt-0.5">
                {project.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <ul className="list-disc list-outside ml-4 space-y-1.5 text-sm text-muted-foreground leading-relaxed mb-5">
          {project.description.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="text-xs font-normal bg-secondary/30 hover:bg-secondary/60 transition-colors border-transparent"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectsSection;
