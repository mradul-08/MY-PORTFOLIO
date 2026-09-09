import { transporter } from "@/nodemailer/config";
import { NextResponse } from "next/server";

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return entities[character];
  });
}

export async function POST(request: Request) {
  const my_email = process.env.CONTACT_EMAIL ?? "mradulgarg2005@gmail.com";

  const formData = await request.formData();
  const name = String(formData.get("user_name") ?? "").trim();
  const email = String(formData.get("user_email") ?? "").trim().toLowerCase();
  const message = String(formData.get("user_message") ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { message: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  if (name.length > 120 || email.length > 254 || message.length > 5000) {
    return NextResponse.json(
      { message: "Please keep the form entries within the allowed length." },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { message: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  try {
    await transporter.sendMail({
      from: `Portfolio contact <${my_email}>`,
      to: my_email,
      ...(process.env.CONTACT_CC ? { cc: process.env.CONTACT_CC } : {}),
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Message:</strong><br />${safeMessage}</p>
            `,
    });

    return NextResponse.json({ message: "Message was sent successfully!" });
  } catch {
    return NextResponse.json(
      { message: "Unable to send the message right now. Please try again later." },
      { status: 500 }
    );
  }
}
