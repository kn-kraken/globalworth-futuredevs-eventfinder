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
        <div className="w-64 p-1 bg-card rounded-2xl shadow">
            <div className="relative w-full h-40 rounded-2xl overflow-hidden">
                <Image src="/entry.png" fill alt="a" />
            </div>
            <div className="p-1 pt-2">
                <div className="w-full flex">
                    <h1 className="font-bold grow">Wszystkie Sushi -10%</h1>
                    <Heart
                        className={cn(
                            "text-accent-foreground",
                            isFavourite && "fill-accent-foreground"
                        )}
                    />
                </div>
                <div className="pl-1">
                    <div className="text-sm flex items-center gap-2">
                        <Calendar size={18} /> 30.03 - 03.04
                    </div>
                </div>
            </div>
        </div>
    );
}
