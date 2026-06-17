import { ArrowLeft } from "lucide-react";

interface ScreenHeaderProps {
  title: string;
  onBack: () => void;
}

export default function ScreenHeader({ title, onBack }: ScreenHeaderProps) {
  return (
    <div className="flex items-center gap-3 px-6 pt-5">
      <button
        onClick={onBack}
        className="rounded-full p-1 text-white active:bg-white/10"
        aria-label="Voltar"
      >
        <ArrowLeft size={22} />
      </button>
      <h1 className="text-xl font-bold text-white">{title}</h1>
    </div>
  );
}
