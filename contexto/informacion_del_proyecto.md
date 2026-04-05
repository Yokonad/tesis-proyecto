# Documentación del Proyecto de Tesis

## 1. Visión General del Proyecto
Este proyecto ("tesis-proyecto") es una plataforma administrativa (V1) en fase de desarrollo para gestionar procesos operativos, roles de usuario, tareas, vulnerabilidades y tickets de soporte de forma automatizada y escalable. Aunque la visión del sistema incluye un frontend rico (React-based) integrado con un backend robusto estructurado en **Laravel**, el estado actual del repositorio refleja el andamiaje base y la estructura inicial (clean slate) bajo **Laravel 13** y **PHP 8.3**.

El enfoque principal del software es garantizar alta disponibilidad, administración mediante Control de Acceso Basado en Roles (RBAC), seguir principios de Arquitectura Limpia, y proveer una interfaz corporativa estilizada y premium.

## 2. Estado Actual del Repositorio
Actualmente, el proyecto se encuentra consolidado sobre un proyecto de Laravel completamente inicializado. 
El andamiaje (scaffold) del frontend está configurado nativamente con el empaquetador **Vite** y el entorno de diseño rápido **TailwindCSS v4**, estructurado para ser integrado posteriormente con componentes UI responsivos.

### 2.1. Stack Tecnológico Instalado
**Backend (Motor de la Aplicación):**
- **Laravel Framework**: v13.0 (Estructura de enrutamiento y lógica de negocio).
- **PHP**: ^8.3 (Lenguaje del servidor).
- **Dependencias Clave**: `laravel/tinker`, `laravel/pail` (logging avanzado), `laravel/pint` (calidad de código PHP) y `phpunit` (para pruebas unitarias e integración v12.5.12).

**Frontend (Interfaz y Empaquetado):**
- **Node.js y NPM**: Entornos de ejecución y gestión de paqueterías de cliente.
- **Vite**: ^8.0.0 (HMR y compilador de entorno ultrarrápido).
- **Tailwind CSS**: ^4.0.0 (Junto con sus plugins de Vite `@tailwindcss/vite` para estilos CSS utilitarios de alto rendimiento).
- **Axios**: Cliente predeterminado para el manejo de peticiones asíncronas HTTP.

## 3. Estructura de Directorios
La arquitectura base sigue el estándar MVC refinado del ecosistema Laravel:

- `app/`: Contiene el núcleo lógico de la aplicación (Modelos de Base de Datos, Controladores, Middlewares). Inicializado con la entidad mínima estandar (Ej. `User.php`).
- `bootstrap/`: Archivos para el inicio de la aplicación (bootstrapping) y sistema de caché de provisión del framework.
- `config/`: Entorno detallado y variables con el esquema de configuración para la aplicación (DBs, autenticación, mailer, queues).
- `contexto/`: Directorio destinado a almacenar la documentación maestra, manuales y notas de trazabilidad (como este mismo documento).
- `database/`: Estructuración de la capa de persistencia de datos y abstracciones de registros `factory`/`seeder`. Dispone de migraciones iniciales para usuarios, caché y jobs/colas de tareas.
- `public/`: El único punto de entrada público expuesto al entorno web (`index.php`) e indexación estática (imágenes, bundles CSS/JS).
- `resources/`: Comprende los recursos sin procesar. Alberga scripts base (`js/`), estilos (`css/`), y las vistas primordiales controladas por la plantilla nativa Blade (`views/`).
- `routes/`: Orquestación y puntos de conexión (API, Web, Consola).
- `storage/`: Contenedor de almacenamiento local del sistema para registros (logs), vistas compiladas y depósitos de subidas de información.
- `tests/`: Framework de pruebas modulares y testing automatizado bajo Pest/PHPUnit.

### Archivos Principales en la Raíz
- `README.md`: Documentación oficial indicando el enfoque temático, etiquetas (badges) del proyecto y los pasos estandarizados de despliegue.
- `composer.json` / `composer.lock`: Orquestan y resuelven las dependencias del ecosistema nativo de PHP.
- `package.json` / `package-lock.json`: Dictan los paquetes preinstalados de Javascript e incluyen los scripts `"dev"` o `"build"` de Vite.
- `vite.config.js`: Reglas directas para compilar el código cliente a través de Laravel Vite Plugin.
- `.env.example`: Estructura molde del archivo de credenciales universales de entorno que debe crearse para conexión a la base de datos (relacional/SQLite).
- `artisan`: Aplicación por consola para emitir instrucciones al sistema Laravel (migraciones, controladores, seeders).

## 4. Guía Sintetizada de Inicialización Local
Se han preestablecido rutinas avanzadas en el archivo principal `composer.json` del proyecto para eficientar el desarrollo.

1. **Dependencias:**
   ```bash
   composer install && npm install
   ```

2. **Entorno Principal:**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. **Migración del Esquema:**
   Asume la base configurada en `.env`
   ```bash
   php artisan migrate
   ```

4. **Macro-Comando de Desarrollo (Run Dev):**
   Posee un script compuesto que emite en paralelo múltiples entornos para comodidad del desarrollador:
   ```bash
   composer run dev
   ```
   Ejecuta concurrentemente:
   - Servidor HTTP (`php artisan serve`)
   - Trabajador de Colas (`php artisan queue:listen`)
   - Emisión moderna de Logs (`php artisan pail`)
   - Servidor de assets Vite (`npm run dev`)

## 5. Próximos Eventos Proyectados
Tomando en cuenta los requerimientos del proyecto corporativo de la Administración NHL:
- Reemplazar/Extender el stack de interfaz inyectando formalmente **React** al pipeline de Vite (y analizando una estructura por inercia [Inertia.js] o APIs desacopladas).
- Definir los modelos, factorías y controladores requeridos para **Permisos, Roles, Tareas, Vulnerabilidades y Tickets**.
- Adherencia de temáticas estilizadas y branding corporativo (diseño moderno y animado).
