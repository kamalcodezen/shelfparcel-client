import UserOverview from "@/components/modules/dashboard/user/UserOverview";
import { getUserPaymentDetailsByEmail } from "@/lib/api/payment";

import { getUserSession } from "@/lib/core/session";

export const metadata = {
  title: "Overview | Reader Dashboard | BiblioDrop",
  description:
    "View your reading activity, borrowing statistics, delivery updates, and account overview from your BiblioDrop reader dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

const UserOverviewPage = async () => {
  const session = await getUserSession();

  const userPayment = await getUserPaymentDetailsByEmail(session?.email);

  return (
    <div className="min-h-screen">
      <UserOverview userPayment={userPayment} />
    </div>
  );
};

export default UserOverviewPage;
