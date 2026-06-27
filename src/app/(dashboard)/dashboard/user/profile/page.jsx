import UserProfile from "@/components/modules/dashboard/user/UserProfile";
import { getUserPaymentDetailsByEmail } from "@/lib/api/payment";
import { getUserSession } from "@/lib/core/session";

export const metadata = {
  title: "My Profile | BiblioDrop",
  description:
    "Manage your profile, track your reading activity, and update your account information.",
  robots: {
    index: false,
    follow: false,
  },
};

const UserProfilePage = async () => {
  const session = await getUserSession();
  const userPayment = await getUserPaymentDetailsByEmail(session?.email);

  return (
    <div>
      <UserProfile userPayment={userPayment} />
    </div>
  );
};

export default UserProfilePage;
