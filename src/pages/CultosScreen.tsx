import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserPlus,
  List as ListIcon,
  UserX,
  Clock,
  Eye,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useMembers } from "../context/MembersContext";
import { API_URL } from "../lib/api";

interface Culto {
  _id?: string;
  data: string;
  tipo: string;
  localizacao: string;
  descricao?: string;
  membros: string[];
}

export default function CultosScreen() {
  const navigate = useNavigate();
  const auth = useAuth();
  const { members } = useMembers();
  const [cultos, setCultos] = useState<Culto[]>([]);
  const [loadingCultos, setLoadingCultos] = useState(false);
  const [cultosError, setCultosError] = useState<string | null>(null);

  const totalMembers = members.length;
  const totalCultos = cultos.length;
  const visitantesCount = members.filter(
    (member) => member.status === "Visitante",
  ).length;
  const novosCount = members.filter(
    (member) => member.status === "Novo Convertido",
  ).length;

  useEffect(() => {
    const fetchCultos = async () => {
      if (!auth.isAuthenticated) {
        setCultos([]);
        return;
      }

      setLoadingCultos(true);
      setCultosError(null);

      try {
        const response = await auth.authFetch(`${API_URL}/cultos`);
        if (!response.ok) {
          throw new Error("Erro ao buscar cultos");
        }
        const data = await response.json();
        setCultos(data);
      } catch (err) {
        setCultosError(
          err instanceof Error ? err.message : "Erro desconhecido",
        );
      } finally {
        setLoadingCultos(false);
      }
    };

    fetchCultos();
  }, [auth]);

  const options = [
    {
      Icon: UserPlus,
      title: "Registrar Participação",
      description: "Adicione e registre novos membros nos cultos",
      color: "from-green-500 to-green-600",
      onClick: () => navigate("/cultos/registro"),
    },
    {
      Icon: ListIcon,
      title: "Listar Membros",
      description: `${members.length} membro${members.length !== 1 ? "s" : ""} registrado${members.length !== 1 ? "s" : ""}`,
      color: "from-blue-500 to-blue-600",
      onClick: () => navigate("/cultos/lista"),
    },
    {
      Icon: UserX,
      title: "Faltas",
      description: "Acompanhe e registre as ausências",
      color: "from-red-500 to-red-600",
      onClick: () => {},
    },
    {
      Icon: Clock,
      title: "Atrasos",
      description: "Monitore atrasos nos cultos",
      color: "from-yellow-500 to-yellow-600",
      onClick: () => {},
    },
    {
      Icon: Eye,
      title: "Visitas",
      description: "Registre e acompanhe visitas",
      color: "from-purple-500 to-purple-600",
      onClick: () => {},
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-900 to-primary-800 text-white px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Cultos</h1>
          <p className="text-primary-200 text-base sm:text-lg">
            Gerencie a participação e desenvolvimento dos membros nos cultos
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-slate-600 text-sm font-medium mb-2">
              Total de Membros
            </p>
            <h3 className="text-4xl font-bold text-slate-900">
              {totalMembers}
            </h3>
            <p className="text-xs text-slate-500 mt-2">
              Dados reais do backend
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-slate-600 text-sm font-medium mb-2">
              Cultos agendados
            </p>
            <h3 className="text-4xl font-bold text-green-600">{totalCultos}</h3>
            <p className="text-xs text-green-600 mt-2">Cultos cadastrados</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-slate-600 text-sm font-medium mb-2">
              Visitantes
            </p>
            <h3 className="text-4xl font-bold text-purple-600">
              {visitantesCount}
            </h3>
            <p className="text-xs text-purple-600 mt-2">Status: Visitante</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-slate-600 text-sm font-medium mb-2">
              Novos convertidos
            </p>
            <h3 className="text-4xl font-bold text-blue-600">{novosCount}</h3>
            <p className="text-xs text-blue-600 mt-2">
              Status: Novo Convertido
            </p>
          </div>
        </div>

        {cultosError && (
          <div className="mb-6 rounded-xl bg-rose-50 border border-rose-200 p-4 text-rose-700">
            Erro ao carregar cultos: {cultosError}
          </div>
        )}

        {loadingCultos && (
          <div className="mb-6 rounded-xl bg-slate-50 border border-slate-200 p-4 text-slate-600">
            Carregando cultos...
          </div>
        )}

        {/* Options Grid */}
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Gerenciar Cultos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {options.map(({ Icon, title, description, color, onClick }, idx) => (
            <button
              key={idx}
              onClick={onClick}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full text-left hover:translate-y-[-4px]"
            >
              <div
                className={`bg-gradient-to-br ${color} h-28 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon size={56} strokeWidth={1.5} />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {title}
                </h3>
                <p className="text-slate-600 text-sm flex-1">{description}</p>
                <div className="flex items-center text-primary-600 font-semibold text-sm mt-4 group-hover:gap-2 transition-all">
                  Abrir
                  <ArrowRight size={16} className="ml-1" />
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Cultos agendados
              </h2>
              <p className="text-slate-600 text-sm">
                {cultos.length} culto{cultos.length !== 1 ? "s" : ""} carregado
                {cultos.length !== 1 ? "s" : ""} do backend
              </p>
            </div>
          </div>

          {cultos.length === 0 && !loadingCultos ? (
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6 text-slate-600">
              Nenhum culto registrado ainda. Use o backend para adicionar cultos
              reais.
            </div>
          ) : null}

          <div className="grid gap-4">
            {cultos.map((culto) => (
              <div
                key={culto._id ?? culto.data}
                className="bg-white rounded-2xl shadow-md p-6 border border-slate-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="text-slate-500 text-sm">
                      {new Date(culto.data).toLocaleDateString("pt-BR", {
                        weekday: "long",
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <h3 className="text-xl font-bold text-slate-900 mt-2">
                      {culto.tipo}
                    </h3>
                    <p className="text-slate-600 mt-1">{culto.localizacao}</p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-primary-100 text-primary-700 px-3 py-1 text-xs font-semibold">
                    {culto.membros.length} membro
                    {culto.membros.length !== 1 ? "s" : ""}
                  </span>
                </div>
                {culto.descricao ? (
                  <p className="text-slate-600 mt-4">{culto.descricao}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
