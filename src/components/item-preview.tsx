"use client";

import { Button } from "@/components/ui/button";
import { EventData, Item, ProductData } from "@/lib/types";
import { randomBytes } from "crypto";
import { motion } from "framer-motion";
import { Calendar, Heart, Share2, X } from "lucide-react";
import Image from "next/image";
import React from "react";
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
import { price } from "@/lib/utils";

export default function ItemPreview({
    item,
    close,
}: {
    item: Item;
    close: () => void;
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
                <button
                    onClick={close}
                    className="p-2 absolute top-4 right-16 z-1 bg-black/70 grid place-items-center rounded-3xl"
                >
                    <Share2 className="text-primary-foreground w-6 h-6" />
                </button>

                {item.type == "product" ? (
                    <Product product={item.data} />
                ) : (
                    <Event event={item.data} />
                )}
            </div>
        </motion.div>
    );
}

function Product({ product }: { product: ProductData }) {
    return (
        <>
            <button
                onClick={close}
                className="p-2 absolute top-4 right-4 z-1 bg-black/70 grid place-items-center rounded-3xl"
            >
                <Heart className="text-primary-foreground w-6 h-6" />
            </button>
            <div className="h-64 w-full relative border-b-2 border-foreground">
                <div className="absolute bottom-8 h-fit w-full mx-4 gap-4 z-2 flex items-center">
                    <div className="w-12 h-12 relative">
                        <Image
                            src={product.logo}
                            fill
                            alt="Logo"
                            className="overflow-hidden object-cover rounded-full"
                        />
                    </div>
                    <div className="text-sm font-semibold text-primary-foreground">
                        {product.company}
                    </div>
                </div>

                <Image
                    src={product.img}
                    fill
                    alt="Product Image"
                    className="overflow-hidden object-fill"
                />
            </div>
            <div className="flex h-fit w-full">
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
            <div className="grid place-items-center p-4 flex-1">
                <div className="text-xl font-bold">Odbierz promocję</div>
                <div
                    style={{
                        height: "auto",
                        margin: "0 auto",
                        maxWidth: 184,
                        width: "100%",
                    }}
                >
                    <QRCode
                        size={256}
                        style={{
                            height: "auto",
                            maxWidth: "100%",
                            width: "100%",
                        }}
                        value={randomBytes(16).toString("hex")}
                        viewBox={`0 0 256 256`}
                    />
                </div>
            </div>
        </>
    );
}

function Event({ event }: { event: EventData }) {
    return (
        <>
            <button
                onClick={close}
                className="p-2 absolute top-4 right-4 z-1 bg-black/70 grid place-items-center rounded-3xl"
            >
                <Heart className="text-primary-foreground w-6 h-6" />
            </button>
            <div className="h-64 w-full relative border-b-2 border-foreground">
                <Image
                    src={event.img}
                    fill
                    alt="event Image"
                    className="overflow-hidden object-fill"
                />
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
                </div>
            </div>
            <div
                className="flex flex-col gap-2 p-4 min-h-[24rem] max-h-[24rem] overflow-y-auto bg-primary text-primary-foreground"
                dangerouslySetInnerHTML={{
                    __html: event.description,
                }}
            />
            <div className="grid place-items-center px-4 flex-1">
                <div className="flex justify-between gap-8">
                    <DropDrop />
                    <Button className="text-md">Rezerwuj</Button>
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
