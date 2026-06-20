import Navbar from "@/components/layout/Navbar";

const AuthLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className=" min-h-screen transition-colors duration-300">
        {children}
      </main>
    </>
  );
};

export default AuthLayout;
