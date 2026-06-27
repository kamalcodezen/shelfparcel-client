import ManageDeliveries from "@/components/modules/dashboard/librarian/ManageDeliveries";
import { getBooksByLibrarianId } from "@/lib/api/books";
import { getPaymentDetailsByLibrarianEmail } from "@/lib/api/payment";
import { getUserSession } from "@/lib/core/session";

export const metadata = {
  title: "Manage Deliveries | Librarian Dashboard | BiblioDrop",
  description:
    "Track, manage, and monitor book delivery requests, shipment status, and customer deliveries from the librarian dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

const LibrarianManageDeliveriesPage = async () => {
  const librarian = await getUserSession();
  const librarianId = librarian?.id;

  const payments = await getPaymentDetailsByLibrarianEmail(librarian?.email);

  const books = await getBooksByLibrarianId(librarianId);

  return (
    <div className="min-h-screen">
      <ManageDeliveries books={books} payments={payments} />
    </div>
  );
};

export default LibrarianManageDeliveriesPage;
