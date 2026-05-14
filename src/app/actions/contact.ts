"use server";

import https from "https";

export interface EmailResponse {
  success?: boolean;
  error?: string;
  data?: any;
  details?: any;
}

export async function sendEmail(formData: FormData): Promise<EmailResponse> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const service = formData.get("service") as string || "General Inquiry";
  const message = formData.get("message") as string;

  console.log(`[Contact Action] Native HTTPS attempt from ${name} (${email}) for ${service}`);

  if (!name || !email || !message) {
    return { error: "Required fields are missing. Please complete the form." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[Contact Action] RESEND_API_KEY is missing!");
    return { error: "Email service is not configured (missing API key)." };
  }

  const recipients = process.env.CONTACT_RECIPIENT_EMAIL 
    ? process.env.CONTACT_RECIPIENT_EMAIL.split(",").map(e => e.trim())
    : ["grovegridsite@gmail.com"];

  const postData = JSON.stringify({
    from: "GroveGrid <onboarding@resend.dev>",
    to: recipients,
    subject: `[INQUIRY] ${service.toUpperCase()} - ${name.toUpperCase()}`,
    replyTo: email,
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #00f3ff; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Project Inquiry</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f9f9f9; padding: 15px; border-radius: 4px; border-left: 4px solid #00f3ff; white-space: pre-wrap;">${message}</div>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 10px; color: #999; text-align: center;">Sent via GroveGrid Contact System</p>
      </div>
    `,
  });

  return new Promise<EmailResponse>((resolve) => {
    const options = {
      hostname: "api.resend.com",
      port: 443,
      path: "/emails",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "Content-Length": Buffer.byteLength(postData),
        "User-Agent": "Node-HTTPS-Client"
      },
      timeout: 15000
    };

    console.log("[Contact Action] Sending request to Resend API...");

    const req = https.request(options, (res) => {
      let responseBody = "";

      res.on("data", (chunk) => {
        responseBody += chunk;
      });

      res.on("end", () => {
        console.log(`[Contact Action] Resend response: ${res.statusCode}`);
        try {
          const result = responseBody ? JSON.parse(responseBody) : {};
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            resolve({ success: true, data: result });
          } else {
            console.error("[Contact Action] Resend API error:", result);
            resolve({ 
              error: result.message || `API error (${res.statusCode})`, 
              details: result 
            });
          }
        } catch (e) {
          console.error("[Contact Action] Failed to parse response:", responseBody);
          resolve({ error: "Invalid response from email service." });
        }
      });
    });

    req.on("error", (err) => {
      console.error("[Contact Action] Request error:", err.message);
      resolve({ 
        error: "Connection failed. The email service might be temporarily unavailable.",
        details: { message: err.message, code: (err as any).code }
      });
    });

    req.on("timeout", () => {
      console.error("[Contact Action] Request timed out.");
      req.destroy();
      resolve({ error: "The request timed out. Please check your internet connection." });
    });

    req.write(postData);
    req.end();
  });
}




