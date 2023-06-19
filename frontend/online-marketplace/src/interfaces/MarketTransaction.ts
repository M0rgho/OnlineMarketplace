import { User } from "./User";

export interface MarketTransaction {
    _id: string,
    // item data
    item_id: string,
    name: string,
    date: Date,
    type: string,
    imgUrl: string,
    fromCollection: string,
    rarity: string,
    condition: string,

    // offer data
    postedDate: Date,
    price: number
    status: string,
    seller: User,
    sellDate?: Date,
    buyer?: User
};