<div align="center">
  
  <h1>Proyecto de Tesis - Sistema de Información</h1>
  
  <p><b>Repositorio Oficial del Proyecto de Investigación y Desarrollo en Laravel</b></p>

  <img src="https://img.shields.io/badge/-Backend-ffb6c1?style=for-the-badge&logoColor=white" />
  <img src="https://img.shields.io/badge/-Arquitectura%20Limpia-ffdfba?style=for-the-badge&logoColor=white" />
  <img src="https://img.shields.io/badge/-Laravel-ffb3ba?style=for-the-badge&logo=laravel&logoColor=white" />
  <img src="https://img.shields.io/badge/-PHP-bae1ff?style=for-the-badge&logo=php&logoColor=white" />
  <img src="https://img.shields.io/badge/-UI%2FUX-baffc9?style=for-the-badge&logoColor=white" />

  <br><br>
  
  <i>Este repositorio contiene el código fuente desarrollado para cumplir con los requisitos académicos y funcionales del proyecto de grado. La arquitectura del sistema está respaldada por metodologías ágiles y patrones de diseño modernos.</i>

</div>

---

## 1. Descripción Sistemática

El presente sistema ha sido diseñado como una solución integral que automatiza y optimiza los procesos definidos en la investigación académica. Todo el núcleo operativo ha sido construido bajo el entorno de **Laravel**, lo que garantiza alta disponibilidad, seguridad de los datos subyacentes y un acoplamiento modular eficiente.

## 2. Stack Tecnológico

Las tecnologías seleccionadas para la infraestructura del proyecto son:

* **Laravel Framework** - Estructura de backend, enrutamiento y lógica de negocio.
* **PHP** - Lenguaje base procesador del lado del servidor.
* **Bases de Datos Relacionales** - Manejo de la persistencia de datos y transacciones.
* **Node & NPM** - Gestión de dependencias y compilación de recursos del frontend (Vite).

## 3. Guía de Despliegue Local

Para configurar y auditar el entorno de desarrollo en una máquina técnica local, por favor siga minuciosamente las siguientes instrucciones:

1. **Clonación del Repositorio:**
   Extraiga el código desde la rama principal.
   ```bash
   git clone https://github.com/Yokonad/tesis-proyecto.git
   cd tesis-proyecto
   ```

2. **Instalación de Dependencias del Servidor:**
   Gestione la instalación de la paquetería de PHP autorizada.
   ```bash
   composer install
   npm install
   ```

3. **Configuración de las Variables de Entorno:**
   Establezca los parámetros de red y credenciales de acceso.
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Migración de Esquemas de Base de Datos:**
   Construya la estructura de datos en el motor de base de datos SQL que haya enlazado en su `.env`.
   ```bash
   php artisan migrate
   ```

5. **Ejecución de Servicios Locales:**
   Levante los servidores de prueba para inspeccionar el panel.
   ```bash
   php artisan serve
   ```

---

<div align="center">
  <p style="color: #666; font-size: 0.9em;">
    <b>Desarrollo Académico y Tecnológico</b><br>
    <i>Todos los derechos reservados sobre la implementación arquitectónica.</i>
  </p>
</div>
