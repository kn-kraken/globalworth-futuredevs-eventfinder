"use client";

import { Badge } from "@/components/ui/badge";

const allFilters = [
    { slug: "promotions", label: "Promocje" },
    { slug: "events", label: "Wydarzenia" },
] as const;

export type FilterEnum = (typeof allFilters)[number]["slug"];

export default function Filters({
    active = [],
    onChanged,
}: {
    active?: FilterEnum[];
    onChanged?: (newFilters: FilterEnum[]) => void;
}) {
    const isAllActive = allFilters.every((filter) =>
        active.includes(filter.slug)
    );
    return (
        <div className="flex gap-2">
            <Filter
                onClick={() => {
                    if (onChanged === undefined) return;
                    onChanged(allFilters.map((filter) => filter.slug));
                }}
                isActive={isAllActive}
            >
                Wszystko
            </Filter>
            {allFilters.map((filter) => {
                const isActive = active.includes(filter.slug);
                return (
                    <Filter
                        key={filter.slug}
                        isActive={isActive}
                        onClick={() => {
                            if (onChanged === undefined) return;
                            if (isAllActive) onChanged([filter.slug]);
                            else if (isActive) {
                                const filtered = active.filter(
                                    (slug) => slug != filter.slug
                                );
                                onChanged(
                                    filtered.length === 0
                                        ? allFilters.map(
                                              (filter) => filter.slug
                                          )
                                        : filtered
                                );
                            } else onChanged([filter.slug]);
                        }}
                    >
                        {filter.label}
                    </Filter>
                );
            })}
        </div>
    );
}

function Filter({
    isActive = false,
    children,
    ...props
}: Readonly<{
    isActive?: boolean;
    children?: React.ReactNode;
}> &
    React.ComponentProps<"span">) {
    return (
        <Badge
            className="text-sm cursor-pointer"
            variant={isActive ? "default" : "outline"}
            {...props}
        >
            {children}
        </Badge>
    );
}
