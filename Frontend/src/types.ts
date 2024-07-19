export interface User {
    name: string;
    username: string;
    password: string;
    cash: number;
    number_of_items: string[];
    trades: any[];
    offers_sent: any[];
}

export interface Trade {
    username: string;
    title: string;
    description: string;
    conditions: string[];
    offers: any[];
    acceptedOffers: any;
    _id: string,
}