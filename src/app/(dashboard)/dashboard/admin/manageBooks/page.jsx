import ManageBooks from "@/components/modules/dashboard/admin/ManageBooks";
import { getAllBooks } from "@/lib/api/admin";

const AdminManageBooksPage = async () => {
  const books = await getAllBooks();

  return (
    <div className="min-h-screen">
      <ManageBooks books={books} />
    </div>
  );
};

export default AdminManageBooksPage;
