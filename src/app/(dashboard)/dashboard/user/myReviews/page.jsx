import MyReviews from "@/components/modules/dashboard/user/MyReviews";
import { getUserCommentById } from "@/lib/api/users";
import { getUserSession } from "@/lib/core/session";

export const metadata = {
  title: "My Reviews | Reader Dashboard | BiblioDrop",
  description:
    "View, manage, and track your book reviews and feedback from your BiblioDrop reader dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

const UserMyReviewsPage = async () => {
  const data = await getUserSession();
  const userId = data?.id;

  const comments = await getUserCommentById(userId);

  return (
    <div className="min-h-screen">
      <MyReviews comments={comments} />
    </div>
  );
};

export default UserMyReviewsPage;
