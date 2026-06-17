import { useState, useEffect } from "react";
import { BookOpen, RotateCw } from "lucide-react";

interface Verse {
  reference: string;
  text: string;
  translation: string;
}

export default function DailyVerse() {
  const [verse, setVerse] = useState<Verse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchVerse = async () => {
    setLoading(true);
    try {
      // Usando uma API pública de bíblia
      const response = await fetch(
        "https://bible-api.com/john%203:16?translation=almeida"
      );
      if (!response.ok) throw new Error("Falha ao buscar versículo");

      const data = await response.json();
      setVerse({
        reference: data.reference,
        text: data.text,
        translation: data.translation?.name || "Almeida",
      });
    } catch (err) {
      // Se falhar, usar um versículo padrão (Marcos 16:15)
      setVerse({
        reference: "Marcos 16:15",
        text: "E disse-lhes: Ide por todo o mundo, pregai o evangelho a toda criatura.",
        translation: "Almeida Revista",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerse();
  }, []);

  return (
    <div className="bg-green-800 rounded-xl shadow-lg p-6 sm:p-8 text-white overflow-hidden relative mb-8">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-400/20 rounded-full -mr-16 -mt-16 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-400/20 rounded-full -ml-12 -mb-12 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/20">
              <BookOpen size={20} />
            </div>
            <h3 className="text-lg font-bold">Versículo do Dia</h3>
          </div>
          <button
            onClick={fetchVerse}
            disabled={loading}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50"
            title="Carregar novo versículo"
          >
            <RotateCw size={18} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        {/* Verse Text */}
        <div className="mb-4">
          {loading ? (
            <div className="space-y-2">
              <div className="h-4 bg-white/20 rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-white/20 rounded w-full animate-pulse" />
              <div className="h-4 bg-white/20 rounded w-2/3 animate-pulse" />
            </div>
          ) : verse ? (
            <>
              <p className="text-base sm:text-lg leading-relaxed font-medium mb-3">
                "{verse.text}"
              </p>
              <p className="text-sm text-white/80 flex items-center gap-2">
                <span className="inline-block w-6 h-px bg-white/50" />
                {verse.reference}
              </p>
            </>
          ) : null}
        </div>

        {/* Footer */}
        {verse && (
          <div className="pt-4 border-t border-white/20">
            <p className="text-xs text-white/70">
              {verse.translation || "Almeida Revista"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
