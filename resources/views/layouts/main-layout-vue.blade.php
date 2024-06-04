<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

        <!-- Bootstrap CSS v5.3.3 -->
        <link href="{{ mix('css/app.css') }}" type="text/css" rel="stylesheet" />
    </head>
    <body class="font-sans antialiased dark:bg-black dark:text-white/50">
    <noscript>
        <strong>
            We're sorry this project doesn't work properly without JavaScript enabled. Please enable it to continue.
        </strong>
    </noscript>
    <div id="app">
        {{-- Dynamically Load Layouts --}}
        <layouts-wrapper></layouts-wrapper>
    </div>
    <script type="module" src="{{ mix('js/app.js') }}"></script>
    </body>
</html>