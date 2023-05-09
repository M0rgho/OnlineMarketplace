import { Item } from "./Item"
import { Transaction } from "./Transaction"

export interface User{
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    email: String,
    role?: String,
    registrationDate?: Date,
    lastLoginDate?: Date,
    balance?: Number,
    items?: Item[],
    transactions?: Transaction[],
};
