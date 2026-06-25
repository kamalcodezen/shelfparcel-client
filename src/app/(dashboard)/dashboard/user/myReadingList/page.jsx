import MyReadingList from "@/components/modules/dashboard/user/MyReadingList";
import { getUserPaymentDetailsByEmail } from "@/lib/api/payment";

import { getUserSession } from "@/lib/core/session";

const UserMyReadingListPage = async () => {
  const session = await getUserSession();
  const userPayment = await getUserPaymentDetailsByEmail(session?.email);



  return (
    <div className="min-h-screen">
      <MyReadingList userPayment={userPayment} />
    </div>
  );
};

export default UserMyReadingListPage;
