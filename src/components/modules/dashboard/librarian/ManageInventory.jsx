"use client";

import React, { useState } from "react";
import { Avatar, Tooltip } from "@heroui/react";
import { Edit3, Trash2, Eye, EyeOff, Lock } from "lucide-react";
import { toggleBooksStatusById } from "@/lib/actions/books";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import EditBookModal from "./EditBookModal";
import DeleteBookModal from "./DeleteBookModal";

const ManageInventory = ({ books = [] }) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  // status change
  const handleToggleStatus = async (bookId, currentStatus) => {
    try {
      const res = await toggleBooksStatusById({ bookId, currentStatus });
      if (res?.success) {
        toast.success(res.message);
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to update status.");
      }
    } catch (error) {
      toast.error("Something went wrong while toggling status ");
    }
  };

  const handleEditClick = (book) => {
    setSelectedBook(book);
    setIsEditing(true);
  };

  if (isEditing) {
    return (
      <EditBookModal
        selectedBook={selectedBook}
        onCancel={() => setIsEditing(false)}
        onUpdateSuccess={() => router.refresh()}
      />
    );
  }
  // Delete Book Modal
  const handleDeleteClick = (book) => {
    setBookToDelete(book);
    setIsDeleteOpen(true);
  };

  return (
    <div className="space-y-6 font-urbanist p-4 md:p-6 text-foreground">
      <div>
        <h2 className="text-2xl font-bold font-poppins">Manage Inventory</h2>
        <p className="text-sm text-muted-foreground">
          Track, publish, or edit your added book collection
        </p>
      </div>

      {books.length === 0 ? (
        <div className="border border-border bg-card rounded-3xl p-8 text-center text-muted-foreground">
          No books added yet. Go to 'Add Book' to start your inventory!
        </div>
      ) : (
        <>
          {/* ================= (ডেস্কটপ টেবিল ভিউ) ================= */}
          <div className="hidden md:block table-wrapper border border-border bg-card rounded-3xl shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/40 text-muted-foreground font-semibold text-xs uppercase tracking-wider border-b border-border">
                  <th className="p-4">Book Details</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Fee</th>
                  <th className="p-4 text-center">Requests</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-sm font-medium">
                {books.map((book) => (
                  <tr
                    key={book._id}
                    className="hover:bg-muted/20 transition-all"
                  >
                    <td className="p-4 flex items-center gap-3">
                      <Avatar
                        src={book.cover}
                        radius="lg"
                        className="w-12 h-14 flex-shrink-0 object-cover"
                      />
                      <div className="overflow-hidden">
                        <h4 className="font-bold text-foreground text-sm font-poppins truncate max-w-[180px]">
                          {book.title}
                        </h4>
                        <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                          by {book.author}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {book.category}
                    </td>
                    <td className="p-4 font-poppins">${book.fee}</td>
                    <td className="p-4 font-poppins text-center">
                      {book.requests || 0}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold font-poppins tracking-wide ${
                          book.status === "Published"
                            ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                            : book.status === "Unpublished"
                              ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                              : "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                        }`}
                      >
                        {book.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-3">
                        {book.status === "Pending Approval" ? (
                          <Tooltip
                            content="Locked: Waiting for Admin approval"
                            color="warning"
                            className="rounded-xl"
                          >
                            <button className="p-2 text-muted-foreground/40 bg-muted/20 rounded-xl cursor-not-allowed">
                              <Lock size={18} />
                            </button>
                          </Tooltip>
                        ) : (
                          <Tooltip
                            content={
                              book.status === "Published"
                                ? "Change to Unpublished"
                                : "Change to Published"
                            }
                            className="rounded-xl"
                          >
                            <button
                              onClick={() =>
                                handleToggleStatus(book._id, book.status)
                              }
                              className={`p-2 rounded-xl transition-all cursor-pointer ${book.status === "Published" ? "text-amber-500 bg-amber-500/10 hover:bg-amber-500/20" : "text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20"}`}
                            >
                              {book.status === "Published" ? (
                                <EyeOff size={18} />
                              ) : (
                                <Eye size={18} />
                              )}
                            </button>
                          </Tooltip>
                        )}
                        <Tooltip content="Edit Book" className="rounded-xl">
                          <button
                            onClick={() => handleEditClick(book)}
                            className="p-2 text-primary bg-primary/10 rounded-xl hover:bg-primary/20 transition-all cursor-pointer"
                          >
                            <Edit3 size={18} />
                          </button>
                        </Tooltip>
                        <Tooltip
                          content="Delete Permanently"
                          color="danger"
                          className="rounded-xl"
                        >
                          {/*Delete Book Button */}
                          <button
                            onClick={() => handleDeleteClick(book)}
                            className="p-2 text-red-500 bg-red-500/10 rounded-xl hover:bg-red-500/20 transition-all cursor-pointer"
                          >
                            <Trash2 size={18} />
                          </button>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================= (মোবাইল কার্ড ভিউ) ================= */}
          <div className="block md:hidden space-y-4">
            {books.map((book) => (
              <div
                key={book._id}
                className="border border-border bg-card rounded-2xl p-4 shadow-sm space-y-3"
              >
                <div className="flex gap-3">
                  <Avatar
                    src={book.cover}
                    radius="lg"
                    className="w-14 h-16 object-cover flex-shrink-0"
                  />
                  <div className="overflow-hidden flex-1">
                    <h4 className="font-bold text-foreground text-sm font-poppins truncate">
                      {book.title}
                    </h4>
                    <p className="text-xs text-muted-foreground truncate">
                      by {book.author}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs font-semibold text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-md">
                        {book.category}
                      </span>
                      <span className="text-sm font-bold text-foreground font-poppins">
                        ${book.fee}
                      </span>
                    </div>
                  </div>
                </div>
                <hr className="border-border/60" />
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    onClick={() => handleEditClick(book)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-primary bg-primary/10 rounded-xl font-medium cursor-pointer"
                  >
                    <Edit3 size={14} /> Edit
                  </button>
                  {/* Delete Book Button */}
                  <button
                    onClick={() => handleDeleteClick(book)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-red-500 bg-red-500/10 rounded-xl font-medium cursor-pointer"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Delete Book Modal */}
      <DeleteBookModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setBookToDelete(null);
        }}
        bookToDelete={bookToDelete}
        onDeleteSuccess={() => router.refresh()}
      />
    </div>
  );
};

export default ManageInventory;
