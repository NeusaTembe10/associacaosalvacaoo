import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import { Home, Users, FileText, User, X } from "lucide-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const items = [
  { key: "home", label: "Início", Icon: Home, path: "/home" },
  { key: "departments", label: "Departamentos", Icon: Users, path: "/departamentos" },
  { key: "reports", label: "Relatórios", Icon: FileText, path: "/relatorios" },
  { key: "profile", label: "Perfil", Icon: User, path: "/perfil" },
];

function getActiveKey(pathname: string) {
  if (pathname.startsWith("/home") || pathname.startsWith("/cultos")) return "home";
  if (pathname.startsWith("/departamentos")) return "departments";
  if (pathname.startsWith("/relatorios")) return "reports";
  if (pathname.startsWith("/perfil")) return "profile";
  return "home";
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const active = getActiveKey(location.pathname);

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {/* OVERLAY MOBILE */}
      <div
        onClick={onClose}
        className={`md:hidden fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* SIDEBAR DESKTOP */}
      <aside className="hidden md:flex w-72 h-screen flex-col bg-gradient-to-b from-[#06130d] via-[#0b1f14] to-[#10281b] border-r border-white/10 shadow-2xl">

        {/* LOGO HEADER */}
        <div className="flex flex-col items-center justify-center px-6 py-8 border-b border-white/10">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-green-500/30 shadow-lg shadow-green-500/20">
            <img src={logo} alt="logo" className="w-full h-full object-cover" />
          </div>

          <h2 className="mt-4 text-lg font-bold text-white">Associação</h2>
          <p className="text-sm text-green-300">Salvação</p>
        </div>

        {/* MENU */}
        <nav className="flex-1 px-4 py-8 space-y-2">
          {items.map(({ key, label, Icon, path }) => {
            const isActive = active === key;

            return (
              <button
                key={key}
                onClick={() => handleNavigation(path)}
                className={`
                  group relative w-full flex items-center gap-4 px-4 py-4 rounded-2xl
                  transition-all duration-300
                  ${
                    isActive
                      ? "bg-green-500/15 text-white shadow-lg"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                {isActive && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-green-500" />
                )}

                <Icon
                  size={20}
                  className={`transition-transform duration-300 ${
                    isActive ? "text-green-400" : "group-hover:scale-110"
                  }`}
                />

                <span className="text-sm font-medium">{label}</span>
              </button>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className="px-6 py-6 border-t border-white/10">
          <div className="rounded-xl bg-white/5 backdrop-blur-sm p-4">
            <p className="text-center text-xs text-white/50">
              Associação de Salvação
            </p>
            <p className="text-center text-[11px] text-white/40 mt-1">
              Versão 1.0
            </p>
          </div>
        </div>
      </aside>

      {/* SIDEBAR MOBILE */}
      <aside
        className={`md:hidden fixed top-0 left-0 h-screen w-[80vw] max-w-[280px] z-50
        flex flex-col bg-gradient-to-b from-[#06130d] via-[#0b1f14] to-[#10281b]
        border-r border-white/10 shadow-2xl transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* MOBILE HEADER */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-green-500/30">
              <img src={logo} alt="logo" className="w-full h-full object-cover" />
            </div>

            <div>
              <h1 className="font-bold text-white">Associação</h1>
              <p className="text-xs text-green-300">Salvação</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/10 text-white/60"
          >
            <X size={20} />
          </button>
        </div>

        {/* MENU MOBILE */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {items.map(({ key, label, Icon, path }) => {
            const isActive = active === key;

            return (
              <button
                key={key}
                onClick={() => handleNavigation(path)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl
                  transition-all duration-300
                  ${
                    isActive
                      ? "bg-green-500/15 text-white"
                      : "text-white/60 hover:bg-black hover:text-white"
                  }
                `}
              >
                <Icon size={20} className={isActive ? "text-green-400" : ""} />
                <span className="text-sm">{label}</span>
              </button>
            );
          })}
        </nav>

        {/* MOBILE FOOTER */}
        <div className="px-6 py-6 border-t border-white/10">
          <p className="text-center text-xs text-white/50">
            Associação de Salvação v1.0
          </p>
        </div>
      </aside>
    </>
  );
}