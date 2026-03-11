"use client";
import Image from "next/image";
import React from "react";

function Page() {
  return (
    <>
      <div className="container mx-auto md:px-[50px] xl:px-[150px] text-zinc-300 h-full">
        <h1 className="text-4xl mt-[100px] mb-[50px]">Projects</h1>
        <ul className="flex justify-center">
          <li
            className="w-[300px] h-[400px] border-[.5px] rounded-md border-zinc-600"
            style={{ backdropFilter: "blur(2px)" }}
          >
            <div className="h-[200px]">
              <Image
                src="/assets/projects-screenshots/portfolio/landing.png"
                alt="My Portfolio"
                className="w-[300px] h-[200px] rounded-t-md bg-zinc-900 object-cover"
                width={300}
                height={200}
              />
            </div>
            <div className="p-4 text-zinc-300">
              <h2 className="text-xl">My Portfolio</h2>
              <p className="mt-2 text-xs text-zinc-500">
                Welcome to my digital playground, where creativity meets code.
                Built with Next.js, Tailwind CSS, Framer Motion, and Spline 3D.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Page;
