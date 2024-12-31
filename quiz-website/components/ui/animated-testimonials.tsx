"use client"
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [isClient, setIsClient] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay && isClient) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, isClient]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  if (!isClient) {
    return (
      <div className="w-[100%] md:h-[90%] mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-10 grid md:grid-cols-2">
        <div className="left relative grid grid-cols-1 gap-2 justify-center">
          <div className="image relative h-60 w-[50%] mx-auto">
            <Image
              src={testimonials[0].src}
              alt={testimonials[0].name}
              width={500}
              height={500}
              className="h-full w-full rounded-3xl object-cover"
            />
          </div>
        </div>
        <div className="right px-5 pr-8 text-center md:text-start pt-7 pb-5 md:p-10">
          <p>At IEEE JUSB, we're more than just a student chapter—we're a dynamic community of innovators, creators, and problem-solvers committed to driving change through collaboration. Founded in 2010 at one of the oldest and most prestigious universities in the country, JADAVPUR UNIVERSITY, we belong to the Kolkata section of Region 10. As one of the most active student branches in our section, we are there to support you every step of the way whether you're starting and eager to learn, ready to present your ideas, or passionate about diving into the world of technology or design. Through hands-on workshops, engaging seminars, and other large-scale events thriving throughout the year we intend to bridge the gap between knowledge and real-world application. Together, we spark the fire of learning and innovation, thus building a passionate community that stands on sharing ideas and making impacts</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[100%] md:h-[90%] mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-10 grid md:grid-cols-2">
      <div className="left relative grid grid-cols-1 gap-2 justify-center">
        <div className="image relative h-60 w-[50%] mx-auto">
          <AnimatePresence>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.src}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  z: -100,
                  rotate: randomRotateY(),
                }}
                animate={{
                  opacity: isActive(index) ? 1 : 0.7,
                  scale: isActive(index) ? 1 : 0.95,
                  z: isActive(index) ? 0 : -100,
                  rotate: isActive(index) ? 0 : randomRotateY(),
                  zIndex: isActive(index)
                    ? 999
                    : testimonials.length + 2 - index,
                  y: isActive(index) ? [0, -80, 0] : 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  z: 100,
                  rotate: randomRotateY(),
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 origin-bottom"
              >
                <Image
                  src={testimonial.src}
                  alt={testimonial.name}
                  width={500}
                  height={500}
                  draggable={false}
                  className="h-full w-full rounded-3xl object-cover"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="name+button flex justify-between flex-col mx-auto gap-2 text-center">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-2xl font-bold">
              {testimonials[active].name}
            </h3>
            <motion.p className="text-lg text-gray-500 dark:text-neutral-300">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="button flex justify-center gap-4 pt-3 md:pt-0 md:pb-10">
            <button
              onClick={handlePrev}
              className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
              title="Previous"
            >
              <IconArrowLeft className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
              title="Next"
            >
              <IconArrowRight className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
      <div className="right px-5 pr-8 text-center md:text-start pt-7 pb-5 md:p-10">
        <p>At IEEE JUSB, we're more than just a student chapter—we're a dynamic community of innovators, creators, and problem-solvers committed to driving change through collaboration. Founded in 2010 at one of the oldest and most prestigious universities in the country, JADAVPUR UNIVERSITY, we belong to the Kolkata section of Region 10. As one of the most active student branches in our section, we are there to support you every step of the way whether you're starting and eager to learn, ready to present your ideas, or passionate about diving into the world of technology or design. Through hands-on workshops, engaging seminars, and other large-scale events thriving throughout the year we intend to bridge the gap between knowledge and real-world application. Together, we spark the fire of learning and innovation, thus building a passionate community that stands on sharing ideas and making impacts</p>
      </div>
    </div>
  );
};