import UserOverview from "@/components/modules/dashboard/user/UserOverview";
import { getUserPaymentDetailsById } from "@/lib/api/users";
import { getUserSession } from "@/lib/core/session";

const UserUserOverviewPage = async () => {
  const session = await getUserSession();

  const userPayment = await getUserPaymentDetailsById(session?.id);


  return (
    <div className="min-h-screen">
      <UserOverview userPayment={userPayment} />
    </div>
  );
};

export default UserUserOverviewPage;
