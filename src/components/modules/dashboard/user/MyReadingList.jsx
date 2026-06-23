"use client";

import React, { useState, useEffect } from "react";
import { Card, Button } from "@heroui/react";
import { BookCheck, MessageSquare, X, Star } from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { addUserComment } from "@/lib/actions/users";

const MyReadingList = () => {
  // Component States
  const [readingList, setReadingList] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🔐 Authenticated Session Data
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Interactive Rating States
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  const mockDeliveries = [
    {
      _id: "1",
      bookTitle: "React Pro Architecture",
      author: "Dan Abramov",
      status: "Delivered",
      cover:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80",
    },
    {
      _id: "3",
      bookTitle: "Tailwind UI Mastery",
      author: "Adam Wathan",
      status: "Delivered",
      cover:
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=80",
    },
    {
      _id: "5",
      bookTitle: "Prisma ORM Solutions",
      author: "Prisma Team",
      status: "Delivered",
      cover:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80",
    },
  ];

  useEffect(() => {
    setReadingList(mockDeliveries);
  }, []);

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to leave a review.");
      return;
    }

    const reviewPayload = {
      rating: rating,
      comment: commentText,
      bookId: selectedBook?._id,
      userEmail: user?.email,
      userName: user?.name,
      userId: user?.id,
      userImage: user?.image,
      userRole: user?.role,
    };

    try {
      setIsSubmitting(true);

      // add comment to database
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
          <p className="text-xs text-muted-foreground">
            Gallery view of delivered books. Click button to leave a full
            review.
          </p>
        </div>
      </div>

      {/* Books Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {readingList.map((book) => (
          <Card
            key={book._id}
            className="border border-border/70 bg-card/40 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between p-4 space-y-4"
          >
            <div className="space-y-3">
              <div className="aspect-[4/5] w-full h-[170px] bg-muted rounded-2xl overflow-hidden">
                <img
                  src={book.cover}
                  alt={book.bookTitle}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-sm font-poppins line-clamp-1 text-foreground">
                  {book.bookTitle}
                </h4>
                <p className="text-xs text-muted-foreground">
                  By {book.author}
                </p>
              </div>
            </div>

            <Button
              fullWidth
              size="sm"
              color="primary"
              variant="flat"
              className="font-bold text-xs rounded-xl"
              onClick={() => setSelectedBook(book)}
              endContent={<MessageSquare size={14} />}
            >
              Write a Review
            </Button>
          </Card>
        ))}
      </div>

      {/* Review Dialog Popup Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="p-5 border border-border w-full max-w-sm bg-background rounded-3xl space-y-4 shadow-xl">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-poppins font-bold text-sm text-foreground">
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
                <label className="text-xs text-muted-foreground font-medium">
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
                  <span className="text-xs font-bold font-poppins text-muted-foreground ml-1.5">
                    ({rating} / 5)
                  </span>
                </div>
              </div>

              {/* Textarea Input */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-muted-foreground font-medium">
                  Your Comment:
                </label>
                <textarea
                  placeholder="What did you think about this book? Type here..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  required
                  rows={4}
                  disabled={isSubmitting}
                  className="w-full p-3 rounded-xl border border-border bg-muted/40 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-all disabled:opacity-50"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 justify-end pt-1">
                <Button
                  size="sm"
                  variant="light"
                  className="rounded-xl font-bold text-xs h-9"
                  onClick={() => setSelectedBook(null)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  color="primary"
                  type="submit"
                  isLoading={isSubmitting}
                  className="rounded-xl font-bold text-xs h-9"
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
