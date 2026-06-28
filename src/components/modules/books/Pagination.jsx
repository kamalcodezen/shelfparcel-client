"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  page = 1,
  total = 1,
  onChange,
  isCompact = true,
  showControls = true,
  showShadow = true,
}) {
  // Generate smart page numbers with ellipsis (...) for clean navigation
  const getPageNumbers = () => {
    const pages = [];
    if (total <= 5) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("ellipsis");

      const start = Math.max(2, page - 1);
      const end = Math.min(total - 1, page + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (page < total - 2) pages.push("ellipsis");
      pages.push(total);
    }
    return pages;
  };

  // Hide the pagination panel completely if there is only 1 page
  if (total <= 1) return null;

  return (
    <div className="w-full flex items-center justify-center gap-2 select-none font-sans mt-12 mb-10">
      {/* Previous Page Button */}
      {showControls && (
        <button
          type="button"
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
          className={`flex items-center justify-center rounded-xl border border-border bg-card-soft text-muted-foreground hover:text-primary hover:border-primary disabled:opacity-30 disabled:pointer-events-none transition-all duration-200 cursor-pointer active:scale-95 dark:hover:shadow-[0_0_15px_rgba(0,245,212,0.3)] ${
            isCompact ? "w-9 h-9" : "w-11 h-11"
          }`}
        >
          <ChevronLeft size={16} />
        </button>
      )}

      {/* Dynamic Page Number Buttons Mapping */}
      {getPageNumbers().map((p, i) => {
        if (p === "ellipsis") {
          return (
            <span
              key={`ellipsis-node-${i}`}
              className="flex items-center justify-center text-muted-foreground/50 text-base tracking-widest w-9 h-9"
            >
              ...
            </span>
          );
        }

        const isActive = p === page;

        return (
          <button
            key={`page-btn-${p}-${i}`}
            type="button"
            onClick={() => onChange(p)}
            className={`text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer active:scale-95 ${
              isCompact ? "w-9 h-9" : "w-11 h-11"
            } ${
              isActive
                ? `bg-primary border border-primary text-background font-bold ${
                    showShadow
                      ? "shadow-md shadow-primary/20 dark:shadow-[0_0_20px_rgba(0,245,212,0.4)]"
                      : ""
                  }`
                : "border border-border bg-card text-muted-foreground hover:bg-card-soft hover:text-primary hover:border-primary"
            }`}
          >
            {p}
          </button>
        );
      })}

      {/* Next Page Button */}
      {showControls && (
        <button
          type="button"
          disabled={page === total}
          onClick={() => onChange(page + 1)}
          className={`flex items-center justify-center rounded-xl border border-border bg-card-soft text-muted-foreground hover:text-primary hover:border-primary disabled:opacity-30 disabled:pointer-events-none transition-all duration-200 cursor-pointer active:scale-95 dark:hover:shadow-[0_0_15px_rgba(0,245,212,0.3)] ${
            isCompact ? "w-9 h-9" : "w-11 h-11"
          }`}
        >
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
}
