"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

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
];

export function Location() {
    const [index, setIndex] = React.useState(26);
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <DropdownMenu onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button className="w-full cursor-pointer" variant="outline">
                    <MapPin />
                    {locations[index]}
                    <ChevronDown
                        className={cn(
                            "duration-300 ease-in-out",
                            isOpen && "-rotate-180"
                        )}
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full h-[35vh]">
                <DropdownMenuRadioGroup
                    value={index.toString()}
                    onValueChange={(i) => setIndex(parseInt(i))}
                >
                    {locations.map((value, i) => (
                        <DropdownMenuRadioItem
                            key={i}
                            value={i.toString()}
                            className="cursor-pointer"
                        >
                            {value}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
