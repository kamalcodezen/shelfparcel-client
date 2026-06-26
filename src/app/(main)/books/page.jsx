import AllBooks from "@/components/modules/books/AllBooks";
import { getAllPublishedBooks } from "@/lib/api/books";


const AllBooksPage = async () => {
  const books = await getAllPublishedBooks();



  return (
    <div className="w-11/12 mx-auto min-h-screen py-20">
      <AllBooks allBooks={books} />
    </div>
  );
};

export default AllBooksPage;
