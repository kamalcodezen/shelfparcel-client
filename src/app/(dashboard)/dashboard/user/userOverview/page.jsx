import UserOverview from "@/components/modules/dashboard/user/UserOverview";
import { getUserPaymentDetailsById } from "@/lib/api/payment";

import { getUserSession } from "@/lib/core/session";

const UserUserOverviewPage = async () => {
  const session = await getUserSession();

  const userPayment = await getUserPaymentDetailsById(session?.email);

  return (
    <div className="min-h-screen">
      <UserOverview userPayment={userPayment} />
    </div>
  );
};

export default UserUserOverviewPage;
