import UserDeliveryHistory from "@/components/modules/dashboard/user/UserDeliveryHistory";
import { getUserPaymentDetailsByEmail } from "@/lib/api/payment";

import { getUserSession } from "@/lib/core/session";

export const metadata = {
  title: "Delivery History | Reader Dashboard | BiblioDrop",
  description:
    "Track your book delivery history, completed orders, and shipment status from your BiblioDrop reader dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

const UserDeliveryHistoryPage = async () => {
  const session = await getUserSession();
  const userPayment = await getUserPaymentDetailsByEmail(session?.email);

  return (
    <div className="min-h-screen">
      <UserDeliveryHistory userPayment={userPayment} />
    </div>
  );
};

export default UserDeliveryHistoryPage;
