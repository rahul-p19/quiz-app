// First, install the required package for react-icons if not already installed:
// npm install @types/react-icons react-icons

import React from "react";
// Import icons with proper type declarations
import type { IconType } from "react-icons";
import {
  FaInstagram,
  FaTwitter,
  FaSquareFacebook,
  FaLinkedin,
} from "react-icons/fa6"; // Changed to fa6 for latest version

// Interface for social media links
interface SocialMediaLink {
  icon: IconType; // Using IconType from react-icons
  url: string;
  title: string;
}

// Interface for quick links
interface QuickLink {
  text: string;
  href: string;
  external?: boolean;
}

// Remove the className prop since we're not using it
export function Footer(): JSX.Element {
  // Social media links data
  const socialLinks: SocialMediaLink[] = [
    {
      icon: FaInstagram,
      url: "https://www.instagram.com/_ieeeju/",
      title: "Instagram",
    },
    {
      icon: FaTwitter,
      url: "https://twitter.com/IeeeJadavpur",
      title: "Twitter",
    },
    {
      icon: FaSquareFacebook,
      url: "https://www.facebook.com/ieeejusb",
      title: "Facebook",
    },
    {
      icon: FaLinkedin,
      url: "https://www.linkedin.com/company/ieee-ju",
      title: "LinkedIn",
    },
  ];

  // Quick links data
  const quickLinks: QuickLink[] = [
    { text: "Home", href: "#" },
    { text: "About", href: "#about" },
    {
      text: "Register",
      href: "",
      external: true,
    },
  ];

  // Render social media links
  const renderSocialLinks = (links: SocialMediaLink[]): JSX.Element[] => {
    return links.map((link, index) => {
      const Icon = link.icon;
      return (
        <div
          key={index}
          className="bg-white/10 cursor-pointer border border-transparent hover:border-white p-2 rounded-md"
        >
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            title={link.title}
          >
            <Icon className="size-7" />
          </a>
        </div>
      );
    });
  };

  // Render quick links
  const renderQuickLinks = (links: QuickLink[]): JSX.Element[] => {
    return links.map((link, index) => (
      <li key={index}>
        <a
          href={link.href}
          {...(link.external && {
            target: "_blank",
            rel: "noopener noreferrer",
          })}
        >
          {link.text}
        </a>
      </li>
    ));
  };

  return (
    <footer className="flex flex-col bg-gradient-to-b from-[#0A5C36] to-[#1D2E28] px-12 pt-16 pb-12">
      <div className="max-w-[1240px] xl:px-2vw px-5vw mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10">
          {/* Social Media Section */}
          <div className="flex flex-col">
            <h2 className="text-white mb-4 text-xl text-center sm:text-left">
              Follow us on our Socials
            </h2>
            <div className="flex gap-x-6 text-xl text-[#82BBA7] justify-center sm:justify-normal">
              {renderSocialLinks(socialLinks)}
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="flex flex-col px-6">
            <h2 className="text-white text-center mb-4 text-xl">Quick Links</h2>
            <ul className="text-[#82BBA7] flex flex-col items-center text-lg">
              {renderQuickLinks(quickLinks)}
            </ul>
          </div>

          {/* About Section */}
          <div className="flex flex-col justify-around grid-span-2">
            <h2 className="text-white text-center md:text-right mb-4 text-xl">
              About IEEE JUSB
            </h2>
            <p className="text-center md:text-right text-wrap text-[#82BBA7] text-base">
              The Jadavpur University IEEE student branch, founded in 2010, belongs
              to the Kolkata section of Region 10 of the organization. We are a
              group of enthusiastic students who are promoting innovative ideas
              both within and outside the campus.
            </p>
          </div>
        </div>

        {/* Footer Divider and Copyright */}
        <div className="h-[1px] w-full bg-white rounded-full mt-6"></div>
        <p className="text-[#B0AAAA] mt-4 text-center">
          Made with 🤍 by IEEE JUSB
        </p>
      </div>
    </footer>
  );
}