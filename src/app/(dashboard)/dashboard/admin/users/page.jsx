import ManageUser from "@/components/modules/dashboard/admin/ManageUser";
import { getUserList } from "@/lib/api/users";

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
