export interface Item {
    _id?:string,
    name: string,
    date: Date,
    type: string,
    imgUrl: string,
    fromCollection: string,
    rarity: string,
    condition: string,
    // price present only if Item is on sale
    price?: number
}