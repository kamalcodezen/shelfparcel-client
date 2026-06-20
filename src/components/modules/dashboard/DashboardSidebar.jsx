"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Building2,
  Users,
  Settings,
  Menu,
  X,
  LogOut,
  Search,
  Bookmark,
  CreditCard,
  BriefcaseBusiness,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const DashboardSidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully! 👋");
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  // 👑 User Tabs Links (ডক অনুযায়ী ম্যাচড)
  const userNavLinks = [
    {
      title: "Overview",
      href: "/dashboard/user?tab=overview",
      icon: LayoutDashboard,
    },
    {
      title: "Delivery History",
      href: "/dashboard/user?tab=history",
      icon: FileText,
    },
    {
      title: "My Reading List",
      href: "/dashboard/user?tab=reading-list",
      icon: Bookmark,
    },
    {
      title: "My Reviews",
      href: "/dashboard/user?tab=reviews",
      icon: CreditCard,
    },
  ];

  // 👑 Librarian Tabs Links (ডক অনুযায়ী ম্যাচড)
  const librarianNavLinks = [
    {
      title: "Overview",
      href: "/dashboard/librarian?tab=overview",
      icon: LayoutDashboard,
    },
    {
      title: "Add Book",
      href: "/dashboard/librarian?tab=add-book",
      icon: FileText,
    },
    {
      title: "Manage Inventory",
      href: "/dashboard/librarian?tab=inventory",
      icon: Briefcase,
    },
    {
      title: "Manage Deliveries",
      href: "/dashboard/librarian?tab=deliveries",
      icon: Building2,
    },
  ];

  // 👑 Admin Tabs Links (ডক অনুযায়ী ম্যাচড)
  const adminNavLinks = [
    {
      title: "Overview",
      href: "/dashboard/admin?tab=overview",
      icon: LayoutDashboard,
    },
    {
      title: "Book Approval Queue",
      href: "/dashboard/admin?tab=approval",
      icon: BriefcaseBusiness,
    },
    { title: "Manage Users", href: "/dashboard/admin?tab=users", icon: Users },
    {
      title: "Manage All Books",
      href: "/dashboard/admin?tab=all-books",
      icon: Building2,
    },
    {
      title: "View All Transactions",
      href: "/dashboard/admin?tab=transactions",
      icon: CreditCard,
    },
  ];

  const dashboardNavLinks = {
    user: userNavLinks,
    librarian: librarianNavLinks,
    admin: adminNavLinks,
  };

  const menus = dashboardNavLinks[user?.role || "user"];

  return (
    <>
      {/* 📱 MOBILE TOPBAR */}
      <div className="lg:hidden h-16 border-b border-border bg-card px-4 flex items-center justify-between sticky top-0 z-40">
        <h2 className="text-xl font-bold tracking-tight text-foreground Poppins">
          <Link href="/">
            Biblio<span className="text-primary">Drop</span>
          </Link>
        </h2>
        <button
          onClick={() => setOpen(true)}
          className="w-10 h-10 rounded-xl border border-border bg-background flex items-center justify-center text-foreground cursor-pointer"
        >
          <Menu size={20} />
        </button>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[45]"
        />
      )}

      {/* 📱 MOBILE DRAWER */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-[280px] h-screen bg-card border-r border-border z-50 transition-transform duration-300 flex flex-col ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-5 flex items-center justify-between border-b border-border">
          <h2 className="text-2xl font-black tracking-tight text-foreground Poppins">
            Biblio<span className="text-primary">Drop</span>
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-4 space-y-1.5 flex-1 overflow-y-auto Urbanist">
          {menus?.map((item) => {
            const Icon = item.icon;
            const isActive = pathname + window?.location?.search === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${isActive ? "bg-primary text-white" : "text-muted-foreground hover:bg-primary/10 hover:text-primary"}`}
              >
                <Icon size={18} /> {item.title}
              </Link>
            );
          })}
        </div>
        <div className="p-4 border-t border-border/60">
          <button
            onClick={handleSignOut}
            className="w-full h-11 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500/10 flex items-center justify-center gap-2 font-semibold text-sm cursor-pointer"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      {/* 🖥️ DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-[280px] h-screen sticky top-0 bg-card border-r border-border p-6 shadow-sm">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-foreground Poppins">
            <Link href="/">
              Biblio<span className="text-primary">Drop</span>
            </Link>
          </h2>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mt-1.5 pl-0.5 Urbanist">
            {user?.role || "user"} Workspace
          </p>
        </div>
        <div className="mt-10 space-y-1.5 flex-1 overflow-y-auto Urbanist">
          {menus?.map((item, ind) => {
            const Icon = item.icon;
            // বর্তমান URL কুয়েরি প্যারামিটারের সাথে লিংক চেক করা
            const currentFullUrl =
              typeof window !== "undefined"
                ? pathname + window.location.search
                : pathname;
            const isActive = currentFullUrl.includes(item.href);

            return (
              <Link
                key={ind}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:bg-primary/10 hover:text-primary"}`}
              >
                <Icon size={18} /> {item.title}
              </Link>
            );
          })}
        </div>
        <div className="mt-auto pt-4 border-t border-border/60">
          <button
            onClick={handleSignOut}
            className="w-full h-11 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500/10 flex items-center justify-center gap-2 font-semibold text-sm cursor-pointer Urbanist"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
