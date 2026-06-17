import { useNavigate } from "react-router-dom";
import {
  Users as UsersIcon,
  AlertCircle,
  Loader,
  ArrowLeft,
  UserPlus,
} from "lucide-react";
import { useMembers } from "../context/MembersContext";

export default function ListaScreen() {
  const navigate = useNavigate();
  const { members, loading, error } = useMembers();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-900 to-primary-800 text-white px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate("/cultos")}
              className="p-2 hover:bg-primary-800 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                Membros Registados
              </h1>
              <p className="text-primary-200 text-sm sm:text-base">
                Total de {members.length} membro(s) na comunidade
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Error Message */}
        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-lg bg-red-50 border border-red-200 px-4 sm:px-6 py-4 text-red-800">
            <AlertCircle size={24} className="shrink-0 text-red-600" />
            <p className="font-semibold text-sm">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader size={40} className="text-primary-500 animate-spin mb-4" />
            <p className="text-slate-600 font-semibold mb-1">
              Carregando membros...
            </p>
            <p className="text-slate-500 text-sm">Aguarde um momento</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && members.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <UsersIcon size={32} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Nenhum membro registado
            </h3>
            <p className="text-slate-600 mb-6 max-w-xs">
              Comece a registar membros para acompanhar a participação nos
              cultos
            </p>
            <button
              onClick={() => navigate("/cultos/registro")}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-all"
            >
              <UserPlus size={20} />
              Registar Primeiro Membro
            </button>
          </div>
        )}

        {/* Members Grid */}
        {!loading && members.length > 0 && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary-500">
                <p className="text-slate-600 text-sm font-medium mb-1">Total</p>
                <h3 className="text-3xl font-bold text-slate-900">
                  {members.length}
                </h3>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                <p className="text-slate-600 text-sm font-medium mb-1">
                  Membros
                </p>
                <h3 className="text-3xl font-bold text-slate-900">
                  {members.filter((m) => m.status === "Membro").length}
                </h3>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
                <p className="text-slate-600 text-sm font-medium mb-1">
                  Visitantes
                </p>
                <h3 className="text-3xl font-bold text-slate-900">
                  {members.filter((m) => m.status === "Visitante").length}
                </h3>
              </div>
            </div>

            {/* Members List */}
            <div className="space-y-3">
              {members.map((member) => (
                <div
                  key={member._id}
                  className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-all"
                >
                  <div className="flex gap-4">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-lg font-bold text-primary-700">
                          {member.nome.trim().charAt(0).toUpperCase() || "?"}
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <h3 className="text-lg font-bold text-slate-900">
                          {member.nome}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold w-fit ${
                            member.status === "Membro"
                              ? "bg-green-100 text-green-700"
                              : member.status === "Novo Convertido"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {member.status}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600">
                        {member.idade && (
                          <p>
                            <span className="font-semibold">Idade:</span>{" "}
                            {member.idade} anos
                          </p>
                        )}
                        {member.contacto && (
                          <p>
                            <span className="font-semibold">Telefone:</span>{" "}
                            {member.contacto}
                          </p>
                        )}
                        {member.morada && (
                          <p className="sm:col-span-2">
                            <span className="font-semibold">Morada:</span>{" "}
                            {member.morada}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Add Button */}
      {!loading && members.length > 0 && (
        <div className="sticky bottom-6 right-6 flex justify-end max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/cultos/registro")}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 shadow-lg hover:shadow-xl transition-all"
          >
            <UserPlus size={20} />
            <span className="hidden sm:inline">Novo Membro</span>
          </button>
        </div>
      )}
    </div>
  );
}
