'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();

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
            
            {/* Auth Section */}
            <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-rose-200">
              {isLoading ? (
                <div className="text-rose-600">Carregando...</div>
              ) : user ? (
                <>
                  <span className="text-rose-700 text-sm font-medium">
                    Olá, {user.name}!
                  </span>
                  <button
                    onClick={() => {
                      logout();
                      router.push('/');
                    }}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-all duration-200"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-all duration-200"
                  >
                    Entrar
                  </Link>
                  <Link
                    href="/register"
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:from-rose-600 hover:to-rose-700 transition-all duration-200"
                  >
                    Cadastrar
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;