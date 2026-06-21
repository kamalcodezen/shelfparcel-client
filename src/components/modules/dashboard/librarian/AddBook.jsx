"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { FiPlusCircle, FiLoader, FiUploadCloud } from "react-icons/fi";
import { toast } from "react-toastify";

const LibrarianAddBook = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    fee: "",
    category: "Fiction",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const { data: session } = authClient.useSession();
  const user = session?.user;

  // ইনপুট ফিল্ড ট্র্যাকিং
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ইমেজ সিলেক্ট এবং স্ক্রিনে লাইভ প্রিভিউ দেখানো
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // ফর্ম সাবমিট ও imgBB আপলোড হ্যান্ডেলার
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      toast.error("Please upload a book cover image!");
      return;
    }

    setLoading(true);

    try {
      // ১. imgBB ক্লাউডে ইমেজ পাঠানোর জন্য ফর্ম ডেটা রেডি করা
      const imgApiData = new FormData();
      imgApiData.append("image", imageFile);

      // imgBB API Key
      const IMGBB_API_KEY = `5d110d0078bf4b9705ee35ce04c569ac`;
      const imgbbUrl = `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`;

      const imgResponse = await fetch(imgbbUrl, {
        method: "POST",
        body: imgApiData,
      });

      const imgResult = await imgResponse.json();

      if (!imgResult.success) {
        throw new Error("Image upload to imgBB failed!");
      }

      // imgBB থেকে জেনারেট হওয়া লাইভ ইমেজ ইউআরএল
      const liveImageUrl = imgResult.data.display_url;

      const finalBookPayload = {
        title: formData.title,
        author: formData.author,
        fee: Number(formData.fee),
        category: formData.category,
        description: formData.description,
        cover: liveImageUrl,
        status: "Pending Approval",
        librarianName: user?.name,
        librarianEmail: user?.email,
        librarianId: user?.id,
        librarianImage: user?.image,
      };

      console.log("Form Ready to hit backend with Payload:", finalBookPayload);

      toast.success(
        "Success! Image hosted on imgBB. Ready to insert in database.",
      );


      


      // স্টেট এবং ফরম রিসেট করা
      //   setFormData({
      //     title: "",
      //     author: "",
      //     fee: "",
      //     category: "Fiction",
      //     description: "",
      //   });
      //   setImageFile(null);
      //   setPreviewUrl("");
      //   e.target.reset();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 select-none animate-fadeIn">
      <div>
        <h1 className="text-3xl font-bold tracking-tight Poppins">
          Add New Book
        </h1>
        <p className="text-xs text-muted-foreground mt-1 Urbanist">
          List a physical book into the repository pipeline. Requires admin
          clearance.
        </p>
      </div>

      <div className="dashboard-card p-6 border border-border/40 rounded-2xl bg-card">
        <div className="flex items-center gap-2 mb-6 border-b border-border/40 pb-3">
          <FiPlusCircle className="text-primary" size={18} />
          <h3 className="text-base font-bold Poppins">Book Specifications</h3>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 Urbanist"
        >
          <div>
            <label className="text-xs font-bold text-muted-foreground block mb-2">
              Book Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter formal book title"
              className="input-field w-full"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-muted-foreground block mb-2">
              Author Name
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              placeholder="Professor KamalUddin"
              className="input-field w-full"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-muted-foreground block mb-2">
              Delivery Fee ($)
            </label>
            <input
              type="number"
              name="fee"
              value={formData.fee}
              onChange={handleInputChange}
              placeholder="Set handling charge in $USD"
              className="input-field w-full"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-muted-foreground block mb-2">
              Genre Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="input-field w-full bg-card cursor-pointer"
            >
              <option>Fiction</option>
              <option>Sci-Fi</option>
              <option>Academic</option>
              <option>Biography</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-bold text-muted-foreground block mb-2">
              Full Description Summary
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Summarize the core content, condition, and parcel logistics terms..."
              className="input-field w-full h-28 py-2 resize-none"
              required
            />
          </div>

          {/* 🖼️ IMGBB IMAGE UPLOAD CONTAINER WITH LIVE PREVIEW */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 items-center border-2 border-dashed border-border/60 rounded-xl p-5 bg-card-soft/10">
            <div className="md:col-span-2 text-center md:text-left space-y-1">
              <h5 className="text-sm font-bold flex items-center justify-center md:justify-start gap-2">
                <FiUploadCloud className="text-primary" /> Cover Image Upload
              </h5>
              <p className="text-[11px] text-muted-foreground">
                Select a high-resolution portrait cover. Upload streams
                instantly to imgBB storage cluster.
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-xs mt-3 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-primary/10 file:text-primary file:cursor-pointer"
                required
              />
            </div>

            <div className="flex items-center justify-center">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Cover Preview"
                  className="w-24 h-32 object-cover rounded-xl border border-border shadow-md animate-scaleUp"
                />
              ) : (
                <div className="w-24 h-32 bg-card border border-border/60 rounded-xl flex items-center justify-center text-center text-[10px] text-muted-foreground p-2 italic">
                  No image selected
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-2 pt-2">
            <p className="text-[10px] text-amber-500 font-bold mb-4">
              ⚠️ SYSTEM PROTOCOL: When submitted, the system forces initial
              status strictly to 'Pending Approval'. It will remain blacklisted
              from the public Browse feed until admin verification.
            </p>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin" /> Syncing with imgBB
                  Pipelines...
                </>
              ) : (
                "Submit Book to System Queue"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LibrarianAddBook;
