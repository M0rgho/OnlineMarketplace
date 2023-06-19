
 import { Item } from "src/interfaces/Item";
import { FilterOption } from "src/interfaces//FilterOption";
import { MarketTransaction } from "src/interfaces/MarketTransaction";

export class Filter {
    option: FilterOption;
    constructor(option: FilterOption){
        this.option = option
    }
    
    check(item:Item ){
        if(!['none',item.condition].includes(this.option.condition)){
            return false
        }
        if(!['none',item.rarity].includes(this.option.rarity)){
            return false
        }
        if(!['none',item.type].includes(this.option.type)){
            return false
        }
        if(this.option.price != 0 && item.price && item.price > this.option.price ){
            return false
        }
        // to do collection and name
        return true
    }
}