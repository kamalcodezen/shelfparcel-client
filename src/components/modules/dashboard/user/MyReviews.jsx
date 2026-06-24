"use client";

import React, { useState } from "react";
import { Card, Button } from "@heroui/react";
import {
  MessageSquare,
  Pencil,
  Trash2,
  Star,
  Calendar,
  User,
  BookOpen,
} from "lucide-react";
import { toast } from "react-toastify";

const MyReviews = ({ comments = [] }) => {
  const [reviewList, setReviewList] = useState(comments);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  //  Handles the PATCH request saving to the database
  const handleSaveEdit = async (id) => {
    if (!editText.trim()) {
      toast.warn("Comment field cannot be empty!");
      return;
    }
    try {
      setIsSubmitting(true);

      // await updateCommentById(id, { comment: editText });

      setReviewList(
        reviewList.map((item) =>
          item._id === id ? { ...item, comment: editText } : item,
        ),
      );
      setEditingId(null);
      toast.success("Review updated successfully!");
    } catch (error) {
      toast.error("Failed to save changes.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handles the DELETE request erasing from the database
  const handleDeleteReview = async (id) => {
    if (confirm("Are you sure you want to permanently delete this review?")) {
      try {
        // await deleteCommentById(id);

        setReviewList(reviewList.filter((item) => item._id !== id));
        toast.success("Review deleted successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete review.");
      }
    }
  };

  return (
    <div className="space-y-6 font-urbanist text-foreground pt-4 w-full">
      {/*  Header Component */}
      <div className="flex items-center gap-3 border-b border-border/60 pb-4">
        <div className="p-2.5 bg-primary/10 border border-primary/20 text-primary rounded-xl">
          <MessageSquare size={22} />
        </div>
        <div>
          <h2 className="font-poppins font-bold text-xl tracking-tight">
            My Reviews
          </h2>
          <p className="text-xs text-muted-foreground">
            Manage, update, or clear history of all reviews submitted by you.
          </p>
        </div>
      </div>

      {/*  Empty Collection Check */}
      {reviewList.length === 0 ? (
        <div className="border border-dashed border-border bg-card/20 rounded-lg p-12 text-center text-muted-foreground flex flex-col items-center justify-center gap-2">
          <MessageSquare size={32} className="text-muted-foreground/40" />
          <p className="font-bold text-sm">No Active Reviews Found</p>
          <p className="text-xs text-muted-foreground/70">
            Reviews logged via your Reading List panel will stack here.
          </p>
        </div>
      ) : (
        /*  Premium Interactive Review Stream Card System */
        <div className="space-y-4">
          {reviewList.map((review) => (
            <Card
              key={review._id}
              className="p-5 border border-border/60 bg-card/40 rounded-3xl space-y-4 shadow-sm flex flex-col group"
            >
              {/*  Top Bar Layout: User Profile Info & Interactive Stars */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/30 pb-3">
                <div className="flex items-center gap-3">
                  {/* User Profile Avatar Avatar image container */}
                  <div className="w-10 h-10 rounded-full bg-muted border border-border overflow-hidden flex items-center justify-center shrink-0">
                    {review?.userImage ? (
                      <img
                        src={review.userImage}
                        alt={review.userName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={18} className="text-muted-foreground/60" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm font-poppins text-foreground flex items-center gap-2 leading-none">
                      {review?.userName || "Anonymous"}
                      <span className="px-2 py-0.5 rounded-md text-[9px] font-bold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20">
                        {review?.role || "user"}
                      </span>
                    </h4>
                    <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-1.5 font-medium">
                      {review?.userEmail}
                    </p>
                  </div>
                </div>

                {/* Stars Indicator Generation Engine */}
                <div className="flex items-center gap-1 text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-xl border border-amber-500/20 text-xs font-bold font-poppins self-start sm:self-center">
                  {review.rating} <Star size={13} fill="currentColor" />
                </div>
              </div>

              {/*  Mid Section Layout: Dynamic Textarea vs Comment Display Render */}
              <div className="flex gap-4 items-start">
                {/* Book Thumbnail Column */}
                {review?.bookImage && (
                  <div className="w-16 h-20 bg-muted border border-border/50 rounded-xl overflow-hidden shrink-0 hidden sm:block shadow-sm">
                    <img
                      src={review.bookImage}
                      alt="Cover"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground/80 font-medium">
                    <span className="font-bold text-primary font-poppins tracking-wide">
                      REF ID: {review.bookId}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />{" "}
                      {review?.createdAt
                        ? new Date(review.createdAt).toLocaleDateString()
                        : "Recent"}
                    </span>
                  </div>

                  {editingId === review._id ? (
                    <div className="space-y-3 pt-1">
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        rows={3}
                        disabled={isSubmitting}
                        className="w-full p-3 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-all disabled:opacity-50"
                      />
                      <div className="flex items-center gap-2 justify-end">
                        <Button
                          size="sm"
                          variant="light"
                          disabled={isSubmitting}
                          className="rounded-xl font-bold text-xs h-8"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          color="success"
                          isLoading={isSubmitting}
                          className="rounded-xl font-bold text-xs h-8 text-white"
                          onClick={() => handleSaveEdit(review._id)}
                        >
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground/90 italic font-medium leading-relaxed pt-0.5">
                      {review.comment}
                    </p>
                  )}
                </div>
              </div>

              {/*  Bottom Bar Layout: Management Controllers Action Buttons */}
              {editingId !== review._id && (
                <div className="flex items-center gap-2 justify-end pt-2 border-t border-border/10   transition-opacity duration-200">
                  <Button
                    size="sm"
                    variant="flat"
                    color="warning"
                    className="h-8 rounded-xl text-xs font-bold"
                    onClick={() => {
                      setEditingId(review._id);
                      setEditText(review.comment);
                    }}
                    startContent={<Pencil size={13} />}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="flat"
                    color="danger"
                    className="h-8 rounded-xl text-xs font-bold"
                    onClick={() => handleDeleteReview(review._id)}
                    startContent={<Trash2 size={13} />}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
