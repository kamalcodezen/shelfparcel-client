import ManageUser from "@/components/modules/dashboard/admin/ManageUser";
import { getUserList } from "@/lib/api/users";

export const metadata = {
  title: "Manage Users | Admin Dashboard | BiblioDrop",
  description:
    "Manage user accounts, roles, permissions, and monitor registered users from the BiblioDrop admin dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

const AdminUsersPage = async () => {
  const data = await getUserList();
  const users = data?.users || [];

  return (
    <div>
      <ManageUser users={users} />
    </div>
  );
};

export default AdminUsersPage;
