import LibrarianProfile from "@/components/modules/dashboard/librarian/Profile";
import { getBooksByLibrarianId } from "@/lib/api/books";
import { getPaymentDetailsByLibrarianEmail } from "@/lib/api/payment";
import { getUserSession } from "@/lib/core/session";

export const metadata = {
  title: "Librarian Profile | BiblioDrop",
  description:
    "Manage your librarian profile, monitor book inventory, track earnings, and update account information.",
  robots: {
    index: false,
    follow: false,
  },
};

const LibrarianProfilePage = async () => {
  const user = await getUserSession();

  const earnings = await getPaymentDetailsByLibrarianEmail(user?.email);

  const myBooks = await getBooksByLibrarianId(user?.id);

  // console.log("my earnings", earnings, "myBooks", myBooks);

  return (
    <>
      <LibrarianProfile earnings={earnings} myBooks={myBooks} />
    </>
  );
};

export default LibrarianProfilePage;
