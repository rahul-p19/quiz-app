"use client"
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function About() {
  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: "/assets/abcs.jpg",
    },
     {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: "/assets/abcs.jpg",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      src: "/assets/abcs.jpg",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: "/assets/abcs.jpg",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: "/assets/abcs.jpg",
    }, 
  ];
  return (
     <>
        
        <div id="about" className=" md:h-screen bg-[#000080] text-white ">
          <h1 className="text-white text-center text-4xl md:text-5xl text-bold pt-10">ABOUT US</h1>
          <AnimatedTestimonials testimonials={testimonials} />
        </div>
      </> );
}
