import BookDetails from "@/components/modules/books/BookDetails";
import { getBooksDetailsById } from "@/lib/api/books";
import { getUserAllComments } from "@/lib/api/users";

const BooksDetailsPage = async ({ params }) => {
  const { id } = await params;

  const books = await getBooksDetailsById(id);

  const userComments = await getUserAllComments(id);

  console.log(userComments)

  return (
    <div className="w-11/12 mx-auto min-h-screen py-20">
      <BookDetails books={books} userComments={userComments} />
    </div>
  );
};

export default BooksDetailsPage;
