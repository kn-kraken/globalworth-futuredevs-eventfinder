"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";

export default function PushNotification({
    title,
    message,
    onClose,
    onClick,
}: {
    title: string;
    message: string;
    onClose: () => void;
    onClick: () => void;
}) {
    useEffect(() => {
        const timer = setTimeout(onClose, 4000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white/60 shadow-lg rounded-3xl px-4 py-3 flex items-center gap-3 w-[90%] border border-gray-200 backdrop-blur-md z-10 cursor-pointer"
        >
            <Bell className="w-6 h-6 text-blue-500" />
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    return onClick?.call(null);
                }}
            >
                <h3 className="text-sm font-semibold">{title}</h3>
                <p className="text-xs text-gray-600">{message}</p>
            </div>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    return onClose?.call(null);
                }}
                className="ml-auto text-gray-500 text-sm cursor-pointer"
            >
                ✕
            </button>
        </motion.div>
    );
}
