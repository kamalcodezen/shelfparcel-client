"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client"; // আপনার Better Auth ক্লায়েন্ট পাথ
import {
  BookOpen,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

export default function SigninForm() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  // 👑 INDUSTRY STANDARD: লগইন ডেটা অবজেক্ট স্টেট
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // আলাদা আলাদা স্পিনার লোডিং স্টেট
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // পাসওয়ার্ড ভিজিবিলিটি স্টেট
  const [showPassword, setShowPassword] = useState(false);

  // হাইড্রেশন সিকিউরিটি ট্র্যাকার
  useEffect(() => {
    setMounted(true);
  }, []);

  // জেনেরিক ইনপুট হ্যান্ডলার
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authClient.signIn.email({
        email: loginData.email,
        password: loginData.password,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Welcome back! Login Successful.", {
              position: "top-right",
              autoClose: 2000,
            });

            router.push("/");
            router.refresh();
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Invalid Email or Password! ❌");
          },
        },
      });
    } catch (error) {
      toast.error(error?.message || "Internal network connection error! 🛠️");
    } finally {
      setLoading(false);
    }
  };

  // গুগল ওথ লগইন হ্যান্ডলার উইথ স্পিনার
  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", // লগইন শেষে হোমপেজে রিডাইরেক্ট হবে
      });
    } catch (error) {
      toast.error("Google OAuth handshake interrupted! ❌");
      setGoogleLoading(false);
    }
  };

  // Google login
  const googleSignUp = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };

  if (!mounted) return null;

  return (
    <section className="min-h-screen grid lg:grid-cols-2">
      {/* =========================================
         LEFT SIDE: BANNER WITH EXACT SIGNUP THEME
      ========================================= */}
      <div
        className="relative hidden lg:flex overflow-hidden"
        style={{
          backgroundImage: "url('/images/signin.png')", // ডক অনুযায়ী আপনার ইমেজ পাথ ম্যাপড
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <div>
            <div className="mt-10 max-w-xl">
              <h2 className="text-5xl font-semibold leading-tight">
                Your Local Library, Delivered.
              </h2>
              <p className="mt-6 text-lg text-white/80">
                Discover thousands of books, connect with local libraries, and
                get knowledge delivered straight to your door.
              </p>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg border border-white/20 bg-white/10 backdrop-blur-xl p-5">
              <h3 className="text-3xl font-bold">12K+</h3>
              <p className="text-base text-white/70">Books</p>
            </div>
            <div className="rounded-lg border border-white/20 bg-white/10 backdrop-blur-xl p-5">
              <h3 className="text-3xl font-bold">500+</h3>
              <p className="text-base text-white/70">Readers</p>
            </div>
            <div className="rounded-lg border border-white/20 bg-white/10 backdrop-blur-xl p-5">
              <h3 className="text-3xl font-bold">120+</h3>
              <p className="text-base text-white/70">Libraries</p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
         RIGHT SIDE: SIGN IN PANEL WITH GLASS EFFECT
      ========================================= */}
      <div className="relative flex items-center justify-center px-5 py-10 bg-background">
        <div className="absolute inset-0 hero-gradient" />

        <div
          className="
          relative
          w-full
          max-w-xl
          rounded-lg
          border
          border-white/20
          bg-white/10
          dark:bg-black/20
          backdrop-blur-3xl
          shadow-2xl
          p-8
          md:p-10
        "
        >
          {/* MOBILE LOGO */}
          <div className="flex lg:hidden items-center justify-center gap-3 mb-8">
            {/* <div className="h-12 w-12 rounded-xl btn-primary flex items-center justify-center">
              <BookOpen size={22} />
            </div> */}
            <h2 className="text-2xl font-bold">BiblioDrop</h2>
          </div>

          {/* HEADING ZONE */}
          <div className="text-center">
            <h2 className="text-4xl font-bold">Welcome Back</h2>
            <p className="mt-2 text-muted-foreground">
              Sign in to manage your library assets and transactions.
            </p>
          </div>

          {/* FORM */}
          <form className="mt-8 space-y-4" onSubmit={handleSignin}>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                value={loginData.email}
                onChange={handleInputChange}
                className="input-field pl-11"
              />
            </div>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                value={loginData.password}
                onChange={handleInputChange}
                className="input-field pl-11 pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer z-10"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* ১. ইমেইল লগইন বাটন (স্পিনার সহ) */}
            <button
              type="submit"
              disabled={loading || googleLoading}
              className="btn-primary w-full h-12 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-md"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Signing in...</span>{" "}
                 
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* DIVIDER MESH */}
          <div className="flex items-center gap-3 my-6">
            <div className="h-px flex-1 bg-border" />
            <span className="text-base text-muted-foreground">OR</span>
            <div className="h-px flex-1 bg-border" />
          </div>

         
          {/*  গুগল ওথ লগইন বাটন (প্রফেশনাল লোডিং টেক্সট ও স্পিনার সহ) */}
          <button
            onClick={() => {
              googleSignUp();
              toast.info("Google signup coming soon! ", {
                position: "top-right",
                autoClose: 3000,
              });
            }}
            disabled={loading || googleLoading}
            type="button"
            className="w-full rounded-xl border border-border bg-card py-3 font-medium hover:opacity-90 transition cursor-pointer flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {googleLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span>Signing in with Google...</span>{" "}
              </>
            ) : (
              <>
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.253-3.133C18.41 1.945 15.56 1 12.24 1c-6.075 0-11 4.925-11 11s4.925 11 11 11c6.345 0 10.565-4.444 10.565-10.76 0-.726-.08-1.282-.175-1.67H12.24z"
                  />
                </svg>
                <span>Continue With Google</span>
              </>
            )}
          </button>

          {/* DUAL LINK ROTATION */}
          <p className="text-center mt-6 text-base">
            Don't have an account?
            <Link
              href="/signup"
              className="ml-2 text-primary font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
