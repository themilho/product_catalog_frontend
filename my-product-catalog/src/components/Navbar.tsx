'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    {
      name: '🏠 Início',
      href: '/',
      current: pathname === '/'
    },
    // {
    //   name: '📋 Produtos',
    //   href: '/products',
    //   current: pathname.startsWith('/products')
    // },
    {
      name: '✨ Novo Item',
      href: '/new',
      current: pathname === '/new'
    }
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">🌸</span>
              </div>
              {/* <span className="text-2xl text-rose-800 font-bold">
                Maya Store
              </span> */}
            </Link>
          </div>
          
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  item.current
                    ? 'bg-gradient-to-r from-rose-100 to-rose-200 text-rose-700 shadow-sm'
                    : 'text-rose-600 hover:text-rose-700 hover:bg-rose-50'
                }`}
              >
                {item.name}
              </Link>
            ))}

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;