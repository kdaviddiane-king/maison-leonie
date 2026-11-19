import Link from "next/link";

export default function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[11px] uppercase tracking-[0.18em] transition-colors duration-300";

  const variants = {
    primary: "bg-ink text-cream hover:bg-accent",
    ghost: "border border-line text-ink hover:border-ink",
    light: "bg-cream text-ink hover:bg-sand",
  };

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
