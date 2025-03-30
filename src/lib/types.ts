import { JSX } from "react";

export type Product = {
    id: number;
    type: "product";
    data: ProductData;
};

export type ProductData = {
    title: string;
    locations: number[];
    description: string;
    img: string;
    emoji: JSX.Element;
    date: Date;
    priceOld: number;
    priceNew: number;
    discount: string;
    logo: string;
    company: string;
};

export type Event = {
    id: number;
    type: "event";
    data: EventData;
};

export type EventData = {
    locations: number[];
    description: string;
    img: string;
    title: string;
    date: Date;
    emoji: JSX.Element;
    brief: string;
};

export type Item = Product | Event;
