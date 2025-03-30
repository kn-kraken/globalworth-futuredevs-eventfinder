import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function price(num: number, options?: { currency?: boolean }): string {
    const { currency } = { currency: true, ...options };
    return num.toFixed(2).replace(".", ",") + (currency ? " zł" : "");
}
