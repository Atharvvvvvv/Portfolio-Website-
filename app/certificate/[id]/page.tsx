import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { portfolio } from "@/data/portfolio";
import { ArrowLeft, ShieldCheck, CalendarDays } from "lucide-react";

export default async function CertificatePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const certificate = portfolio.showcase.items.find(
    (item) => item.id === params.id && item.type === "certificate"
  );

  if (!certificate) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground py-20 px-6 sm:px-12 selection:bg-accent/30">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <Link 
          href="/#showcase" 
          className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-accent transition-colors w-fit group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </Link>
        
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="flex-1 w-full bg-surface/50 border border-border/50 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm p-4 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-transparent pointer-events-none" />
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-border/30 bg-black/20">
              <Image 
                src={certificate.image} 
                alt={certificate.title} 
                fill 
                className="object-contain" 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 900px"
                priority
              />
            </div>
          </div>
          
          <div className="w-full md:w-1/3 flex flex-col gap-8 pt-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4 leading-tight">{certificate.title}</h1>
              {certificate.issuer && (
                <p className="text-lg text-muted flex items-center gap-2 font-medium">
                  <ShieldCheck size={20} className="text-emerald-500" />
                  Issued by {certificate.issuer}
                </p>
              )}
            </div>
            
            <div className="w-full h-px bg-border/50" />
            
            {certificate.date && (
              <div className="flex items-center gap-3 text-muted">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10">
                  <CalendarDays size={18} className="text-accent" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-muted/70 font-semibold">Date Received</span>
                  <span className="font-medium text-foreground">{certificate.date}</span>
                </div>
              </div>
            )}
            
            {certificate.tags && certificate.tags.length > 0 && (
              <div>
                <span className="text-xs uppercase tracking-wider text-muted/70 font-semibold block mb-3">Skills & Tags</span>
                <div className="flex flex-wrap gap-2">
                  {certificate.tags.map(tag => (
                    <span key={tag} className="px-3 py-1.5 bg-accent/10 text-accent text-sm font-medium rounded-full ring-1 ring-inset ring-accent/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {certificate.certificate && (
              <a 
                href={certificate.certificate} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-4 bg-emerald-500/10 text-emerald-400 font-semibold rounded-xl border border-emerald-500/20 hover:bg-emerald-500/20 transition-all hover:-translate-y-1 shadow-lg hover:shadow-emerald-500/10 w-full"
              >
                <ShieldCheck size={20} />
                Verify Authenticity
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
