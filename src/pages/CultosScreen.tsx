import { useNavigate } from "react-router-dom";
import {
  UserPlus,
  List as ListIcon,
  UserX,
  Clock,
  Eye,
  ArrowRight,
} from "lucide-react";
import { useMembers } from "../context/MembersContext";

export default function CultosScreen() {
  const navigate = useNavigate();
  const { members } = useMembers();

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
      <div className="bg-gradient-to-r from-primary-900 to-primary-800 text-black px-4 sm:px-6 lg:px-8 py-8">
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-slate-600 text-sm font-medium mb-2">
              Total de Membros
            </p>
            <h3 className="text-4xl font-bold text-slate-900">
              {members.length}
            </h3>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-slate-600 text-sm font-medium mb-2">
              Presentes Hoje
            </p>
            <h3 className="text-4xl font-bold text-green-600">28</h3>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-slate-600 text-sm font-medium mb-2">
              Taxa de Presença
            </p>
            <h3 className="text-4xl font-bold text-blue-600">89%</h3>
          </div>
        </div>

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
      </div>
    </div>
  );
}
