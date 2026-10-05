export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only z-50 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-contrast focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      Skip to content
    </a>
  );
}
