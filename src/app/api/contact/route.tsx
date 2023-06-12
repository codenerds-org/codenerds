import { NextResponse } from "next/server";

const sanitizeMessage = (message: string): string => {
    // Replace @mentions with an empty string
    const sanitizedMessage = message.replace(/@(\S+)/g, "");
    return sanitizedMessage.trim();
};

const sendWebhook = async (email: string, name: string, message: string, ip: string | null) => {
    const webhookUrl = process.env.WEBHOOK_URL!;
    const sanitizedMessage = sanitizeMessage(message);

    await fetch(webhookUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            content: `New message:\n\nEmail: ${email}\nName: ${name}\nIP: ${ip}\nMessage: ${sanitizedMessage}`,
        }),
    });
};

export async function POST(request: Request) {
    const res = await request.json();
    try {
        sendWebhook(res.email, res.name, res.message, request.headers.get("x-real-ip"));
        return NextResponse.json({ res });
    } catch (error: any) {
        return NextResponse.json({ error }, { status: 500 });
    }
}