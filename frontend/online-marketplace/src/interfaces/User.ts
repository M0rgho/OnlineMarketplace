import { Item } from "./Item"
import { MarketTransaction } from "./MarketTransaction"

export interface User{
    _id?: string,
    username: string,
    password: string,
    firstname: string,
    lastname: string,
    email: string,
    role?: string,
    registrationDate?: Date,
    lastLoginDate?: Date,
    balance?: number,
    items?: Item[],
    transactions?: MarketTransaction[],
    preferences?: {
        dark_mode: boolean
        private_inventory: boolean
    }
};
