"use client"
import { useState, useEffect, MouseEvent, useRef } from 'react';
import { NextSeo } from 'next-seo';
import Testimonial from './components/Testimonial';
import Founder from './components/Founder';
import FloatingIcons from './components/FloatingIcons';
import { LeftTimeline, RightTimeline } from './components/Timeline';

import { FaPython, FaReact } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiArduino } from 'react-icons/si';
import { IoLogoAndroid, IoLogoApple, IoLogoJavascript } from 'react-icons/io';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { BsCodeSlash } from 'react-icons/bs';
import { RiFlutterFill } from 'react-icons/ri';

import loadable from "@loadable/component"
import { IconType } from 'react-icons'
import ProjectsSwiper from './components/Swiper';

import foundersData from '@/../public/founders.json';
import timelineData from '@/../public/timeline.json';
import testimonialsData from '@/../public/testimonials.json';
import projectsData from '@/../public/projects.json';
import ContactForm from './components/ContactForm';

const marqueeIcons: IconType[] = [FaReact, FaPython, SiNextdotjs, RiFlutterFill, SiTailwindcss, SiTypescript, IoLogoJavascript, IoLogoAndroid, IoLogoApple, AiOutlineConsoleSql, BsCodeSlash, SiArduino]

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [childElements, setChildElements] = useState<NodeListOf<Element> | undefined>(undefined);

  useEffect(() => {
    if (!childElements) {
      setChildElements(mainRef.current?.querySelectorAll('.node'));
    }
  }, []);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!childElements) {
      setChildElements(mainRef.current?.querySelectorAll('.node'));
    }

    var viewportWidth = window.innerWidth;
    var viewportHeight = window.innerHeight;
    var mouseX = event.clientX;
    var mouseY = event.clientY;

    var maxTranslateX = 6;
    var maxTranslateY = 6;

    var translateX = (mouseX / viewportWidth - 0.25) * 1.5 * maxTranslateX;
    var translateY = (mouseY / viewportHeight - 0.25) * 1.5 * maxTranslateY;

    requestAnimationFrame(function () {
      childElements?.forEach(function (children) {
        var child = children.children[0] as HTMLElement;
        child.style.setProperty('transition', 'transform 1s ease-out'); // Apply transition
        child.style.setProperty('transform', 'translate3d(' + translateX + 'rem, ' + translateY + 'rem, 0) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)'); // Apply transform animation
      });
    });
  };

  return (
    <>
      <NextSeo
        title="Codenerds - Development and Design Agency"
        description="Codenerds is a leading development and design agency. We specialize in creating innovative and custom solutions to turn your dream projects into reality."
        canonical="https://codenerds.tech/"
        openGraph={{
          url: 'https://codenerds.tech/',
          title: 'Codenerds - Development and Design Agency',
          description: 'Codenerds is a leading development and design agency. We specialize in creating innovative and custom solutions to turn your dream projects into reality.',
          siteName: 'Codenerds',
          images: [
            {
              url: 'https://codenerds.tech/og.png',
              width: 1200,
              height: 630,
              alt: 'Codenerds - Development and Design Agency',
            }
          ]
        }}
      />
      <main className="flex flex-col min-h-screen" onMouseMove={handleMouseMove} ref={mainRef}>
        <div className="flex flex-col h-screen justify-center items-center">
          <h1 className="flex text-6xl md:text-9xl text-gray-50">Codenerds</h1>
          <h2 className="md:text-2xl mb-4 text-[#ccc]">We make your dream projects reality</h2>
          <a href="#story" className="gradient-border-mask">
            <div className="gradient"></div>
            <p>Learn More</p>
          </a>
        </div>

        <section id="story" className="pt-12 md:pt-24">
          <div className="flex flex-col w-full items-center">
            <div className="flex flex-col mb-4 text-center">
              <h2 className="text-5xl font-bold">Story</h2>
              <h3 className="text-[#ccc]">How our roads crossed</h3>
            </div>
            <div className="container mx-auto w-full h-full">
              <div className="relative wrap overflow-hidden p-10 h-full">
                <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border md:left-1/2"></div>
                {timelineData.map((timeline, index) => {
                  if (index % 2 === 0) {
                    return <RightTimeline key={index} {...timeline} />;
                  } else {
                    return <LeftTimeline key={index} {...timeline} />;
                  }
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="team">
          <div className="bg-abs before:bg-[url(https://www.transparentpng.com/thumb/light-effect/MVda7h-swirls-photoshop-bolt.png)]" />
          <div className="flex flex-col w-full">
            <div className="hidden md:flex flex-row w-full items-center justify-center">
              <div className="border-t-2 border-l-2 border-gray-700/20 w-1/3 h-24 flex flex-col"></div>
              <div className="border-t-2 border-l-2 border-r-2 border-gray-700/20 w-1/3 h-24"></div>
            </div>
            <div className="flex flex-row w-full md:items-center justify-around mt-12 md:mt-4">

              {foundersData.map((founder, index) => {
                const { icons, socials, ...rest } = founder;

                const convertIcon = (icon: string) => {
                  const lib = icon.replace(/([a-z0-9])([A-Z])/g, '$1 $2').split(' ')[0].toLowerCase();
                  return loadable(() => import(`react-icons/${lib}/index.js`), {
                    resolveComponent: (el) => el[icon],
                  });
                };

                // Because we use loadable, typescript doesn't know what type the icon is so we have to ignore errors
                // @ts-ignore
                const realIcons = icons?.map((icon) => convertIcon(icon));
                const realSocials = socials?.map((social) => ({
                  icon: convertIcon(social.icon),
                  link: social.link,
                }));

                // @ts-ignore
                return <Founder key={index} {...rest} icons={realIcons} socials={realSocials} index={index} />
              })}
            </div>

          </div>
        </section>

        <section id="projects" className="pt-24 w-full bg-blend-soft-light bg-[#0a0305]">
          <div className="flex flex-col items-center">
            <div className="flex flex-col mb-4 md:mb-12 text-center">
              <h2 className="text-5xl font-bold">Our Projects</h2>
              <h3 className="text-[#ccc]">Shows that we are a good choice</h3>
            </div>
            <div className="flex items-center justify-center w-full">
              <ProjectsSwiper data={projectsData} />
            </div>
          </div>
        </section>

        <section id="languages" className="pt-24 bg-[#0a0305]">
          <div className="marquee">
            <div className="marquee_group">
              {
                marqueeIcons.map((Icon: IconType, index) => {
                  return <p aria-hidden={true} key={index}>{<Icon />}</p>;
                })
              }
            </div>

            <div aria-hidden="true" className="marquee_group">
              {
                marqueeIcons.map((Icon: IconType, index) => {
                  return <p key={index}>{<Icon />}</p>;
                })
              }
            </div>
          </div>
        </section>

        <section id="testimonials" className="pt-24 bg-[#0a0305]">
          <div className="flex flex-col w-full items-center">
            <div className="flex flex-col mb-4 md:mb-12 text-center">
              <h2 className="text-5xl font-bold">Testimonials</h2>
              <h3 className="text-[#ccc]">What our clients say about us</h3>
            </div>
            <div className="flex flex-col xl:flex-row w-full px-8 xl:px-16 gap-6 xl:gap-4">
              {testimonialsData.map((testimonial, index) => {
                return <Testimonial key={index} index={index} {...testimonial} />;
              })}
            </div>
          </div>
        </section>

        <section id="contact" className="pt-32 bg-[#0a0305]">
          <div className="bg-abs before:bg-[url(https://www.transparentpng.com/thumb/light-effect/MVda7h-swirls-photoshop-bolt.png)]" />
          <div className="flex flex-col w-full items-center">
            <div className="flex flex-col mb-4 md:mb-12 text-center">
              <h2 className="text-5xl font-bold">Contact Us</h2>
              <h3 className="text-[#ccc]">Let&apos;s work together!</h3>
            </div>
            <ContactForm />
          </div>
        </section>

        {/* <!-- We are using style.css in here because of missing attributes in tailwind, e..g perspective or grid-area --> */}
        <FloatingIcons />
      </main>
    </>
  )
}
