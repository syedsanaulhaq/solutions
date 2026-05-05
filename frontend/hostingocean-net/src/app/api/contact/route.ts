import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }
    if (typeof name !== 'string' || typeof subject !== 'string' || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid input.' }, { status: 400 });
    }
    if (name.length > 200 || subject.length > 300 || message.length > 5000) {
      return NextResponse.json({ error: 'Input too long.' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const safeSubject = subject.replace(/[\r\n]/g, ' ').substring(0, 200);
    const safeName = name.replace(/[\r\n]/g, ' ').substring(0, 100);

    await transporter.sendMail({
      from: `"HostingOcean.net Enquiry" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL ?? 'info@hostingocean.net',
      replyTo: email,
      subject: `[HostingOcean.net] ${safeSubject}`,
      text: `Name: ${safeName}\nEmail: ${email}\nSubject: ${safeSubject}\n\n${message}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(safeName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(safeSubject)}</p>
        <hr />
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
  }
}

function escapeHtml(str: string) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
