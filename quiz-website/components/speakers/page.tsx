import { HoverEffect } from "../ui/card-hover-effect";
export function Speakers() {
  return (

    <div id="speakers" className="max-w-screen min-h-screen mx-auto px-8  bg-[#0000e0]">
      <h1 className="text-center text-4xl text-bold md:text-5xl pt-5 underline">SPEAKERS</h1>
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    src: "/assets/Pani.jpg",
    title: "Saptarshi Pani",
    description:
      "Jadavpur University Alumnus from the Department of Electrical Engineering , Forbes and ET unstoppable Leader, Working professional at Texas Instruments, part time professional at co-founded startup Alchemyst AI",
    link: "https://www.linkedin.com/in/panisap?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    src: `/assets/Sap.jpg`,
    title: "Saptarshi Ghosh",
    description:
      "Jadavpur University Alumnus from Department of Instrumentation and Electronic Engineering, Ex UC Berkeley, Professional in ASIC at Intel Corporation, President of Global Students and Young Professionals at IEEE Computer Society.",
    link: "https://www.linkedin.com/in/sapghosh?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    src: `/assets/Vc.jpg`,
    title: "Professor Bhaskar Gupta",
    description:
      "Honourable Vice Chancellor of Jadavpur University",
    link: "https://jadavpuruniversity.in/",
  },
];
