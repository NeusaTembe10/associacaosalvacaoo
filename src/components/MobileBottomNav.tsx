import { useNavigate, useLocation } from "react-router-dom";
import { Home, Users, FileText, User } from "lucide-react";

const items = [
  { key: "home", label: "Início", Icon: Home, path: "/home" },
  {
    key: "departments",
    label: "Departamentos",
    Icon: Users,
    path: "/departamentos",
  },
  { key: "reports", label: "Relatórios", Icon: FileText, path: "/relatorios" },
  { key: "profile", label: "Perfil", Icon: User, path: "/perfil" },
];

function getActiveKey(pathname: string) {
  if (pathname.startsWith("/home") || pathname.startsWith("/cultos"))
    return "home";
  if (pathname.startsWith("/departamentos")) return "departments";
  if (pathname.startsWith("/relatorios")) return "reports";
  if (pathname.startsWith("/perfil")) return "profile";
  return "home";
}

export default function MobileBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const active = getActiveKey(location.pathname);

  return (
    <nav className="bg-green-700 border-t border-slate-200 shadow-lg">
      <div className="flex items-center justify-between px-1">
        {items.map(({ key, label, Icon, path }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => navigate(path)}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 px-2 transition-colors ${
                isActive
                  ? "text-primary-600"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <Icon size={24} strokeWidth={1.5} />
              <span
                className={`text-xs font-medium ${isActive ? "text-primary-600" : "text-slate-500"}`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
