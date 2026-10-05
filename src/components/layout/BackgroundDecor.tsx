/** Fixed, decorative page backdrop: fading grid + three slowly drifting colour orbs. */
export function BackgroundDecor() {
  return (
    <div aria-hidden="true" className="no-print pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0" />
      <div
        className="absolute -left-[10%] -top-[20%] h-[60vmax] w-[60vmax] animate-drift rounded-full will-change-transform"
        style={{ background: 'radial-gradient(circle, var(--orb-1), transparent 65%)' }}
      />
      <div
        className="absolute -right-[15%] top-[10%] h-[50vmax] w-[50vmax] animate-drift rounded-full will-change-transform [animation-delay:-6s]"
        style={{ background: 'radial-gradient(circle, var(--orb-2), transparent 65%)' }}
      />
      <div
        className="absolute bottom-[-30%] left-[30%] h-[50vmax] w-[50vmax] animate-drift rounded-full will-change-transform [animation-delay:-12s]"
        style={{ background: 'radial-gradient(circle, var(--orb-3), transparent 65%)' }}
      />
    </div>
  );
}
