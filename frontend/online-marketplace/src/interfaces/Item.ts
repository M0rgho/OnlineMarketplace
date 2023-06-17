export interface Item {
    _id?:string,
    name: string,
    date: Date,
    type: string,
    imgUrl: string,
    price: number,
    // new
    rarity: string,
    fromCollection: string,
    condition: string
}