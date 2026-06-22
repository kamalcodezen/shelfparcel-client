import BookApproval from "@/components/modules/dashboard/admin/BookApproval";
import { getAllPendingBooks } from "@/lib/api/books";

const AdminBookApprovalPage = async () => {
  const books = await getAllPendingBooks();

  return (
    <div>
      <BookApproval books={books} />
    </div>
  );
};

export default AdminBookApprovalPage;
