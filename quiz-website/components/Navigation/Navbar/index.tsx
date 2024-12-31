"use client";
import React from "react";
import { FloatingNav } from "../../ui/floating-navbar";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import { FaMapLocationDot } from "react-icons/fa6";
import { FcAbout } from "react-icons/fc";
import { RiTimeLine } from "react-icons/ri";
import {IoPerson} from "react-icons/io5";
export function Navbar() {
  const navItems = [
    {
      name: "Home",
      sectionId: "home",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "About",
      sectionId: "about",
      icon: <FcAbout className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Timelines",
      sectionId: "timelines",
      icon: (
        <RiTimeLine className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
      {
        name: "Venue",
        sectionId: "venue",
        icon: (
          <FaMapLocationDot className="h-4 w-4 text-neutral-500 dark:text-white" />
        ),
      },
      {
        name: "Speakers",
        sectionId: "speakers",
        icon: (
          <IoPerson className="h-4 w-4 text-neutral-500 dark:text-white" />
        ),
      },
      
  ];
  return (
    <div className="relative  w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}