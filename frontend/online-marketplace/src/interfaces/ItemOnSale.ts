import { User } from "./User";

export interface ItemOnSale{
    _id?:String,
    name: String,
    date: Date,
    type: String,
    owner: User,
    imgUrl: String,
    price: Number
};