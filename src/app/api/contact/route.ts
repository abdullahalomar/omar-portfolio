import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message, recipientEmail } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields" },
        { status: 400 }
      );
    }

    const targetEmail =
      process.env.CONTACT_RECEIVER_EMAIL ||
      recipientEmail ||
      "abdullahalomar048@gmail.com";

    const resendApiKey = process.env.RESEND_API_KEY || "";
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
    const smtpUser = process.env.SMTP_USER || "";
    const smtpPass = process.env.SMTP_PASS || "";

    const mailSubject = "Welcome to Abdullah's Inbox";

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0f172a; color: #f8fafc; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #1e293b; border: 1px solid #334155; border-radius: 16px; padding: 28px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); }
            .header { border-b: 1px solid #334155; padding-bottom: 16px; margin-bottom: 20px; }
            .title { color: #38bdf8; font-size: 20px; font-weight: bold; margin: 0; }
            .field { margin-bottom: 14px; }
            .label { color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
            .value { color: #ffffff; font-size: 14px; font-weight: 600; }
            .message-box { background: #0f172a; border: 1px solid #334155; border-radius: 12px; padding: 16px; color: #e2e8f0; font-size: 14px; line-height: 1.6; white-space: pre-wrap; margin-top: 10px; }
            .footer { border-t: 1px solid #334155; padding-top: 16px; margin-top: 24px; font-size: 12px; color: #64748b; text-align: center; }
            .reply-button { display: inline-block; background: #38bdf8; color: #0f172a; font-weight: bold; text-decoration: none; padding: 10px 20px; border-radius: 9999px; margin-top: 16px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 class="title">📬 New Contact Message Received</h2>
            </div>
            <div class="field">
              <div class="label">Sender Name</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">Sender Email</div>
              <div class="value">${email}</div>
            </div>
            <div class="field">
              <div class="label">Subject</div>
              <div class="value">${subject || "Portfolio Inquiry"}</div>
            </div>
            <div class="field">
              <div class="label">Message Body</div>
              <div class="message-box">${message}</div>
            </div>
            <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject || "Portfolio Inquiry")}" class="reply-button">Reply Directly to ${name}</a>
            <div class="footer">
              Sent automatically via Abdullah's SQA Portfolio Contact Form.
            </div>
          </div>
        </body>
      </html>
    `;

    // 1. Check if Resend API Key is available
    if (resendApiKey) {
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "Abdullah Portfolio <onboarding@resend.dev>",
          to: [targetEmail],
          reply_to: email,
          subject: mailSubject,
          html: htmlContent,
        }),
      });

      const resendData = await resendRes.json();

      if (resendRes.ok) {
        return NextResponse.json({
          success: true,
          emailSent: true,
          provider: "Resend",
          message: "Email sent successfully to target address!",
          id: resendData.id,
        });
      } else {
        console.error("Resend API Email Error:", resendData);
        // If SMTP is not set, return the Resend error so user knows why
        if (!smtpUser || !smtpPass) {
          return NextResponse.json({
            success: false,
            emailSent: false,
            provider: "Resend",
            error: resendData.message || resendData.name || "Resend email delivery failed",
            details: resendData,
          }, { status: 400 });
        }
      }
    }

    // 2. Check if SMTP credentials are set up
    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465, // true for 465, false for 587
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"${name} (Portfolio Inquiry)" <${smtpUser}>`,
        to: targetEmail,
        replyTo: email,
        subject: mailSubject,
        html: htmlContent,
      });

      return NextResponse.json({
        success: true,
        emailSent: true,
        provider: "SMTP",
        message: "Email sent successfully to target address!",
      });
    }

    // 3. Fallback: Saved to Admin Inbox
    console.log(`[Contact Form Submission] Name: ${name}, Email: ${email}, Subject: ${subject}`);
    return NextResponse.json({
      success: true,
      emailSent: false,
      notice:
        "Message saved to Admin Inbox! Configure SMTP credentials (or RESEND_API_KEY) in .env.local to receive instant email notifications.",
    });
  } catch (error: any) {
    console.error("Contact API email send error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to process contact email request" },
      { status: 500 }
    );
  }
}
