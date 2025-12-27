import { Open_Sans } from 'next/font/google';
import "./globals.css";

// Note: FluidBackground is NOT imported here because we included it 
// directly in page.tsx. This prevents "double background" bugs.

const openSans = Open_Sans({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: "Portfolio",
  description: "Portfolio website of Om",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/jpg" href="/imgs/om1.jpg" />
      </head>
      <body className={openSans.className}>
        {children}
      </body>
    </html>
  );
}