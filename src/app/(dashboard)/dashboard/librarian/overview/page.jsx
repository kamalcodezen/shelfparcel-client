import LibrarianOverview from "@/components/modules/dashboard/librarian/Overview";
import { getBooksByLibrarianId } from "@/lib/api/books";
import { getPaymentDetailsByLibrarianEmail } from "@/lib/api/payment";
import { getUserSession } from "@/lib/core/session";

const LibrarianOverviewPage = async () => {
  const librarian = await getUserSession();
  const librarianId = librarian?.id;

  const payments = await getPaymentDetailsByLibrarianEmail(librarian?.email);

  console.log(payments, "payments");

  const books = await getBooksByLibrarianId(librarianId);

  console.log(books, "books");

  return (
    <div className="min-h-screen">
      <LibrarianOverview books={books} payments={payments} />
    </div>
  );
};

export default LibrarianOverviewPage;
