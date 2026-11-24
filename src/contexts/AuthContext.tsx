import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'guest' | 'client' | 'admin';

interface UserSession {
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  currentUser: UserSession | null;
  role: UserRole;
  isLoggedIn: boolean;
  loginAsClient: (email: string, name: string) => void;
  loginAsAdmin: () => void;
  logout: () => void;
  isPortalOpen: boolean;
  setIsPortalOpen: (open: boolean) => void;
  isAdminDashboardOpen: boolean;
  setIsAdminDashboardOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserSession | null>(() => {
    try {
      const saved = localStorage.getItem('idez_auth_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      email: 'client@idez.ng',
      name: 'Ngozi Adeleke',
      role: 'client',
    };
  });

  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  const loginAsClient = (email: string, name: string) => {
    const user: UserSession = { email, name, role: 'client' };
    setCurrentUser(user);
    try {
      localStorage.setItem('idez_auth_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  };

  const loginAsAdmin = () => {
    const user: UserSession = { email: 'admin@idez.ng', name: 'iDez Studio Director', role: 'admin' };
    setCurrentUser(user);
    try {
      localStorage.setItem('idez_auth_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('idez_auth_user');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role: currentUser?.role || 'guest',
        isLoggedIn: !!currentUser,
        loginAsClient,
        loginAsAdmin,
        logout,
        isPortalOpen,
        setIsPortalOpen,
        isAdminDashboardOpen,
        setIsAdminDashboardOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
