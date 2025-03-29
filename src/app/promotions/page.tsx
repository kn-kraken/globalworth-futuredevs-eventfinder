"use client";

import { Location } from "./location";
import Filters, { FilterEnum } from "./filters";
import { useState } from "react";

export default function Promotions() {
    const [filters, setFilters] = useState<FilterEnum[]>([]);
    return (
        <div className="w-screen h-screen relative p-6 flex flex-col gap-3">
            <Location />
            <Filters active={filters} onChanged={setFilters} />
        </div>
    );
}
