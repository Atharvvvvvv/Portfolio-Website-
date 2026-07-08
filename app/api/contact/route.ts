import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT = 3;
const TIME_WINDOW = 60 * 60 * 1000; // 1 hour

export async function POST(req: NextRequest) {
  try {
    // 1. Get IP for rate limiting
    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
    
    // 2. Rate Limit (In-Memory)
    const now = Date.now();
    const windowStart = now - TIME_WINDOW;
    
    // Clean up old entries periodically or inline (here inline for simplicity)
    const currentRate = rateLimitMap.get(ip);
    
    if (currentRate && currentRate.timestamp > windowStart) {
      if (currentRate.count >= RATE_LIMIT) {
        return NextResponse.json(
          { error: "Too many requests. Please try again later." },
          { status: 429 }
        );
      }
      rateLimitMap.set(ip, { count: currentRate.count + 1, timestamp: currentRate.timestamp });
    } else {
      rateLimitMap.set(ip, { count: 1, timestamp: now });
    }

    // 3. Parse and Validate body (Zod)
    const body = await req.json();
    const validatedData = contactSchema.parse(body);

    // 4. Save to PostgreSQL (Prisma)
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject,
        message: validatedData.message,
      },
    });

    // 5. Send email notification (Resend)
    await resend.emails.send({
      from: process.env.RESEND_FROM || "Contact Form <onboarding@resend.dev>",
      to: process.env.RESEND_TO || "jadonatharv1@gmail.com",
      subject: `New Contact Form Submission: ${validatedData.subject}`,
      text: `Name: ${validatedData.name}\nEmail: ${validatedData.email}\nSubject: ${validatedData.subject}\n\nMessage:\n${validatedData.message}`,
    });

    // 6. Return Success
    return NextResponse.json(
      { message: "Message sent successfully", data: contactMessage },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Contact Form Error:", error);

    // Handle Zod Validation Errors
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid data provided", details: error.errors },
        { status: 400 }
      );
    }

    // Generic Internal Server Error
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
