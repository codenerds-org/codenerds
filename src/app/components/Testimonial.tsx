
type Props = {
    name: string,
    position: string,
    description: string,
    date: string
}

const Testimonial = ({name, position, description, date}: Props) => {
    return (
        <div className="border-2 border-white/50 p-4 md:w-1/4 rounded-xl">
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