import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lightbulb } from "lucide-react";

interface PlaceholderProps {
  title: string;
}

export default function Placeholder({ title }: PlaceholderProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-900 to-primary-800 text-white px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate("/home")}
            className="p-2 hover:bg-primary-800 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col items-center justify-center text-center py-20">
          <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mb-6">
            <Lightbulb size={40} className="text-primary-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            Em Construção
          </h2>
          <p className="text-lg text-slate-600 max-w-md mb-8">
            Esta funcionalidade está em desenvolvimento e em breve estará
            disponível para você.
          </p>
          <button
            onClick={() => navigate("/home")}
            className="px-6 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-all"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    </div>
  );
}
