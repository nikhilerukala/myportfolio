import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const parseBoolean = (value?: string) => {
  if (!value) {
    return undefined;
  }

  const normalized = value.trim().toLowerCase();

  if (normalized === "true") {
    return true;
  }

  if (normalized === "false") {
    return false;
  }

  return undefined;
};

const getMailConfig = () => {
  const service = process.env.EMAIL_SERVICE || process.env.SMTP_SERVICE || "gmail";
  const host = process.env.SMTP_HOST;
  const portValue = process.env.SMTP_PORT;
  const parsedPort = portValue ? Number(portValue) : undefined;
  const port = Number.isFinite(parsedPort) ? parsedPort : undefined;
  const secure =
    parseBoolean(process.env.EMAIL_SECURE || process.env.SMTP_SECURE) ??
    (port === 465 ? true : undefined);
  const user = process.env.EMAIL_USER || process.env.SMTP_USER;
  const pass = process.env.EMAIL_PASS || process.env.SMTP_PASS;

  return {
    service,
    host,
    port,
    secure,
    user,
    pass,
    contactEmail: process.env.CONTACT_EMAIL || user,
    from:
      process.env.EMAIL_FROM ||
      process.env.SMTP_FROM ||
      (user ? `"Portfolio Contact" <${user}>` : undefined),
  };
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const message = String(body?.message ?? "").trim();
    const mailConfig = getMailConfig();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    if (!mailConfig.user || !mailConfig.pass) {
      return NextResponse.json(
        { error: "Email credentials are not configured on the server" },
        { status: 500 }
      );
    }

    const transporter = mailConfig.host
      ? nodemailer.createTransport({
          host: mailConfig.host,
          port: mailConfig.port || 587,
          secure: mailConfig.secure ?? false,
          auth: {
            user: mailConfig.user,
            pass: mailConfig.pass,
          },
        })
      : nodemailer.createTransport({
          service: mailConfig.service,
          auth: {
            user: mailConfig.user,
            pass: mailConfig.pass,
          },
        });

    await transporter.sendMail({
      from: mailConfig.from,
      replyTo: `"${name}" <${email}>`,
      to: mailConfig.contactEmail,
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    const errorDetails =
      error instanceof Error
        ? {
            message: error.message,
            name: error.name,
            stack: error.stack,
          }
        : { value: error };

    console.error("Next contact route error:", errorDetails);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
