import { cn } from "@/lib/utils";
import { Calendar, Heart } from "lucide-react";
import Image from "next/image";

export interface EntryType {
    id: number;
    title: string;
    img: string;
    date: Date;
}

export interface Promotion extends EntryType {
    priceOld: number;
    priceNew: number;
}

export interface Event extends EntryType {
    brief: string;
}

export default function Entry({
    entry,
    isFavourite = false,
    onFavoutiteClicked,
}: {
    entry: EntryType;
    isFavourite?: boolean;
    onFavoutiteClicked?: () => void;
}) {
    return (
        <div className="w-72 bg-card rounded-2xl shadow-lg">
            <div className="p-1">
                <div className="relative w-full h-40 rounded-2xl overflow-hidden">
                    <Image src={entry.img} fill alt="a" />
                </div>
            </div>
            <div className="p-1 px-2">
                <div className="w-full flex">
                    <h1 className="text-lg font-bold grow">{entry.title}</h1>
                    <div className="relative cursor-pointer">
                        <Heart
                            className="top-0 left-0 text-accent-foreground"
                            onClick={onFavoutiteClicked}
                        />
                        <Heart
                            className={cn(
                                "absolute top-0 left-0",
                                "text-accent-foreground fill-accent-foreground",
                                "transition-opacity",
                                !isFavourite && "opacity-0"
                            )}
                            onClick={onFavoutiteClicked}
                        />
                    </div>
                </div>
                <div className="pl-1">
                    <div className="text-sm font-light flex items-center gap-2">
                        <Calendar size={16} strokeWidth={1.5} />{" "}
                        {entry.date.toLocaleDateString("pl-PL")}
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
                <div className="line-through text-foreground/50">
                    {price(entry.priceOld)}
                </div>
                <div className="font-bold text-lg">{price(entry.priceNew)}</div>
            </div>
        </div>
    );
}

function price(num: number): string {
    return num.toFixed(2).replace(".", ",") + " zł";
}
