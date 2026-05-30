import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const noto = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kotone Ogata｜小規模事業者向け 業務効率化＆書類自動生成",
  description:
    "小規模事業者の事務や集客の詰まりを、AIと仕組みで小さく整える。書類自動生成・業務整理を主軸に、Web制作・LINE導線・AIエージェントまで一貫してサポートします。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={noto.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
