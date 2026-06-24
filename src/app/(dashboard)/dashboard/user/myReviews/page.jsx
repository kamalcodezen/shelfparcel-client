import MyReviews from "@/components/modules/dashboard/user/MyReviews";
import { getUserCommentById } from "@/lib/api/users";
import { getUserSession } from "@/lib/core/session";

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
