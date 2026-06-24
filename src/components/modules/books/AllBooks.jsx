"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpenText, ChevronLeft } from "lucide-react";

import BookCard from "../shared/BookCard";
import BooksFilter from "./BookFilter";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function AllBooks({ initialBooks = [] }) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Filter Logic
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
        />
      </motion.div>

      <div className=" text-xs font-semibold text-muted-foreground uppercase tracking-wider  ">
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
        {filteredBooks.length > 0 ? (
          <motion.div
            key="grid"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            // items-start
            className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10 mt-4 items-start"
          >
            {filteredBooks.map((bookItem) => (
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
              }}
              className="mt-8 text-xs font-semibold text-primary/80 cursor-pointer border-b border-primary/30 pb-0.5"
            >
              Reset Search & Filters
            </button>
          </motion.div>
        )}

        <div className="mb-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 pt-4">
          Showing {filteredBooks.length} available repository item
          {filteredBooks.length !== 1 && "s"}
        </div>
      </AnimatePresence>
    </>
  );
}
