# Atharv's Portfolio Website

A modern, high-performance, and fully responsive personal portfolio website built to showcase projects, skills, and certifications. This portfolio features a dynamic, full-stack contact form backed by a robust PostgreSQL database and an automated email notification system.

---

## Recent Updates (Checkpoint)

- **Dynamic Certificate Pages**: Built a dedicated Next.js dynamic route (`/certificate/[id]`) featuring a premium, glassmorphism-inspired layout to view high-resolution certificates.
- **Certificate Data Hooks & PDF Extraction**: Integrated new certificates (InAmigos Web Dev Internship, 45 Days of Code, Intro to Deep Learning, NLP). Extracted thumbnail images from PDFs using PyMuPDF and configured the "Verify Authenticity" buttons to link directly to the source PDFs.
- **UI & UX Refinements**: 
  - Updated the InAmigos Foundation Website project card to use an actual screenshot instead of a placeholder.
  - Improved the "Download Resume" behavior to open the PDF inline in a new tab rather than forcing an immediate download.
- **Maintenance**: Resolved strict TypeScript typings for Zod validation errors and configured VS Code to support new Tailwind CSS v4 `@theme` directives without throwing warnings.

---

## Tech Stack

### **Frontend**
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Vanilla CSS (Custom tokens)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Validation**: Zod (Client & Server)

### **Backend & Database**
- **API**: Next.js Route Handlers
- **Database**: PostgreSQL (Hosted on Neon)
- **ORM**: Prisma (v6)
- **Email Service**: Resend
- **Rate Limiting**: Custom In-Memory Store

---

## Architecture & Workflows

### **1. Full-Stack Contact Form Workflow**

When a visitor submits the contact form, the data undergoes rigorous client-side and server-side validation before being stored in the database and triggering an email notification to the site owner.

```mermaid
sequenceDiagram
    actor Visitor
    participant Browser as Client (Next.js)
    participant API as Server (/api/contact)
    participant DB as PostgreSQL (Neon)
    participant Resend as Email Service

    Visitor->>Browser: Fills out Contact Form
    Browser->>Browser: Zod Client-Side Validation
    Browser->>API: POST /api/contact {name, email, subject, message}
    
    API->>API: Rate Limiting Check (IP-based)
    API->>API: Zod Server-Side Validation
    
    API->>DB: Prisma Client: Create ContactMessage
    DB-->>API: Returns Success
    
    API->>Resend: Trigger Notification Email
    Resend-->>API: Returns Success
    
    API-->>Browser: 200 OK (Success Response)
    Browser-->>Visitor: Displays Success Message & Clears Form
```

### **2. Database Schema (Prisma)**

The data layer uses Prisma to interact with the PostgreSQL database. The schema ensures data integrity for every incoming contact message.

```mermaid
erDiagram
    ContactMessage {
        String id PK "cuid()"
        String name
        String email
        String subject
        String message
        Boolean isRead "default(false)"
        DateTime createdAt "default(now())"
    }
```

---

## Key Features

- **Blazing Fast Performance**: Statically generated pages where possible, optimizing load times.
- **Dynamic Grid Layouts**: Projects and certifications are displayed using clean, distinct UI cards with custom hover effects (Gold for projects, Emerald for certifications).
- **Smooth Animations**: High-quality micro-interactions using Framer Motion to give the UI a premium, native feel.
- **Type-Safe Full-Stack Architecture**: End-to-end type safety using TypeScript, Prisma, and Zod.
- **Secure Backend**: 
  - IP-based rate limiting to prevent spam.
  - Server-side validation parsing.
  - No hardcoded secrets (Environment variable driven).
- **Automated Emails**: Uses Resend API to instantly forward contact form submissions to the site owner.

---

## Project Structure

```text
portfolio/
├── app/                  # Next.js App Router pages and API routes
│   ├── api/contact/      # Backend logic for form submission
│   ├── globals.css       # Core design system and CSS variables
│   └── page.tsx          # Main entry point for the single-page layout
├── components/           # Reusable UI React components
│   ├── ContactForm.tsx   # Client-side form with state management
│   ├── ContactSection.tsx# Contact UI layout wrapper
│   ├── ShowcaseSection.tsx# Grid layout for projects & certs
│   └── ...               # Other UI components
├── data/                 # Centralized content management
│   └── portfolio.ts      # Site data (Bio, links, projects, skills)
├── lib/                  # Utility functions and configurations
│   ├── prisma.ts         # Prisma singleton client
│   └── validations/      # Zod validation schemas
├── prisma/               # Database schemas and migrations
│   └── schema.prisma     # Prisma configuration
└── public/               # Static assets
```

---

## Getting Started

### **1. Clone the repository**
```bash
git clone https://github.com/Atharvvvvvv/Portfolio-Website-.git
cd portfolio
```

### **2. Install dependencies**
```bash
npm install
```

### **3. Set up environment variables**
Create a `.env.local` file in the root of the `portfolio` directory:
```env
# Database connection string from Neon
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"

# Resend Email Configuration
RESEND_API_KEY="your_resend_api_key"
RESEND_FROM="onboarding@resend.dev"
RESEND_TO="your_personal_email@gmail.com"
```

### **4. Push the Database Schema**
Sync the Prisma schema with your PostgreSQL database:
```bash
npx prisma db push
```

### **5. Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the live site.

---

## Deployment

This project is optimized for deployment on **Vercel**:
1. Push your code to GitHub.
2. Import the project into Vercel.
3. Add your `DATABASE_URL` and `RESEND` variables in the Vercel Environment Variables settings.
4. Vercel will automatically build and deploy your Next.js app!
