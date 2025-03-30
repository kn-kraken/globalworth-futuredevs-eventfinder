import { Item } from "@/lib/types";
import { cn, price } from "@/lib/utils";
import { Calendar, Check, Heart } from "lucide-react";
import Image from "next/image";

export default function Entry({
    item: { type, data },
    isFavourite = false,
    onFavoutiteClicked,
    onClick,
    isRegistered,
}: {
    item: Item;
    isFavourite?: boolean;
    onFavoutiteClicked?: () => void;
    onClick?: () => void;
    isRegistered: boolean;
}) {
    return (
        <div className="w-72 bg-card rounded-2xl shadow-lg">
            <div className="p-1 cursor-pointer" onClick={onClick}>
                <div className="relative w-full h-40 rounded-2xl overflow-hidden">
                    <Image
                        src={data.img}
                        fill
                        alt="a"
                        className="object-cover"
                    />
                </div>
            </div>
            <div className="p-2">
                <div className="w-full flex">
                    <h1 className="text-lg font-bold grow">
                        {data.title +
                            (type === "product" ? " -" + data.discount : "")}
                    </h1>
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
                <div className="pl-1 text-sm font-light flex flex-col">
                    <div className="flex items-center gap-2">
                        <Calendar size={16} strokeWidth={1.8} />{" "}
                        {data.date.toLocaleDateString("pl-PL")}
                    </div>
                    {isRegistered && (
                        <div className="flex items-center gap-2">
                            <Check size={16} strokeWidth={1.8} /> Zapisany 10:00
                        </div>
                    )}
                    {"brief" in data && <div> {data.brief}</div>}
                </div>
            </div>

            {type === "product" && (
                <div
                    className={cn(
                        "w-full px-2 py-1",
                        "border-t-1 border-dashed border-foreground/40",
                        "flex gap-2 justify-end items-end"
                    )}
                >
                    <div className="line-through text-foreground/50">
                        {price(data.priceOld)}
                    </div>
                    <div className="font-bold text-lg">
                        {price(data.priceNew)}
                    </div>
                </div>
            )}
        </div>
    );
}
