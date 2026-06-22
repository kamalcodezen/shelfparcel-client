import { Button } from "@heroui/react";
import { ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";


const DeletedAssetScreen = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto min-h-[60vh] flex flex-col items-center justify-center text-center p-6 font-urbanist space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-20 h-20 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shadow-sm"
        >
          <Trash2 size={36} />
        </motion.div>

        <div className="space-y-2">
          <h3 className="text-2xl font-black font-poppins text-foreground">
            Asset Deregistered Successfully
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            This book record has been completely purged from the library ledger
            database and is no longer available.
          </p>
        </div>

        {/*  গ্যালারিতে ফিরে যাওয়ার ডেডিকেটেড বাটন */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link href="/books">
            <Button 
              className="btn-primary h-12 px-6 text-xs font-bold font-poppins uppercase tracking-widest rounded-xl shadow-lg flex items-center gap-2"
              startContent={<ArrowLeft size={16} />}
            >
              Return to Books Gallery
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default DeletedAssetScreen;
