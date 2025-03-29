"use client";

import { Location } from "./location";
import Filters, { allFilterSlugs, FilterEnum } from "./filters";
import { useState } from "react";
import Entry, { EntryType } from "./entry";

export default function Promotions() {
    const [filters, setFilters] = useState<FilterEnum[]>(allFilterSlugs);

    const fav: EntryType = { isFavourite: true };
    const unFav: EntryType = { isFavourite: false };

    return (
        <div className="w-screen h-screen relative p-6 overflow-y-auto">
            <div className="w-full flex flex-col gap-3 items-center">
                <Location />
                <Filters active={filters} onChanged={setFilters} />
                <div className="w-full flex flex-col gap-2">
                    <Section>Ulubione</Section>
                    <div className="w-full overflow-auto">
                        <div className="flex w-fit gap-2 mx-1 mt-1 mb-4">
                            <Entry entry={fav} />
                            <Entry entry={fav} />
                            <Entry entry={fav} />
                            <Entry entry={fav} />
                        </div>
                    </div>
                    <Section>Oferty</Section>
                    <div className="w-full flex flex-col gap-2 pl-1">
                        <Entry entry={unFav} />
                        <Entry entry={unFav} />
                        <Entry entry={unFav} />
                        <Entry entry={unFav} />
                    </div>
                </div>
            </div>
        </div>
    );
}
function Section({ children }: Readonly<{ children?: React.ReactNode }>) {
    return <h1 className="self-start text-2xl font-bold pl-1">{children}</h1>;
}
