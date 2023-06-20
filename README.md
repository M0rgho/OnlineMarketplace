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

item: 
- _id - identyfikator
- name - nazwa
- date - data powstania 
- type - typ ['weapon', 'gloves']
- imgUrl - scieżka do zdjęcia
- fromCollection - nazwa kolekcji
- rarity - rzadkość przedmiotu ['common', 'uncommon', 'rare', 'epic', 'legendary']
- condition - stan przedmiotu ['battle-scarred', 'well-worn','field-tested','minimal-wear','factory-new']

marketTransaction:
- item
- postedDate - data publikacji ogłoszenia
- price - cena przedmiotu
- status - status ['Active', 'Cancelled', 'Successful']
- seller - id sprzedającego
- sellDate - data finalizacji transakcji
- buyer - id kupującego

user:
- username 
- password - hasło
- firstname - imię
- lastname - nazwisko
- email - email
- role - ['USER', 'ADMIN']
- registrationDate - data rejestracji
- balance - stan konta
- items - tablica przedmiotów w urzytkownika
  
# Backend
  - post /auth/signup
    - Tworzy nowego użytkownika, request powinien zawierać obiekt user. 
  - post /auth/signin
    - Odpowiada za autentykacje, request powinien zawierać obiekt {username: string, password: string}
  - post /sell
    - Tworzy oferte i wystawia ją na rynek, request powinien zawierać oiekt marketTransactions
  - post /buy
    - Odpowiada za kupno przedmiotu, request powinien zawierać obiekt {transaction: marketTransaction, username: string}. (username kupującego)
  - post /cancell
    - Wycofuje ofertę z marketu i przedmiot wraca do ekwipunku właściciela. Request powinien zawierać obiekt marketTransactions
  - get /market_offers
    - Zwraca aktywne oferty
  - get /user/:username
    - Zwraca informacje o użytkowniku
    
  # Frontend
  - /admin Formularz do tworzenia przedmiotów. Nowy przedmiot pojawia się w ekwipunku admina
  - /login Formularz umożliwiające logowanie
  - /market Wyświetla aktualne ofrty
  - /register Formularz umożliwiający stworzenie konta
  - /user/:username Ekwipunek zalogowanego użytkownika
  - /item-details.:_id Szegółowe informacje o przedmiotach, historia transakcji
  
