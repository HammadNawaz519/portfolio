"use client";
import Image from "next/image";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  useModal,
} from "../ui/animated-modal";
import Link from "next/link";
import projects, { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";
import { ArrowUpRight } from "lucide-react";
import SmoothScroll from "../smooth-scroll";

const ProjectsSection = () => {
  return (
    <SectionWrapper id="projects" className="max-w-7xl mx-auto min-h-screen py-20">
      <SectionHeader
        id="projects"
        title="Projects"
        desc="Featured production builds and client work designed for real-world impact."
        className="mb-12"
      />
      <div className="flex flex-wrap justify-center gap-8">
        {projects.map((project) => (
          <Modall key={project.id} project={project} />
        ))}
      </div>
    </SectionWrapper>
  );
};

const CloseButton = () => {
  const { setOpen } = useModal();
  return (
    <button
      onClick={() => setOpen(false)}
      className="px-4 py-2 bg-neutral-200 text-black dark:bg-neutral-800 dark:border-neutral-700 dark:text-white border border-neutral-300 dark:border-neutral-700 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity cursor-pointer"
    >
      Close
    </button>
  );
};

const Modall = ({ project }: { project: Project }) => {
  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-transparent flex justify-center group/modal-btn p-0">
          <div
            className="relative w-[380px] sm:w-[460px] max-w-[92vw] rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 shadow-lg hover:shadow-2xl transition-[border-color,box-shadow] duration-300 ease-out group cursor-pointer transform-gpu"
            style={{ aspectRatio: "16/10" }}
          >
            <Image
              className="absolute w-full h-full top-0 left-0 object-cover object-top group-hover:scale-[1.03] transition-transform duration-500 ease-out will-change-transform"
              src={project.src}
              alt={project.title}
              width={600}
              height={400}
              priority
            />
            <div className="absolute w-full h-3/5 bottom-0 left-0 bg-gradient-to-t from-black via-black/75 to-transparent pointer-events-none flex flex-col justify-end p-6">
              <div className="flex items-center justify-between w-full">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-left text-white drop-shadow-sm">
                    {project.title}
                  </div>
                  <div className="text-xs font-medium bg-white/90 text-black rounded-full w-fit px-3 py-0.5 mt-1 backdrop-blur-sm">
                    {project.category}
                  </div>
                </div>
                <div className="h-9 w-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors duration-200">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </ModalTrigger>
        <ModalBody className="md:max-w-4xl md:max-h-[85%]">
          <SmoothScroll isInsideModal={true}>
            <ModalContent>
              <ProjectContents project={project} />
            </ModalContent>
          </SmoothScroll>
          <ModalFooter className="gap-3">
            <CloseButton />
            <Link href={project.live} target="_blank">
              <button className="bg-black text-white dark:bg-white dark:text-black text-sm font-medium px-4 py-2 rounded-lg border border-black hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer">
                Visit Live <ArrowUpRight className="w-4 h-4" />
              </button>
            </Link>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
};

const ProjectContents = ({ project }: { project: Project }) => {
  return (
    <>
      <div className="text-center mb-6">
        <h4 className="text-2xl md:text-3xl text-neutral-800 dark:text-neutral-100 font-bold tracking-tight">
          {project.title}
        </h4>
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-1">
          {project.category}
        </span>
      </div>

      {project.content}
    </>
  );
};

export default ProjectsSection;
