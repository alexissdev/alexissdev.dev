import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    const resend = new Resend(process.env.RESEND_API_KEY ?? "");

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "alesideveloper@gmail.com",
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#0e0816;color:#fff;border-radius:12px;">
          <h2 style="color:#a855f7;margin-top:0;">New message from your portfolio</h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            <tr><td style="padding:8px 0;color:rgba(255,255,255,0.4);font-size:12px;width:80px;">FROM</td>
                <td style="padding:8px 0;color:#fff;font-size:14px;">${name} &lt;${email}&gt;</td></tr>
            <tr><td style="padding:8px 0;color:rgba(255,255,255,0.4);font-size:12px;">SUBJECT</td>
                <td style="padding:8px 0;color:#fff;font-size:14px;">${subject}</td></tr>
          </table>
          <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:20px;">
            <p style="color:rgba(255,255,255,0.7);font-size:14px;line-height:1.7;margin:0;">${message.replace(/\n/g, "<br/>")}</p>
          </div>
          <p style="color:rgba(255,255,255,0.25);font-size:12px;margin-top:24px;margin-bottom:0;">
            Reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
