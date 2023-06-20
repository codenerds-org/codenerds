import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { FaGithub, FaGlobe } from 'react-icons/fa';
import Image from 'next/image';
import useMobileDetect from '../hooks/useMobile';


type ProjectsSwiperProps = {
    data: any;
}

const ProjectsSwiper = ({ data }: ProjectsSwiperProps) => {
    const { isMobile } = useMobileDetect();

    return (
        <Swiper
            spaceBetween={50}
            pagination={{
                type: "progressbar",
            }}
            navigation={true}
            modules={[Navigation]}
        >
            {data.map((project: any) => {
                return (
                    <SwiperSlide key={project.name}>
                        <div className="flex flex-col h-full justify-center items-center">
                            <div className="w-8/12 relative">
                                <a {...isMobile() && { href: project.url }} target="_blank" rel="noreferrer">
                                    <Image src={project.image} height={676} width={1246} alt={project.name} className="w-full h-full object-cover" />
                                </a>
                                <div className="md:absolute md:bottom-0 md:left-0 md:w-full md:bg-black/50 py-4 text-center bg-transparent">
                                    <div className="flex flex-row w-full justify-center items-center gap-2">
                                        <h2 className="text-2xl font-bold text-white">{project.name}</h2>
                                        <h3 className="text-2xl font-bold text-[#ccc]">|</h3>
                                        {
                                            project.github && <a href={project.github} target="_blank" rel="noreferrer">
                                                <FaGithub className="flex text-xl text-[#ccc]/50 hover:text-white transition" />
                                            </a>
                                        }
                                        {
                                            project.url && <a href={project.url} target="_blank" rel="noreferrer">
                                                <FaGlobe className="flex text-xl text-[#ccc]/50 hover:text-white transition" />
                                            </a>
                                        }
                                    </div>
                                    <p className="text-[#ccc]">{project.description}</p>
                                    <div className="flex flex-row justify-center items-center gap-2 mt-2">
                                        {
                                            project.tags.map((tag: string) => {
                                                return (
                                                    <span key={tag} className="text-sm text-[#ccc] px-1.5 py-1 rounded-lg bg-slate-700/50">{tag}</span>
                                                )
                                            }
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                )
            })}
        </Swiper>
    )
}

export default ProjectsSwiper;