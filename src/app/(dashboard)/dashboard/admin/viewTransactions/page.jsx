import ViewTransactions from "@/components/modules/dashboard/admin/ViewTransactions";
import { getAllPaymentDetails } from "@/lib/api/payment";

const AdminViewTransactionsPage = async () => {
  const payments = await getAllPaymentDetails();

  return (
    <div>
      <ViewTransactions payments={payments} />
    </div>
  );
};

export default AdminViewTransactionsPage;
