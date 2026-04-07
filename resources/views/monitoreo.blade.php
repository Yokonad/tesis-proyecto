<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="description" content="Monitoreo de seguridad web - Dashboard de analíticas, recolección de logs y monitoreo en tiempo real.">
    <title>Monitoreo - Seguridad Web</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet">
    @viteReactRefresh
    @vite(['resources/monitoreo/css/app.css', 'resources/monitoreo/app.tsx'])
</head>
<body>
    <div id="monitoreo-root"></div>
</body>
</html>
