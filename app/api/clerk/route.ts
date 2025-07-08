import { Webhook } from "svix";
import connectDB from "@/config/DB";
import User from "@/models/user";
import { headers } from "next/headers";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const wh = new Webhook(process.env.SIGNING_SECRET!);
    const headerPayload = headers();
    const svixHeaders = {
        "svix-id": (await headerPayload).get("svix-id") as string,
        "svix-signature": (await headerPayload).get("svix-signature") as string,
    };

    try {
        // get the payload and verify it
        const payload = await req.json();
        const body = JSON.stringify(payload);
        const { data, type } = wh.verify(body, svixHeaders) as {
            data: {
                id: string;
                email_addresses: Array<{ email_address: string }>;
                first_name?: string;
                last_name?: string;
                image_url?: string;
            };
            type: string;
        };

        // Prepare the user data to be saved in the database
        const userData = {
            _id: data.id,
            email: data.email_addresses[0]?.email_address,
            name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
            image: data.image_url,
        };

        await connectDB();

        switch (type) {
            case "user.created":
                await User.create(userData)
                break;
            case "user.updated":
                await User.findByIdAndUpdate(data.id, userData)
                break;
            case "user.deleted":
                await User.findByIdAndDelete(data.id)
                break;
            default:
                break;

        }

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error("Error in webhook handler:", error);
        return new Response(JSON.stringify({ error: "Invalid request" }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}