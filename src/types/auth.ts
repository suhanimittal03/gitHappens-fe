export interface User {
  soeid: string;
  name: string;
}

export interface AuthContextType {
  user: User | null;
  login: (soeid: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}
