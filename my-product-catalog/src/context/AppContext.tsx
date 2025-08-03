'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import Notification from '@/components/Notification';

type NotificationType = 'success' | 'error' | 'info';

type NotificationState = {
  message: string;
  type: NotificationType;
  id: number;
} | null;

type AppContextType = {
  showNotification: (message: string, type: NotificationType) => void;
  hideNotification: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<NotificationState>(null);

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

  return (
    <AppContext.Provider
      value={{
        showNotification,
        hideNotification,
      }}
    >
      {children}
      {notification && (
        <Notification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          onClose={hideNotification}
        />
      )}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}