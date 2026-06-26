"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpenText, ChevronLeft } from "lucide-react";

import BookCard from "../shared/BookCard";
import BooksFilter from "./BookFilter";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function AllBooks({ allBooks = [], filters }) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(filters?.search || "");
  const [selectedCategory, setSelectedCategory] = useState(
    filters?.category || "all",
  );
  const [minFee, setMinFee] = useState(filters?.minFee || "");
  const [maxFee, setMaxFee] = useState(filters?.maxFee || "");
  const [availability, setAvailability] = useState(filters?.status || "all");

  useEffect(() => {
    const sp = new URLSearchParams();

    if (searchQuery) {
      sp.set("search", searchQuery);
    }

    if (selectedCategory !== "all") {
      sp.set("category", selectedCategory);
    }

    if (availability !== "all") {
      sp.set("status", availability);
    }

    if (minFee && minFee.trim() !== "") {
      sp.set("minFee", minFee);
    }

    if (maxFee && maxFee.trim() !== "") {
      sp.set("maxFee", maxFee);
    }

    const path = `?${sp.toString()}`;
    router.push(path, { scroll: false }); // scroll false দিলে পেজ রিফ্রেশে স্ক্রিন লাফাবে না
  }, [selectedCategory, router, searchQuery, availability, minFee, maxFee]);

  // Filter Logic
  // const allBooks = useMemo(() => {
  //   return allBooks.filter((book) => {
  //     // search
  //     const matchesSearch =
  //       book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       book.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       book.description?.toLowerCase().includes(searchQuery.toLowerCase());

  //     //category
  //     const matchesCategory =
  //       selectedCategory === "all" ||
  //       book.category?.toLowerCase() === selectedCategory.toLowerCase();

  //     // delivery fee
  //     const bookFee = Number(book.fee) || 0;
  //     const matchesMinFee = minFee === "" || bookFee >= Number(minFee);
  //     const matchesMaxFee = maxFee === "" || bookFee <= Number(maxFee);

  //     // (Published = Available, Checked Out = Unavailable)
  //     const matchesAvailability =
  //       availability === "all" ||
  //       (availability === "Available" && book.status === "Published") ||
  //       (availability === "Unavailable" && book.status === "Checked Out");

  //     return (
  //       matchesSearch &&
  //       matchesCategory &&
  //       matchesMinFee &&
  //       matchesMaxFee &&
  //       matchesAvailability
  //     );
  //   });
  // }, [
  //   searchQuery,
  //   selectedCategory,
  //   minFee,
  //   maxFee,
  //   availability,
  //   allBooks,
  // ]);

  const filterVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  // stair step transition effect
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.04 },
    },
  };

  // card animation effects
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 130, damping: 20 },
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } },
  };

  return (
    <>
      <motion.div variants={filterVariants} initial="hidden" animate="visible">
        <BooksFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          minFee={minFee}
          setMinFee={setMinFee}
          maxFee={maxFee}
          setMaxFee={setMaxFee}
          availability={availability}
          setAvailability={setAvailability}
        />
      </motion.div>

      <div className=" text-xs font-semibold text-muted-foreground uppercase tracking-wider   ">
        {/* Back Button */}
        <Button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all group"
        >
          <ChevronLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back
        </Button>
      </div>

      <AnimatePresence mode="popLayout">
        {allBooks.length > 0 ? (
          <motion.div
            key="grid"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10 mt-4 items-start"
          >
            {allBooks.map((bookItem) => (
              <motion.div
                key={bookItem._id}
                variants={cardVariants}
                layout
                className="h-full"
              >
                <BookCard book={bookItem} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="dashboard-card max-w-7xl mx-auto flex flex-col items-center justify-center text-center py-20 border-2 border-dashed border-border"
          >
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
              <div className="relative w-20 h-20 rounded-full bg-card border border-border flex items-center justify-center text-primary">
                <BookOpenText size={40} strokeWidth={1.5} />
              </div>
            </div>
            <h3 className="text-xl font-bold text-foreground">
              No matching items found
            </h3>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setMinFee("");
                setMaxFee("");
                setAvailability("all");
              }}
              className="mt-8 text-xs font-semibold text-primary/80 cursor-pointer border-b border-primary/30 pb-0.5"
            >
              Reset Search & Filters
            </button>
          </motion.div>
        )}

        <div className="mb-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 pt-4">
          Showing {allBooks.length} available repository item
          {allBooks.length !== 1 && "s"}
        </div>
      </AnimatePresence>
    </>
  );
}
