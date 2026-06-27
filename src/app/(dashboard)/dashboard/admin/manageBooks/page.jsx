import ManageBooks from "@/components/modules/dashboard/admin/ManageBooks";
import { getAllBooks } from "@/lib/api/admin";

export const metadata = {
  title: "Manage Books | Admin Dashboard | BiblioDrop",
  description:
    "Manage, update, organize, and monitor all books available in the BiblioDrop library system.",
  robots: {
    index: false,
    follow: false,
  },
};

const AdminManageBooksPage = async () => {
  const books = await getAllBooks();

  return (
    <div className="min-h-screen">
      <ManageBooks books={books} />
    </div>
  );
};

export default AdminManageBooksPage;
