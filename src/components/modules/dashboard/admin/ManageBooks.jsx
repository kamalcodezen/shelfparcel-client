"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { Book, Check, X, Eye, EyeOff, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { adminUpdateStatusById } from "@/lib/actions/admin";
import DeleteBookModal from "../librarian/DeleteBookModal";

const ManageBooks = ({ books = [] }) => {
  const router = useRouter();

  //  delete book modal state
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  const [loadingId, setLoadingId] = useState(null);

  // status change korchi
  const handleStatusClick = async (bookId, targetStatus) => {
    try {
      setLoadingId(bookId);

      const res = await adminUpdateStatusById({ bookId, status: targetStatus });

      if (res?.success) {
        toast.success(`Book status changed to ${targetStatus}!`);
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to update status");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDeleteClick = (book) => {
    setBookToDelete(book);
    setIsDeleteOpen(true);
  };

  // status color
  const statusStyles = {
    Published: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Unpublished: "bg-red-500/10 text-red-500 border-red-500/20",
    "Pending Approval": "bg-amber-500/10 text-amber-500 border-amber-500/20",
  };

  return (
    <div className="space-y-6 font-urbanist text-foreground pt-4 w-full">
      {/* books not found */}
      {books.length === 0 ? (
        <div className="border border-border bg-card/40 rounded-3xl p-10 text-center text-muted-foreground flex flex-col items-center justify-center gap-2 shadow-sm">
          <Book size={32} className="text-muted-foreground/60" />
          <p className="font-bold">No Books Found</p>
        </div>
      ) : (
        /* main table */
        <div className="border border-border bg-card/30 rounded-3xl shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/40 text-muted-foreground text-xs font-semibold uppercase tracking-wider border-b border-border">
                <th className="p-4">Book Title</th>
                <th className="p-4">Author</th>
                <th className="p-4">Current Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border/60 text-sm font-medium">
              {books.map((book) => (
                <tr key={book._id} className="transition-all hover:bg-muted/10">
                  {/* books cover image */}
                  <td className="p-4 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary text-xs uppercase flex-shrink-0">
                      {book.cover ? (
                        <img
                          src={book?.cover}
                          alt="Book Cover"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        book.title?.charAt(0)
                      )}
                    </div>
                    <span className="font-bold font-poppins text-foreground">
                      {book.title}
                    </span>
                  </td>

                  <td className="p-4 text-muted-foreground">
                    {book.author || "Unknown Author"}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-xs font-bold uppercase border ${statusStyles[book.status] || statusStyles["Pending Approval"]}`}
                    >
                      {book.status || "Pending Approval"}
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {/* status change Pending--Approval/Published */}
                      {(book.status === "Pending Approval" || !book.status) && (
                        <>
                          <Button
                            size="sm"
                            color="success"
                            variant="flat"
                            isLoading={loadingId === book._id}
                            onClick={() =>
                              handleStatusClick(book._id, "Published")
                            }
                            className="font-bold text-xs rounded-xl h-9"
                            startContent={<Check size={14} />}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            color="danger"
                            variant="flat"
                            isLoading={loadingId === book._id}
                            onClick={() =>
                              handleStatusClick(book._id, "Unpublished")
                            }
                            className="font-bold text-xs rounded-xl h-9"
                            startContent={<X size={14} />}
                          >
                            Reject
                          </Button>
                        </>
                      )}

                      {/* status change publish/unpublish */}
                      {book.status === "Published" && (
                        <Button
                          size="sm"
                          color="warning"
                          variant="flat"
                          isLoading={loadingId === book._id}
                          onClick={() =>
                            handleStatusClick(book._id, "Unpublished")
                          }
                          className="font-bold text-xs rounded-xl h-9"
                          startContent={<EyeOff size={14} />}
                        >
                          Unpublish
                        </Button>
                      )}

                      {/* status change publish/unpublish */}
                      {book.status === "Unpublished" && (
                        <Button
                          size="sm"
                          color="success"
                          variant="flat"
                          isLoading={loadingId === book._id}
                          onClick={() =>
                            handleStatusClick(book._id, "Published")
                          }
                          className="font-bold text-xs rounded-xl h-9"
                          startContent={<Eye size={14} />}
                        >
                          Publish
                        </Button>
                      )}

                      {/* Delete Book Button */}
                      <Button
                        isIconOnly
                        size="sm"
                        onClick={() => handleDeleteClick(book)}
                        className="p-2.5 text-red-500 bg-red-500/10 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-all cursor-pointer h-9 min-w-0"
                      >
                        <Trash2 size={15} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
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

export default ManageBooks;
