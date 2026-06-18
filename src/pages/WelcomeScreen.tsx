import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import logo from "../assets/logo.jpeg";
export default function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-700/20 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl -ml-48 -mb-48" />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-500 shadow-xl mb-8">
          <img
            src={logo}
            alt="Logo"
            className="w-19 h-19 sm:w-16 sm:h-16 rounded-3xl"
          />
        </div>

        {/* Title */}
        <div className="text-center mb-4">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-2">
            Associação
          </h1>
          <h2 className="text-2xl sm:text-4xl font-semibold text-primary-300 mb-4">
            Salvação
          </h2>
          <p className="text-lg sm:text-xl text-primary-200 font-medium mb-6">
            Plantando os céus na terra
          </p>
        </div>

        {/* Description */}
        <div className="max-w-xl text-center mb-12">
          <p className="text-base sm:text-lg text-primary-100 leading-relaxed">
            Bem-vindo! Este aplicativo foi criado para edificar, acompanhar e
            fortalecer nossa comunidade de fé com tecnologia moderna e
            acessível.
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/login")}
          className="flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-xl bg-white text-primary-900 font-bold text-lg sm:text-xl shadow-2xl hover:shadow-none hover:scale-105 transition-all duration-300"
        >
          Fazer login
          <ChevronRight size={24} strokeWidth={3} />
        </button>

        {/* Footer Text */}
        <p className="absolute bottom-6 sm:bottom-8 text-xs sm:text-sm text-primary-300 text-center">
          Associação de Salvação v1.0
        </p>
      </div>
    </div>
  );
}
