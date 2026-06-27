import SignupForm from "@/components/auth/SignupForm";

export const metadata = {
  title: "Create Account | BiblioDrop",
  description:
    "Create your BiblioDrop account to borrow books, manage your library, request deliveries, and enjoy a seamless reading experience.",
  robots: {
    index: false,
    follow: false,
  },
};

const SignupPage = () => {
  return (
    <div className="min-h-screen">
      <SignupForm />
    </div>
  );
};

export default SignupPage;
