"use client";
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import BookCard from "../shared/BookCard";
import { getAllPublishedBooks } from "@/lib/api/books";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FeaturedBooks() {
  const [booksData, setBooksData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestBooks = async () => {
      try {
        setLoading(true);
        const data = await getAllPublishedBooks();

        console.log("Featured Books Buffer Logs:", data);
        setBooksData(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestBooks();
  }, []);

  // FIXED: Safely extract the books array whether it is wrapped in an object or a direct array
  const finalBooksList = useMemo(() => {
    if (!booksData) return [];
    if (Array.isArray(booksData)) return booksData;
    return booksData?.books || [];
  }, [booksData]);

  return (
    <section className="bg-background text-foreground pb-20">
      {/* হেডিং কন্টেইনার */}
      <div className="w-11/12 mx-auto flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6">
        {/* বাম পাশের মেইন টাইটেল */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4 flex-1">
          <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
            Curated Catalog
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight italic font-serif">
            Featured{" "}
            <span className="text-primary font-serif">Books Collection</span>
          </h2>
          <div className="w-12 h-0.5 bg-primary/60 my-1" />
        </div>

        {/*view all */}
        <Link
          href="/books"
          className="hidden md:flex items-center gap-2 text-primary font-poppins font-bold text-sm tracking-wide group transition-all duration-300 hover:opacity-80"
        >
          <span>View All</span>
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>

      {loading ? (
        <div className="w-11/12 mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={`skeleton-token-${i}`}
              className="animate-pulse bg-card-soft border border-border rounded-3xl h-96 w-full"
            />
          ))}
        </div>
      ) : (
        <>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
            }}
            className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {/* Safe mapping over slice configuration targeting finalBooksList */}
            {finalBooksList.slice(0, 12).map((book, index) => (
              <BookCard
                key={book._id || `featured-book-${index}`}
                book={book}
              />
            ))}
          </motion.div>
        </>
      )}
    </section>
  );
}
