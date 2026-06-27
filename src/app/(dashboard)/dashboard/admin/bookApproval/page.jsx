import BookApproval from "@/components/modules/dashboard/admin/BookApproval";
import { getAllPendingBooks } from "@/lib/api/admin";

export const metadata = {
  title: "Book Approval | Admin Dashboard | BiblioDrop",
  description:
    "Review, approve, or reject pending book submissions from librarians through the BiblioDrop admin dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

const AdminBookApprovalPage = async () => {
  const books = await getAllPendingBooks();

  return (
    <div>
      <BookApproval books={books} />
    </div>
  );
};

export default AdminBookApprovalPage;
