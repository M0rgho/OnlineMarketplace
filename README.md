# Online Marketplace
Niewielki projekt na przedmiot Bazy Danych  
Online Marketplace umożliwa kupno sprzedaż i wymianę przedmiotów wirtualnych. 
Użytkownik ma własny ekwipunek z przedmiotami oraz konto z wirtualną walutą.

## Użyte techonologie
Baza danych - MongoDB  
Backend - NodeJS  
Frontend - Angular

## Autorzy
Mikołaj Maślak  
Szymon Głomski

## Dokumantacja
# Baza 
Baza danych posiada 3 kolekcje:
- items
- markettrasactions
- users

## Item
```ts
export interface Item {
    _id?: string;
    name: string;
    date: Date;
    type: string; // ['weapon', 'gloves']
    imgUrl: string;
    fromCollection: string;
    rarity: string; // ['common', 'uncommon', 'rare', 'epic', 'legendary']
    condition: string; // ['battle-scarred', 'well-worn','field-tested','minimal-wear','factory-new']
    // price present only if Item is on sale
    price?: number;
}
```
## MarketTransaction
```ts
export interface MarketTransaction {
    _id: string,
    // item data
    item: Item,

    // offer data
    postedDate: Date,
    price: number
    status: string, // status ['Active', 'Cancelled', 'Successful']
    seller: string,
    sellDate?: Date,
    buyer?: User
};
```
## User
```ts
export interface User{
    _id?: string,
    username: string,
    password: string,
    firstname: string,
    lastname: string,
    email: string,
    role: string, // ['USER', 'ADMIN'] 
    registrationDate?: Date,
    lastLoginDate?: Date,
    balance: number,
    items: Item[],
    transactions?: MarketTransaction[],
    preferences?: {
        dark_mode: boolean
        private_inventory: boolean
    }
};
```


# Backend
  - post /auth/signup
    - Tworzy nowego użytkownika, request powinien zawierać obiekt user. 
  - post /auth/signin
    - Odpowiada za autentykacje, request powinien zawierać obiekt {username: string, password: string}
  - post /sell
    - Tworzy oferte i wystawia ją na rynek, request powinien zawierać oiekt marketTransactions
  - post /buy
    - Odpowiada za kupno przedmiotu, request powinien zawierać obiekt {transaction: marketTransaction, username: string}. (username kupującego)
  - post /cancel
    - Wycofuje ofertę z marketu i przedmiot wraca do ekwipunku właściciela. Request powinien zawierać obiekt marketTransactions
  - get /transactions?status=...&seller=...*buyer=...&item=...
    - Zwraca wszystkie transakcje spełniające ustalona warunki
  - get /user/:username
    - Zwraca informacje o użytkowniku
  - get /users
    - Zwraca ogólną listę wszystkich użytkowników
 
    
  # Frontend
  - /admin Formularz do tworzenia przedmiotów. Nowy przedmiot pojawia się w ekwipunku admina
  - /login Formularz umożliwiające logowanie
  - /market Wyświetla aktualne ofrty
  - /register Formularz umożliwiający stworzenie konta
  - /user/:username Ekwipunek zalogowanego użytkownika
  - /item-details.:_id Szegółowe informacje o przedmiotach, historia transakcji
  
