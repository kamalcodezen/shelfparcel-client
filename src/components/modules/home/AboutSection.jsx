import Link from "next/link";

const AboutSection = () => {
  return (
    <section className="relative  px-4 overflow-hidden py-16 bg-background text-foreground">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left side */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-bold tracking-wider uppercase rounded-full bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] border border-[rgb(var(--primary))]/20">
              📖 Our Core Mission
            </div>

            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight font-serif text-[#6b4226] dark:text-[rgb(var(--primary))]">
              Democratizing Access to Knowledge, One Doorstep at a Time.
            </h2>

            <p className="section-description text-base md:text-lg leading-relaxed">
              BiblioDrop targets students and busy professionals preparing for
              high-impact careers by providing a seamless peer-to-peer book
              delivery marketplace. Traditional library infrastructures demand
              physical visits, creating rigid logistics barriers. We unlock
              offline collections and personal bookshelves through intelligent,
              secure web architecture.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/books"
                className="btn-primary inline-flex items-center justify-center"
              >
                Explore Repository
              </Link>
              <Link
                href="/"
                className="btn-secondary inline-flex items-center justify-center font-semibold text-[#6b4226] dark:text-[rgb(var(--primary))] hover:bg-[rgb(var(--card-soft))]"
              >
                Our Full Story
              </Link>
            </div>
          </div>

          {/* Right side*/}
          <div className="lg:col-span-5 w-full">
            <div className="dashboard-card border border-[rgb(var(--border))] p-8 space-y-6 relative">
              {/* Background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[rgb(var(--primary))]/5 rounded-full blur-2xl pointer-events-none"></div>

              <h3 className="text-xl md:text-2xl font-bold text-[#6b4226] dark:text-[rgb(var(--accent))] tracking-tight">
                Why BiblioDrop Stands Out
              </h3>

              <div className="space-y-4 text-base">
                <div className="flex gap-3 items-start">
                  <p className="section-description text-base">
                    <strong>Verified Review Shield:</strong> Programmatic data
                    guardrails restrict active review submissions solely to
                    verified borrowers with a{" "}
                    <code className="px-1.5 py-0.5 rounded bg-[rgb(var(--muted))] text-sm">
                      Delivered
                    </code>{" "}
                    status loop.
                  </p>
                </div>

                <div className="flex gap-3 items-start">
                  <p className="section-description text-base">
                    <strong>Granular RBAC Dashboards:</strong> Dedicated system
                    views tailored explicitly for Readers, Librarians, and
                    Ecosystem Admins with full analytics charts.
                  </p>
                </div>

                <div className="flex gap-3 items-start">
                  <p className="section-description text-base">
                    <strong>Automated Stripe Pipelines:</strong> Isolated
                    delivery fee processing with resilient database state
                    transitions post-checkout.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[rgb(var(--border))]">
                <blockquote className="text-sm italic text-[rgb(var(--muted-foreground))] leading-relaxed">
                  "Engineered carefully matching advanced full-stack assignment
                  constraints to eliminate physical logistics
                  context-switching."
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
