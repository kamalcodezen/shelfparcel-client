import AdminProfile from "@/components/modules/dashboard/admin/Profile";
import { getAllBooks } from "@/lib/api/admin";
import { getAllPaymentDetails } from "@/lib/api/payment";
import { getUserList } from "@/lib/api/users";

const AdminProfilePage = async () => {

  const data = await getUserList();
  const allUsers = data?.users || [];

  const allBooks = await getAllBooks();

  const  allTransactions = await getAllPaymentDetails();


  return (
    <>
      <AdminProfile allUsers={allUsers} allBooks={allBooks}   allTransactions={allTransactions} />
    </>
  );
};

export default AdminProfilePage;
