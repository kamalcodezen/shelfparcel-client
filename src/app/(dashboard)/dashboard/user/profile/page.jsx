import UserProfile from "@/components/modules/dashboard/user/UserProfile";
import { getUserPaymentDetailsById } from "@/lib/api/payment";
import { getUserSession } from "@/lib/core/session";

const UserProfilePage = async () => {
  const session = await getUserSession();
  const userPayment = await getUserPaymentDetailsById(session?.email);

  return (
    <div>
      <UserProfile userPayment={userPayment} />
    </div>
  );
};

export default UserProfilePage;
