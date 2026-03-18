"use client";

export default function GlobalBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full text-zinc-50 selection:bg-cyan-500/30 selection:text-white overflow-hidden">
      {/* Plain dark base */}
      <div className="fixed inset-0 z-0 bg-[#0a0a0b]" />

      {/* Two soft orbs only - minimal */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute w-[min(100vw,700px)] h-[min(70vh,500px)] rounded-full opacity-[0.08] blur-[100px] animate-bg-orb-1"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 65%)',
            top: '15%',
            left: '-5%',
          }}
        />
        <div
          className="absolute w-[min(80vw,500px)] h-[min(55vh,400px)] rounded-full opacity-[0.06] blur-[90px] animate-bg-orb-2"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, transparent 65%)',
            bottom: '10%',
            right: '5%',
          }}
        />
      </div>

      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}
