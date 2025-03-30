"use client";

import { Location } from "./location";
import Filters, { allFilterSlugs, FilterEnum } from "./filters";
import { useState } from "react";
import Entry from "./entry";
import { motion, AnimatePresence } from "framer-motion";
import ItemPreview from "@/components/item-preview";
import { CookingPot, ShoppingBasket } from "lucide-react";
import { Item } from "@/lib/types";

export default function Promotions() {
    const [chosenLocId, setChosenLocId] = useState(0);
    const [filters, setFilters] = useState<FilterEnum[]>(allFilterSlugs);
    const [favourites, setFavourites] = useState<number[]>([3, 5, 6]);

    const [chosenItem, setChosenItem] = useState<Item | undefined>(undefined);

    const filtered = entries
        .filter(({ data }) => {
            console.log(data);
            return data.locations.includes(chosenLocId);
        })
        .filter(({ type }) => filters.includes(type));
    const favEntries = favourites
        .map((favId) => filtered.find(({ id }) => id === favId))
        .filter((entry) => entry !== undefined);

    function onFavouriteClicked({ id }: Item) {
        if (favourites.includes(id))
            setFavourites(favourites.filter((j) => id != j));
        else setFavourites([id, ...favourites]);
    }

    return (
        <div className="w-screen h-screen relative p-6 overflow-y-auto">
            <AnimatePresence>
                {chosenItem !== undefined && (
                    <ItemPreview
                        item={chosenItem}
                        close={() => setChosenItem(undefined)}
                    />
                )}
            </AnimatePresence>
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
                                                        item={entry}
                                                        isFavourite={true}
                                                        onFavoutiteClicked={() =>
                                                            onFavouriteClicked(
                                                                entry
                                                            )
                                                        }
                                                        onClick={() =>
                                                            setChosenItem(entry)
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
                                    item={entry}
                                    isFavourite={isFavourite}
                                    onFavoutiteClicked={() =>
                                        onFavouriteClicked(entry)
                                    }
                                    onClick={() => setChosenItem(entry)}
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

const defaultInfo = {
    description:
        "<p>Co jest w ofercie?</p><p>👉 W Paczce większej możesz znaleźć produkty z regularnej oferty kawiarni Costa Coffee. Pamiętaj, że trudno przewidzieć, co pozostanie niesprzedane na koniec dnia, dlatego zawartość paczki to zawsze pyszna</p>",
    emoji: <ShoppingBasket />,
    date: new Date(),
    discount: "50%",
    logo: "/orlen.png",
    company: "Orlen",
};

const entries: Item[] = (
    [
        {
            type: "product",
            data: {
                title: "Wszystkie Sushi -15%",
                locations: locationIds,
                img: "/entries/sushi.jpg",
                date: new Date("2025-04-06"),
                priceOld: 52.0,
                priceNew: 44.2,
            },
        },
        {
            type: "product",
            data: {
                title: "Rogaliki -20%",
                locations: locationIds.filter((id) => id != 0),
                img: "/entries/rogaliki.jpg",
                date: new Date("2025-04-03"),
                priceOld: 7.0,
                priceNew: 5.6,
            },
        },
        {
            type: "product",
            data: {
                title: "Kanapka z łososiem -20%",
                locations: locationIds.filter((id) => id != 0),
                img: "/entries/losos.jpg",
                date: new Date("2025-04-01"),
                priceOld: 19.5,
                priceNew: 15.6,
            },
        },
        {
            type: "product",
            data: {
                title: "Lunch -15%",
                locations: locationIds,
                img: "/entries/Lunch.jpg",
                date: new Date("2025-04-07"),
                priceOld: 29.5,
                priceNew: 25.0,
                emoji: <CookingPot />,
                description: `<p>Dzisiejszy lunch zawiera:</p>
<p>🍜 Zupę krem z białych warzyw</p>
<p>🍗 Pierś z kurczaka z mozarellą i suszonymi pomidorami</p>
<p>🥔 Pieczone ziemniaki</p>
<p>🥗 Zestaw surówek</p>
<p>🥤 Kompot</p>`,
            },
        },
        {
            type: "product",
            data: {
                title: "Kawa -15%",
                locations: locationIds.filter((id) => id != 0),
                img: "/entries/Kawa.jpg",
                date: new Date("2025-04-03"),
                priceOld: 15.0,
                priceNew: 12.75,
            },
        },
        {
            type: "product",
            data: {
                title: "Wrap z Tofu -10%",
                locations: locationIds.filter((id) => id != 0),
                img: "/entries/wrap_tofu.jpg",
                date: new Date("2025-04-10"),
                priceOld: 18.5,
                priceNew: 16.65,
            },
        },
        {
            type: "product",
            data: {
                title: "Sałatka z kurczakiem -25%",
                locations: locationIds.filter((id) => id != 0),
                img: "/entries/kurczak.jpg",
                date: new Date("2025-04-02"),
                priceOld: 18.5,
                priceNew: 13.8,
            },
        },
        {
            type: "product",
            data: {
                title: "Smoothie Owocowe -15%",
                locations: locationIds.filter((id) => id != 0),
                img: "/entries/smoothie.jpg",
                date: new Date("2025-04-09"),
                priceOld: 16.0,
                priceNew: 13.6,
            },
        },
        {
            type: "product",
            data: {
                title: "Pizza Margherita -20%",
                locations: locationIds.filter((id) => id != 0),
                img: "/entries/pizza.jpg",
                date: new Date("2025-04-30"),
                priceOld: 28.0,
                priceNew: 22.4,
            },
        },
        {
            type: "product",
            data: {
                title: "Muffin Czekoladowy -10%",
                locations: locationIds.filter((id) => id != 0),
                img: "/entries/muffin.jpg",
                date: new Date("2025-04-30"),
                priceOld: 8.0,
                priceNew: 7.2,
            },
        },
        {
            type: "product",
            data: {
                title: "Zupa Pomidorowa -25%",
                locations: locationIds.filter((id) => id != 0),
                img: "/entries/zupa.jpg",
                date: new Date("2025-04-30"),
                priceOld: 14.0,
                priceNew: 10.5,
            },
        },
        {
            type: "event",
            data: {
                title: "Napraw swój rower",
                locations: locationIds.filter((id) => id != 0),
                img: "/entries/rower.jpeg",
                date: new Date("2025-04-11"),
                brief: "Przygotuj swój rower na wiosnę dzięki kompleksowemu przeglądowi",
            },
        },
        {
            type: "event",
            data: {
                title: "Yoga",
                locations: locationIds.filter((id) => id != 0),
                img: "/entries/yoga.jpg",
                date: new Date("2025-04-06"),
                brief: "Relaks dla twojego ciała i umysłu",
                description:
                    "Zapraszamy Was na yogę w Warsaw Trade Tower, gdzie z imponującym widokiem zadbamy o wytrzymałość fizyczną i redukcję stresu. W czasie zajęć wykonywane są ćwiczenia oddechowe, relaksacyjne oraz fizyczne o niskiej intensywności. Ćwiczenia wspomagają pracę nad sylwetką, prowadzą do usprawnienia całego ciała i znacząco poprawiają gibkość. Gwarantujemy świetne widoki i treningi na najwyższym poziomie!",
            },
        },
        {
            type: "event",
            data: {
                title: "Zbiórka elektrośmieci",
                locations: locationIds.filter((id) => id != 0),
                img: "/entries/elektro.png",
                date: new Date("2025-04-09"),
                brief: "Oddaj swój zużyty sprzęt elektroniczny",
            },
        },
        {
            type: "event",
            data: {
                title: "Warsztaty florystyczne",
                locations: locationIds.filter((id) => id != 0),
                img: "/entries/flora.jpg",
                date: new Date("2025-04-07"),
                brief: "Poznaj tajniki tworzenia kompozycji z twoich ulubionych kwiatów",
            },
        },
        {
            type: "event",
            data: {
                title: "Warsztaty artystyczne",
                locations: locationIds,
                img: "/entries/art.jpg",
                date: new Date("2025-04-05"),
                brief: "",
            },
        },
        {
            type: "event",
            data: {
                title: "Zajęcia fitness",
                locations: locationIds.filter((id) => id != 0),
                img: "/entries/fit.jpg",
                date: new Date("2025-04-06"),
                brief: "Rozruszaj swoje ciało po całym dniu za biurkiem",
            },
        },
        {
            type: "event",
            data: {
                title: "Warsztaty z wizażystką",
                locations: locationIds.filter((id) => id != 0),
                img: "/entries/wizaz.jpg",
                date: new Date("2025-04-08"),
                brief: "Poznaj tajniki makijażu",
            },
        },
        {
            type: "event",
            data: {
                title: "Warsztaty salsy",
                locations: locationIds.filter((id) => id != 0),
                img: "/entries/salsa.jpg",
                date: new Date("2025-04-03"),
                brief: "",
            },
        },
        {
            type: "event",
            data: {
                title: "Warsztaty customizacji odzieży",
                locations: locationIds.filter((id) => id != 0),
                img: "/entries/custom.jpg",
                date: new Date("2025-04-08"),
                brief: "Przenieś swój ulubiony motyw na ubrania",
            },
        },
        {
            type: "event",
            data: {
                title: "Zbiórka odzieży",
                locations: locationIds.filter((id) => id != 0),
                img: "/entries/odziez.jpg",
                date: new Date("2025-04-07"),
                brief: "Oddaj ubrania, których już dawno nie nosisz",
            },
        },
        {
            type: "event",
            data: {
                title: "Przerób swoją garderobę",
                locations: locationIds.filter((id) => id != 0),
                img: "/entries/garderoba.jpg",
                date: new Date("2025-04-05"),
                brief: "Stwórz coś nowego ze swoich  zużytych ubrań",
            },
        },
        {
            type: "event",
            data: {
                title: "Wirtualny wyścig",
                locations: locationIds.filter((id) => id != 0),
                img: "/entries/wyscig.jpg",
                date: new Date("2025-04-11"),
                brief: "Poczuj się jak w „Szybkich i wściekłych”",
            },
        },
    ] as const
)
    .toSorted((a, b) => a.data.date.valueOf() - b.data.date.valueOf())
    .map(({ data, ...rest }, i) => ({
        ...rest,
        data: { ...defaultInfo, ...data },
        id: i,
    }));
