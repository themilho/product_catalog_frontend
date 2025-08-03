import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { AppProvider } from '@/context/AppContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Catálogo de Produtos',
  description: 'Aplicação para gerenciar um catálogo de produtos.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <AppProvider>
          <Navbar />
          <div className="py-6">
            {children}
          </div>
        </AppProvider>
      </body>
    </html>
  );
}