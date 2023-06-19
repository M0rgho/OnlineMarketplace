import { Item } from "./Item";
import { User } from "./User";

export interface MarketTransaction {
    _id: string,
    // item data
    item: Item,

    // offer data
    postedDate: Date,
    price: number
    status: string,
    seller: User,
    sellDate?: Date,
    buyer?: User
};