export interface Item {
    _id?:String,
    name: String,
    date: Date,
    type: String,
    imgUrl: String,
    price: Number,
    // new
    rarity: String,
    fromCollection: String,
    condition: String
}