"use client";

import React, { useState, useEffect } from "react";
import { History, BookOpen, DollarSign, Calendar, Clock } from "lucide-react";


const UserDeliveryHistory = () => {
  const [history, setHistory] = useState([]);

  const mockHistory = [
    {
      _id: "DEL98765",
      bookTitle: "Advanced Next.js Architecture",
      deliveryFee: 60,
      date: "2026-06-23T10:00:00.000Z",
      status: "Pending Approval",
    },
    {
      _id: "DEL11223",
      bookTitle: "Mastering Tailwind CSS",
      deliveryFee: 50,
      date: "2026-06-22T11:30:00.000Z",
      status: "Dispatched",
    },
    {
      _id: "DEL55443",
      bookTitle: "Node.js Complete Guide",
      deliveryFee: 80,
      date: "2026-06-20T15:45:00.000Z",
      status: "Delivered", 
    },
  ];

  useEffect(() => {
   
    setHistory(mockHistory);

   
  }, []);

  // Date format
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Status dynamic color object
  const statusStyles = {
    "Pending Approval": "bg-amber-500/10 text-amber-500 border-amber-500/20",
    Dispatched: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    Delivered: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  };

  return (
    <div className="space-y-6 font-urbanist text-foreground pt-4 w-full">
      {/* Header section */}
      <div className="flex items-center gap-3 border-b border-border/60 pb-4">
        <div className="p-2.5 bg-primary/10 border border-primary/20 text-primary rounded-xl">
          <History size={22} />
        </div>
        <div>
          <h2 className="font-poppins font-bold text-xl tracking-tight">
            Delivery History
          </h2>
          <p className="text-xs text-muted-foreground">
            Real-time tracking of your requested books and shipment logs.
          </p>
        </div>
      </div>

      {/* Data not found */}
      {history.length === 0 ? (
        <div className="border border-border bg-card/40 rounded-3xl p-10 text-center text-muted-foreground flex flex-col items-center justify-center gap-2 shadow-sm">
          <History size={32} className="text-muted-foreground/60" />
          <p className="font-bold">No Delivery Records Found</p>
        </div>
      ) : (
        <>
          {/* desktop view */}
          <div className="hidden md:block border border-border bg-card/30 rounded-3xl shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/40 text-muted-foreground text-xs font-semibold uppercase tracking-wider border-b border-border">
                  <th className="p-4">
                    <span className="flex items-center gap-1.5">
                      <BookOpen size={13} /> Book Title
                    </span>
                  </th>
                  <th className="p-4">
                    <span className="flex items-center gap-1.5">
                      <DollarSign size={13} /> Delivery Fee
                    </span>
                  </th>
                  <th className="p-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} /> Request Date
                    </span>
                  </th>
                  <th className="p-4">
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} /> Status
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border/60 text-sm font-medium">
                {history.map((item) => (
                  <tr
                    key={item._id}
                    className="transition-all hover:bg-muted/10"
                  >
                    {/* Book Title */}
                    <td className="p-4 font-bold font-poppins text-foreground">
                      {item.bookTitle}
                    </td>

                    {/* Delivery Fee */}
                    <td className="p-4 text-muted-foreground">
                      <span className="px-2 py-0.5 rounded-md bg-muted/60 text-foreground font-poppins text-xs border border-border/40">
                        ${item.deliveryFee}
                      </span>
                    </td>

                    {/* requested Date */}
                    <td className="p-4 text-muted-foreground text-xs">
                      {formatDate(item.date)}
                    </td>

                    {/* Live Status */}
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-md text-xs font-bold uppercase border ${statusStyles[item.status] || statusStyles["Pending Approval"]}`}
                      >
                        {item.status || "Pending Approval"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="w-11/12 mx-auto block md:hidden space-y-4">
            {history.map((item) => (
              <div
                key={item._id}
                className="border border-border/80 bg-card/40 rounded-2xl p-4 shadow-sm space-y-3 transition-all active:scale-[0.99]"
              >
                {/* Card Header: Book Title */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                      Book Title
                    </p>
                    <h4 className="font-bold text-foreground text-sm font-poppins line-clamp-1">
                      {item.bookTitle}
                    </h4>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase border flex-shrink-0 ${statusStyles[item.status] || statusStyles["Pending Approval"]}`}
                  >
                    {item.status || "Pending Approval"}
                  </span>
                </div>

                {/* Card Body: Delivery Fee and Date */}
                <div className="grid grid-cols-2 gap-2 border-t border-border/40 pt-2.5 text-xs font-medium">
                  <div>
                    <p className="text-muted-foreground text-[11px] mb-0.5">
                      Delivery Fee
                    </p>
                    <p className="text-foreground font-poppins font-bold">
                      ${item.deliveryFee}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-[11px] mb-0.5">
                      Request Date
                    </p>
                    <p className="text-muted-foreground/90 font-medium">
                      {formatDate(item.date)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserDeliveryHistory;
