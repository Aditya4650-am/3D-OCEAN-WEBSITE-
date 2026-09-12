import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OCEAN INFOTECH — Explore beneath the surface",
  description: "An immersive marine-life exploration experience.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
