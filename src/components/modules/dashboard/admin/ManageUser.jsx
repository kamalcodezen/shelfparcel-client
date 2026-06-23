"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@heroui/react";
import { Trash2, Mail, User, Shield, CheckCircle2, X } from "lucide-react";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


const ManageUser = ({ users = [] }) => {
  const router = useRouter();

  // Dialog open close state
  const [isOpen, setIsOpen] = useState(false);
  const [targetUser, setTargetUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(false);

  // বাটনে ক্লিক করলে modal ওপেন hobe
  const handleOpenDialog = (user) => {
    setTargetUser(user);
    setSelectedRole(user.role || "user");
    setIsOpen(true);
  };

  const handleRoleConfirm = async () => {
    if (!targetUser || !selectedRole) return;

    try {
      setLoading(true);

      // const res = await updateUserRole({
      //   userId: targetUser._id,
      //   role: selectedRole,
      // });

      console.log("API RESPONSE:", res);
      toast.success(`User role updated to ${selectedRole}! 🎉`);

      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Role update error:", error);
      toast.error("Failed to update user role");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const roleStyles = {
    admin: "bg-red-500/10 text-red-500 border-red-500/20",
    librarian: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    user: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6 font-urbanist text-foreground pt-4 w-full relative"
    >
      {users.length === 0 ? (
        <motion.div
          variants={itemVariants}
          className="border border-border bg-card/40 rounded-3xl p-10 text-center text-muted-foreground flex flex-col items-center justify-center gap-2 shadow-sm"
        >
          <User size={32} className="text-muted-foreground/60" />
          <p className="font-bold">No Users Found</p>
        </motion.div>
      ) : (
        <>
          {/* Desktop View */}
          <motion.div
            variants={itemVariants}
            className="hidden md:block border border-border bg-card/30 rounded-3xl shadow-sm overflow-x-auto"
          >
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/40 text-muted-foreground text-xs font-semibold uppercase tracking-wider border-b border-border">
                  <th className="p-4">User Name</th>
                  <th className="p-4">Email Address</th>
                  <th className="p-4">System Role</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-sm font-medium">
                <AnimatePresence>
                  {users.map((account, ind) => (
                    <motion.tr
                      layout
                      key={account._id || ind}
                      variants={itemVariants}
                      className="transition-all hover:bg-muted/10"
                    >
                      <td className="p-4 flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary text-xs uppercase">
                          <img
                            src={account.image}
                            alt="Profile Picture"
                            className="w-8 h-8 rounded-full"
                          />
                        </div>
                        <span className="font-bold font-poppins text-foreground">
                          {account.name}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Mail size={14} /> {account.email}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider font-poppins border ${roleStyles[account.role] || roleStyles.user}`}
                        >
                          {account.role || "user"}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleOpenDialog(account)}
                            className="bg-primary/10 text-primary border border-primary/20 font-bold rounded-xl text-xs uppercase font-poppins h-9"
                            startContent={<Shield size={14} />}
                          >
                            Change Role
                          </Button>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            className="p-2.5 text-red-500 bg-red-500/10 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-all"
                          >
                            <Trash2 size={15} />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </motion.div>

          {/* MObile View */}
          <div className="block md:hidden space-y-4">
            <AnimatePresence>
              {users.map((account, ind) => (
                <motion.div
                  layout
                  key={account._id || ind}
                  variants={itemVariants}
                  className="border border-border bg-card/50 rounded-2xl p-4 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary text-xs">
                        <img
                          src={account.image}
                          alt="Profile Picture"
                          className="w-8 h-8 rounded-full"
                        />
                      </div>
                      <h4 className="font-bold text-sm font-poppins">
                        {account.name}
                      </h4>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-black uppercase border ${roleStyles[account.role] || roleStyles.user}`}
                    >
                      {account.role || "user"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5 break-all">
                    <Mail size={13} /> {account.email}
                  </p>
                  <div className="flex gap-2 pt-2 border-t border-border/40">
                    <Button
                      size="sm"
                      onClick={() => handleOpenDialog(account)}
                      className="flex-1 bg-primary/10 text-primary border border-primary/20 font-bold rounded-xl text-xs uppercase font-poppins h-10"
                      startContent={<Shield size={14} />}
                    >
                      Change Role
                    </Button>
                    <Button
                      size="sm"
                      className="bg-red-500/10 text-red-500 border border-red-500/20 font-bold rounded-xl text-xs h-10 px-4"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </>
      )}

      {/* Custom Dialog Box Modal role change*/}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop blur background*/}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-md"
            />

            {/* Dialog box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative w-full max-w-md bg-card border border-border rounded-[24px] shadow-2xl overflow-hidden p-6 z-10 text-foreground"
            >
              {/* Header Part */}
              <div className="flex items-center justify-between pb-3 border-b border-border/40">
                <h3 className="font-poppins font-bold text-lg">
                  Approve User Role
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-foreground p-1 rounded-full transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body Part */}
              <div className="py-4 space-y-4">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Assign a new permission level for{" "}
                  <span className="text-foreground font-bold font-poppins">
                    {targetUser?.name}
                  </span>
                  :
                </p>
                {/* user name set */}
                <div className="flex flex-col gap-2">
                  {[
                    {
                      key: "user",
                      label: "Reader / Regular User",
                      activeClass:
                        "border-emerald-500 bg-emerald-500/10 text-emerald-500",
                    },
                    {
                      key: "librarian",
                      label: "Platform Librarian",
                      activeClass:
                        "border-blue-500 bg-blue-500/10 text-blue-500",
                    },
                    {
                      key: "admin",
                      label: "System Administrator",
                      activeClass: "border-red-500 bg-red-500/10 text-red-500",
                    },
                  ].map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setSelectedRole(item.key)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-sm font-bold transition-all ${
                        selectedRole === item.key
                          ? item.activeClass
                          : "border-border/60 bg-muted/20 text-muted-foreground hover:bg-muted/40"
                      }`}
                    >
                      <span>{item.label}</span>
                      {selectedRole === item.key && <CheckCircle2 size={16} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer Part */}
              <div className="flex justify-end gap-2 pt-3 border-t border-border/40">
                <Button
                  size="sm"
                  variant="flat"
                  onClick={() => setIsOpen(false)}
                  className="font-bold rounded-xl text-xs uppercase h-10 px-4"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  color="primary"
                  isLoading={loading}
                  onClick={handleRoleConfirm}
                  className="font-bold rounded-xl text-xs uppercase h-10 px-6"
                >
                  Approve & Save
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ManageUser;
