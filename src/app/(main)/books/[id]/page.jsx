import BookDetails from "@/components/modules/books/BookDetails";
import { getBooksDetailsById } from "@/lib/api/books";

const BooksDetailsPage = async ({ params }) => {
  const { id } = await params;

  const books = await getBooksDetailsById(id);

  return (
    <div className="w-11/12 mx-auto min-h-screen py-20">
      <BookDetails books={books} />
    </div>
  );
};

export default BooksDetailsPage;
