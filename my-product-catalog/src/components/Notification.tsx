'use client';

import { useState, useEffect } from 'react';

type NotificationType = 'success' | 'error' | 'info';

type Props = {
  message: string;
  type: NotificationType;
  duration?: number;
  onClose?: () => void;
};

export default function Notification({ message, type, duration = 3000, onClose }: Props) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) return null;

  const bgColor = {
    success: 'bg-green-100 border-green-400 text-green-700',
    error: 'bg-red-100 border-red-400 text-red-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700',
  }[type];

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md">
      <div className={`${bgColor} px-4 py-3 rounded border shadow-md`} role="alert">
        <div className="flex justify-between items-center">
          <span className="block sm:inline">{message}</span>
          <button
            onClick={handleClose}
            className="ml-4 text-gray-500 hover:text-gray-700"
            aria-label="Fechar"
          >
            <svg
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// Componente de contexto para gerenciar notificações globalmente
export function useNotification() {
  const [notification, setNotification] = useState<{
    message: string;
    type: NotificationType;
    id: number;
  } | null>(null);

  const showNotification = (message: string, type: NotificationType) => {
    setNotification({
      message,
      type,
      id: Date.now(), 
    });
  };

  const hideNotification = () => {
    setNotification(null);
  };

  return {
    notification,
    showSuccess: (message: string) => showNotification(message, 'success'),
    showError: (message: string) => showNotification(message, 'error'),
    showInfo: (message: string) => showNotification(message, 'info'),
    hideNotification,
  };
}