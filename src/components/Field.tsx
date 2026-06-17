import type { ReactNode } from "react";

interface FieldProps {
  label: string;
  children: ReactNode;
}

export default function Field({ label, children }: FieldProps) {
  return (
    <div className="mb-4">
      <label className="mb-1.5 block text-[13px] font-semibold text-slate-600">
        {label}
      </label>
      {children}
    </div>
  );
}
