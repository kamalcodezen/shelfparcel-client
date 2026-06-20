"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BookCard from "../shared/BookCard";

export default function FeaturedBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestBooks = async () => {
      try {
        setLoading(true);
        // const res = await fetch("/api/books/latest");
        // const data = await res.json();
        // setBooks(data);

        const mockBooks = [
          {
            _id: "1",
            title: "The Midnight Library",
            author: "Matt Haig",
            category: "Fiction",
            fee: 15,
            isAvailable: true,
            cover:
              "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400",
          },
          {
            _id: "2",
            title: "Dune Masterpiece",
            author: "Frank Herbert",
            category: "Sci-Fi",
            fee: 20,
            isAvailable: true,
            cover:
              "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400",
          },
          {
            _id: "3",
            title: "Advanced Quantum Physics",
            author: "Dr. R. Sharma",
            category: "Academic",
            fee: 25,
            isAvailable: false,
            cover:
              "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=400",
          },
          {
            _id: "4",
            title: "The Silent Patient",
            author: "Alex Michaelides",
            category: "Fiction",
            fee: 12,
            isAvailable: true,
            cover:
              "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400",
          },
          {
            _id: "5",
            title: "Neuromancer Chronicles",
            author: "William Gibson",
            category: "Sci-Fi",
            fee: 18,
            isAvailable: true,
            cover:
              "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400",
          },
          {
            _id: "6",
            title: "History of Palanpur",
            author: "Local Archives",
            category: "Academic",
            fee: 10,
            isAvailable: true,
            cover:
              "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=400",
          },
        ];
        setBooks(mockBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestBooks();
  }, []);

  return (
    <section className=" bg-background text-foreground pb-20">
      <div className=" flex flex-col items-center text-center space-y-4 mb-16">
        <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
          Curated Catalog
        </span>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight italic font-serif">
          Featured{" "}
          <span className="text-primary font-serif">Books Collection</span>
        </h2>
        <div className="w-12 h-0.5 bg-primary/60 my-1" />
      </div>

      {loading ? (
        <div className="w-11/12 mx-auto  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-card-soft border border-border rounded-3xl h-96 w-full"
            />
          ))}
        </div>
      ) : (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
          }}
          className="w-11/12 mx-auto  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </motion.div>
      )}
    </section>
  );
}
