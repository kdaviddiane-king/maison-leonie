export default function Eyebrow({ children, className = "" }) {
  return (
    <p
      className={`text-[11px] uppercase tracking-[0.18em] text-muted ${className}`}
    >
      {children}
    </p>
  );
}
