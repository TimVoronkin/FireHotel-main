# FireHotel – Dokumentace projektu

FireHotel je moderní webová aplikace pro správu hotelu, která je postavena na architektuře client-server s odděleným frontendem a backendem. Projekt využívá nejnovější technologie a best practices pro bezpečnost, škálovatelnost a uživatelský komfort.

- **Backend:** NestJS (TypeScript), REST API, PostgreSQL, TypeORM
- **Frontend:** React (TypeScript), Vite, TailwindCSS
- **Bezpečnost:** JWT autentizace, role-based access control, hashování hesel (bcrypt), ochrana proti CSRF, XSS, SQL Injection
- **Vývoj:** Striktní oddělení logiky, validace vstupů (DTO, class-validator), logování a auditní záznamy
- **UI:** Responzivní design, role-based navigace, přehledné tabulky, grafy a filtry
- **Databáze:** Normalizovaný model, vztahy mezi uživateli, rezervacemi, pokoji a skříňkami
- **Testování a dokumentace:** Swagger pro API, komentáře ve zdrojovém kódu, manuální i automatizované testy

Tato dokumentace popisuje jak funkční, tak technickou stránku projektu a slouží jako základ pro prezentaci i další rozvoj systému.

## 1. SRS (Specifikace softwarových požadavků)

FireHotel je webová aplikace pro správu rezervací pokojů, uživatelů a hotelových pokojů v rámci hotelového prostředí. Systém umožňuje:
- Správu uživatelů (admin, worker, guest)
- Správu rezervací (vytváření, úprava, mazání)
- Správu pokojů a jejich dostupnosti (přiřazení, obsazenost)
- Přihlášení a autorizaci uživatelů dle rolí
- Zobrazení statistik a přehledů o obsazenosti hotelu

## 1.1 Funkční požadavky

### Uživatelské role
- **Administrátor**: kompletní správa uživatelů, pokojů, skříněk, buněk, rezervací, přístup ke statistikám a auditním záznamům.
- **Pracovník**: správa rezervací, přiřazení pokojů/skříňkám, zobrazení statistik, omezená správa uživatelů.
- **Host**: vytváření a správa vlastních rezervací, zobrazení dostupnosti pokojů/skříněk, úprava osobních údajů.

### Hlavní funkce systému
- Registrace a přihlášení uživatelů s ověřením rolí a bezpečnou autentizací.
- Správa uživatelů (vytváření, úprava, mazání, přiřazení rolí, reset hesla).
- Správa pokojů a jejich typů (přidání, úprava, mazání, zobrazení dostupnosti, filtrování podle parametrů).
- Správa skříněk a buněk (přidání, úprava, mazání, přiřazení objednávek, kontrola obsazenosti).
- Správa rezervací (vytváření, úprava, mazání, přiřazení k uživatelům a pokojům/skříňkám, historie změn).
- Zobrazení statistik a přehledů o obsazenosti hotelu, využití pokojů/skříněk, vytíženosti pracovníků.
- Auditní logy pro sledování důležitých akcí v systému.

## 1.2 Nefunkční požadavky
- Webová aplikace dostupná přes moderní prohlížeče (Chrome, Firefox, Edge, Safari).
- Responzivní design pro desktop, tablet i mobilní zařízení.
- Bezpečné ukládání hesel (hashování, salting), ochrana proti útokům (CSRF, XSS, SQL Injection).
- Rychlá odezva systému (většina operací do 2 sekund).
- Podpora více uživatelských rolí a oprávnění.
- Zálohování a obnova dat (automatizované zálohy databáze).
- Lokalizace rozhraní (možnost přidání dalších jazyků).

## 1.3 Omezení a předpoklady
- Systém je určen pro správu jednoho hotelu.
- Databáze PostgreSQL.
- Backend: NestJS (TypeScript), Frontend: React (TypeScript), Vite, TailwindCSS.
- Přístup k systému pouze pro registrované uživatele.
- Integrace s e-mailovým serverem pro notifikace (volitelné).

## 1.4 Obchodní pravidla
- Každý uživatel může mít více rezervací, ale v jeden čas může být v jednom pokoji pouze jedna rezervace.
- Rezervace lze upravovat a mazat pouze do začátku pobytu.
- Administrátor má plný přístup ke všem datům a funkcím.
- Pracovník může spravovat pouze rezervace a přiřazené entity.
- Host vidí a spravuje pouze své rezervace a údaje.
- Historie změn rezervací je uchovávána pro auditní účely.

## 2. SDD (Návrh softwaru)

### 2.1 Architektura systému

FireHotel je postaven na vícevrstvé architektuře s oddělením backendu a frontendu. Komunikace probíhá přes REST API.

- **Backend:**
  - Framework: NestJS (TypeScript)
  - API: RESTful
  - Databáze: PostgreSQL
  - ORM: TypeORM
  - Autentizace: JWT, role-based access control
  - Struktura: moduly (users, orders, lockers, cells), entity, služby, kontrolery
  - Validace a zpracování chyb: globální exception filtry, DTO validace

- **Frontend:**
  - Framework: React (TypeScript)
  - Build: Vite
  - Stylování: TailwindCSS
  - Stavová správa: React Context/Store
  - Struktura: komponenty podle stránek a funkcí, rozdělení na UI, Pages, Layouts
  - Komunikace s API: fetch/axios, vlastní hooky

### 2.2 Hlavní komponenty a moduly

#### Backend moduly
- **Users:** správa uživatelů, autentizace, role, změna hesla
- **Orders:** správa rezervací, přiřazení k uživatelům a pokojům/skříňkám, historie změn
- **Lockers:** správa skříněk a adres, přiřazení objednávek
- **Cells:** správa pokojů a jejich typů, dostupnost
- **Auth:** přihlášení, registrace, ochrana endpointů
- **Common:** sdílené typy, validace, utility

#### Frontend komponenty
- **Pages:** přihlášení, dashboard, správa uživatelů, rezervací, pokojů, skříněk
- **UI Components:** formuláře, tabulky, modály, notifikace
- **Layouts:** hlavní rozložení, navigace, role-based menu
- **Store:** správa globálního a uživatelského stavu

### 2.3 Databázový model
- **Users:** id, jméno, email, role, heslo (hash), stav účtu
- **Orders:** id, uživatel, pokoj/skříňka, datum od-do, stav, historie změn
- **Cells:** id, číslo pokoje, typ, dostupnost
- **Lockers:** id, název, adresa, dostupnost
- Vztahy: uživatel má více rezervací, pokoj/skříňka může mít více rezervací v různých časech

### 2.4 Bezpečnost a validace
- Ověření identity a rolí pomocí JWT
- Hashování hesel (bcrypt)
- Validace vstupů (DTO, class-validator)
- Ochrana proti CSRF, XSS, SQL Injection
- Logování a auditní záznamy důležitých akcí

### 2.5 API a komunikace
- REST API endpointy pro všechny entity (CRUD)
- Ověření přístupu dle rolí
- Chybové kódy a zprávy ve standardizovaném formátu
- Dokumentace API (např. Swagger)

### 2.6 Uživatelské rozhraní
- Responzivní design pro různé typy zařízení
- Navigace podle rolí uživatele
- Přehledné tabulky, filtry, formuláře s validací
- Zobrazení statistik a grafů

### 2.7 Další vlastnosti
- Lokalizace rozhraní (možnost přidání jazyků)
- Zálohování a obnova dat
- Možnost rozšíření o další moduly (např. notifikace, platby)

### 2.8 Vývoj, testování a nasazení

- **Vývoj backendu:**
  - Kód v adresáři `backend/src`, modulární struktura (každá doména má svůj modul)
  - Spouštění přes NestJS CLI, konfigurace v `.env`
  - ORM TypeORM pro práci s databází, migrace a validace schématu
  - Swagger pro dokumentaci API

- **Vývoj frontendu:**
  - Kód v adresáři `web/src`, rozdělení na Pages, UI Components, Layouts, Store
  - Vite pro rychlý build a vývoj
  - TailwindCSS pro stylování a responzivitu
  - Vlastní hooky pro komunikaci s API, Context pro správu stavu

- **Testování:**
  - Jednotkové testy backendových služeb a validací
  - Ruční testování uživatelských scénářů na frontendu
  - Kontrola bezpečnosti (vstupní data, autentizace, role)

- **Nasazení:**
  - Backend i frontend lze nasadit na libovolný server s Node.js a PostgreSQL
  - Podpora cloudového nasazení (např. Heroku, Vercel, Railway)
  - Oddělené buildy pro produkci a vývoj

- **Co říct na obhajobě:**
  - Proč byla zvolena vícevrstvá architektura a oddělení frontendu a backendu
  - Jak je řešena bezpečnost (JWT, hashování, validace, role)
  - Jak je navržen databázový model a vztahy
  - Jak probíhá komunikace mezi frontendem a backendem (REST API, validace odpovědí)
  - Jak je řešena rozšiřitelnost a údržba kódu
  - Jaké technologie byly použity a proč
  - Jaké byly hlavní výzvy a jak jste je řešili

## 3. Zdrojové kódy aplikace

- **Backend:** `backend/src`
- **Frontend:** `web/src`
- **Konfigurace:** `.env`, `package.json`, `vite.config.ts`, `tailwind.config.js`

## 4. Uživatelská příručka

### Práce se skříňkami a pokoji
- Pouze prohlížení dostupných skříněk (filialek) a pokojů.
- Zobrazení aktuální dostupnosti skříněk a pokojů.


## 5. Administrátorská příručka

- **Správa uživatelů:**
  - Přidání nového uživatele s volbou role (admin, pracovník)
  - Úprava údajů uživatele (jméno, email, role, stav účtu)
  - Resetování hesla uživatele
  - Mazání uživatelů (s kontrolou závislostí v rezervacích)

- **Správa skříněk a buněk:**
  - Přidání nové skříňky a buněk, nastavení parametrů (název, adresa, kapacita)
  - Úprava údajů skřínky a buněk (např. změna adresy, stavu, kapacity)
  - Mazání skříněk a buněk (s kontrolou, zda nejsou přiřazeny k aktivním rezervacím)
  - Zobrazení dostupnosti skříněk a buněk v reálném čase
  - Přiřazení/odebrání rezervace ke konkrétní skříňce/buňce

- **Statistiky a přehledy:**
  - Zobrazení celkové obsazenosti hotelu, pokojů, skříněk a buněk
  - Statistiky vytíženosti podle období, typu pokoje/skříňky, uživatele
  - Export dat o rezervacích a obsazenosti do CSV/XLSX
  - Grafické zobrazení trendů obsazenosti a vytíženosti
  - Přehled nejčastějších uživatelů, nejvytíženějších pokojů/skříněk


## 6. Spuštění aplikace

### Backend
```bash
cd backend
npm install
npm run start
```

### Frontend
```bash
cd web
npm install
npm run start
```

### Konfigurace
- Nastavte proměnné v souboru `.env` v adresáři `backend` (např. připojení k databázi).

---

**Poznámka:**  
Podrobnější informace o jednotlivých modulech a funkcích najdete v komentářích zdrojového kódu (`backend/src`, `web/src`).