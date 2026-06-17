import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export interface Member {
  _id?: string;
  nome: string;
  idade: number;
  morada: string;
  contacto: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

interface MembersContextValue {
  members: Member[];
  loading: boolean;
  error: string | null;
  addMember: (member: Omit<Member, "_id">) => Promise<void>;
  deleteMember: (id: string) => Promise<void>;
  updateMember: (id: string, member: Partial<Member>) => Promise<void>;
  fetchMembers: () => Promise<void>;
}

const MembersContext = createContext<MembersContextValue | null>(null);

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export function MembersProvider({ children }: { children: ReactNode }) {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMembers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/members`);
      if (!response.ok) throw new Error("Erro ao buscar membros");
      const data = await response.json();
      setMembers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  const addMember = async (member: Omit<Member, "_id">) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(member),
      });
      if (!response.ok) throw new Error("Erro ao criar membro");
      const newMember = await response.json();
      setMembers((prev) => [newMember, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteMember = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/members/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Erro ao deletar membro");
      setMembers((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateMember = async (id: string, updates: Partial<Member>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/members/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error("Erro ao atualizar membro");
      const updated = await response.json();
      setMembers((prev) => prev.map((m) => (m._id === id ? updated : m)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <MembersContext.Provider
      value={{
        members,
        loading,
        error,
        addMember,
        deleteMember,
        updateMember,
        fetchMembers,
      }}
    >
      {children}
    </MembersContext.Provider>
  );
}

export function useMembers(): MembersContextValue {
  const ctx = useContext(MembersContext);
  if (!ctx) {
    throw new Error("useMembers deve ser usado dentro de <MembersProvider>");
  }
  return ctx;
}
