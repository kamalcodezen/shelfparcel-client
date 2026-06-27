import BookDetails from "@/components/modules/books/BookDetails";
import { getAllPublishedBooks, getBooksDetailsById } from "@/lib/api/books";
import { getUserAllComments } from "@/lib/api/users";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const book = await getBooksDetailsById(id);

  return {
    title: `${book.title} | BiblioDrop`,
    description: book.description,
    keywords: [
      book.title,
      book.author,
      book.category,
      "Books",
      "Online Library",
      "Book Delivery",
      "BiblioDrop",
    ],
    openGraph: {
      title: `${book.title} | BiblioDrop`,
      description: book.description,
      images: [
        {
          url: book.cover,
          width: 1200,
          height: 630,
          alt: book.title,
        },
      ],
    },
  };
}

const BooksDetailsPage = async ({ params }) => {
  const { id } = await params;

  const books = await getBooksDetailsById(id);

  const userComments = await getUserAllComments(id);

  return (
    <div className="w-11/12 mx-auto min-h-screen py-20">
      <BookDetails books={books} userComments={userComments} />
    </div>
  );
};

export default BooksDetailsPage;
