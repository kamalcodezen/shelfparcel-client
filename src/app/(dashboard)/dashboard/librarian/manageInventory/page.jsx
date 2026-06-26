import ManageInventory from "@/components/modules/dashboard/librarian/ManageInventory";
import { getBooksByLibrarianId } from "@/lib/api/books";
import { getUserSession } from "@/lib/core/session";

const ManageInventoryPage = async () => {
  const user = await getUserSession();

  const books = await getBooksByLibrarianId(user?.id);


  
  return (
    <div className="min-h-screen">
      <ManageInventory books={books} />
    </div>
  );
};

export default ManageInventoryPage;
