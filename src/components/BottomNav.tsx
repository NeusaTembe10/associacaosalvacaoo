import { useNavigate, useLocation } from "react-router-dom";
import { Home, Users, FileText, User } from "lucide-react";

const items = [
  { key: "inicio", label: "Início", Icon: Home, path: "/home" },
  { key: "departamentos", label: "Departamentos", Icon: Users, path: "/departamentos" },
  { key: "relatorios", label: "Relatórios", Icon: FileText, path: "/relatorios" },
  { key: "perfil", label: "Perfil", Icon: User, path: "/perfil" },
];

function getActiveKey(pathname: string) {
  if (pathname.startsWith("/home") || pathname.startsWith("/cultos")) return "inicio";
  if (pathname.startsWith("/departamentos")) return "departamentos";
  if (pathname.startsWith("/relatorios")) return "relatorios";
  if (pathname.startsWith("/perfil")) return "perfil";
  return "inicio";
}

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const active = getActiveKey(location.pathname);

  return (
    <div className="border-t border-emerald-50 bg-white px-2 pt-2 pb-3">
      <div className="flex items-center justify-between">
        {items.map(({ key, label, Icon, path }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => navigate(path)}
              className="flex flex-1 flex-col items-center gap-1 py-1"
            >
              <Icon size={20} strokeWidth={2} className={isActive ? "text-emerald-700" : "text-slate-300"} />
              <span
                className={`text-[10px] font-medium ${
                  isActive ? "text-emerald-700" : "text-slate-300"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
