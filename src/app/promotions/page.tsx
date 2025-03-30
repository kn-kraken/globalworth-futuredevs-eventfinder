"use client";

import { Location } from "./location";
import Filters, { allFilterSlugs, FilterEnum } from "./filters";
import { useState } from "react";
import Entry, { EntryType } from "./entry";
import { motion, AnimatePresence } from "framer-motion";

export default function Promotions() {
    const [chosenLocId, setChosenLocId] = useState(0);
    const [filters, setFilters] = useState<FilterEnum[]>(allFilterSlugs);
    const [favourites, setFavourites] = useState<number[]>([3, 5, 6]);

    const filtered = entries
        .filter((entry) => entry.locations.includes(chosenLocId))
        .filter((entry) => filters.includes(entry.type));
    const favEntries = favourites
        .map((id) => filtered.find((entry) => entry.id === id))
        .filter((entry) => entry !== undefined);

    function onFavouriteClicked(entry: EntryType) {
        if (favourites.includes(entry.id))
            setFavourites(favourites.filter((j) => entry.id != j));
        else setFavourites([...favourites, entry.id]);
    }

    return (
        <div className="w-screen h-screen relative p-6 overflow-y-auto">
            <div className="w-full pb-22 flex flex-col gap-3 items-center">
                <Location
                    locations={locations}
                    chosenLocationId={chosenLocId}
                    onChooseLocation={setChosenLocId}
                />
                <Filters active={filters} onChanged={setFilters} />
                <div className="w-full flex flex-col gap-3">
                    <AnimatePresence mode="wait">
                        {favEntries.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Section>Ulubione</Section>
                                <div className="w-full overflow-auto">
                                    <div className="flex w-fit gap-2 mx-1 mt-1 mb-4">
                                        <AnimatePresence>
                                            {favEntries.map((entry) => (
                                                <motion.div
                                                    key={entry.id}
                                                    initial={{
                                                        opacity: 0,
                                                        scale: 0.9,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        scale: 1,
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        scale: 0.9,
                                                    }}
                                                    transition={{
                                                        duration: 0.3,
                                                    }}
                                                >
                                                    <Entry
                                                        entry={entry}
                                                        isFavourite={true}
                                                        onFavoutiteClicked={() =>
                                                            onFavouriteClicked(
                                                                entry
                                                            )
                                                        }
                                                    />
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <Section>Oferty</Section>
                    <div className="w-full flex flex-col gap-2 pl-1">
                        {filtered.map((entry) => {
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

const locations = [
    "A4 Business Park",
    "BOB",
    "BOC",
    "Batory Office Building I",
    "City Offices",
    "Company House I",
    "Gara Herastrau",
    "Globalworth Campus",
    "Globalworth Plaza",
    "Globalworth Square",
    "Globalworth Tower",
    "Green Court",
    "Green Horizon",
    "Lubicz Park",
    "Lumen & Skylight",
    "Nordic Park",
    "Podium Park",
    "Quattro Business Park",
    "Renault Bucharest Connected",
    "Retro Office House",
    "Rondo Business Park",
    "Silesia Star",
    "Spektrum Tower",
    "Tower Center International",
    "Tryton Business House",
    "UniCredit HQ",
    "Warsaw Trade Tower",
    "West Gate",
    "West Link",
    "Upground Tower",
    "Hala Koszyki",
    "Renoma",
    "Supersam",
].map((loc, i) => ({ name: loc, id: i }));

const locationIds = locations.map((loc) => loc.id);

const entries: EntryType[] = (
    [
        {
            title: "Wszystkie Sushi -15%",
            locations: locationIds,
            type: "promotion",
            img: "/entries/sushi.jpg",
            date: new Date("2025-04-06"),
            priceOld: 52.0,
            priceNew: 44.2,
        },
        {
            title: "Rogaliki -20%",
            locations: locationIds.filter((id) => id != 0),
            type: "promotion",
            img: "/entries/rogaliki.jpg",
            date: new Date("2025-04-03"),
            priceOld: 7.0,
            priceNew: 5.6,
        },
        {
            title: "Kanapka z łososiem -20%",
            locations: locationIds.filter((id) => id != 0),
            type: "promotion",
            img: "/entries/losos.jpg",
            date: new Date("2025-04-01"),
            priceOld: 19.5,
            priceNew: 15.6,
        },
        {
            title: "Lunch -15%",
            locations: locationIds,
            type: "promotion",
            img: "/entries/Lunch.jpg",
            date: new Date("2025-04-07"),
            priceOld: 29.5,
            priceNew: 25.0,
        },
        {
            title: "Kawa -15%",
            locations: locationIds.filter((id) => id != 0),
            type: "promotion",
            img: "/entries/Kawa.jpg",
            date: new Date("2025-04-03"),
            priceOld: 15.0,
            priceNew: 12.75,
        },
        {
            title: "Wrap z Tofu -10%",
            locations: locationIds.filter((id) => id != 0),
            type: "promotion",
            img: "/entries/wrap_tofu.jpg",
            date: new Date("2025-04-10"),
            priceOld: 18.5,
            priceNew: 16.65,
        },
        {
            title: "Sałatka z kurczakiem -25%",
            locations: locationIds.filter((id) => id != 0),
            type: "promotion",
            img: "/entries/kurczak.jpg",
            date: new Date("2025-04-02"),
            priceOld: 18.5,
            priceNew: 13.8,
        },
        {
            title: "Smoothie Owocowe -15%",
            locations: locationIds.filter((id) => id != 0),
            type: "promotion",
            img: "/entries/smoothie.jpg",
            date: new Date("2025-04-09"),
            priceOld: 16.0,
            priceNew: 13.6,
        },
        {
            title: "Pizza Margherita -20%",
            locations: locationIds.filter((id) => id != 0),
            type: "promotion",
            img: "/entries/pizza.jpg",
            date: new Date("2025-04-30"),
            priceOld: 28.0,
            priceNew: 22.4,
        },
        {
            title: "Muffin Czekoladowy -10%",
            locations: locationIds.filter((id) => id != 0),
            type: "promotion",
            img: "/entries/muffin.jpg",
            date: new Date("2025-04-30"),
            priceOld: 8.0,
            priceNew: 7.2,
        },
        {
            title: "Zupa Pomidorowa -25%",
            locations: locationIds.filter((id) => id != 0),
            type: "promotion",
            img: "/entries/zupa.jpg",
            date: new Date("2025-04-30"),
            priceOld: 14.0,
            priceNew: 10.5,
        },
        {
            title: "Napraw swój rower",
            locations: locationIds.filter((id) => id != 0),
            type: "event",
            img: "/entries/rower.jpeg",
            date: new Date("2025-04-11"),
            brief: "Przygotuj swój rower na wiosnę dzięki kompleksowemu przeglądowi",
        },
        {
            title: "Yoga",
            locations: locationIds.filter((id) => id != 0),
            type: "event",
            img: "/entries/yoga.jpg",
            date: new Date("2025-04-06"),
            brief: "Relaks dla twojego ciała i umysłu",
        },
        {
            title: "Zbiórka elektrośmieci",
            locations: locationIds.filter((id) => id != 0),
            type: "event",
            img: "/entries/elektro.png",
            date: new Date("2025-04-09"),
            brief: "Oddaj swój zużyty sprzęt elektroniczny",
        },
        {
            title: "Warsztaty florystyczne",
            locations: locationIds.filter((id) => id != 0),
            type: "event",
            img: "/entries/flora.jpg",
            date: new Date("2025-04-07"),
            brief: "Poznaj tajniki tworzenia kompozycji z twoich ulubionych kwiatów",
        },
        {
            title: "Warsztaty artystyczne",
            locations: locationIds,
            type: "event",
            img: "/entries/art.jpg",
            date: new Date("2025-04-05"),
            brief: "",
        },
        {
            title: "Zajęcia fitness",
            locations: locationIds.filter((id) => id != 0),
            type: "event",
            img: "/entries/fit.jpg",
            date: new Date("2025-04-06"),
            brief: "Rozruszaj swoje ciało po całym dniu za biurkiem",
        },
        {
            title: "Warsztaty z wizażystką",
            locations: locationIds.filter((id) => id != 0),
            type: "event",
            img: "/entries/wizaz.jpg",
            date: new Date("2025-04-08"),
            brief: "Poznaj tajniki makijażu",
        },
        {
            title: "Warsztaty salsy",
            locations: locationIds.filter((id) => id != 0),
            type: "event",
            img: "/entries/salsa.jpg",
            date: new Date("2025-04-03"),
            brief: "",
        },
        {
            title: "Warsztaty customizacji odzieży",
            locations: locationIds.filter((id) => id != 0),
            type: "event",
            img: "/entries/custom.jpg",
            date: new Date("2025-04-08"),
            brief: "Przenieś swój ulubiony motyw na ubrania",
        },
        {
            title: "Zbiórka odzieży",
            locations: locationIds.filter((id) => id != 0),
            type: "event",
            img: "/entries/odziez.jpg",
            date: new Date("2025-04-07"),
            brief: "Oddaj ubrania, których już dawno nie nosisz",
        },
        {
            title: "Przerób swoją garderobę",
            locations: locationIds.filter((id) => id != 0),
            type: "event",
            img: "/entries/garderoba.jpg",
            date: new Date("2025-04-05"),
            brief: "Stwórz coś nowego ze swoich  zużytych ubrań",
        },
        {
            title: "Wirtualny wyścig",
            locations: locationIds.filter((id) => id != 0),
            type: "event",
            img: "/entries/wyscig.jpg",
            date: new Date("2025-04-11"),
            brief: "Poczuj się jak w „Szybkich i wściekłych”",
        },
    ] as const
)
    .toSorted((a, b) => a.date.valueOf() - b.date.valueOf())
    .map((entry, i) => ({ ...entry, id: i }));
