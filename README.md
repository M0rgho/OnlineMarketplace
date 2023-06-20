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
  
  
