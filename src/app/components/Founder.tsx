import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IconType } from "react-icons/lib";
import { useOnClickOutside } from "usehooks-ts"

type Props = {
    name: string,
    position: string,
    birthday: string,

    image?: string,
    longDescription: string,
    icons?: IconType[],
    socials?: {
        icon: IconType,
        link: string
    }[]
}

type ModalProps = Props & {
    setShowModal: (showModal: boolean) => void,
}

const calculateAge = (birthday: string) => {
    const today = new Date();
    const birthDate = new Date(birthday);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

const FounderModal = ({ name, position, birthday, image, longDescription, icons, socials, setShowModal }: ModalProps) => {
    const modalRef = useRef(null);

    const closeModal = () => {
        setShowModal(false);
    };

    useOnClickOutside(modalRef, closeModal);

    return (
        <>
            <div className="fixed z-50 top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center"></div>
            <div className="fixed z-50 top-0 left-0 w-screen h-screen flex justify-center items-center">
                <div className="bg-purple-500 bg-opacity-90 rounded-xl p-4 flex flex-col justify-center items-start w-10/12 md:w-1/2" ref={modalRef}>
                    <div className="flex flex-row h-full w-full">
                        <div className="flex flex-col md:basis-1/4 basis-2/4 w-full items-center">
                            <img src={image} className="bg-white w-32 h-32 rounded-full" />
                        </div>
                        <div className="flex flex-col ml-4 h-full justify-center items-start mt-4 basis-1/2">
                            <h1 className="text-white text-center font-regular mt-1 text-lg md:text-2xl">{name}, {calculateAge(birthday)}</h1>
                            <h2 className="text-[#ccc] font-bold">{position}</h2>
                            <div className="flex flex-row gap-1 text-[#ccc]/50 text-base md:text-lg mt-2">
                                {icons?.map((LangIcon: IconType, index: number) => (
                                    <LangIcon key={index} className="hover:text-white transition" />
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col h-full justify-end items-end basis-1/4 w-full">
                            <AiOutlineClose className="text-xl cursor-pointer" onClick={() => setShowModal(false)}/>
                        </div>
                    </div>
                    <div className="flex flex-col md:ml-4">
                        <p className="text-white text-sm md:text-base font-extralight my-1 whitespace-pre-line">{longDescription}</p>

                        <div className="flex flex-row gap-1 text-[#ccc]/50 text-xl justify-center mt-4">
                            {socials?.map((social: { icon: IconType, link: string }, index: number) => (
                                <div key={index} className="hover:text-white transition">
                                    <a href={social.link} target="_blank" rel="noreferrer">
                                        <social.icon />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const Founder = ({ name, position, birthday, image, longDescription, icons, socials }: Props) => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Add or remove the 'no-scroll' class to the body element based on the showModal state
        if (showModal) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }

        // Cleanup function to remove the 'no-scroll' class when the component unmounts
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [showModal]);

    return (
        <>
            {showModal && <FounderModal name={name} position={position} birthday={birthday} image={image} longDescription={longDescription} icons={icons} setShowModal={setShowModal} socials={socials} />}
            <div className="flex flex-col">
                <img src={image} className="bg-white w-24 h-24 rounded-full cursor-pointer" onClick={() => setShowModal(!showModal)} />
                <h1 className="text-white text-center font-medium mt-1" onClick={() => setShowModal(!showModal)}>{name}, {calculateAge(birthday)}</h1>
                <h2 className="text-[#ccc] text-center font-medium mt-1">{position}</h2>
            </div>
        </>
    );
}

export default Founder;