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

export interface LocationType {
    id: number;
    name: string;
}

export function Location({
    locations,
    chosenLocationId,
    onChooseLocation,
}: {
    locations: LocationType[];
    chosenLocationId: number;
    onChooseLocation: (id: number) => void;
}) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <DropdownMenu onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button className="w-full cursor-pointer" variant="outline">
                    <MapPin />
                    {locations.find((loc) => loc.id === chosenLocationId)!.name}
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
                    value={chosenLocationId.toString()}
                    onValueChange={(i) => onChooseLocation(parseInt(i))}
                >
                    {locations.map((location) => (
                        <DropdownMenuRadioItem
                            key={location.id}
                            value={location.id.toString()}
                            className="cursor-pointer"
                        >
                            {location.name}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
