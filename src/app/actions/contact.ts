"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const service = formData.get("service") as string || "General Inquiry";
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "Required fields are missing. Please complete the form." };
  }

  try {
    const recipients = process.env.CONTACT_RECIPIENT_EMAIL 
      ? process.env.CONTACT_RECIPIENT_EMAIL.split(",").map(e => e.trim())
      : ["grovegridsite@gmail.com"];

    const { data, error } = await resend.emails.send({
      from: "GroveGrid <onboarding@resend.dev>",
      to: recipients,
      subject: `[PROJ_INQUIRY] ${service.toUpperCase()} / ${name.toUpperCase()}`,
      replyTo: email,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
              body { margin: 0; padding: 0; background-color: #050505; color: #ffffff; font-family: 'Inter', Helvetica, Arial, sans-serif; }
              .container { max-width: 600px; margin: 40px auto; background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 4px; overflow: hidden; }
              .header { padding: 40px; border-bottom: 1px solid #1a1a1a; background: linear-gradient(to right, #0a0a0a, #0d0d0d); }
              .content { padding: 40px; }
              .field { margin-bottom: 24px; }
              .label { font-family: monospace; font-size: 11px; color: #00f3ff; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px; }
              .value { font-size: 16px; color: #ffffff; background: #111; padding: 12px; border-left: 2px solid #00f3ff; border-radius: 0 4px 4px 0; }
              .message-box { background: #111; border: 1px solid #222; padding: 20px; border-radius: 4px; color: #cccccc; line-height: 1.6; font-size: 15px; }
              .footer { padding: 30px 40px; background: #0d0d0d; border-top: 1px solid #1a1a1a; text-align: center; }
              .footer-text { font-family: monospace; font-size: 10px; color: #444; text-transform: uppercase; letter-spacing: 1px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div style="font-size: 24px; font-weight: 700; color: #00f3ff; text-transform: uppercase; letter-spacing: 3px; margin: 0;">GroveGrid</div>
                <div style="font-family: monospace; font-size: 10px; color: #444; margin-top: 4px;">PROJECT_ACQUISITION_PROTOCOL // v1.0</div>
              </div>
              
              <div class="content">
                <div class="field">
                  <div class="label">Initiator</div>
                  <div class="value">${name}</div>
                </div>
                
                <div class="field">
                  <div class="label">Return Channel</div>
                  <div class="value">${email}</div>
                </div>
                
                <div class="field">
                  <div class="label">Service Category</div>
                  <div class="value">${service}</div>
                </div>
                
                <div class="field">
                  <div class="label">Project Brief</div>
                  <div class="message-box">
                    ${message.replace(/\n/g, "<br/>")}
                  </div>
                </div>
              </div>
              
              <div class="footer">
                <div class="footer-text">&copy; 2026 GROVEGRID DIGITAL SYSTEMS // ALL TRANSMISSIONS ENCRYPTED</div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend delivery failed:", error);
      return { error: error.message || "Failed to deliver message. Check API configuration." };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error("Server Action Exception:", err);
    return { error: "An unexpected error occurred during transmission." };
  }
}
