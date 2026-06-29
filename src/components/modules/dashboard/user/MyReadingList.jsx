"use client";

import React, { useState, useEffect } from "react";
import { Card, Button } from "@heroui/react";
import { BookCheck, MessageSquare, X, Star, BookOpen } from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import {
  addUserComment,
  userBookReturnStatusUpdate,
} from "@/lib/actions/users";
import { useRouter } from "next/navigation";

const MyReadingList = ({ userPayment = [] }) => {
  const router = useRouter();

  // Component States
  const [readingList, setReadingList] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingId, setLoadingId] = useState(null);

  // Authenticated Session Data
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Interactive Rating States
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    const filteredBooks = userPayment.filter(
      (item) =>
        item?.status === "Delivered" ||
        item?.status === "Return Requested" ||
        item?.status === "Returned",
    );
    setReadingList(filteredBooks);
  }, [userPayment]);

  // "Return This Book"
  const handleReturnRequest = async (book) => {
    try {
      setLoadingId(book._id);

      const data = await userBookReturnStatusUpdate(book?._id, book?.status);

      if (data?.success || data?.insertedId || data?.result?.insertedId) {
        toast.success(`Return request submitted for ${book?.bookTitle}!`);
        router.refresh();
      } else {
        console.log(data);
        toast.error(data?.message || "Failed to submit return request.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while sending the return request.");
    } finally {
      setLoadingId(null);
    }
  };

  //  রিভিউ সাবমিট করার ফাংশন ভাই
  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to leave a review.");
      return;
    }

    const reviewPayload = {
      rating: rating,
      comment: commentText.trim(),
      bookId: selectedBook?.bookId,
      bookTitle: selectedBook?.bookTitle,
      bookImage: selectedBook?.bookCover,
      userEmail: user?.email,
      userName: user?.name,
      userId: user?.id,
      userImage: user?.image,
      role: user?.role,
    };

    try {
      setIsSubmitting(true);
      const res = await addUserComment(reviewPayload);
      if (res?.success || res?.insertedId || res?.result?.insertedId) {
        toast.success(
          `Review submitted successfully for ${selectedBook?.bookTitle}!`,
        );
        setSelectedBook(null);
        setCommentText("");
        setRating(5);
      } else {
        toast.error(res?.message || "Failed to submit review.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 font-urbanist text-foreground pt-4 w-full">
      {/* Header Section */}
      <div className="flex items-center gap-3 border-b border-border/60 pb-4">
        <div className="p-2.5 bg-primary/10 border border-primary/20 text-primary rounded-xl">
          <BookCheck size={22} />
        </div>
        <div>
          <h2 className="font-poppins font-bold text-xl tracking-tight">
            My Reading List
          </h2>
          <p className="text-base sm:text-sm text-muted-foreground">
            Gallery view of delivered books. Manage returns and leave your
            reviews here.
          </p>
        </div>
      </div>

      {/* Empty Guard Layer */}
      {readingList.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border rounded-2xl bg-card/20 flex flex-col items-center justify-center gap-2 text-muted-foreground">
          <BookOpen size={32} className="opacity-40 text-primary" />
          <p className="text-base sm:text-sm font-bold">
            Your reading list is empty
          </p>
          <p className="text-[11px] opacity-75">
            Books will appear here once the Librarian marks them as Delivered.
          </p>
        </div>
      ) : (
        /* Books Gallery Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {readingList.map((book) => (
            <Card
              key={book?._id || book?.transactionId}
              className="border border-border/70 bg-card/40 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between p-4 space-y-4"
            >
              <div className="space-y-3">
                <div className="aspect-[4/5] w-full h-[140px] bg-muted rounded-lg overflow-hidden">
                  <img
                    src={
                      book?.bookCover ||
                      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e"
                    }
                    alt={book?.bookTitle}
                    className="w-full h-[140px] object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-lg sm:text-base font-poppins line-clamp-1 text-foreground">
                    {book?.bookTitle || "Untitled Book"}
                  </h4>
                  <p className="text-base sm:text-sm text-muted-foreground mt-1">
                    Order Status:{" "}
                    <span
                      className={`font-semibold ${
                        book?.status === "Delivered"
                          ? "text-emerald-500"
                          : book?.status === "Return Requested"
                            ? "text-purple-500"
                            : "text-blue-500"
                      }`}
                    >
                      {book?.status}
                    </span>
                  </p>
                </div>
              </div>

              {/* status control button */}
              <div className="space-y-2">
                {book?.status === "Delivered" ? (
                  <Button
                    fullWidth
                    size="sm"
                    color="danger"
                    variant="flat"
                    className="font-bold text-base sm:text-sm rounded-md cursor-pointer"
                    onClick={() => handleReturnRequest(book)}
                    isLoading={loadingId === book._id}
                  >
                    {loadingId === book._id
                      ? "Processing..."
                      : "↩ Return This Book"}
                  </Button>
                ) : book?.status === "Return Requested" ? (
                  <Button
                    fullWidth
                    size="sm"
                    className="font-bold text-base sm:text-sm rounded-md bg-purple-500/10 text-purple-500 cursor-not-allowed"
                    disabled
                  >
                    Return Requested
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    size="sm"
                    className="font-bold text-base sm:text-sm rounded-md bg-emerald-500/10 text-emerald-500 cursor-not-allowed"
                    disabled
                  >
                    ✅ Successfully Returned
                  </Button>
                )}

                {/* review/comment button */}
                <Button
                  fullWidth
                  size="sm"
                  color="primary"
                  variant="flat"
                  className="font-bold text-base sm:text-sm rounded-xl cursor-pointer"
                  onClick={() => setSelectedBook(book)}
                  endContent={<MessageSquare size={14} />}
                >
                  Write a Review
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* =======================================================
                            modal
         ============================================================== */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="p-5 border border-border w-full max-w-sm bg-background rounded-3xl space-y-4 shadow-xl">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-poppins font-bold text-lg sm:text-base text-foreground">
                  Review: {selectedBook?.bookTitle}
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  Give your rating and valuable comment below.
                </p>
              </div>
              <button
                type="button"
                onClick={() => !isSubmitting && setSelectedBook(null)}
                disabled={isSubmitting}
                className="p-1 rounded-lg hover:bg-muted text-muted-foreground transition-colors disabled:opacity-50"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmitComment} className="space-y-4">
              {/* Rating Component */}
              <div className="flex flex-col gap-1">
                <label className="text-base sm:text-sm text-muted-foreground font-medium">
                  Select Rating:
                </label>
                <div className="flex items-center gap-1.5 pt-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      disabled={isSubmitting}
                      className="transition-transform active:scale-95 text-amber-500 disabled:opacity-50"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      <Star
                        size={22}
                        fill={
                          star <= (hoverRating || rating)
                            ? "currentColor"
                            : "none"
                        }
                        className="stroke-[1.5]"
                      />
                    </button>
                  ))}
                  <span className="text-base sm:text-sm font-bold font-poppins text-muted-foreground ml-1.5">
                    ({rating} / 5)
                  </span>
                </div>
              </div>

              {/* Textarea Input */}
              <div className="flex flex-col gap-1">
                <label className="text-base sm:text-sm text-muted-foreground font-medium">
                  Your Comment:
                </label>
                <textarea
                  placeholder="What did you think about this book? Type here..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  required
                  rows={4}
                  disabled={isSubmitting}
                  className="w-full p-3 rounded-xl border border-border bg-muted/40 text-lg sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-all disabled:opacity-50"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 justify-end pt-1">
                <Button
                  size="sm"
                  variant="light"
                  className="rounded-xl font-bold text-base sm:text-sm h-9"
                  onClick={() => setSelectedBook(null)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  color="primary"
                  type="submit"
                  variant="light"
                  isLoading={isSubmitting}
                  className="rounded-xl  font-bold text-base sm:text-sm h-9"
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MyReadingList;
