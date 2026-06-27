import LibrarianProfile from "@/components/modules/dashboard/librarian/Profile";
import { getBooksByLibrarianId } from "@/lib/api/books";
import { getPaymentDetailsByLibrarianEmail } from "@/lib/api/payment";
import { getUserSession } from "@/lib/core/session";

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
