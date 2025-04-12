import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { GNB } from "./components/GNB";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="유용한 개발자 도구 모음 - IP CIDR 계산기, 비밀번호 생성기, 이모지 선택기 등"
        />
        <meta
          name="keywords"
          content="개발자 도구, IP CIDR 계산기, 비밀번호 생성기, 이모지 선택기, 개발 유틸리티"
        />
        <meta name="author" content="Joseph Kim" />
        <meta property="og:title" content="Dongle - 개발자 도구 모음" />
        <meta
          property="og:description"
          content="유용한 개발자 도구 모음 - IP CIDR 계산기, 비밀번호 생성기, 이모지 선택기 등"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dongle-green.vercel.app" />
        <meta
          property="og:image"
          content="https://dongle-green.vercel.app/og-image.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dongle - 개발자 도구 모음" />
        <meta
          name="twitter:description"
          content="유용한 개발자 도구 모음 - IP CIDR 계산기, 비밀번호 생성기, 이모지 선택기 등"
        />
        <meta
          name="twitter:image"
          content="https://dongle-green.vercel.app/og-image.png"
        />
        <link rel="canonical" href="https://dongle-green.vercel.app" />
        <Meta />
        <Links />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2064404929169210"
          crossOrigin="anonymous"
        ></script>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K6LVQQPQ');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K6LVQQPQ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="유용한 개발자 도구 모음 - IP CIDR 계산기, 비밀번호 생성기, 이모지 선택기 등"
        />
        <meta
          name="keywords"
          content="개발자 도구, IP CIDR 계산기, 비밀번호 생성기, 이모지 선택기, 개발 유틸리티"
        />
        <meta name="author" content="Joseph Kim" />
        <meta property="og:title" content="Dongle - 개발자 도구 모음" />
        <meta
          property="og:description"
          content="유용한 개발자 도구 모음 - IP CIDR 계산기, 비밀번호 생성기, 이모지 선택기 등"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dongle-green.vercel.app" />
        <meta
          property="og:image"
          content="https://dongle-green.vercel.app/og-image.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dongle - 개발자 도구 모음" />
        <meta
          name="twitter:description"
          content="유용한 개발자 도구 모음 - IP CIDR 계산기, 비밀번호 생성기, 이모지 선택기 등"
        />
        <meta
          name="twitter:image"
          content="https://dongle-green.vercel.app/og-image.png"
        />
        <link rel="canonical" href="https://dongle-green.vercel.app" />
        <Meta />
        <Links />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2064404929169210"
          crossOrigin="anonymous"
        ></script>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K6LVQQPQ');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K6LVQQPQ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <GNB />
        <main className="pt-16">
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
