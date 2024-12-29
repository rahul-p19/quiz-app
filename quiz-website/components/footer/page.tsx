"use client";
import React from "react";
import {
    FaInstagram,
    FaTwitter,
    FaSquareFacebook,
    FaLinkedin,
  } from "react-icons/fa6";

function Footer() {
    return (
      <>
        <footer className="flex flex-col bg-gradient-to-b from-[#0A5C36] to-[#1D2E28] px-12 pt-16 pb-12 ">
          <div className="max-w-[1240px]  xl:px-2vw px-5vw mx-auto">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10 ">
              <div className="flex flex-col">
                <h2 className="text-white mb-4 text-xl text-center sm:text-left">
                  Follow us on our Socials
                </h2>
                <div className="flex gap-x-6 text-xl text-[#82BBA7] justify-center sm:justify-normal">
                  <div className="bg-white/10 cursor-pointer  border border-transparent hover:border-white p-2 rounded-md">
                    <a href="https://www.instagram.com/_ieeeju/" target="_blank">
                      <FaInstagram className="size-7" />
                    </a>
                  </div>
                  <div className="bg-white/10 cursor-pointer  border border-transparent hover:border-white p-2 rounded-md">
                    <a href="https://twitter.com/IeeeJadavpur" target="_blank">
                      <FaTwitter className="size-7" />
                    </a>
                  </div>
                  <div className="bg-white/10 cursor-pointer  border border-transparent hover:border-white p-2 rounded-md">
                    <a href="https://www.facebook.com/ieeejusb" target="_blank">
                      <FaSquareFacebook className="size-7" />
                    </a>
                  </div>
                  <div className="bg-white/10 cursor-pointer  border border-transparent hover:border-white p-2 rounded-md">
                    <a
                      href="https://www.linkedin.com/company/ieee-ju"
                      target="_blank"
                    >
                      <FaLinkedin className="size-7" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex flex-col px-6">
                <h2
                  className="text-white text-center mb-4 text-xl
                          "
                >
                  Quick Links
                </h2>
                <ul className=" text-[#82BBA7] flex flex-col items-center text-lg">
                  <li>
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <a href="#about">About</a>
                  </li>
                  <li>
                    <a href="https://bit.ly/socioai" target="_blank">Register</a>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col justify-around grid-span-2">
                <h2 className="text-white text-center md:text-right mb-4 text-xl">
                  About IEEE JU
                </h2>
                <p className="text-center md:text-right text-wrap text-[#82BBA7] text-base">
                  The Jadavpur University IEEE student branch, founded in 2010,
                  belongs to the Kolkata section of Region 10 of the organization.
                  We are a group of enthusiastic students who are promoting
                  innovative ideas both within and outside the campus.
                </p>
              </div>
            </div>
            <div className="h-[1px] w-full bg-white rounded-full mt-6"></div>
            <p className="text-[#B0AAAA] mt-4 text-center">
              Made with 🤍 by IEEE JUSB
            </p>
          </div>
        </footer>
      </>
    );
  }
  
  
  
export default Footer;