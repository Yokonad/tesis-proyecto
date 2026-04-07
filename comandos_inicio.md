# Comandos del Proyecto

## Setup Inicial (solo la primera vez)

```bash
composer install && npm install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
php artisan migrate
```

## Comandos Diarios (Desarrollo)

**Opción 1 — Dos terminales separadas:**

**1) Backend (Terminal 1):**
```bash
php artisan serve
```

**2) Frontend (Terminal 2):**
```bash
npm run dev
```

**Opción 2 — Todo con un solo comando:**
```bash
composer dev
```

## URLs de Acceso
- Landing: `http://127.0.0.1:8000/`
- Monitoreo: `http://127.0.0.1:8000/monitoreo`

## Otros Comandos Útiles

```bash
# Compilar assets para producción
npm run build

# Verificar TypeScript
npx tsc --noEmit

# Ejecutar tests Laravel
php artisan test

# Limpiar cachés
php artisan config:clear && php artisan cache:clear && php artisan view:clear
```
