<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Back soon — Lokal Pikol</title>
    <style>
        *,
        *::before,
        *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #0f2244;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            color: #fff;
        }

        .container {
            max-width: 480px;
            display: flex;
            width: 100%;
            text-align: center;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .logo {
            height: 48px;
            margin-bottom: 3rem;
            opacity: 0.95;
        }

        .badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 100px;
            padding: 0.375rem 1rem;
            font-size: 0.75rem;
            font-weight: 600;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: #93c5fd;
            margin-bottom: 1.75rem;
        }

        .badge-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #fbbf24;
            animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {

            0%,
            100% {
                opacity: 1;
            }

            50% {
                opacity: 0.3;
            }
        }

        h1 {
            font-size: 1.75rem;
            font-weight: 700;
            line-height: 1.25;
            margin-bottom: 1rem;
            color: #fff;
        }

        p {
            font-size: 1rem;
            line-height: 1.65;
            color: #93a8c7;
            margin-bottom: 2.5rem;
        }

        .divider {
            width: 40px;
            height: 2px;
            background: rgba(255, 255, 255, 0.15);
            margin: 0 auto 2.5rem;
            border-radius: 2px;
        }

        .footer {
            font-size: 0.8125rem;
            color: rgba(255, 255, 255, 0.3);
        }
    </style>
</head>

<body>
    <div class="container">
        <img class="logo" src="/images/email-header-logo-whiteout.png" alt="Lokal Pikol" />

        <div class="badge">
            <span class="badge-dot"></span>
            Maintenance in progress
        </div>

        <h1>We'll be back on court shortly</h1>

        <p>
            We're doing some work on the site right now.<br>
            Hang tight — we won't be long.
        </p>

        <div class="divider"></div>

        <div class="footer">lokalpikol.com</div>
    </div>
</body>

</html>