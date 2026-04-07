# Documentación Arquitectónica del Proyecto de Tesis

## 1. Visión General del Proyecto
Este proyecto ("tesis-proyecto") consiste en el desarrollo de dos sistemas web integrados mediante arquitecturas de comunicación continua, pero con interfaces gráficas estructuradas de forma aislada. Se divide en dos módulos principales:
1. **Página Principal (Plataforma Landing)**: Accesible mediante el directorio raíz de la aplicación web (Ruta URI: `/`). Actúa como el front-end representativo inicial para la plataforma, destinado a proveer la estructura de acceso, autenticación de usuarios y navegación base del sistema público.
2. **Módulo de Monitoreo e Inteligencia (Dashboard)**: Desplegado bajo entorno aislado (Ruta URI: `/monitoreo`). Actúa como el dashboard administrativo enfocado con exclusividad en la seguridad operativa del ecosistema web. Ejecuta la recolección, parseo y visualización de logs del entorno (trazabilidad de acceso, intentos de login, comportamiento anómalo), presentando dichas métricas mediante telemetría y alertas en tiempo real.

Toda la estructura tecnológica ha sido desarrollada utilizando un patrón arquitectónico híbrido de Multi-Page Application (MPA), donde el framework Laravel delega la renderización del Document Object Model (DOM) directamente a la librería declarativa React en distintas páginas controladas.

## 2. Estado Actual del Repositorio
El andamiaje técnico inicial (scaffolding) se encuentra en un estado de desarrollo local estable. La transición de una estructura convencional de renderizado de servidor bajo directivas de plantillas, hacia una renderización estricta sobre el cliente, se ha materializado a través del acoplamiento nativo de Vite JS.

### 2.1. Stack Tecnológico Estructural
**Infraestructura de Backend y Capa de Datos:**
- **Laravel Framework**: v13.0 (Manejo de ruteo base, transacciones de API, y orquestación asíncrona de seguridad).
- **PHP**: ^8.3 (Motor transaccional del lado del servidor).
- **Motor de Base de Datos**: SQLite (Implementado para la iteración local por su portabilidad sin requerir de demonios externos).

**Infraestructura de Frontend (Capa de Presentación Desacoplada):**
- **React y ReactDOM**: ^19.2 (Responsable exclusivo del montaje del componente principal al DOM empleando sintaxis TSX).
- **TypeScript**: ^6.0.2 (Habilitado con tipado estático inferido globalmente para validación en tiempo de compilación y minificación de errores de ejecución).
- **Vite**: ^8.0.0 (Empaquetador de módulos de alta resolución y servidor de desarrollo HMR. Ha sido configurado con directiva de tipo "Multi-Input" para compilar de manera absoluta la Página Landing y la Página Monitoreo como recursos ajenos entre sí).
- **Tailwind CSS**: ^4.0.0 (Framework CSS basado en utility-classes; el barrido de su compilador ha sido confinado al path estricto de cada respectiva página mediante la directiva relativa `@source`).
- **React Router DOM**: ^7.14.0 (Enrutamiento SPA dentro de cada módulo independiente).

Actualmente, ambas topologías (Landing y Monitoreo) renderizan un wireframe de desarrollo de tipo minimalista y terminal-técnico. Este diseño sustituye el uso de iconos predefinidos y caracteres por formato escalable vectorial sin estado (SVG), acoplando visualmente cada página hacia sus esquemas primarios de contraste y paleta de colorización monocromática.

**Principio de Aislamiento:** Las clases CSS personalizadas están prefijadas con el nombre del módulo (`landing-*` y `monitoreo-*`) para evitar colisiones de estilos entre módulos. Cada módulo posee su propio archivo de declaraciones TypeScript (`types/global.d.ts`) garantizando independencia total.

## 3. Topología y Estructura de Directorios (Resources)
Con la finalidad de garantizar el aislamiento semántico del código en la capa de presentación de cliente, el directorio matriz del repositorio (`resources/`) fue refactorizado, erradicando carpetas de unificación previas:

### 3.1. Arquitectura de Páginas (Multi-Page Frontends)

```text
resources/
├── landing/                (Página React: Interfaz Principal Pública)
│   ├── app.tsx             (Punto lógico de entrada de React hacia el DOM local)
│   ├── assets/             (Archivos estáticos: imágenes, iconos, logos específicos del landing)
│   ├── components/         (Componentes React del módulo)
│   │   ├── ui/             (Componentes base reutilizables: botones, inputs, modales)
│   │   └── shared/         (Componentes estructurales: Header, Footer, Navbar)
│   ├── context/            (React Context API para estado local del módulo)
│   ├── css/
│   │   └── app.css         (Entorno Tailwind v4 confinado al pipeline exclusivo de Landing)
│   ├── features/           (Lógica agrupada por funcionalidad: auth, certificados, etc.)
│   ├── hooks/              (Custom React Hooks locales al módulo)
│   ├── layouts/            (Componentes de Ordenamiento Estructural Jerárquico HOC)
│   ├── pages/              (Componentes a nivel de vista/ruta completa)
│   ├── services/           (Comunicación con API backend Laravel o APIs externas)
│   ├── types/
│   │   └── global.d.ts     (Declaraciones de tipo TypeScript independientes del módulo)
│   └── utils/              (Funciones auxiliares, formateadores, constantes)
│
├── monitoreo/              (Página React: Sistema de Dashboard y Logs)
│   ├── app.tsx             (Punto lógico de entrada de React hacia el DOM subyacente)
│   ├── assets/
│   ├── components/
│   │   ├── ui/
│   │   └── shared/
│   ├── context/
│   ├── css/
│   │   └── app.css         (Entorno Tailwind v4 confinado al pipeline exclusivo del Monitoreo)
│   ├── features/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── services/
│   ├── types/
│   │   └── global.d.ts     (Declaraciones de tipo TypeScript independientes del módulo)
│   └── utils/
│
└── views/                  (Plantillas nativas del core inicializador Laravel "Root Nodes")
    ├── landing.blade.php   (Interpreta request GET de host general y monta el compilado de Landing)
    └── monitoreo.blade.php (Interpreta request GET de la ruta referenciada y monta el compilado de Monitoreo)
```

### 3.2. Configuración y Resoluciones (Overrides)
- `routes/web.php`: Archivo de enrutamiento web fundamental. Ejerce la intercepción primaria despachando las plantillas de inyección del DOM de forma rígida hacia sus respectivos endpoints de cliente:
  - Solicitud HTTP al directorio raíz `GET /` -> Redirecciona el flujo al DOM de la Landing Page.
  - Solicitud HTTP al subdirectorio `GET /monitoreo` -> Redirecciona el flujo al DOM del entorno de Monitoreo.
- `vite.config.js`: Remodelado operativamente para despachar un esquema Multi-Input apuntando en paralelo a los dos puntos cardinales de arranque TSX. Adicionalmente, cuenta con directivas `resolve.alias` paramétricas (i.e. `@landing/*` y `@monitoreo/*`) minimizando importaciones relativas transversales en el uso de los namespaces funcionales.
- `tsconfig.json`: Soporta la rigidez estructural mediante la redefinición del atributo `include` y mapeo interno en el atributo `paths`. Cada módulo incluye sus propios archivos `.ts`, `.tsx` y `.d.ts` de forma independiente.

## 4. Secuencia de Inicialización Local

Tras el procedimiento de clonación del control de versiones (Pull Request / Clone local), la directiva de despliegue obliga a un arranque secuencial:

1. **Orquestación de Dependencias Binarias:**
   Se exhorta a restaurar la rama de cacheo remota invocando de forma síncrona ambos administradores:
   ```bash
   composer install && npm install
   ```

2. **Configuración del Entorno:**
   Crear el archivo de configuración local y generar la clave de aplicación:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. **Preparar la Base de Datos:**
   Crear el archivo SQLite y ejecutar las migraciones:
   ```bash
   touch database/database.sqlite
   php artisan migrate
   ```

4. **Macro-Entorno de Intercambio Local de Módulos (HMR):**
   A causa del desacoplamiento inherente del modelo multi-página en Vite con Laravel, resulta de carácter obligatorio accionar terminales duales:
   ```bash
   # Daemon Primario (Servicio web back-end Laravel predeterminado a puerto 8000):
   php artisan serve
   
   # Daemon Secundario (Observador activo TypeScript, Compilador Tailwind CSS y Vite Dev Server):
   npm run dev
   ```

   **Alternativa:** Usar el script integrado de Composer que orquesta todo simultáneamente:
   ```bash
   composer dev
   ```

5. **Ejecución y Verificación Terminal:**
   Ingresar desde el navegador hacia el host local asignado:
   - Para visualizar el entorno de la **Página Landing**, diríjase a la URL: `http://127.0.0.1:8000/`
   - Para adentrarse al entorno del **Dashboard de Monitoreo**, navegue a: `http://127.0.0.1:8000/monitoreo`

## 5. Roadmap de Ingeniería a Corto Plazo
El proyecto ahora demanda la construcción progresiva que otorgue funcionalidad a este molde arquitectónico y estético:

- **Desarrollo Extensivo Frontend Híbrido**: Proceder a programar las plantillas, formularios de seguridad y maquetas en base a React TSX utilizando el entorno visual preparado, rellenando progresivamente el núcleo estructural de `components` en cada página según corresponda.
- **Construcción de Middleware Transaccional**: Evaluar las configuraciones de seguridad (CSRF) y barreras autenticadoras para transacciones inter-modulo (Autenticaciones / API Tokens / Sesiones).
- **Procesamiento Algorítmico Laravel Endpoints**: Definición rigurosa de los API Resources orientados plenamente a consumir estructuras de la base de datos para la ingesta paralela que nutrirá el Dashboard de Monitoreo.
