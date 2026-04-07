# Contexto Actualizado del Proyecto de Tesis

## 1. Resumen Ejecutivo
El proyecto mantiene una arquitectura MPA con Laravel + Vite y dos frontends React aislados:

1. Landing (ruta /)
2. Monitoreo (ruta /monitoreo)

El estado actual es estable a nivel de build y enfocado en una interfaz minimalista monocromática, con layouts consistentes tipo grid, limpieza visual (menos fondos sólidos), y navegación lateral optimizada en experiencia de expansión/colapso.

## 2. Estado Real de la Arquitectura

### 2.1 Backend y Enrutamiento
- Framework: Laravel 13
- PHP: 8.3+
- Base local: SQLite
- Rutas web activas:
  - GET / -> vista landing
  - GET /monitoreo -> vista monitoreo

Archivo clave: routes/web.php

### 2.2 Frontend
- React 19 + TypeScript
- Vite 8
- React Router DOM 7
- Tailwind CSS v4 con aislamiento por módulo

Cada módulo tiene:
- su propio app.tsx
- su propio css/app.css
- su propio contexto y tipos
- alias separados (@landing/* y @monitoreo/*)

## 3. Estructura Vigente en resources/

```text
resources/
├── landing/
│   ├── app.tsx
│   ├── components/
│   ├── context/
│   ├── css/
│   ├── layouts/
│   ├── pages/
│   └── types/
├── monitoreo/
│   ├── app.tsx
│   ├── components/
│   ├── context/
│   ├── css/
│   ├── layouts/
│   ├── pages/
│   └── types/
└── views/
    ├── landing.blade.php
    └── monitoreo.blade.php
```

Nota: la estructura fue simplificada y limpiada; no se está usando el andamiaje extra previo (features/hooks/services/utils/assets) en el estado actual efectivo de los módulos principales.

## 4. Estado Actual del Módulo Monitoreo

### 4.1 Rutas internas React
Definidas en resources/monitoreo/app.tsx:
- /monitoreo -> Dashboard
- /monitoreo/logs -> Logs
- /monitoreo/seguridad -> Security
- /monitoreo/rendimiento -> Performance
- /monitoreo/usuarios -> Users
- /monitoreo/endpoints -> Endpoints

### 4.2 Páginas existentes
- Dashboard.tsx
- Logs.tsx
- Performance.tsx
- Endpoints.tsx
- Security.tsx
- Users.tsx

### 4.3 Diseño y sistema visual
- Dirección visual monocromática (escala de grises)
- Estética terminal/minimalista
- Reducción de fondos sólidos pesados
- Uso de bordes/outlines sutiles
- Espaciado consistente entre secciones
- Jerarquía tipográfica uniforme

Archivo de tokens y theme local:
- resources/monitoreo/css/app.css

## 5. Cambios Relevantes Recientes

### 5.1 Optimización de páginas
Se refactorizaron Dashboard, Logs, Performance, Endpoints, Security y Users para:
- mejorar alineación horizontal y vertical
- unificar grillas, márgenes y paddings
- estandarizar bloques de métricas/tablas/listados
- reforzar legibilidad y limpieza visual premium

### 5.2 Sidebar (mejoras UX/UI)
Archivo principal: resources/monitoreo/components/shared/Sidebar.tsx

Cambios implementados:
- título MONITOR alineado a la izquierda (en expandido)
- título oculto en estado colapsado
- botón de colapsar/expandir con ícono SVG (+/-)
- eliminación del cuadro inferior en colapsado
- aparición de Run Command y Sys Time controlada para evitar saltos bruscos

### 5.3 Sincronización de layout en expansión/colapso
Archivo: resources/monitoreo/layouts/Layout.tsx

Cambios implementados:
- transición suave del desplazamiento del contenido principal vía margin-left
- sidebar y contenido principal sincronizados en tiempos de transición
- eliminación del ocultamiento completo de página durante expansión (se corrigió el parpadeo/desaparición)

## 6. Estado de Calidad Actual
- TypeScript: sin errores en componentes modificados
- Build Vite: exitoso tras los ajustes recientes
- Comportamiento visual: estable y consistente con el objetivo minimalista

## 7. Comandos de Ejecución

1. Instalar dependencias:
```bash
composer install
npm install
```

2. Entorno Laravel:
```bash
cp .env.example .env
php artisan key:generate
```

3. Base SQLite:
```bash
touch database/database.sqlite
php artisan migrate
```

4. Desarrollo:
```bash
php artisan serve
npm run dev
```

5. Verificación de build:
```bash
npm run build
```

## 8. Prioridades Técnicas Sugeridas
1. Mantener consistencia visual en nuevos componentes usando el patrón actual de Card/tabla/sección.
2. Añadir pruebas UI o snapshots para prevenir regresiones en sidebar y layout responsivo.
3. Conectar datos reales de backend al módulo de monitoreo (actualmente hay datasets mock en varias vistas).
