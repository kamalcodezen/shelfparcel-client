import AllBooks from "@/components/modules/books/AllBooks";
import { getAllPublishedBooks } from "@/lib/api/books";

const AllBooksPage = async ({ searchParams }) => {
  const filters = await searchParams;

  const searchQuery = new URLSearchParams(filters);
  const searchString = searchQuery.toString();



  const books = await getAllPublishedBooks(searchString);

  return (
    <div className="w-11/12 mx-auto min-h-screen py-20">
      <AllBooks allBooks={books} filters={filters} />
    </div>
  );
};

export default AllBooksPage;
