import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, AuthContextType } from "@/types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database
const MOCK_USERS: Record<string, { password: string; name: string }> = {
  JD4005: {
    password: "1234",
    name: "John Doe",
  },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (soeid: string, password: string) => {
    const mockUser = MOCK_USERS[soeid];
    
    if (!mockUser) {
      return { success: false, error: "Invalid SOEID" };
    }
    
    if (mockUser.password !== password) {
      return { success: false, error: "Invalid password" };
    }

    const userData: User = {
      soeid,
      name: mockUser.name,
    };

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
