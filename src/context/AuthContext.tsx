import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
// import { API_URL } from "../lib/api";

interface User {
  name?: string;
}

interface AuthContextValue {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (name: string, password: string) => Promise<void>;
  logout: () => void;
  authFetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO: reactivar quando backend estiver estável
    // const savedToken = localStorage.getItem("salvacao_token");
    // if (savedToken) {
    //   setToken(savedToken);
    //   setUser(parseJwt(savedToken));
    // }

    // Fase inicial: utilizador sempre autenticado
    setToken("local");
    setUser({ name: "Utilizador" });
  }, []);

  const login = async (name: string, password: string) => {
    setLoading(true);

    // TODO: reactivar autenticação com backend
    // try {
    //   const response = await fetch(`${API_URL}/auth/login`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ name, password }),
    //   });
    //   const data = await response.json();
    //   if (!response.ok) throw new Error(data.error || "Falha no login");
    //   setToken(data.token);
    //   localStorage.setItem("salvacao_token", data.token);
    //   setUser(parseJwt(data.token));
    // } catch (err) {
    //   setError(err instanceof Error ? err.message : "Erro desconhecido");
    //   throw err;
    // } finally {
    //   setLoading(false);
    // }

    // Fase inicial: login local
    setToken("local");
    setUser({ name });
    setLoading(false);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    // localStorage.removeItem("salvacao_token");
  };

  const authFetch = async (input: RequestInfo, init: RequestInit = {}) => {
    // TODO: reactivar verificação de token quando backend estiver estável
    // if (!token) throw new Error("Usuário não autenticado");
    // const headers = new Headers(init.headers ?? {});
    // headers.set("Authorization", `Bearer ${token}`);
    // const response = await fetch(input, { ...init, headers });
    // if (response.status === 401) {
    //   logout();
    //   throw new Error("Sessão expirada. Faça login novamente.");
    // }
    // return response;

    // Fase inicial: fetch sem autenticação
    return fetch(input, init);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      error,
      isAuthenticated: Boolean(token),
      login,
      logout,
      authFetch,
    }),
    [token, user, loading, error],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return ctx;
}