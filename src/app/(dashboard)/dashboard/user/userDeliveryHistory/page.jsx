import UserDeliveryHistory from "@/components/modules/dashboard/user/UserDeliveryHistory";
import { getUserPaymentDetailsById } from "@/lib/api/payment";

import { getUserSession } from "@/lib/core/session";

const UserDeliveryHistoryPage = async () => {
  
  const session = await getUserSession();
  const userPayment = await getUserPaymentDetailsById(session?.email
);

  return (
    <div className="min-h-screen">
      <UserDeliveryHistory userPayment={userPayment} />
    </div>
  );
};

export default UserDeliveryHistoryPage;
