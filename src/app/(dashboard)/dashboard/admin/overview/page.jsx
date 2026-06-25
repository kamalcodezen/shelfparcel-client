import AdminOverview from "@/components/modules/dashboard/admin/Overview";
import { getAdminBookCategories, getAdminStats } from "@/lib/api/admin";

const AdminOverviewPage = async () => {
  const statsData = await getAdminStats();
  const booksData = await getAdminBookCategories();

  const stats = statsData?.stats || {};
  const booksCategories = booksData?.categoryData || [];

  return (
    <div className="min-h-screen w-full">
      <AdminOverview stats={stats} booksCategories={booksCategories} />
    </div>
  );
};

export default AdminOverviewPage;
