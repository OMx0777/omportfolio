/* layout.js */
import "./globals.css";
import FluidBackground from "./FluidBackground"; // Import the background here

export const metadata = {
  title: "Portfolio",
  description: "portfolio website of Om",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Correct way to load fonts in Next.js App Router */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" 
          rel="stylesheet" 
        />
        <link rel="icon" type="image/jpg" href="./imgs/om1.jpg" />
      </head>
      <body>
        <FluidBackground /> {/* Runs once globally, never resets */}
        {children}
      </body>
    </html>
  );
}