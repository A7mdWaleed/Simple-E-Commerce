import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: number;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call
    if (email && password) {
      setUser({
        id: 1,
        email,
        name: email.split("@")[0],
      });
    }
  };

  const register = async (name: string, email: string, password: string) => {
    // In a real app, this would make an API call
    if (name && email && password) {
      setUser({
        id: Math.floor(Math.random() * 1000),
        email,
        name,
      });
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
