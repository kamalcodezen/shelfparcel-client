"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { AlertTriangle, X } from "lucide-react";
import { toast } from "react-toastify";
import { deleteBooksById } from "@/lib/actions/books";

const DeleteBookModal = ({
  isOpen,
  onClose,
  bookToDelete,
  onDeleteSuccess,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    if (!bookToDelete) return;
    setIsDeleting(true);

    try {
      const res = await deleteBooksById(bookToDelete._id);

      if (res?.success) {
        toast.success(`"${bookToDelete.title}" has been permanently deleted!`);
        setIsDeleting(false);
        if (onDeleteSuccess) onDeleteSuccess();
        onClose();
      } else {
        toast.error(res?.message || "Failed to delete the book.");
      }
    } catch (error) {
      toast.error("Failed to delete the book.");
    } finally {
      setIsDeleting(false);
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/40 dark:bg-black/60 transition-all animate-fadeIn">
      <div className="dashboard-card max-w-md w-full border border-border p-6 rounded-3xl shadow-2xl relative bg-card text-foreground">
        {/* close button*/}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center space-y-4 pt-2">
          {/* warning */}
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
            <AlertTriangle size={32} />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-xl font-bold font-poppins text-foreground">
              Confirm Permanent Delete
            </h3>
            <p className="text-lg sm:text-base text-muted-foreground px-2">
              Are you absolutely sure you want to delete{" "}
              <span className="text-primary font-semibold">
                {bookToDelete?.title}
              </span>
              ? This action cannot be undone.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 w-full pt-4 border-t border-border/40">
            <Button
              onClick={onClose}
              variant="flat"
              className="btn-secondary h-11 px-5 font-bold text-lg sm:text-base cursor-pointer flex-1"
            >
              Cancel
            </Button>

            <Button
              onClick={handleConfirmDelete}
              isLoading={isDeleting}
              className="bg-red-500 hover:bg-red-600 text-white h-11 px-5 font-bold text-lg sm:text-base cursor-pointer flex-1 rounded-xl active:scale-95 transition-all shadow-md shadow-red-500/10"
            >
              {isDeleting ? "Deleting..." : "Yes, Delete"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBookModal;
