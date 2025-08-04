'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterForm>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3002/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Store token in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect to home page
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-rose-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg border border-rose-100">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-rose-900">
            Crie sua conta
          </h2>
          <p className="mt-2 text-center text-sm text-rose-600">
            Ou{' '}
            <Link
              href="/login"
              className="font-medium text-rose-600 hover:text-rose-500"
            >
              faça login na sua conta existente
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-rose-700">
                Nome completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-rose-300 placeholder-rose-500 text-rose-900 rounded-md focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm"
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-rose-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-rose-300 placeholder-rose-500 text-rose-900 rounded-md focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-rose-700">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-rose-300 placeholder-rose-500 text-rose-900 rounded-md focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm"
                placeholder="Sua senha"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-rose-700">
                Confirmar senha
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-rose-300 placeholder-rose-500 text-rose-900 rounded-md focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm"
                placeholder="Confirme sua senha"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Criando conta...' : 'Criar conta'}
            </button>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="font-medium text-rose-600 hover:text-rose-500"
            >
              Voltar para a página inicial
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}