export const dynamic = "force-dynamic";

import { Resend } from "resend";
import { z } from "zod";

const EmailSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters!"),
  email: z.string().email({ message: "Please provide a valid email address!" }),
  message: z.string().min(10, "Message must be at least 10 characters long!"),
});

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Missing RESEND_API_KEY environment variable");
    return Response.json(
      {
        error:
          "Server configuration error: RESEND_API_KEY is not set in environment variables.",
      },
      { status: 500 }
    );
  }
  const resend = new Resend(apiKey);

  try {
    const body = await req.json();
    const {
      success: zodSuccess,
      data: zodData,
      error: zodError,
    } = EmailSchema.safeParse(body);

    if (!zodSuccess) {
      const firstError =
        zodError?.errors?.[0]?.message || "Invalid form data provided.";
      return Response.json({ error: firstError }, { status: 400 });
    }

    const { data: resendData, error: resendError } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "hammadnawaz519@gmail.com",
      replyTo: zodData.email,
      subject: `Portfolio Message from ${zodData.fullName}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #eaeaea; border-radius: 12px; background-color: #ffffff; color: #1a1a1a;">
          <h2 style="font-size: 20px; font-weight: 700; margin-top: 0; margin-bottom: 16px; color: #111827;">
            📬 New Portfolio Message
          </h2>
          <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Sender Name:</strong> ${zodData.fullName}</p>
            <p style="margin: 0; font-size: 14px;"><strong>Email Address:</strong> <a href="mailto:${zodData.email}" style="color: #2563eb; text-decoration: underline;">${zodData.email}</a></p>
          </div>
          <div style="border-top: 1px solid #e5e7eb; padding-top: 16px;">
            <p style="font-weight: 600; font-size: 14px; margin-bottom: 8px; color: #374151;">Message:</p>
            <p style="font-size: 15px; line-height: 1.6; white-space: pre-wrap; color: #1f2937; margin: 0;">${zodData.message}</p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #9ca3af; border-top: 1px solid #f3f4f6; padding-top: 12px;">
            You can reply directly to this email to respond to ${zodData.fullName} (${zodData.email}).
          </p>
        </div>
      `,
    });

    if (resendError) {
      console.error("Resend API Error:", resendError);
      return Response.json(
        { error: resendError.message || "Failed to deliver email through Resend." },
        { status: 500 }
      );
    }

    return Response.json(resendData);
  } catch (error: any) {
    console.error("Email Route Error:", error);
    return Response.json(
      { error: error?.message || "An unexpected error occurred while sending email." },
      { status: 500 }
    );
  }
}
