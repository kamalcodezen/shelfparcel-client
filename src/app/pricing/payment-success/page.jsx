import { addPayment } from "@/lib/actions/payment";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

import { CheckCircle, Clock, LayoutDashboard, BookOpen } from "lucide-react";
import Link from "next/link";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const {
    id,
    status,
    metadata,
    customer_details: { email: customerEmail },
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    const paymentData = {
      sessionId: id,
      bookId: metadata?.bookId,
      bookTitle: metadata?.title,
      bookCover: metadata?.cover,
      userId: metadata?.userId,
      userEmail: metadata?.userEmail,
      librarianId: metadata?.librarianId,
      librarianEmail: metadata?.librarianEmail,
      amount: parseFloat(metadata?.fee || 0),
    };

    await addPayment(paymentData);

    return (
      <div className="min-h-[100vh] flex items-center justify-center p-4 md:p-6 font-urbanist">
        {/* Main Container using custom CSS layout tokens */}
        <section
          id="success"
          className="dashboard-card max-w-xl w-full p-8 md:p-12 text-center space-y-6 rounded-2xl relative overflow-hidden"
        >
          {/* 1. Status Icon Ring with branding tokens */}
          <div className="w-16 h-16 bg-muted text-primary rounded-full flex items-center justify-center mx-auto border border-border">
            <CheckCircle size={28} strokeWidth={2.5} />
          </div>

          {/* 2. Typography section bound to core font families */}
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Payment Confirmed
            </h2>
            <p className="text-[10px] font-black uppercase tracking-widest text-primary">
              Order Status Strictly Set to: Pending Delivery
            </p>
            <p className="text-lg sm:text-base text-muted-foreground max-w-sm mx-auto pt-2 leading-relaxed">
              Thank you for your request. A digital confirmation receipt has
              been issued and cataloged for{" "}
              <span className="text-foreground font-semibold underline decoration-primary/40 underline-offset-4">
                {customerEmail}
              </span>
              .
            </p>
          </div>

          {/* 3. Real-time workflow status strip using soft-card utilities */}
          <div className="soft-card p-4 text-left max-w-sm mx-auto flex items-center gap-3 rounded-xl">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </div>
            <span className="text-sm font-semibold text-foreground/90 flex items-center gap-2">
              <Clock size={14} className="text-primary" />
              Waiting in the Librarian Approval queue.
            </span>
          </div>

          {/* 4. Action layout built on custom primary/secondary buttons */}
          <div className="pt-4 border-t border-border flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              href="/dashboard/user"
              className="btn-primary w-full sm:w-auto text-center text-sm uppercase tracking-wider px-8 flex items-center justify-center gap-2"
            >
              <LayoutDashboard size={14} />
              View on Dashboard
            </Link>

            <Link
              href="/books"
              className="btn-secondary w-full sm:w-auto text-center text-sm uppercase tracking-wider px-8 text-foreground flex items-center justify-center gap-2"
            >
              <BookOpen size={14} />
              Keep Browsing
            </Link>
          </div>
        </section>
      </div>
    );
  }
}
