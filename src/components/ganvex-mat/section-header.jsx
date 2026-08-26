import { Title } from "@/components/title-text";

export function SectionHeader({ label, title, description, className = "" }) {
  return (
    <div
      className={`mb-8 md:mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-10 ${className}`}
    >
      <div className="max-w-xl">
        <Title className="mb-3 text-mainColor dark:text-otherColor" icon={false}>
          {label}
        </Title>
        <h2 className="text-2xl md:text-4xl font-semibold tracking-tighter text-balance">
          {title}
        </h2>
      </div>
      {description && (
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-md md:pb-1">
          {description}
        </p>
      )}
    </div>
  );
}
