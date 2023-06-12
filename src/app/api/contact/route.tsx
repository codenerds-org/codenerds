import { NextResponse } from "next/server";

const sendWebhook = async (email: string, name: string, message: string) => {
    const webhookUrl = process.env.WEBHOOK_URL!;
    await fetch(webhookUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            content: `New message:\n\nEmail: ${email}\nName: ${name}\nMessage: ${message}`,
        }),
    });
};

export async function POST(request: Request) {
    const res = await request.json();
    try {
        sendWebhook(res.email, res.name, res.message);
        return NextResponse.json({ res });
    } catch (error: any) {
        return NextResponse.json({ error }, { status: 500 });
    }
}