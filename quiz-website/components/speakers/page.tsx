import { HoverEffect } from "../ui/card-hover-effect";




export function Speakers() {
  return (
    
    <div className="max-w-screen min-h-screen mx-auto px-8 bg-[#82BBA7]">
      <h1 className="text-center text-4xl text-bold md:text-5xl">Speakers</h1>
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    src:"",
    title: "Saptarshi Pani",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "https://stripe.com",
  },
  {
    src:``,
    title: "Saptarshi Ghosh",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "https://netflix.com",
  },
  {
    src:``,
    title: "Proff. Bhaskar Gupta",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "https://netflix.com",
  },
];
