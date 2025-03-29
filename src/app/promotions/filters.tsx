"use client";

import { Badge } from "@/components/ui/badge";

const allFilters = [
    { slug: "promotions", label: "Promocje" },
    { slug: "events", label: "Wydarzenia" },
] as const;

export const allFilterSlugs = allFilters.map((filter) => filter.slug);
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
        <div className="flex w-full gap-2 justify-stretch">
            <Filter
                onClick={() => {
                    if (onChanged === undefined) return;
                    onChanged(allFilterSlugs);
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
                                        ? allFilterSlugs
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
            className="text-sm cursor-pointer grow"
            variant={isActive ? "default" : "outline"}
            {...props}
        >
            {children}
        </Badge>
    );
}
