"use client"
import { useState, useEffect, MouseEvent, useRef } from 'react';
import Testimonial from './components/Testimonial';
import Founder from './components/Founder';
import FloatingIcons from './components/FloatingIcons';
import { LeftTimeline, RightTimeline } from './components/Timeline';

import { FaFacebook, FaPython, FaReact } from 'react-icons/fa';
import { SiNextdotjs, SiPostgresql, SiTailwindcss, SiTypescript } from 'react-icons/si';
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
            <h1 className="text-4xl font-bold">Story</h1>
            <h2 className="text-[#ccc]">How our roads crossed</h2>
          </div>
          <div className="container mx-auto w-full h-full">
            <div className="relative wrap overflow-hidden p-10 h-full">
              <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border md:left-1/2"></div>
              {timelineData.map((timeline, index) => {
                if (index % 2 === 0) {
                  return <LeftTimeline key={index} {...timeline} />;
                } else {
                  return <RightTimeline key={index} {...timeline} />;
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
              return <Founder key={index} {...rest} icons={realIcons} socials={realSocials} />;
            })}
          </div>

        </div>
      </section>

      <section id="projects" className="pt-24 w-full bg-blend-soft-light bg-[#0a0305]">
        <div className="flex flex-col items-center">
          <div className="flex flex-col mb-4 text-center">
            <h1 className="text-4xl font-bold">Our Projects</h1>
            <h2 className="text-[#ccc]">Shows that we are a good choice</h2>
          </div>
          <div className="flex items-center justify-center w-full">
            <ProjectsSwiper data={projectsData} />
          </div>
        </div>
      </section>

      <section id="languages" className="pt-24 bg-[#0a0305]">
        <div className="marquee">
          <div className="marquee_group">
            <p aria-hidden="true"><FaReact /></p>
            <p aria-hidden="true"><FaPython /></p>
            <p aria-hidden="true"><SiNextdotjs /></p>
            <p aria-hidden="true"><RiFlutterFill /></p>
            <p aria-hidden="true"><SiTailwindcss /></p>
            <p aria-hidden="true"><SiTypescript /></p>
            <p aria-hidden="true"><IoLogoJavascript /></p>
            <p aria-hidden="true"><IoLogoAndroid /></p>
            <p aria-hidden="true"><IoLogoApple /></p>
            <p aria-hidden="true"><AiOutlineConsoleSql /></p>
            <p aria-hidden="true"><BsCodeSlash /></p>
          </div>

          <div aria-hidden="true" className="marquee_group">
            <p><FaReact /></p>
            <p><FaPython /></p>
            <p><SiNextdotjs /></p>
            <p><RiFlutterFill /></p>
            <p><SiTailwindcss /></p>
            <p><SiTypescript /></p>
            <p><IoLogoJavascript /></p>
            <p><IoLogoAndroid /></p>
            <p><IoLogoApple /></p>
            <p><AiOutlineConsoleSql /></p>
            <p ><BsCodeSlash /></p>
          </div>
        </div>
      </section>

      <section id="testimonials" className="pt-24 bg-[#0a0305]">
        <div className="flex flex-col w-full items-center">
          <div className="flex flex-col mb-4 text-center">
            <h1 className="text-4xl font-bold">Testimonials</h1>
            <h2 className="text-[#ccc]">What our clients say about us</h2>
          </div>
          <div className="flex flex-col md:flex-row w-full px-8 md:px-16 gap-6 md:gap-4">
            {testimonialsData.map((testimonial, index) => {
              return <Testimonial key={index} {...testimonial} />;
            })}
          </div>
        </div>
      </section>

      <section id="contact" className="pt-32 bg-[#0a0305]">
      <div className="bg-abs before:bg-[url(https://www.transparentpng.com/thumb/light-effect/MVda7h-swirls-photoshop-bolt.png)]" />
        <div className="flex flex-col w-full items-center">
          <div className="flex flex-col mb-4 text-center">
            <h1 className="text-4xl font-bold">Contact Us</h1>
            <h2 className="text-[#ccc]">Let's work together!</h2>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* <!-- We are using style.css in here because of missing attributes in tailwind, e..g perspective or grid-area --> */}
      <FloatingIcons />
    </main>
  )
}
