import { HoverEffect } from "../ui/card-hover-effect";
export function Speakers() {
  return (

    <div id="speakers" className="max-w-screen min-h-screen mx-auto px-8  bg-[#0000e0]">
      <h1 className="text-center text-4xl text-bold md:text-5xl">Speakers</h1>
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    src: "",
    title: "Saptarshi Pani",
    description:
      "Lorem ipsum dolor sit amet",
    link: "https://www.linkedin.com/in/panisap?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    src: ``,
    title: "Saptarshi Ghosh",
    description:
      "Lorem ipsum dolor sit amet",
    link: "https://www.linkedin.com/in/sapghosh?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    src: ``,
    title: "Proff. Bhaskar Gupta",
    description:
      "Lorem ipsum dolor sit amet",
    link: "",
  },
];
