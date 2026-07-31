import {
  createContext,
  useState,
  type ReactNode,
} from "react";



import authService from "@/services/auth.service";
import type { LoginRequest,LoginResponse, User } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;

  login: (payload: LoginRequest) => Promise<LoginResponse>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
const [user, setUser] = useState<User | null>(() =>
  authService.getCurrentUser()
);

const [loading] = useState(false);

  const login = async (
  payload: LoginRequest
): Promise<LoginResponse> => {
  const response = await authService.login(payload);

  setUser(response.user);

  return response;
};

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
