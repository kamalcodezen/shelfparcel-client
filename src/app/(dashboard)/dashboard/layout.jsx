import DashboardSidebar from "@/components/modules/dashboard/DashboardSidebar";

const DashBoardLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <DashboardSidebar />
      <main className="flex-1 min-h-screen">{children}</main>
    </div>
  );
};

export default DashBoardLayout;
