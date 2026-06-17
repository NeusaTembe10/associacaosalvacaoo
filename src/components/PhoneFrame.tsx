import type { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
}

export default function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-2 sm:p-4 md:p-6">
      {/* Desktop: Phone Frame | Mobile: Full Screen */}
      <div className="relative h-full w-full max-h-[100vh] max-w-[375px] overflow-hidden rounded-[0] border-0 bg-slate-900 shadow-none sm:rounded-[2.5rem] sm:border-[6px] sm:shadow-2xl md:h-[760px] md:w-[375px]">
        <div className="h-full w-full overflow-hidden rounded-[0] sm:rounded-[2.1rem]">
          {children}
        </div>
      </div>
    </div>
  );
}
