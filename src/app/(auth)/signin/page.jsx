import SigninForm from "@/components/auth/SigninForm";

export const metadata = {
  title: "Sign In | BiblioDrop",
  description:
    "Sign in to your BiblioDrop account to browse books, manage deliveries, track requests, and access your personalized dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

const SigninPage = () => {
  return (
    <div className="min-h-screen">
      <SigninForm />
    </div>
  );
};

export default SigninPage;
