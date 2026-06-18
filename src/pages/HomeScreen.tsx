import { useNavigate } from "react-router-dom";
import { Sparkles, HandHeart, Megaphone, ArrowRight } from "lucide-react";
import DailyVerse from "../components/DailyVerse";
import { useAuth } from "../context/AuthContext";
import { useMembers } from "../context/MembersContext";

export default function HomeScreen() {
  const navigate = useNavigate();
  const auth = useAuth();
  const { members } = useMembers();
  const userName = auth.user?.name ?? "Amigo";

  const totalMembers = members.length;
  const membrosCount = members.filter(
    (member) => member.status === "Membro",
  ).length;
  const visitantesCount = members.filter(
    (member) => member.status === "Visitante",
  ).length;

  const menu = [
    {
      key: "cultos",
      Icon: Sparkles,
      title: "Cultos",
      subtitle: "Verificação e acompanhamento",
      gradient: "from-blue-500 to-blue-600",
      onClick: () => navigate("/cultos"),
    },
    {
      key: "cruzadas",
      Icon: HandHeart,
      title: "Cruzadas",
      subtitle: "Ações e campanhas",
      gradient: "from-purple-500 to-purple-600",
      onClick: () => {},
    },
    {
      key: "evangelizacao",
      Icon: Megaphone,
      title: "Evangelização",
      subtitle: "Alcance vidas para Cristo",
      gradient: "from-orange-500 to-orange-600",
      onClick: () => {},
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 pb-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-900 to-primary-800 text-white px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
           O seu Dashboard de Gestão de Membros, {userName}
          </h1>
          <p className="text-primary-200 text-base sm:text-lg"></p>
        </div>
      </div>

      {/* Daily Verse Card */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-8 bg-">
        <DailyVerse />
      </div>

      {/* Stats Cards */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary-500">
            <p className="text-slate-600 text-sm font-medium mb-1">
              Total de membros
            </p>
            <h3 className="text-3xl font-bold text-slate-900">
              {totalMembers}
            </h3>
            <p className="text-xs text-slate-500 mt-2">
              Dados reais do backend
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <p className="text-slate-600 text-sm font-medium mb-1">Membros</p>
            <h3 className="text-3xl font-bold text-slate-900">
              {membrosCount}
            </h3>
            <p className="text-xs text-blue-600 mt-2">Status: Membro</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <p className="text-slate-600 text-sm font-medium mb-1">
              Visitantes
            </p>
            <h3 className="text-3xl font-bold text-slate-900">
              {visitantesCount}
            </h3>
            <p className="text-xs text-purple-600 mt-2">Status: Visitante</p>
          </div>
        </div>
      </div>

      {/* Menu Cards */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Funcionalidades
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {menu.map(({ key, Icon, title, subtitle, gradient, onClick }) => (
            <button
              key={key}
              onClick={onClick}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full hover:translate-y-[-8px]"
            >
              {/* Top gradient bar */}
              <div
                className={`bg-gradient-to-br ${gradient} h-32 flex items-center justify-center text-white relative overflow-hidden`}
              >
                {/* Animated background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
                </div>

                {/* Icon */}
                <Icon
                  size={64}
                  strokeWidth={1.2}
                  className="relative z-10 group-hover:scale-125 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div className="text-left">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {subtitle}
                  </p>
                </div>
                <div className="mt-4 inline-flex items-center gap-2 text-primary-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transform translate-x-[-20px] group-hover:translate-x-0 transition-all duration-300">
                  <span>Abrir</span>
                  <ArrowRight size={18} />
                </div>
              </div>

              {/* Border glow effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Ações Rápidas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <button className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-7 text-left hover:translate-y-[-6px]">
            {/* Left accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary-500 to-primary-400 rounded-l-2xl group-hover:w-2 transition-all" />

            <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
              📝 Registrar Participação
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Registre a presença dos membros nos cultos
            </p>
          </button>

          <button className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-7 text-left hover:translate-y-[-6px]">
            {/* Left accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-500 to-blue-400 rounded-l-2xl group-hover:w-2 transition-all" />

            <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
              📊 Ver Estatísticas
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Acompanhe o crescimento da comunidade
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
