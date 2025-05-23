# <img src="web/public/fire-tree.svg" alt="Logo" width="32"/> FireHotel – Dokumentace projektu 
FireHotel je moderní webová aplikace pro správu hotelu, která je postavena na architektuře client-server s odděleným frontendem a backendem. Projekt využívá nejnovější technologie a best practices pro bezpečnost, škálovatelnost a uživatelský komfort.

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
- **Host**: zobrazení dostupnosti pokojů/skříňkám.

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

- **Frontend:**
  - Framework: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" width="24"/> React (TypeScript)
  - Build: <img src="https://vitejs.dev/logo.svg" alt="Vite" width="24"/> Vite
  - Stylování: <img src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.d52e9897.svg" alt="TailwindCSS" width="24"/> TailwindCSS
  - Stavová správa: React Context/Store
  - Struktura: komponenty podle stránek a funkcí, rozdělení na UI, Pages, Layouts
  - Komunikace s API: fetch/axios, vlastní hooky

- **Backend:**
  - Framework: <img src="https://www.svgrepo.com/show/354107/nestjs.svg" alt="NestJS" width="24"/> NestJS (TypeScript)
  - API: RESTful
  - Databáze: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" width="24"/> PostgreSQL
  - ORM: <img src="https://avatars.githubusercontent.com/u/20165699?s=200&v=4" alt="TypeORM" width="24"/> TypeORM
  - Autentizace: <img src="https://jwt.io/img/pic_logo.svg" alt="JWT" width="24"/> JWT, role-based access control
  - Struktura: moduly (users, orders, lockers, cells), entity, služby, kontrolery
  - Validace a zpracování chyb: globální exception filtry, DTO validace

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

### 2.7 Vývoj, testování a nasazení

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
