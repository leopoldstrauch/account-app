import '../styles/globals.css';
import HamburgerMenu from '@/components/HamburgerMenu';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <title>Buchungssätze Verwaltung</title>
      </head>
      <body className="flex">
        <HamburgerMenu />
        <div className="ml-64 w-full p-4">
          {children}
        </div>
      </body>
    </html>
  );
}
