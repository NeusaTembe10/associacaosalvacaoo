import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";
import { useMembers } from "../context/MembersContext";

const emptyMember = {
  nome: "",
  idade: 0,
  morada: "",
  contacto: "",
  status: "Visitante",
};

export default function RegistroScreen() {
  const navigate = useNavigate();
  const { addMember, loading, error } = useMembers();

  const [form, setForm] = useState(emptyMember);
  const [saved, setSaved] = useState(false);
  const [localError, setLocalError] = useState("");

  const update =
    (field: keyof typeof emptyMember) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      let value: any = e.target.value;
      if (field === "idade") {
        value = value ? parseInt(value) : 0;
      }
      setForm((f) => ({ ...f, [field]: value }));
      setLocalError("");
    };

  const handleSave = async () => {
    if (!form.nome.trim()) {
      setLocalError("Nome é obrigatório");
      return;
    }
    try {
      await addMember(form);
      setSaved(true);
      setForm(emptyMember);
      setTimeout(() => setSaved(false), 2200);
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : "Erro ao salvar");
    }
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-900 to-primary-800 text-white px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto flex items-center gap-4 mb-4">
          <button
            onClick={() => navigate("/cultos")}
            className="p-2 hover:bg-primary-800 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Registrar Membro</h1>
            <p className="text-primary-200 text-sm sm:text-base">
              Adicione um novo membro à comunidade
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Success Message */}
        {saved && (
          <div className="mb-6 flex items-center gap-3 rounded-lg bg-green-50 border border-green-200 px-4 sm:px-6 py-4 text-green-800">
            <CheckCircle size={24} className="shrink-0 text-green-600" />
            <div>
              <p className="font-semibold">Membro registado com sucesso!</p>
              <p className="text-sm mt-1 text-green-700">
                O novo membro foi adicionado à lista de participantes
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {displayError && (
          <div className="mb-6 flex items-center gap-3 rounded-lg bg-red-50 border border-red-200 px-4 sm:px-6 py-4 text-red-800">
            <AlertCircle size={24} className="shrink-0 text-red-600" />
            <div>
              <p className="font-semibold">Erro ao registar</p>
              <p className="text-sm mt-1 text-red-700">{displayError}</p>
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mx-auto mb-6">
            <UserPlus size={32} className="text-primary-600" />
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Nome */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Nome Completo <span className="text-red-500">*</span>
              </label>
              <input
                value={form.nome}
                onChange={update("nome")}
                placeholder="Digite o nome completo"
                disabled={loading}
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 transition-all"
              />
            </div>

            {/* Grid 2 columns: Idade e Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Idade
                </label>
                <input
                  value={form.idade || ""}
                  onChange={update("idade")}
                  type="number"
                  min="0"
                  max="150"
                  placeholder="Digite a idade"
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Status
                </label>
                <select
                  value={form.status}
                  onChange={update("status")}
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 transition-all"
                >
                  <option value="Visitante">Visitante</option>
                  <option value="Membro">Membro</option>
                  <option value="Novo Convertido">Novo Convertido</option>
                </select>
              </div>
            </div>

            {/* Morada */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Morada
              </label>
              <input
                value={form.morada}
                onChange={update("morada")}
                placeholder="Digite a morada (rua, bairro)"
                disabled={loading}
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 transition-all"
              />
            </div>

            {/* Contacto */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Contacto (Telefone)
              </label>
              <input
                value={form.contacto}
                onChange={update("contacto")}
                placeholder="Ex: +244 923 456 789"
                disabled={loading}
                type="tel"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 transition-all"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => navigate("/cultos")}
              disabled={loading}
              className="flex-1 px-6 py-3 rounded-lg border-2 border-slate-300 text-slate-900 font-semibold hover:bg-slate-50 transition-all disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex-1 px-6 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Salvando...
                </>
              ) : (
                "Salvar Registro"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
