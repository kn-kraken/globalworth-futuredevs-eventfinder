import { JSX } from "react";

export type Product = {
    type: "product";
    data: ProductData;
};

export type ProductData = {
    id: string;
    title: string;
    description: string;
    img: string;
    price: number;
    emoji: JSX.Element;
    date: Date;
    priceOld: string;
    priceNew: string;
    discount: string;
    logo: string;
    company: string;
};

export type Event = {
    type: "event";
    data: EventData;
};

export type EventData = {
    id: string;
    description: string;
    img: string;
    title: string;
    date: Date;
    emoji: JSX.Element;
    brief: string;
};

export type Item = Product | Event;
