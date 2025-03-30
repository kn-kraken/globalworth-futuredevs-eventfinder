"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

type Page = "home" | "manage" | "promotions" | "history";

export default function Navbar() {
    const path = usePathname();
    const isPromotions = path.startsWith("/promotions");
    const initialPage = isPromotions ? "promotions" : "home";

    const [page, setPage] = useState<Page>(initialPage);
    const router = useRouter();

    function navigate(page: Page) {
        setPage(page);
        router.push(page == "home" ? "/" : "/promotions");
    }
    return (
        <div
            className="absolute bottom-0 w-full bg-secondary rounded-t-4xl flex p-5 gap-5 justify-evenly text-secondary-foreground
        -foreground"
        >
            <Button isActive={page == "home"} onClick={() => navigate("home")}>
                <Lock />
                Pulpit
            </Button>
            <Button
                isActive={page == "manage"}
                onClick={() => navigate("manage")}
            >
                <User />
                Zarządzaj
            </Button>
            <Button
                isActive={page == "promotions"}
                onClick={() => navigate("promotions")}
            >
                <QrCode />
                Oferty
            </Button>
            <Button
                isActive={page == "history"}
                onClick={() => navigate("history")}
            >
                <Clock />
                Historia
            </Button>
        </div>
    );
}

function Button({
    children,
    isActive = false,
    onClick,
}: Readonly<{
    children: React.ReactNode;
    isActive?: boolean;
    onClick?: () => void;
}>) {
    return (
        <button
            className={cn(
                "flex flex-col gap-1 items-center transition-colors duration-300 cursor-pointer",
                isActive && "text-accent-foreground"
            )}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

function Lock() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
            />
        </svg>
    );
}

function User() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
        </svg>
    );
}

function QrCode() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z"
            />
        </svg>
    );
}

function Clock() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
        </svg>
    );
}
