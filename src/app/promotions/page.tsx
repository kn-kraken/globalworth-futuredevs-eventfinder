"use client";

import { Location } from "./location";
import Filters, { allFilterSlugs, FilterEnum } from "./filters";
import { useState } from "react";
import Entry, { EntryType } from "./entry";

export default function Promotions() {
    const [filters, setFilters] = useState<FilterEnum[]>(allFilterSlugs);
    const [favourites, setFavourites] = useState<number[]>([3, 5, 6]);

    const favEntries = favourites.map((i) => entries[i]);

    function onFavouriteClicked(entry: EntryType) {
        if (favourites.includes(entry.id))
            setFavourites(favourites.filter((j) => entry.id != j));
        else setFavourites([...favourites, entry.id]);
    }

    return (
        <div className="w-screen h-screen relative p-6 overflow-y-auto">
            <div className="w-full flex flex-col gap-3 items-center">
                <Location />
                <Filters active={filters} onChanged={setFilters} />
                <div className="w-full flex flex-col gap-3">
                    {favEntries.length > 0 && (
                        <>
                            <Section>Ulubione</Section>
                            <div className="w-full overflow-auto">
                                <div className="flex w-fit gap-2 mx-1 mt-1 mb-4">
                                    {favEntries.map((entry) => {
                                        return (
                                            <Entry
                                                key={entry.id}
                                                entry={entry}
                                                isFavourite={true}
                                                onFavoutiteClicked={() =>
                                                    onFavouriteClicked(entry)
                                                }
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </>
                    )}
                    <Section>Oferty</Section>
                    <div className="w-full flex flex-col gap-2 pl-1">
                        {entries.map((entry) => {
                            const isFavourite = favourites.includes(entry.id);
                            return (
                                <Entry
                                    key={entry.id}
                                    entry={entry}
                                    isFavourite={isFavourite}
                                    onFavoutiteClicked={() =>
                                        onFavouriteClicked(entry)
                                    }
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
].map((entry, i) => ({ ...entry, id: i }));
