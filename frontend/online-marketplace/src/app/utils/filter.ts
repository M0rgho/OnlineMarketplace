
 import { Item } from "src/interfaces/Item";
import { FilterOption } from "src/interfaces//FilterOption";

export class Filter {
    option: FilterOption | null = null;
    constructor(){
    }
    
    check(item:Item){

        return item.rarity == 'epic'
    }
}