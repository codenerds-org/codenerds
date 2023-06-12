import { useState } from "react";

const ContactForm = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [messageError, setMessageError] = useState(false);

    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [statusText, setStatusText] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (emailError || nameError || messageError) {
            return;
        }

        setStatus("loading");

        fetch("/api/contact", {
            method: "POST",
            body: JSON.stringify({
                email,
                name,
                message,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                setStatus("success");
                setStatusText("Message sent successfully!");
            })
            .catch((err) => {
                setStatus("error");
                setStatusText("An error occurred while sending the message. Please try again later.");
            });

        setEmail("");
        setName("");
        setMessage("");

        setTimeout(() => {
            setStatus("idle");
            setStatusText("");
        }, 5000);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case "email":

                const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                if (!emailRegex.test(value) || value === "") {
                    setEmailError(true);
                } else {
                    setEmailError(false);
                }

                setEmail(value);
                break;
            case "name":

                if (value === "") {
                    setNameError(true);
                } else {
                    setNameError(false);
                }

                setName(value);
                break;
            case "message":

                if (value === "") {
                    setNameError(true);
                } else {
                    setNameError(false);
                }

                setMessage(value);
                break;
        }
    }

    const buttonStatus = () => {
        switch (status) {
            case "loading":
                return "cursor-wait";
            case "success":
                return "border-green-500 text-green-500";
            case "error":
                return "border-red-800 text-red-800";
            default:
                return "border-white/50 text-white";
        }
    };

    return (
        <div className="flex flex-col w-11/12 md:w-8/12 items-center">
            <div className="flex flex-col md:flex-row w-full px-8 md:px-16 gap-6 md:gap-4">
                <form className="flex flex-col w-full gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row w-full gap-4">
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            className={"w-full p-4 bg-transparent rounded-md border-2 outline-none transition" + (nameError ? " border-red-800" : " border-white/50")}
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            className={"w-full p-4 bg-transparent rounded-md border-2 outline-none transition" + (emailError ? " border-red-800" : " border-white/50")}
                            onChange={handleChange}
                        />
                    </div>
                    <textarea
                        placeholder="Message"
                        name="message"
                        className={"w-full p-4 bg-transparent rounded-md border-2 outline-none transition" + (messageError ? " border-red-800" : " border-white/50")}
                        rows={12}
                        onChange={handleChange}
                    />
                    <div className="flex flex-col">
                        <button
                            className={`
                                w-full p-4  rounded-md 
                                border-2 outline-none  disabled:text-white/50 disabled:cursor-not-allowed transition
                                ${buttonStatus()}
                            `}
                            disabled={emailError || nameError || messageError || email === "" || name === "" || message === ""}
                        >
                            Send
                        </button>
                        <p className="text-center text-white/50 mt-4">{statusText}</p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ContactForm;