import type {CSSProperties} from "react";
import type {Metadata, Viewport} from "next";
import {productionUrl, sitePath} from "@/lib/site-path";
import "./globals.css";
import "./scroll-story.css";

export const metadata: Metadata = {
  metadataBase: new URL(productionUrl),
  title: {
    default: "RYŌ Sushi — El toque final",
    template: "%s — RYŌ Sushi",
  },
  description: "RYŌ Sushi: una experiencia audiovisual de alta cocina japonesa para disfrutar en casa.",
  alternates: {canonical: `${productionUrl}/`},
  icons: {icon: sitePath("/media/ryo-site-icon.png")},
  openGraph: {
    type: "website",
    locale: "es_VE",
    title: "RYŌ Sushi — El toque final",
    description: "El corte es nuestro. El toque final es tuyo. Descubre RYŌ a través de una experiencia audiovisual ligada al scroll.",
    url: `${productionUrl}/`,
    images: [{url: `${productionUrl}/media/box-open.webp`, width: 1672, height: 940, alt: "Caja azul RYŌ abierta en una escena de estudio oscura"}],
  },
  twitter: {card: "summary_large_image"},
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#030303",
  width: "device-width",
  initialScale: 1,
};

const visualTokens = {
  "--pattern-image": `url("${sitePath("/media/ryo-overlapping-arcs-pattern-web.webp")}")`,
} as CSSProperties;

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="es">
      <body className="landing-page" style={visualTokens}>{children}</body>
    </html>
  );
}
