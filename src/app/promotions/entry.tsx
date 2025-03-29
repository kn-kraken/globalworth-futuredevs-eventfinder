import { cn } from "@/lib/utils";
import { Calendar, Heart } from "lucide-react";
import Image from "next/image";

export interface EntryType {
    isFavourite: boolean;
}

export default function Entry({
    entry: { isFavourite },
}: {
    entry: EntryType;
}) {
    return (
        <div className="w-72 bg-card rounded-2xl shadow-lg">
            <div className="p-1">
                <div className="relative w-full h-40 rounded-2xl overflow-hidden">
                    <Image src="/entry.png" fill alt="a" />
                </div>
            </div>
            <div className="p-1 px-2">
                <div className="w-full flex">
                    <h1 className="text-lg font-bold grow">
                        Wszystkie Sushi -10%
                    </h1>
                    <Heart
                        className={cn(
                            "text-accent-foreground",
                            isFavourite && "fill-accent-foreground",
                            "cursor-pointer"
                        )}
                    />
                </div>
                <div className="pl-1">
                    <div className="text-sm font-light flex items-center gap-2">
                        <Calendar size={16} strokeWidth={1.5} /> 30.03 - 03.04
                    </div>
                </div>
            </div>
            <div
                className={cn(
                    "w-full px-2 py-1",
                    "border-t-1 border-dashed border-foreground/40",
                    "flex gap-2 justify-end items-end"
                )}
            >
                <div className="line-through text-foreground/50">85,00 zł</div>
                <div className="font-bold text-lg">42,50 zł</div>
            </div>
        </div>
    );
}
