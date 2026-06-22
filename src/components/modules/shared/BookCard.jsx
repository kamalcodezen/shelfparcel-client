import Link from "next/link";

const BookCard = ({ book }) => {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-card">
      {/* Light Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-primary/10 blur-[140px] rounded-full" />

      {/* Dark Glow */}
      <div className="hidden dark:block absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-primary/12 blur-[180px] rounded-full" />

      {/* Normal View */}
      <div className="p-6 transition-all duration-500 group-hover:-translate-y-full">
        <div className="flex flex-col items-center text-center">
          <div className="h-30 w-full  rounded-full flex items-center justify-center">
            <img src={book.cover} alt={book.title} className="h-30 w-full rounded-md" />
          </div>

          <h3 className="mt-4 text-xl font-bold">
            {book?.title ? `${book.title.slice(0, 10)}...` : "No Title"}
          </h3>

          <p className="mt-1 text-muted-foreground">{book.author}</p>

          <div className="mt-2 space-y-2">
            <p className="text-primary font-semibold">${book.fee}</p>

            <p className="text-sm text-muted-foreground">{book.category}</p>
          </div>

          <Link
            href={`/books/${book._id}`}
            className="btn-primary mt-5 h-10 px-5 inline-flex items-center justify-center font-poppins text-sm tracking-wide group hover:scale-[1.02] transition-all"
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Hover Content */}
      <div
        className="
      absolute
      inset-0
      p-6
      bg-card
      translate-y-full
      group-hover:translate-y-0
      transition-all
      duration-500
      flex
      flex-col
    "
      >
        <div className="flex justify-between">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs">
            {book.category}
          </span>

          <span
            className={`px-3 py-1 rounded-full text-xs ${
              book.isAvailable
                ? "bg-green-500/10 text-green-500"
                : "bg-red-500/10 text-red-500"
            }`}
          >
            {book.isAvailable ? "Available" : "Checked Out"}
          </span>
        </div>

        <h3 className="mt-4 text-xl font-bold">{book.title}</h3>

        <p className="mt-3 text-sm text-muted-foreground">
          Written by {book.author}
        </p>

        <div className="mt-4 space-y-2 text-sm">
          <p>Delivery Fee: ${book.fee}</p>
          <p>Added: {book.dateAdded}</p>
          <p>Home Delivery Available</p>
        </div>

        <Link
          href={`/books/${book._id}`}
          className="btn-primary mt-15 h-10 px-5 inline-flex items-center justify-center font-poppins text-sm tracking-wide group hover:scale-[1.02] transition-all"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
