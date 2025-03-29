"use client";

import { Location } from "./location";
import Filters, { allFilterSlugs, FilterEnum } from "./filters";
import { useState } from "react";
import Entry, { EntryType } from "./entry";

export default function Promotions() {
    const [filters, setFilters] = useState<FilterEnum[]>(allFilterSlugs);
    const [favourites, setFavourites] = useState<number[]>([3, 5, 6]);

    return (
        <div className="w-screen h-screen relative p-6 overflow-y-auto">
            <div className="w-full flex flex-col gap-3 items-center">
                <Location />
                <Filters active={filters} onChanged={setFilters} />
                <div className="w-full flex flex-col gap-3">
                    <Section>Ulubione</Section>
                    <div className="w-full overflow-auto">
                        <div className="flex w-fit gap-2 mx-1 mt-1 mb-4">
                            {entries
                                .filter((_, i) => favourites.includes(i))
                                .map((entry, i) => {
                                    return (
                                        <Entry
                                            key={i}
                                            entry={entry}
                                            isFavourite={true}
                                        />
                                    );
                                })}
                        </div>
                    </div>
                    <Section>Oferty</Section>
                    <div className="w-full flex flex-col gap-2 pl-1">
                        {entries.map((entry, i) => {
                            const isFavourite = favourites.includes(i);
                            return (
                                <Entry
                                    key={i}
                                    entry={entry}
                                    isFavourite={isFavourite}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
function Section({ children }: Readonly<{ children?: React.ReactNode }>) {
    return <h1 className="self-start text-2xl font-bold pl-1">{children}</h1>;
}

const entries: EntryType[] = [
    {
        title: "Flat White",
        img: "/entries/costa.png",
        date: new Date("2024-04-07"),
        priceOld: 12,
        priceNew: 7.5,
    },
    {
        title: "Wszystkie Sushi -50%",
        img: "/entries/sushi.png",
        date: new Date("2024-04-03"),
        priceOld: 85.0,
        priceNew: 42.5,
    },
    {
        title: "Wszystkie Sushi -10%",
        img: "/entries/sushi.png",
        date: new Date("2024-04-03"),
        priceOld: 85.0,
        priceNew: 42.5,
    },
    {
        title: "Wszystkie Sushi -10%",
        img: "/entries/sushi.png",
        date: new Date("2024-04-03"),
        priceOld: 85.0,
        priceNew: 42.5,
    },
    {
        title: "Wszystkie Sushi -10%",
        img: "/entries/sushi.png",
        date: new Date("2024-04-03"),
        priceOld: 85.0,
        priceNew: 42.5,
    },
    {
        title: "Wszystkie Sushi -10%",
        img: "/entries/sushi.png",
        date: new Date("2024-04-03"),
        priceOld: 85.0,
        priceNew: 42.5,
    },
    {
        title: "Wszystkie Sushi -10%",
        img: "/entries/sushi.png",
        date: new Date("2024-04-03"),
        priceOld: 85.0,
        priceNew: 42.5,
    },
    {
        title: "Wszystkie Sushi -10%",
        img: "/entries/sushi.png",
        date: new Date("2024-04-03"),
        priceOld: 85.0,
        priceNew: 42.5,
    },
    {
        title: "Wszystkie Sushi -10%",
        img: "/entries/sushi.png",
        date: new Date("2024-04-03"),
        priceOld: 85.0,
        priceNew: 42.5,
    },
    {
        title: "Wszystkie Sushi -10%",
        img: "/entries/sushi.png",
        date: new Date("2024-04-03"),
        priceOld: 85.0,
        priceNew: 42.5,
    },
    {
        title: "Wszystkie Sushi -10%",
        img: "/entries/sushi.png",
        date: new Date("2024-04-03"),
        priceOld: 85.0,
        priceNew: 42.5,
    },
    {
        title: "Wszystkie Sushi -10%",
        img: "/entries/sushi.png",
        date: new Date("2024-04-03"),
        priceOld: 85.0,
        priceNew: 42.5,
    },
];
