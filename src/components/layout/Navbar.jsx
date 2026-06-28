"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { HiMenu, HiX } from "react-icons/hi";
import { Sun, Moon, ChevronRight, ChevronDown } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { Avatar, Dropdown } from "@heroui/react";
import logo from "../../../public/images/fav.png";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const links = [
    { label: "Home", path: "/" },
    { label: "Browse Books", path: "/books" },
  ];

  const dashboardRoutes = {
    user: "/dashboard/user",
    librarian: "/dashboard/librarian",
    admin: "/dashboard/admin",
  };
  const userRole = user?.role || "user";
  const userDashboardPath = dashboardRoutes[userRole] || "/dashboard/user";

  // logout function
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("See you soon! 👋 Logged out successfully", {
            position: "top-right",
            autoClose: 3000,
          });

          router.push("/");
          router.refresh();
        },
      },
    });
  };

  if (!mounted) return null;

  return (
    <>
      {/* ==========================
          NAVBAR MAIN CONTAINER
      ========================== */}
      <header className="fixed top-0 left-0 w-full z-50 ">
        <nav className=" bg-card/50 backdrop-blur  transition-all duration-300 shadow-sm">
          <div className="container-custom h-15 flex items-center justify-between">
            {/* LOGO SECTION */}
            <Link href={"/"} className="flex items-center gap-3 group">
              <svg
                viewBox="0 0 24 24"
                className="w-9 h-9 text-primary transition-transform duration-300 group-hover:scale-105"
                fill="currentColor"
              >
                <path d="M2 7h5v2H2zm-1 4h7v2H1zm2 4h5v2H3z" />
                <path d="M20 8h-3V4H9v13h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM14 17c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm0-4V7h2v6h-2zm4 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
              </svg>
              <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Biblio<span>Drop</span>
              </span>
            </Link>

            {/* dot Bool icon */}
            <div className="hidden md:flex items-center gap-6 ml-8">
              {links.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    scroll
                    className="relative pb-2 pt-1 px-1 text-base font-semibold transition-all duration-300 flex flex-col items-center group"
                  >
                    <span
                      className={`transition-colors duration-300 ${isActive ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      {link.label}
                    </span>

                    <span
                      className={`absolute bottom-0 w-1.5 h-1.5 rounded-full bg-primary transition-all duration-300 transform-gpu ${
                        isActive
                          ? "scale-100 opacity-100 shadow-[0_0_10px_rgb(var(--primary))]"
                          : "scale-0 opacity-0 group-hover:scale-75 group-hover:opacity-50"
                      }`}
                    />
                  </Link>
                );
              })}

              {/* Dashboard Dropdown Link Trigger */}
              {user && (
                <div className="relative pb-2 pt-1">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={`text-base font-semibold transition-all flex items-center gap-1 cursor-pointer transition-colors duration-300 ${
                      pathname.startsWith("/dashboard")
                        ? "text-primary font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Dashboard
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary transition-all duration-300 ${
                      pathname.startsWith("/dashboard")
                        ? "scale-100 opacity-100 shadow-[0_0_10px_rgb(var(--primary))]"
                        : "scale-0 opacity-0"
                    }`}
                  />

                  {dropdownOpen && (
                    <div className="absolute top-full mt-3 right-0 w-56 rounded-md border border-border bg-card p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                      <div className="px-4 py-2 border-b border-border mb-1.5 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary block">
                            Active Session
                          </span>
                          <span className="text-sm text-muted-foreground font-medium truncate block">
                            {user?.email}
                          </span>
                        </div>
                        <div>
                          <Avatar>
                            <Avatar.Image
                              alt={session?.user?.name || "User Profile"}
                              src={
                                session?.user?.image ||
                                "https://api.dicebear.com/7.x/adventurer/svg"
                              }
                              size="sm"
                              referrerPolicy="no-referrer"
                            />
                            <Avatar.Fallback className="bg-[#D95C78] text-white font-semibold">
                              {session?.user?.name
                                ? session.user.name.charAt(0).toUpperCase()
                                : "B"}
                            </Avatar.Fallback>
                          </Avatar>
                        </div>
                      </div>

                      {/*  Reader Dashboard Option */}
                      <Link
                        href={user?.role === "user" ? "/dashboard/user" : "#"}
                        onClick={(e) => {
                          if (user?.role !== "user") {
                            e.preventDefault();
                            return;
                          }
                          setDropdownOpen(false);
                        }}
                        className={`flex items-center px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors ${
                          user?.role === "user"
                            ? "bg-primary/10 text-primary hover:bg-primary/20"
                            : "cursor-not-allowed opacity-40 pointer-events-none select-none"
                        }`}
                      >
                        Reader Dashboard {user?.role === "user" && "•"}
                      </Link>

                      {/*  Librarian Dashboard Option */}
                      <Link
                        href={
                          user?.role === "librarian"
                            ? "/dashboard/librarian"
                            : "#"
                        }
                        onClick={(e) => {
                          if (user?.role !== "librarian") {
                            e.preventDefault();
                            return;
                          }
                          setDropdownOpen(false);
                        }}
                        className={`flex items-center px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors ${
                          user?.role === "librarian"
                            ? "bg-primary/10 text-primary hover:bg-primary/20"
                            : "cursor-not-allowed opacity-40 pointer-events-none select-none"
                        }`}
                      >
                        Librarian Dashboard {user?.role === "librarian" && "•"}
                      </Link>

                      {/*  Admin Dashboard Option */}
                      <Link
                        href={user?.role === "admin" ? "/dashboard/admin" : "#"}
                        onClick={(e) => {
                          if (user?.role !== "admin") {
                            e.preventDefault();
                            return;
                          }
                          setDropdownOpen(false);
                        }}
                        className={`flex items-center px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors ${
                          user?.role === "admin"
                            ? "bg-primary/10 text-primary hover:bg-primary/20"
                            : "cursor-not-allowed opacity-40 pointer-events-none select-none"
                        }`}
                      >
                        Admin Dashboard {user?.role === "admin" && "•"}
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* right side actions */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-10 h-10 rounded-xl border border-border bg-card hover:bg-muted flex items-center justify-center text-primary transition-all duration-300 shadow-xs cursor-pointer active:scale-95"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {isPending && !user && (
                <div className="h-10 w-24 animate-pulse rounded-2xl bg-muted" />
              )}

              <div className="flex items-center justify-center">
                {!isPending && user && (
                  <Dropdown>
                    {/*  Dropdown Trigger*/}
                    <Dropdown.Trigger className="rounded-full cursor-pointer focus:outline-none">
                      <Avatar className="ring-1 ring-primary/40 hover:ring-primary transition-all duration-300">
                        <Avatar.Image
                          alt={user?.name || "User Profile"}
                          src={user?.image}
                          referrerPolicy="no-referrer"
                        />
                        <Avatar.Fallback className="bg-primary text-background font-semibold font-poppins text-base">
                          {user?.name ? user.name.charAt(0).toUpperCase() : "B"}
                        </Avatar.Fallback>
                      </Avatar>
                    </Dropdown.Trigger>

                    {/* ড্রপডাউন পপওভার — আপনার নিজস্ব 'bg-card' এবং 'border' থিমে সাজানো */}
                    <Dropdown.Popover
                      className="bg-card border border-border rounded-lg min-w-[240px] md:min-w-[280px] p-2"
                      style={{ boxShadow: "var(--shadow)" }}
                    >
                      {/* active session*/}
                      <div className="px-4 pt-3 pb-3 border-b border-border/60 mb-1.5">
                        <div className="flex items-center gap-3">
                          <Avatar size="sm">
                            <Avatar.Image
                              alt={user?.name || "User"}
                              src={user?.image}
                              referrerPolicy="no-referrer"
                            />
                            <Avatar.Fallback className="bg-primary text-background font-semibold">
                              {user?.name
                                ? user.name.charAt(0).toUpperCase()
                                : "B"}
                            </Avatar.Fallback>
                          </Avatar>
                          <div className="flex flex-col gap-0 overflow-hidden">
                            <p className="text-base font-semibold text-foreground font-poppins truncate">
                              {user?.name || "Anonymous User"}
                            </p>
                            <p className="text-sm text-muted-foreground truncate font-urbanist">
                              {user?.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* menu items login user*/}
                      <Dropdown.Menu className="text-foreground font-urbanist flex flex-col gap-0.5">
                        <Dropdown.Item
                          id="dashboard"
                          textValue="My Dashboard"
                          className="p-0 rounded-xl hover:bg-primary/10 hover:text-primary transition-all"
                        >
                          <Link
                            href={userDashboardPath}
                            className="flex items-center gap-3 px-4 py-2.5 w-full h-full text-foreground font-medium"
                          >
                            <span>📊</span>
                            <span>My Dashboard</span>
                          </Link>
                        </Dropdown.Item>

                        {/* my profile*/}
                        <Dropdown.Item
                          id="profile"
                          textValue="My Profile"
                          className="p-0 rounded-xl hover:bg-primary/10 hover:text-primary transition-all mt-0.5"
                        >
                          <Link
                            href={`/dashboard/${user.role}/profile`}
                            className="flex items-center gap-3 px-4 py-2.5 w-full h-full text-foreground"
                          >
                            <span>👤</span>
                            <span>My Profile</span>
                          </Link>
                        </Dropdown.Item>

                        {/* logout*/}
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
                )}
              </div>

              {!isPending && !user && (
                <div className="flex items-center gap-2">
                  <Link
                    href="/signin"
                    className="btn-primary !py-2 !px-5 !text-base !rounded-md font-bold"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>

            {/* মোবাইল মেনু টগল হ্যামবার্গার বাটন */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden h-11 w-11 rounded-xl border border-border bg-card flex items-center justify-center text-foreground cursor-pointer"
            >
              <HiMenu size={24} />
            </button>
          </div>
        </nav>
      </header>

      {/* ==========================
          OVERLAY / BACKDROP
      ========================== */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ==========================
          MOBILE DRAWER PANEL 
      ========================== */}
      <div
        className={`fixed top-0 left-0 h-screen w-[80%] max-w-[340px] z-[100]
        transform-gpu transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform
        ${open ? "translate-x-0 shadow-[10px_0_40px_rgba(0,0,0,0.3)]" : "-translate-x-full"}`}
      >
        <div className="h-full bg-card border-r border-border flex flex-col shadow-2xl text-foreground">
          {/* স্লাইডার হেডার */}
          <div className="h-20 px-6 border-b border-border flex items-center justify-between">
            <Avatar>
              <Avatar.Image
                alt={session?.user?.name || "User Profile"}
                src={
                  session?.user?.image ||
                  "https://api.dicebear.com/7.x/adventurer/svg"
                }
                size="sm"
                referrerPolicy="no-referrer"
              />
              <Avatar.Fallback className=" bg-background text-white font-semibold">
                {session?.user?.name
                  ? session.user.name.charAt(0).toUpperCase()
                  : "B"}
              </Avatar.Fallback>
            </Avatar>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Biblio<span>Drop</span>
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-2xl text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
            >
              <HiX />
            </button>
          </div>

          {/* মোবাইল স্লাইডারে লিঙ্কসমূহ */}
          <div className="flex-1 p-6 space-y-3 overflow-y-auto">
            {links.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all border border-transparent relative overflow-hidden group ${
                    isActive
                      ? "bg-primary/5 text-primary border-primary/20 font-bold"
                      : "text-muted-foreground border-transparent hover:text-foreground hover:bg-card-soft"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-1.5 h-1.5 rounded-full bg-primary transition-all duration-300 ${
                        isActive
                          ? "scale-100 opacity-100 shadow-[0_0_8px_rgb(var(--primary))]"
                          : "scale-0 opacity-0"
                      }`}
                    />
                    <span>{link.label}</span>
                  </div>
                  <ChevronRight
                    size={18}
                    className={
                      isActive
                        ? "text-primary translate-x-0.5 transition-transform"
                        : "text-muted-foreground/40"
                    }
                  />
                </Link>
              );
            })}

            {user?.email && (
              <Link
                href={userDashboardPath}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all border border-transparent mt-2 group bg-primary/5 text-primary border-primary/10 font-semibold`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary scale-100 opacity-100 shadow-[0_0_8px_rgb(var(--primary))]" />
                  <span>Dashboard</span>
                </div>
                <ChevronRight
                  size={18}
                  className="text-primary group-hover:translate-x-0.5 transition-transform"
                />
              </Link>
            )}
          </div>

          {/* মোবাইল বটম কন্ট্রোল প্যানেল */}
          <div className="p-6 border-t border-border space-y-3 mt-auto bg-muted/10">
            <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-card shadow-xs">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                Appearance
              </span>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center cursor-pointer transition-transform active:scale-95"
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>

            {user ? (
              <button
                onClick={handleLogout}
                className="w-full text-center btn-secondary !py-3 font-bold cursor-pointer text-red-500 bg-red-500/5 hover:bg-red-500/10 border-red-500/20"
              >
                Logout
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/signin"
                  onClick={() => setOpen(false)}
                  className="block text-center btn-secondary !py-3 font-semibold"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="block text-center btn-primary !py-3 font-bold"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
