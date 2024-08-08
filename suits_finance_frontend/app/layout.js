
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// render the notifs outside of the body element
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: "Suits Finance | Journal",
  description: "A journaling app for those who are serious about trading.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{backgroundColor: "var(--color-secondary)"}}>
        <Toaster position={'top-left'} />
        {children}
      </body>
    </html>
  );
}
