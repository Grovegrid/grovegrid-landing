"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const service = formData.get("service") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "Missing required fields" };
  }

  try {
    const recipients = process.env.CONTACT_RECIPIENT_EMAIL 
      ? process.env.CONTACT_RECIPIENT_EMAIL.split(",").map(email => email.trim())
      : ["grovegridsite@gmail.com"];

    const { data, error } = await resend.emails.send({
      from: "grovegrid <onboarding@resend.dev>",
      to: recipients, 
      subject: `New Project Inquiry: ${service} from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
          <h2 style="color: #00f3ff;">New Project Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Service:</strong> ${service}</p>
          <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 5px;">
            <strong>Message:</strong><br/>
            ${message.replace(/\n/g, "<br/>")}
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return { error: error.message };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error("Server Action Error:", err);
    return { error: "Internal Server Error" };
  }
}
