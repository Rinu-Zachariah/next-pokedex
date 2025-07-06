import React from 'react';
import Image from "next/image";
import { ThemeProvider } from './components/theme-provider';
import './styles/global.css';

export const metadata = {
  title: 'Next Pokedex',
  description: 'Next.js Pokemon Database',
  icons: { icon: 'assets/pokeball.png' },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>
      <ThemeProvider>
        <main className="container max-w-2xl mx-auto my-8 bg-white rounded-2xl shadow-lg p-8">
          <div className="flex flex-col items-center mb-6">
            <Image
              src="/assets/pokemonLogo.png"
              alt="Pokemon"
              width={200}
              height={200}
              className="mb-2"
              priority
            />
          </div>
          {children}
        </main>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
