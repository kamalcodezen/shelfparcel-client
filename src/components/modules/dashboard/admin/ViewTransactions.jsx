"use client";

import React, { useState, useEffect } from "react";
import {
  CreditCard,
  Mail,
  Calendar,
  Hash,
  ShieldCheck,
  DollarSign,
} from "lucide-react";

const ViewTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  // (Mock Data)
  const mockTransactions = [
    {
      _id: "TXN987654321",
      userEmail: "kamaluddin.dev@gmail.com",
      librarianEmail: "admin.library@platform.com",
      amount: 500,
      date: "2026-06-23T14:30:00.000Z",
    },
    {
      _id: "TXN112233445",
      userEmail: "rahul.reader@yahoo.com",
      librarianEmail: "system.auto@platform.com",
      amount: 120,
      date: "2026-06-22T09:15:00.000Z",
    },
    {
      _id: "TXN556677889",
      userEmail: "fatema.bookworm@outlook.com",
      librarianEmail: "librarian.korim@platform.com",
      amount: 1500,
      date: "2026-06-20T18:45:00.000Z",
    },
  ];

  useEffect(() => {
    // এপিআই রেডি না হওয়া পর্যন্ত মক ডাটা সেট
    setTransactions(mockTransactions);

    // api get all transactions
  }, []);

  // Date Format
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6 font-urbanist text-foreground pt-4 w-full">
      {/* Header section */}
      <div className="flex items-center gap-3 border-b border-border/60 pb-4">
        <div className="p-2.5 bg-primary/10 border border-primary/20 text-primary rounded-xl">
          <CreditCard size={22} />
        </div>
        <div>
          <h2 className="font-poppins font-bold text-xl tracking-tight">
            Financial Transactions
          </h2>
          <p className="text-xs text-muted-foreground">
            Platform-wide financial audit trail and logs.
          </p>
        </div>
      </div>

      {/* data not found */}
      {transactions.length === 0 ? (
        <div className="border border-border bg-card/40 rounded-3xl p-10 text-center text-muted-foreground flex flex-col items-center justify-center gap-2 shadow-sm">
          <CreditCard size={32} className="text-muted-foreground/60" />
          <p className="font-bold">No Transactions Recorded Yet</p>
        </div>
      ) : (
        /*  main layout */
        <div className="border border-border bg-card/30 rounded-3xl shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/40 text-muted-foreground text-xs font-semibold uppercase tracking-wider border-b border-border">
                <th className="p-4">
                  <span className="flex items-center gap-1.5">
                    <Hash size={13} /> Transaction ID
                  </span>
                </th>
                <th className="p-4">
                  <span className="flex items-center gap-1.5">
                    <Mail size={13} /> User Email
                  </span>
                </th>
                <th className="p-4">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck size={13} /> Processed By
                  </span>
                </th>
                <th className="p-4">
                  <span className="flex items-center gap-1.5">
                    <DollarSign size={13} /> Amount
                  </span>
                </th>
                <th className="p-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} /> Date
                  </span>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border/60 text-sm font-medium">
              {transactions.map((txn) => (
                <tr key={txn._id} className="transition-all hover:bg-muted/10">
                  {/* ১. transaction ID */}
                  <td className="p-4 font-bold font-poppins text-foreground select-all">
                    {txn._id}
                  </td>

                  {/* ২. User Email */}
                  <td className="p-4 text-muted-foreground">{txn.userEmail}</td>

                  {/* ৩. Librarian Email */}
                  <td className="p-4 text-muted-foreground/80">
                    {txn.librarianEmail}
                  </td>

                  {/* ৪. Amount */}
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-bold font-poppins bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                      ${txn.amount}
                    </span>
                  </td>

                  {/* ৫. Date */}
                  <td className="p-4 text-muted-foreground text-xs">
                    {formatDate(txn.date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewTransactions;
