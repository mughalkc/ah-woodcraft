# AH Woodcraft — React + Tailwind + Laravel

A production-oriented woodcraft business website for **AH Woodcraft**.

## Structure

- `client/` — public customer website (React + Vite + Tailwind)
- `admin/` — separate admin dashboard (React + Vite + Tailwind)
- `server/` — Laravel 12 REST API

## Features

### Customer website
- Responsive modern woodcraft design
- Tables, chairs, beds, kitchen accessories, furniture and decoration categories
- Product filtering
- Product images and descriptions
- Price is optional; when empty it shows **Price on WhatsApp**
- Every product has a WhatsApp button with a pre-filled product enquiry
- WhatsApp: **0320-9408283**
- Custom-order CTA

### Admin
- Separate admin frontend
- Login screen
- Add product
- Edit product
- Delete product
- Optional product price
- Product category, description and image URL
- Dashboard product count
- Bearer-token authentication with 7-day token expiry

## Admin login

Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `server/.env` before running the seeder.

## Local setup

### 1. Laravel API

Install PHP 8.2+ and Composer, then:

```bash
cd server
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

API runs at `http://localhost:8000`.

### 2. Public client

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:8000/api
```

Then:

```bash
npm run dev
```

Public site: `http://localhost:5173`.

### 3. Admin

```bash
cd admin
npm install
```

Create `admin/.env`:

```env
VITE_API_URL=http://localhost:8000/api
```

Then:

```bash
npm run dev
```

Admin: `http://localhost:5174`.

## Production deployment

### Vercel — client

Create a Vercel project from this repository/folder and set **Root Directory** to `client`.

Environment variable:

```env
VITE_API_URL=https://YOUR-LARAVEL-API-DOMAIN/api
```

Build command: `npm run build`

### Vercel — admin

Create a second Vercel project and set **Root Directory** to `admin`.

Environment variable:

```env
VITE_API_URL=https://YOUR-LARAVEL-API-DOMAIN/api
```

Build command: `npm run build`

### Vercel — Laravel API

Create a third Vercel project with **Root Directory** `server`.

The included `server/vercel.json` uses the PHP runtime.

For production, use an external PostgreSQL database (Neon, Supabase, Railway Postgres, etc.). Do not rely on Vercel's ephemeral filesystem for SQLite production data.

Set environment variables similar to:

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://YOUR-LARAVEL-API-DOMAIN
APP_KEY=YOUR_GENERATED_LARAVEL_KEY

DB_CONNECTION=pgsql
DB_HOST=YOUR_DB_HOST
DB_PORT=5432
DB_DATABASE=YOUR_DB_NAME
DB_USERNAME=YOUR_DB_USER
DB_PASSWORD=YOUR_DB_PASSWORD

FRONTEND_URL=https://YOUR-CLIENT.vercel.app
ADMIN_URL=https://YOUR-ADMIN.vercel.app

ADMIN_EMAIL=your-real-admin-email
ADMIN_PASSWORD=your-strong-password
WHATSAPP_NUMBER=0320-9408283
```

Run migrations/seeding against production DB from a machine with Composer/PHP:

```bash
php artisan migrate --seed --force
```

## Important

The current demo uses remote Unsplash image URLs. In production, replace these with your own product photographs or add an image-upload service (Cloudinary/S3) later.

The WhatsApp number is centralized in the React UI and can be moved to a public API settings endpoint if you want the admin to edit it without changing frontend code.
