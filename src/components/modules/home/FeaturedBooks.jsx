"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BookCard from "../shared/BookCard";
import { getAllPublishedBooks } from "@/lib/api/books";

export default function FeaturedBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestBooks = async () => {
      try {
        setLoading(true);
        const data = await getAllPublishedBooks();

        console.log(data,"books")

        setBooks(data);
      } catch (error) {
        // console.error("Error fetching books:", error);
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
          {books.slice(0,12).map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </motion.div>
      )}
    </section>
  );
}
