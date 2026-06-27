import LibrarianAddBook from "@/components/modules/dashboard/librarian/AddBook";

export const metadata = {
  title: "Add Book | Librarian Dashboard | BiblioDrop",
  description:
    "Add new books to the BiblioDrop library, manage book details, and expand your collection from the librarian dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

const LibrarianAddBookPage = () => {
  return (
    <div className="min-h-screen">
      <LibrarianAddBook />
    </div>
  );
};

export default LibrarianAddBookPage;
