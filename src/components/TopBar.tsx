import { Menu, Bell, Settings, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

interface TopBarProps {
  onMenuClick: () => void;
}
const agora = new Date();
const hora = agora.getHours();

let saudacao = "";

if (hora < 12) {
  saudacao = "Bom dia";
} else if (hora < 18) {
  saudacao = "Boa tarde";
} else {
  saudacao = "Boa noite";
}

console.log(saudacao);

export default function TopBar({ onMenuClick }: TopBarProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const auth = useAuth();
  const userName = auth.user?.name ?? "João";

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm ml-3">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        {/* Left: Menu Button (Mobile) + Greeting */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
          >
            <Menu size={24} />
          </button>
          <div className="hidden sm:block">
            <h2 className="text-xl font-bold text-slate-900">
              {saudacao}, {userName}! 👋
            </h2>
            <p className="text-sm text-slate-500">Bem-vindo de volta</p>
           
          </div>
          <div className="sm:hidden">
            <p className="text-sm font-semibold text-slate-900">
              Olá, {userName}!
            </p>
          </div>
        </div>

        {/* Right: Notifications + Settings */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* Settings Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
            >
              <Settings size={20} />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 text-slate-700 text-sm transition-colors">
                  <Settings size={18} />
                  Configurações
                </button>
                <hr className="my-1" />
                <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-red-600 text-sm transition-colors">
                  <LogOut size={18} />
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
