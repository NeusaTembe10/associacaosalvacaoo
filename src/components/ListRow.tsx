import { ChevronRight, type LucideIcon } from "lucide-react";

interface ListRowProps {
  Icon: LucideIcon;
  title: string;
  subtitle: string;
  onClick?: () => void;
}

export default function ListRow({ Icon, title, subtitle, onClick }: ListRowProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-4 border-b border-slate-100 px-5 py-4 text-left last:border-b-0 active:bg-slate-50"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-900">
        <Icon size={19} className="text-white" strokeWidth={2} />
      </div>
      <div className="flex-1">
        <p className="text-[15px] font-semibold text-slate-800">{title}</p>
        <p className="text-[13px] text-slate-400">{subtitle}</p>
      </div>
      <ChevronRight size={18} className="text-slate-300" />
    </button>
  );
}
