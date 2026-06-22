"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpenText } from "lucide-react";

import BookCard from "../shared/BookCard";
import BooksFilter from "./BookFilter";

export default function AllBooks({ initialBooks = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // useMemo Filter Logic
  const filteredBooks = useMemo(() => {
    return initialBooks.filter((book) => {
      if (book.status !== "Published") return false;

      const matchesSearch =
        book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        book.category?.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, initialBooks]);

  // 📑 ১. ফিল্টার বক্সের জন্য সাধারণ অ্যানিমেশন
  const filterVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  // 👑 ২. সিঁড়ির মতো একটার পর একটা কার্ড আসার মেইন কন্টেইনার লজিক (Stagger)
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // প্রতিটা কার্ড সিঁড়ির মতো ০.০৫ সেকেন্ড পর পর উঠবে
      },
    },
  };

  // 👑 ৩. সব কার্ডের জন্য একক নরমাল অ্যানিমেশন (শুধু নিচ থেকে উপরে উঠা)
  const cardVariants = {
    hidden: { opacity: 0, y: 25 }, // একটু নিচ থেকে শুরু হবে
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 20 },
    },
    exit: { opacity: 0, y: 15, transition: { duration: 0.15 } },
  };

  return (
    <>
      {/* 📑 Filter section */}
      <motion.div variants={filterVariants} initial="hidden" animate="visible">
        <BooksFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </motion.div>

      {/* 📊 Count of books */}
      <div className="mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 ">
        Showing {filteredBooks.length} available repository item
        {filteredBooks.length !== 1 && "s"}
      </div>

      {/* 📚 All books grid */}
      <AnimatePresence mode="popLayout">
        {filteredBooks.length > 0 ? (
          <motion.div
            key="grid"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {filteredBooks.map((bookItem) => (
              <motion.div
                key={bookItem._id}
                variants={cardVariants} // সব কার্ড এখন একই নিয়মে নিচ থেকে উঠবে
                layout // ফিল্টার হলে বাকি কার্ডগুলো স্মুথলি গ্লাইড করবে
                className="h-full"
              >
                <BookCard book={bookItem} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* 💎 (No Books) ফাঁকা স্টেট */
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="dashboard-card max-w-7xl mx-auto flex flex-col items-center justify-center text-center py-20 border-2 border-dashed border-border transition-all"
          >
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
              <div className="relative w-20 h-20 rounded-full bg-card border border-border flex items-center justify-center shadow-inner text-primary">
                <BookOpenText size={40} strokeWidth={1.5} />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold font-poppins text-foreground">
                No matching items found
              </h3>
              <p className="text-sm text-muted-foreground max-w-md px-4 mx-auto">
                Your search query{" "}
                <span className="text-primary font-semibold">
                  "{searchQuery}"
                </span>{" "}
                or selected filter did not match any published repositories.
              </p>
            </div>

            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-8 text-xs font-semibold text-primary/80 hover:text-primary transition-colors cursor-pointer border-b border-primary/30 pb-0.5"
            >
              Reset Search & Filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
