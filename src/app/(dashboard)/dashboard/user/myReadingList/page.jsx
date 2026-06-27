import MyReadingList from "@/components/modules/dashboard/user/MyReadingList";
import { getUserPaymentDetailsByEmail } from "@/lib/api/payment";

import { getUserSession } from "@/lib/core/session";

export const metadata = {
  title: "My Reading List | Reader Dashboard | BiblioDrop",
  description:
    "View and manage your reading list, borrowed books, and reading progress from your BiblioDrop reader dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

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
