import { useInView } from "framer-motion";
import { useRef } from "react";

type Props = {
    name: string,
    position: string,
    description: string,
    date: string,
    index: number
}

const Testimonial = ({ name, position, description, date, index }: Props) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true })

    return (
        <div className="border-2 border-white/50 p-4 md:w-1/4 rounded-xl" ref={ref} style={{
            transform: isInView ? "none" : "translatey(-100px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) " + (index ? index * 0.5 : 0) + "s"
        }}>
            <h2 className="text-2xl font-bold">{name}</h2>
            <h3 className="text-sm text-[#ccc]">{position}</h3>
            <div className="bg-white/50 w-full h-0.5 mb-4 mt-2"></div>
            <p className="text-base">
                {description}
            </p>
            <span className="text-[#ccc]/50 text-sm">{date}</span>
        </div>
    )
}

export default Testimonial