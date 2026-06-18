import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen() {
  const navigate = useNavigate();
  const auth = useAuth();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !password.trim()) {
      setLocalError("Nome e senha são obrigatórios");
      return;
    }

    try {
      await auth.login(name, password);
      navigate("/home", { replace: true });
    } catch (error) {
      setLocalError(error instanceof Error ? error.message : "Falha no login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-3xl bg-white/95 backdrop-blur-xl border border-white/30 shadow-2xl p-8 sm:p-10">
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary-500 text-white flex items-center justify-center mb-4">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Acesso</h1>
          <p className="text-slate-600">Faça login com seu nome e senha</p>
        </div>

        {localError && (
          <div className="mb-6 rounded-2xl bg-rose-50 border border-rose-200 px-4 py-3 text-rose-700">
            <div className="flex items-start gap-2">
              <AlertCircle size={20} />
              <p className="text-sm leading-6">{localError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="text-sm font-semibold text-slate-900">Nome</span>
            <div className="mt-2">
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Digite seu nome"
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
              />
            </div>
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-900">Senha</span>
            <div className="mt-2">
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="Digite sua senha"
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
              />
            </div>
          </label>

          <button
            type="submit"
            className="w-full rounded-2xl bg-primary-600 px-5 py-3 text-white font-semibold hover:bg-primary-700 transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
