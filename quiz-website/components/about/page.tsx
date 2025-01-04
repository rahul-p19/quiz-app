"use client";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function About() {
  const testimonials = [
    {
      quote:
        "Double Slash, organised by IEEE JUSB is Jadavpur University's first ever offline 24 hour hackathon. Here different tracks are provided for the participants. Double Slash attracts uniqueness and creativity packaged in the form of coding and reasoning. IEEE JUSB is going to soon present Double Slash with a bang, so interested participants may as well start to gear up !!",
      name: "Double // Slash",
      designation: "VP of Technology at FutureNet",
      src: "/assets/ds.jpg",
    },
    {
      quote:
        "IEEE JUSB is the proud pioneer of TechX Congress which has become a global sensation since. The second edition took place in Shantiniketan and featured talks on diverse topics and an extensive workshop on augmented reality. Stuffed with hackathons and quizzes, this was undoubtedly IEEE JUSB's one of the most enriching and enjoyable events",
      name: "TechX",
      designation: "Product Manager at TechFlow",
      src: "/assets/tx.jpg",
    },
    {
      quote:
        "EarthXChange served as a platform to address rising concerns on climate changes and global issues. Insightful talks from industry experts along with competitions and hackathons with different tracks centred on climate sustainability served to stimulate the technical acumen of aspiring students",
      name: "EarthXChange",
      designation: "CTO at InnovateSphere",
      src: "/assets/exchange.jpg",
    },
    {
      quote:
        "Machine Learning Accelerator Summit is an event solely dedicated to providing the participants with a strong foundation in Machine Learning. With sessions on python, hands on workshops on machine learning and deep learning and contests the event provided the participants the thrust for them to move forward in their quest of Machine Learning.",
      name: "MLAS",
      designation: "Operations Director at CloudScale",
      src: "/assets/mlas.jpg",
    },
    {
      quote:
        "Organised by IEEE JUSB at Jadavpur University's annual tech - fest Srijan, Cypher is an exhilirating event based on cryptography and the art of coding and decoding, inviting more than 700 registrations in a span of only 24 hours . Paricipants were taught about different cyphers and challenged with brain storming questions, with the level advancing in later rounds.",
      name: "Cypher",
      designation: "Engineering Lead at DataPro",
      src: "/assets/cypher.jpg",
    },
  ];
  return (
    <>
      <div id="about" className=" md:h-screen bg-blue-950 text-white ">
        <h1 className="text-white font-extrabold text-center text-4xl md:text-5xl text-bold pt-10 ">
          ABOUT US
        </h1>
        <AnimatedTestimonials testimonials={testimonials} />
      </div>
    </>
  );
}
