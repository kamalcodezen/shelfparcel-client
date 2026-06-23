"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Building2,
  Users,
  Menu,
  X,
  LogOut,
  Bookmark,
  CreditCard,
  BriefcaseBusiness,
  HomeIcon,
  BookOpen,
  UserPen,
} from "lucide-react";

import { toast } from "react-toastify";
import { Avatar, Dropdown } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useTheme } from "next-themes";

const DashboardSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
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

  // User Tabs Links
  const userNavLinks = [
    {
      title: "Overview",
      href: "/dashboard/user/userOverview",
      icon: LayoutDashboard,
    },
    {
      title: "Delivery History",
      href: "/dashboard/user/userDeliveryHistory",
      icon: FileText,
    },
    {
      title: "My Reading List",
      href: "/dashboard/user/myReadingList",
      icon: Bookmark,
    },
    {
      title: "My Reviews",
      href: "/dashboard/user?tab=reviews",
      icon: CreditCard,
    },
  ];

  // Librarian Tabs Links
  const librarianNavLinks = [
    {
      title: "Profile",
      href: "/dashboard/librarian/profile",
      icon: UserPen,
    },
    {
      title: "Overview",
      href: "/dashboard/librarian/overview",
      icon: LayoutDashboard,
    },
    {
      title: "Add Book",
      href: "/dashboard/librarian/addBook",
      icon: FileText,
    },
    {
      title: "Manage Inventory",
      href: "/dashboard/librarian/manageInventory",
      icon: Briefcase,
    },
    {
      title: "Manage Deliveries",
      href: "/dashboard/librarian/manageDeliveries",
      icon: Building2,
    },
  ];

  // Admin Tabs Links
  const adminNavLinks = [
    {
      title: "Overview",
      href: "/dashboard/admin/overview",
      icon: LayoutDashboard,
    },
    {
      title: "Book Approval Queue",
      href: "/dashboard/admin/bookApproval",
      icon: BriefcaseBusiness,
    },
    { title: "Manage Users", href: "/dashboard/admin/users", icon: Users },
    {
      title: "Manage All Books",
      href: "/dashboard/admin/manageBooks",
      icon: Building2,
    },
    {
      title: "View All Transactions",
      href: "/dashboard/admin/viewTransactions",
      icon: CreditCard,
    },
  ];

  const dashboardNavLinks = {
    user: userNavLinks,
    librarian: librarianNavLinks,
    admin: adminNavLinks,
  };

  const userRole = user?.role || "user";
  const menus = dashboardNavLinks[userRole];

  if (!mounted) return null;

  return (
    <>
      {/* 📱 MOBILE TOPBAR */}
      <div className="lg:hidden h-16 border-b border-border bg-card px-4 flex items-center justify-between sticky top-0 z-40">
        <h2 className="text-xl font-bold tracking-tight text-foreground Poppins">
          <Link href="/">
            <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Biblio<span>Drop</span>
            </span>
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
          <div>
            <h2 className="text-2xl font-black tracking-tight text-foreground Poppins">
              <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Biblio<span>Drop</span>
              </span>
            </h2>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mt-1.5 pl-0.5 Urbanist">
              {user?.role || "user"} Dashboard
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-4 space-y-1.5 flex-1 overflow-y-auto Urbanist">
          {menus?.map((item, ind) => {
            const Icon = item.icon;

            // 🎯 উন্ডো বা প্যারামিটার ট্র্যাকিং ছাড়াই শুধু usePathname এবং ডাইরেক্ট লিঙ্ক দিয়ে একটিভ কন্ডিশন
            const isActive =
              pathname === item.href || item.href.includes(pathname + "?");

            return (
              <Link
                key={ind}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${isActive ? "bg-primary text-background font-bold shadow-md" : "text-muted-foreground hover:bg-primary/10 hover:text-primary"}`}
              >
                <Icon size={18} /> {item.title}
              </Link>
            );
          })}
        </div>

        {/* bottom profile section */}
        <div className="mt-auto pt-4 border-t border-border/60">
          <div className="flex items-center gap-3 py-4 px-4">
            <Dropdown>
              <Dropdown.Trigger className="rounded-full cursor-pointer focus:outline-none">
                <Avatar className="ring-2 ring-primary/40 hover:ring-primary transition-all duration-300">
                  <Avatar.Image
                    alt={user?.name || "User Profile"}
                    src={user?.image}
                    referrerPolicy="no-referrer"
                  />
                  <Avatar.Fallback className="bg-primary text-background font-semibold font-poppins text-sm">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "B"}
                  </Avatar.Fallback>
                </Avatar>
              </Dropdown.Trigger>

              <Dropdown.Popover
                className="bg-card border border-border rounded-3xl min-w-[240px] md:min-w-[260px] p-2 z-50"
                style={{ boxShadow: "var(--shadow)" }}
              >
                <Dropdown.Menu className="text-foreground font-urbanist flex flex-col gap-0.5">
                  <Dropdown.Item
                    id="dashboard"
                    textValue="Home"
                    className="p-0 rounded-xl hover:bg-primary/10 hover:text-primary transition-all"
                  >
                    <Link
                      href={"/"}
                      className="flex items-center gap-3 px-4 py-2.5 w-full h-full text-foreground font-medium"
                    >
                      <HomeIcon size={18} />
                      <span>Home</span>
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item
                    id="profile"
                    textValue="Browse Books"
                    className="p-0 rounded-xl hover:bg-primary/10 hover:text-primary transition-all mt-0.5"
                  >
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-2.5 w-full h-full text-foreground"
                    >
                      <BookOpen size={18} />
                      <span>Browse Books</span>
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item
                    id="logout"
                    textValue="Logout"
                    className="p-0 mt-3 border-t border-border/60 pt-2 hover:bg-transparent focus:bg-transparent"
                  >
                    <button
                      onClick={handleLogout}
                      className="w-full flex justify-center px-4 py-2.5 rounded-xl text-background font-semibold transition-all cursor-pointer"
                      style={{
                        background:
                          theme === "dark"
                            ? "linear-gradient(135deg, rgb(var(--primary)), rgb(var(--secondary)))"
                            : "linear-gradient(135deg, #c4844a, #6b4226)",
                        color: theme === "dark" ? "#071a1d" : "#fff",
                      }}
                    >
                      Logout
                    </button>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>

            <div className="overflow-hidden">
              <p className="font-semibold text-sm text-foreground truncate">
                {session?.user?.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {session?.user?.email}
              </p>
            </div>
          </div>
          <div className="p-4">
            <button
              onClick={handleLogout}
              className="w-full h-11 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500/10 flex items-center justify-center gap-2 font-semibold text-sm cursor-pointer Urbanist"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* 🖥️ DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-[280px] h-screen sticky top-0 bg-card border-r border-border p-6 shadow-sm">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-foreground Poppins">
            <Link href="/">
              <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Biblio<span>Drop</span>
              </span>
            </Link>
          </h2>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mt-1.5 pl-0.5 Urbanist">
            {user?.role || "user"} Dashboard
          </p>
        </div>
        <div className="mt-10 space-y-1.5 flex-1 overflow-y-auto Urbanist">
          {menus?.map((item, ind) => {
            const Icon = item.icon;

            // 🎯 উইন্ডো ছাড়া শুধুমাত্র ব্রাউজারের পাথনেম ম্যাচিং দিয়ে ক্লিন একটিভ কন্ডিশন
            const isActive =
              pathname === item.href || item.href.includes(pathname + "?");

            return (
              <Link
                key={ind}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive ? "bg-primary text-background font-bold shadow-md" : "text-muted-foreground hover:bg-primary/10 hover:text-primary"}`}
              >
                <Icon size={18} /> {item.title}
              </Link>
            );
          })}
        </div>

        {/* bottom profile section */}
        <div className="mt-auto pt-4 border-t border-border/60">
          <div className="flex items-center gap-3 py-4">
            <Dropdown>
              <Dropdown.Trigger className="rounded-full cursor-pointer focus:outline-none">
                <Avatar className="ring-2 ring-primary/40 hover:ring-primary transition-all duration-300">
                  <Avatar.Image
                    alt={user?.name || "User Profile"}
                    src={user?.image}
                    referrerPolicy="no-referrer"
                  />
                  <Avatar.Fallback className="bg-primary text-background font-semibold font-poppins text-sm">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "B"}
                  </Avatar.Fallback>
                </Avatar>
              </Dropdown.Trigger>

              <Dropdown.Popover
                className="bg-card border border-border rounded-3xl min-w-[240px] md:min-w-[260px] p-2 z-50"
                style={{ boxShadow: "var(--shadow)" }}
              >
                <Dropdown.Menu className="text-foreground font-urbanist flex flex-col gap-0.5">
                  <Dropdown.Item
                    id="dashboard"
                    textValue="Home"
                    className="p-0 rounded-xl hover:bg-primary/10 hover:text-primary transition-all"
                  >
                    <Link
                      href={"/"}
                      className="flex items-center gap-3 px-4 py-2.5 w-full h-full text-foreground font-medium"
                    >
                      <HomeIcon size={18} />
                      <span>Home</span>
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item
                    id="profile"
                    textValue="Browse Books"
                    className="p-0 rounded-xl hover:bg-primary/10 hover:text-primary transition-all mt-0.5"
                  >
                    <Link
                      href="/books"
                      className="flex items-center gap-3 px-4 py-2.5 w-full h-full text-foreground"
                    >
                      <BookOpen size={18} />
                      <span>Browse Books</span>
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item
                    id="logout"
                    textValue="Logout"
                    className="p-0 mt-3 border-t border-border/60 pt-2 hover:bg-transparent focus:bg-transparent"
                  >
                    <button
                      onClick={handleLogout}
                      className="w-full flex justify-center px-4 py-2.5 rounded-xl text-background font-semibold transition-all cursor-pointer"
                      style={{
                        background:
                          theme === "dark"
                            ? "linear-gradient(135deg, rgb(var(--primary)), rgb(var(--secondary)))"
                            : "linear-gradient(135deg, #c4844a, #6b4226)",
                        color: theme === "dark" ? "#071a1d" : "#fff",
                      }}
                    >
                      Logout
                    </button>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>

            <div className="overflow-hidden">
              <p className="font-semibold text-sm text-foreground truncate">
                {session?.user?.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {session?.user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
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
