<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark'=> ($appearance ?? 'system') == 'dark'])>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Lokal Pikol') }}</title>

    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap" rel="stylesheet">

    <meta
        name="description"
        content="Negros Oriental pickleball courts directory with verified information from court owners. Find local facilities, hours, and contact details." />
    <meta
        name="keywords"
        content="pickleball courts, Negros Oriental, court directory, pickleball facilities, court listings, sports facilities" />
    <meta name="author" content="Lokal Pikol" />

    <meta property="og:url" content="https://directory.lokalpikol.com" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Lokal Pikol | Negros Oriental Pickleball Courts Directory" />
    <meta
        property="og:description"
        content="Negros Oriental pickleball courts directory with verified information from court owners. Find local facilities, hours, and contact details." />
    <meta property="og:image" content="https://directory.lokalpikol.com/images/og-image-v3.jpg" />
    <meta property="og:image:secure_url" content="https://directory.lokalpikol.com/images/og-image-v3.jpg" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:site_name" content="Lokal Pikol | Negros Oriental Pickleball Courts Directory" />

    <meta name="robots" content="index, follow" />
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @production
    <!-- Google Tag Manager (noscript) --><!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-JNMXKBD68M"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', 'G-JNMXKBD68M');
    </script>
    <!-- End Google Tag Manager (noscript) -->
    @endproduction
    @inertia
</body>

</html>