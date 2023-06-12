import { BsGithub } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { BsFacebook, BsLinkedin } from "react-icons/bs";

const Footer = () => (
    <footer className="h-48 w-full mt-24 flex flex-col items-center">
        <h1 className="text-5xl font-bold my-3" style={{
            background: `linear-gradient(92.54deg, #FFFFFF 0%, #505050 151.68%)`,
            WebkitBackgroundClip: `text`,
            WebkitTextFillColor: `transparent`,
            backgroundClip: `text`,
        }}>CODENERDS</h1>
        <div className="flex flex-row">
            <a
                href="https://www.facebook.com/dominik.krakowiak.526/"
                className="pr-5 hover:scale-125 transition text-white"
            >
                <BsFacebook size={20} />
            </a>
            <a
                href="https://www.linkedin.com/in/joachim-hodana-33815b245/"
                className="pr-5 hover:scale-125 transition text-white"
            >
                <BsLinkedin size={20} />
            </a>
            <a
                href="https://github.com/codenerds-org"
                className="pr-5 hover:scale-125 transition text-white"
            >
                <BsGithub size={20} />
            </a>
            <a
                href="mailto:contact@codenerds.tech"
                className="hover:scale-125 transition text-white"
            >
                <AiOutlineMail size={20} />
            </a>
        </div>
        <div className="flex mt-2">
            <a
                href="#story"
                className="px-3 py-3 text-sm font-light text-zinc-400 hover:scale-125 transition"
            >
                About Us
            </a>
            <a
                href="#projects"
                className="px-3 py-3 text-sm font-light text-zinc-400 hover:scale-125 transition"
            >
                Projects
            </a>
            <a
                href="#contact"
                className="px-3 py-3 text-sm font-light text-zinc-400 hover:scale-125 transition"
            >
                Contact
            </a>
        </div>
        <h1 className="text-sm font-bold text-zinc-400 mb-3 mt-4">
            © Copyright 2023 - Codenerds.tech 🤓
        </h1>
    </footer>
)

export default Footer;