"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import {
  Truck,
  User,
  BookOpen,
  Calendar,
  Check,
  ArrowRight,
} from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ManageDeliveries = () => {
  const router = useRouter();
  const [deliveries, setDeliveries] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  //  mock data
  const mockDeliveries = [
    {
      _id: "DEL98765",
      clientName: "Kamaluddin Ahmed",
      bookTitle: "Advanced Next.js Architecture",
      date: "2026-06-23T10:00:00.000Z",
      status: "Pending Approval",
    },
    {
      _id: "DEL11223",
      clientName: "Rahul Sharma",
      bookTitle: "Mastering Tailwind CSS",
      date: "2026-06-22T11:30:00.000Z",
      status: "Dispatched",
    },
    {
      _id: "DEL55443",
      clientName: "Fatema Tuz Zohra",
      bookTitle: "Node.js Complete Guide",
      date: "2026-06-20T15:45:00.000Z",
      status: "Delivered",
    },
  ];

  useEffect(() => {
    setDeliveries(mockDeliveries);
  }, []);

  //
  const handleStatusClick = async (deliveryId, targetStatus) => {
    try {
      setLoadingId(deliveryId);

      // =============================================================
      // const res = await updateDeliveryStatus({ deliveryId, status: targetStatus });
      // =============================================================

      setDeliveries((prev) =>
        prev.map((item) =>
          item._id === deliveryId ? { ...item, status: targetStatus } : item,
        ),
      );
      toast.success(`Delivery status changed to ${targetStatus}! 🚀`);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoadingId(null);
    }
  };

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
      {/* 🚚 হেডার সেকশন ভাই */}
      <div className="flex items-center gap-3 border-b border-border/60 pb-4">
        <div className="p-2.5 bg-primary/10 border border-primary/20 text-primary rounded-xl">
          <Truck size={22} />
        </div>
        <div>
          <h2 className="font-poppins font-bold text-xl tracking-tight">
            Manage Deliveries
          </h2>
          <p className="text-xs text-muted-foreground">
            Track and update platform-wide book shipments.
          </p>
        </div>
      </div>

      {deliveries.length === 0 ? (
        <div className="border border-border bg-card/40 rounded-3xl p-10 text-center text-muted-foreground flex flex-col items-center justify-center gap-2 shadow-sm">
          <Truck size={32} className="text-muted-foreground/60" />
          <p className="font-bold">No Deliveries Found</p>
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
                      <User size={13} /> Client Name
                    </span>
                  </th>
                  <th className="p-4">
                    <span className="flex items-center gap-1.5">
                      <BookOpen size={13} /> Book Title
                    </span>
                  </th>
                  <th className="p-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} /> Order Date
                    </span>
                  </th>
                  <th className="p-4">Current Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border/60 text-sm font-medium">
                {deliveries.map((delivery) => (
                  <tr
                    key={delivery._id}
                    className="transition-all hover:bg-muted/10"
                  >
                    <td className="p-4 font-bold text-foreground">
                      {delivery.clientName}
                    </td>
                    <td className="p-4 text-muted-foreground font-poppins">
                      {delivery.bookTitle}
                    </td>
                    <td className="p-4 text-muted-foreground text-xs">
                      {formatDate(delivery.date)}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-md text-xs font-bold uppercase border ${statusStyles[delivery.status] || statusStyles["Pending Approval"]}`}
                      >
                        {delivery.status || "Pending Approval"}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {delivery.status === "Pending Approval" && (
                          <Button
                            size="sm"
                            color="primary"
                            variant="flat"
                            isLoading={loadingId === delivery._id}
                            onClick={() =>
                              handleStatusClick(delivery._id, "Dispatched")
                            }
                            className="font-bold text-xs rounded-xl h-9"
                            endContent={<ArrowRight size={14} />}
                          >
                            Ship Order
                          </Button>
                        )}
                        {delivery.status === "Dispatched" && (
                          <Button
                            size="sm"
                            color="success"
                            variant="flat"
                            isLoading={loadingId === delivery._id}
                            onClick={() =>
                              handleStatusClick(delivery._id, "Delivered")
                            }
                            className="font-bold text-xs rounded-xl h-9"
                            endContent={<Check size={14} />}
                          >
                            Mark Delivered
                          </Button>
                        )}
                        {delivery.status === "Delivered" && (
                          <span className="text-xs text-muted-foreground/60 italic font-normal">
                           Returned ✅
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="block md:hidden space-y-4">
            {deliveries.map((delivery) => (
              <div
                key={delivery._id}
                className="border border-border/80 bg-card/40 rounded-2xl p-4 shadow-sm space-y-3 transition-all active:scale-[0.99]"
              >
                {/* Card Header: */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">
                      Client Name
                    </p>
                    <h4 className="font-bold text-foreground text-sm">
                      {delivery.clientName}
                    </h4>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase border ${statusStyles[delivery.status] || statusStyles["Pending Approval"]}`}
                  >
                    {delivery.status || "Pending Approval"}
                  </span>
                </div>

                {/* Card Body: */}
                <div className="grid grid-cols-2 gap-2 border-t border-b border-border/40 py-2.5 text-xs">
                  <div>
                    <p className="text-muted-foreground font-medium mb-0.5">
                      Book Title
                    </p>
                    <p className="font-semibold text-foreground font-poppins truncate max-w-[140px]">
                      {delivery.bookTitle}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground font-medium mb-0.5">
                      Order Date
                    </p>
                    <p className="font-semibold text-foreground">
                      {formatDate(delivery.date)}
                    </p>
                  </div>
                </div>

                {/* Card Footer: */}
                <div className="flex items-center justify-end pt-1">
                  {delivery.status === "Pending" && (
                    <Button
                      fullWidth
                      size="sm"
                      color="primary"
                      variant="flat"
                      isLoading={loadingId === delivery._id}
                      onClick={() =>
                        handleStatusClick(delivery._id, "Dispatched")
                      }
                      className="font-bold text-xs rounded-xl h-9"
                      endContent={<ArrowRight size={14} />}
                    >
                      Ship Order
                    </Button>
                  )}
                  {delivery.status === "Dispatched" && (
                    <Button
                      fullWidth
                      size="sm"
                      color="success"
                      variant="flat"
                      isLoading={loadingId === delivery._id}
                      onClick={() =>
                        handleStatusClick(delivery._id, "Delivered")
                      }
                      className="font-bold text-xs rounded-xl h-9"
                      endContent={<Check size={14} />}
                    >
                      Mark Delivered
                    </Button>
                  )}
                  {delivery.status === "Delivered" && (
                    <div className="w-full text-center py-1.5 bg-emerald-500/5 border border-emerald-500/10 rounded-xl text-xs text-emerald-600 font-bold">
                      Returned ✅
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ManageDeliveries;
