"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }) {
    const pathname = usePathname();

    return (
        <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            {children}
        </motion.main>
    );
}