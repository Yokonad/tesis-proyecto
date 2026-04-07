<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="description" content="Preventiva Perú - Plataforma de gestión de certificados y validación de seguridad industrial.">
    <title>Preventiva Perú - Certificados</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet">
    @viteReactRefresh
    @vite(['resources/landing/css/app.css', 'resources/landing/app.tsx'])
</head>
<body>
    <div id="landing-root"></div>
</body>
</html>
