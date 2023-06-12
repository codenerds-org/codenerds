type TimelineProps = {
    title: string;
    description: string;
}


export const RightTimeline = ({ title, description }: TimelineProps) => (
    <div className="mb-8 flex gap-4 justify-between items-center w-full right-timeline">
        <div className="order-1 md:w-5/12"></div>
        <div
            className="z-20 flex items-center -ml-6 md:ml-0 order-1 bg-white shadow-xl w-4 h-4 rounded-full">
        </div>
        <div className="order-1 border-white/50 border-2 rounded-lg shadow-xl w-full md:w-5/12 px-6 py-4">
            <h3 className="mb-3 font-bold text-white text-xl">{title}</h3>
            <p className="text-sm leading-snug tracking-wide text-white text-opacity-100">{description}</p>
        </div>
    </div>
)

export const LeftTimeline = ({ title, description }: TimelineProps) => (
    <div className="mb-8 flex gap-4 justify-between md:flex-row-reverse items-center w-full left-timeline">
        <div className="order-1 md:w-5/12"></div>
        <div
            className="z-20 flex items-center -ml-6 md:ml-0 order-1 bg-white shadow-xl w-4 h-4 rounded-full">
            <h1 className="mx-auto text-white font-semibold text-lg"></h1>
        </div>
        <div className="order-1 border-white/50 border-2 rounded-lg shadow-xl w-full md:w-5/12 px-6 py-4">
            <h3 className="mb-3 font-bold text-white text-xl">{title}</h3>
            <p className="text-sm font-medium leading-snug tracking-wide text-white text-opacity-100">
                {description}</p>
        </div>
    </div>
)