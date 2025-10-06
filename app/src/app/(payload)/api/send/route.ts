import React from "react";

import { NextRequest, NextResponse } from "next/server";

import { Resend } from "resend";

import EmailTemplate from "@/containers/contact/email-template";

// TODO: add valid resend API key from env variable
const resend = new Resend("fake_key");

export async function POST(req: NextRequest) {
  try {
    const { name, organization, email, message } = await req.json();

    const reactElement = React.createElement(EmailTemplate, {
      name,
      organization,
      email,
      message,
    });

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["your-email@example.com"],
      subject: "New Contact Form Submission",
      react: reactElement,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : error },
      { status: 500 },
    );
  }
}
