import AllBooks from "@/components/modules/books/AllBooks";
import { getAllPublishedBooks } from "@/lib/api/books";

export const metadata = {
  title: "Browse Books | BiblioDrop",
  description:
    "Explore thousands of books across multiple categories. Search, filter, and discover your next favorite read with BiblioDrop.",
};

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
