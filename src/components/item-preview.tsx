"use client";

import { Button } from "@/components/ui/button";
import { EventData, Item, ProductData } from "@/lib/types";
import { motion } from "framer-motion";
import { Calendar, Check, Heart, MapPin, Share2, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import QRCode from "react-qr-code";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@radix-ui/react-dropdown-menu";
import { cn, price } from "@/lib/utils";

export default function ItemPreview({
    item,
    close,
    isFavourite = false,
    onFavouriteClicked,
    isAccepted = false,
    onAcceptedChanged,
}: {
    item: Item;
    close: () => void;
    isFavourite?: boolean;
    onFavouriteClicked?: () => void;
    isAccepted?: boolean;
    onAcceptedChanged?: (isAccepted: boolean) => void;
}) {
    return (
        <motion.div
            initial={{ x: "100vh" }}
            animate={{ x: 0 }}
            className="bg-background fixed h-screen w-screen z-10 top-0 bottom-0 left-0 right-0"
            exit={{ x: "100vh" }}
            transition={{ ease: "easeInOut", duration: 0.4 }}
        >
            <div className="w-full h-full relative flex flex-col text-md">
                <button
                    onClick={close}
                    className="cursor-pointer p-2 absolute top-4 left-4 z-1 bg-black/70 grid place-items-center rounded-3xl"
                >
                    <X className="text-primary-foreground w-6 h-6" />
                </button>
                <button className="p-2 absolute top-4 right-16 z-1 bg-black/70 grid place-items-center rounded-3xl">
                    <Share2 className="text-primary-foreground w-6 h-6" />
                </button>
                <button
                    onClick={onFavouriteClicked}
                    className="p-2 absolute top-4 right-4 z-1 bg-black/70 grid place-items-center rounded-3xl"
                >
                    <div className="relative cursor-pointer">
                        <Heart
                            className={cn(
                                "top-0 left-0 text-primary-foreground",
                                "transition-opacity",
                                isFavourite && "opacity-0"
                            )}
                        />
                        <Heart
                            className={cn(
                                "absolute top-0 left-0",
                                "text-primary-foreground",
                                "fill-primary-foreground",
                                "transition-opacity",
                                !isFavourite && "opacity-0"
                            )}
                        />
                    </div>
                </button>

                {item.type == "product" ? (
                    <Product product={item.data} />
                ) : (
                    <Event
                        event={item.data}
                        isAccepted={isAccepted}
                        onAcceptedChanged={onAcceptedChanged}
                    />
                )}
            </div>
        </motion.div>
    );
}

function Product({ product }: { product: ProductData }) {
    const [isQrCodeLoading, setIsQrCodeLoading] = React.useState(true);
    useEffect(() => {
        const timeout = setTimeout(
            () => {
                setIsQrCodeLoading(false);
            },
            Math.random() * 1000 + 1000
        );

        return () => {
            clearTimeout(timeout);
        };
    }, []);
    return (
        <>
            <div className="h-64 w-full relative border-b border-foreground">
                <div className="absolute bottom-8 h-fit w-full mx-4 gap-4 z-2 flex items-center">
                    <div className="w-12 h-12 relative">
                        <Image
                            src={product.logo}
                            fill
                            alt="Logo"
                            className="overflow-hidden object-cover rounded-full"
                        />
                    </div>
                    <div className="text-2xl font-semibold text-primary-foreground">
                        {product.company}
                    </div>
                </div>

                <div className="h-full bg-black">
                    <Image
                        src={product.img}
                        fill
                        alt="Product Image"
                        className="overflow-hidden object-fill opacity-80"
                    />
                </div>
            </div>
            <div className="flex h-fit w-full border-b">
                <div className="flex flex-col gap-2 p-4">
                    <h1 className="text-xl font-semibold text-foreground flex gap-2">
                        <span>{product.emoji}</span>
                        {product.title}
                    </h1>
                    <p className="flex gap-2 text-xs items-center">
                        <Calendar /> Odbędzie się:{" "}
                        {product.date.toLocaleDateString("pl-PL", {
                            month: "2-digit",
                            day: "2-digit",
                            year: "numeric",
                        })}
                    </p>
                </div>
                <div className="flex flex-col gap-2 p-4">
                    <div className="text-xl font-semibold text-foreground flex gap-2 items-baseline">
                        <span className="text-sm text-secondary-foreground line-through h-fit">
                            {price(product.priceOld)}
                        </span>
                        {price(product.priceNew)}
                    </div>
                    <span
                        className="text-xl text-accent-foreground ml-auto w-fit font-bold
"
                    >
                        {`- ${product.discount}`}
                    </span>
                </div>
            </div>
            <div
                className="flex flex-col gap-2 p-4 min-h-[12rem] max-h-[12rem] overflow-y-auto bg-primary text-primary-foreground"
                dangerouslySetInnerHTML={{ __html: product.description }}
            />
            <div className="grid place-items-center p-4 flex-1 border-b bg-primary">
                <div
                    className={cn(
                        "h-auto mx-auto max-w-[184px] w-full relative"
                    )}
                >
                    {isQrCodeLoading && (
                        <svg
                            aria-hidden="true"
                            className="w-16 h-16 absolute top-0 left-0 bottom-0 right-0 m-auto text-gray-200 animate-spin dark:text-gray-600 fill-accent-foreground"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                    )}
                    <QRCode
                        size={256}
                        fgColor="var(--primary)"
                        className={cn(
                            "h-auto max-w-full w-full bg-primary text-primary",
                            isQrCodeLoading && "opacity-25"
                        )}
                        value={Buffer.from(
                            isQrCodeLoading
                                ? "29vfl4onibflkri"
                                : "29p10a,8gv5 oan"
                        ).toString("hex")}
                        viewBox={`0 0 256 256`}
                    />
                </div>
            </div>
        </>
    );
}

function Event({
    event,
    isAccepted = false,
    onAcceptedChanged,
}: {
    event: EventData;
    isAccepted?: boolean;
    onAcceptedChanged?: (isAccepted: boolean) => void;
}) {
    return (
        <>
            <div className="h-64 w-full relative border-b border-foreground">
                <div className="h-full bg-black">
                    <Image
                        src={event.img}
                        fill
                        alt="Event Image"
                        className="overflow-hidden object-fill opacity-80"
                    />
                </div>
            </div>
            <div className="flex h-fit w-full">
                <div className="flex flex-col gap-2 p-4">
                    <h1 className="text-xl font-semibold text-foreground flex gap-2">
                        <span>{event.emoji}</span>
                        {event.title}
                    </h1>
                    <p className="flex gap-2 text-xs items-center">
                        <Calendar /> Odbędzie się:{" "}
                        {event.date.toLocaleDateString("pl-PL", {
                            month: "2-digit",
                            day: "2-digit",
                            year: "numeric",
                        })}
                    </p>
                    {event.address && (
                        <p className="flex gap-2 text-xs items-center">
                            <MapPin /> {event.address}
                        </p>
                    )}
                </div>
            </div>
            <div
                className="flex flex-col gap-2 p-4 min-h-[23rem] max-h-[23rem] overflow-y-auto bg-primary text-primary-foreground"
                dangerouslySetInnerHTML={{
                    __html: event.description,
                }}
            />
            <div className="grid place-items-center px-4 flex-1">
                <div>
                    {!isAccepted ? (
                        <div className="flex justify-between gap-8">
                            <DropDrop />
                            <Button
                                key="1"
                                onClick={() => {
                                    onAcceptedChanged?.call(null, true);
                                }}
                                className="text-md"
                            >
                                Zapisz się
                            </Button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                Zostałeś zapisany{" "}
                                <motion.span
                                    initial={{ rotate: -60 }}
                                    animate={{ rotate: 0 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 200,
                                        damping: 10,
                                        duration: 2,
                                    }}
                                >
                                    <Check />
                                </motion.span>
                            </div>
                            <Button
                                key="2"
                                onClick={() => {
                                    onAcceptedChanged?.call(null, false);
                                }}
                                className="text-md"
                                variant="outline"
                            >
                                Wypisz się
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

const time = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];

export function DropDrop() {
    const [index, setIndex] = React.useState(0);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="w-[128px]" variant="outline">
                    {time[index]}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[128px] text-center">
                <DropdownMenuRadioGroup
                    value={index.toString()}
                    onValueChange={(i) => setIndex(parseInt(i))}
                >
                    {time.map((value, i) => (
                        <DropdownMenuRadioItem key={i} value={i.toString()}>
                            {value}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
