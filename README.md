# FireHotel – Dokumentace projektu

## 1. SRS (Specifikace softwarových požadavků)

FireHotel je webová aplikace pro správu rezervací pokojů, uživatelů a hotelových pokojů v rámci hotelového prostředí. Systém umožňuje:
- Správu uživatelů (admin, worker, guest)
- Správu rezervací (vytváření, úprava, mazání)
- Správu pokojů a jejich dostupnosti (přiřazení, obsazenost)
- Přihlášení a autorizaci uživatelů dle rolí
- Zobrazení statistik a přehledů o obsazenosti hotelu

## 2. SDD (Návrh softwaru)

### Architektura
- **Backend:** NestJS (TypeScript), REST API, připojení k databázi (PostgreSQL)
- **Frontend:** React + TypeScript, Vite, TailwindCSS
- **Databáze:** Entity pro uživatele, objednávky, skříňky, buňky

### Hlavní moduly backendu
- `users` – správa uživatelů, autentizace, role
- `lockers` – správa pobocek a adresy
- `cells` – správa pokojů a jejich typů
- `orders` – správa objednávek, přiřazení k uživatelům

### Frontend
- Stránky pro přihlášení, dashboard, správu uživatelů, objednávek, skříněk
- Komponenty rozdělené podle funkcí a rolí

## 3. Zdrojové kódy aplikace

- **Backend:** `backend/src`
- **Frontend:** `web/src`
- **Konfigurace:** `.env`, `package.json`, `vite.config.ts`, `tailwind.config.js`

## 4. Uživatelská příručka

### Přihlášení
- Otevřete webovou aplikaci a přihlaste se svým uživatelským jménem a heslem.

### Práce s objednávkami
- Vytvoření nové objednávky: klikněte na „Nová objednávka“, vyplňte údaje a potvrďte.
- Úprava/mazání objednávky: v seznamu objednávek zvolte akci.

### Práce se skříňkami
- Zobrazení dostupných skříněk a buněk.
- Přiřazení objednávky ke skříňce (dle oprávnění).

## 5. Administrátorská příručka

- **Správa uživatelů:** Přidání, úprava, mazání uživatelů, přiřazení rolí.
- **Správa skříněk:** Přidání, úprava, mazání skříněk a buněk.
- **Statistiky:** Zobrazení přehledů o využití systému.

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