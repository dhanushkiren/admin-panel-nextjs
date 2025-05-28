import '../app/globals.css';
import { Inter } from 'next/font/google';
import { Providers } from '../redux/Providers';
import { ThemeProvider } from '@/context/ThemeProvider';

export const metadata = { title: 'Mini Admin Panel' };
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-light dark:bg-dark transition-colors duration-300`}>
        <ThemeProvider>
        <Providers>
          {children}
        </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}