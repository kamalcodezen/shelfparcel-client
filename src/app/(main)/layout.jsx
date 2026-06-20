import Navbar from "@/components/layout/Navbar";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className=" min-h-screen transition-colors duration-300">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
