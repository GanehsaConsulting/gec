import { Title } from "@/components/title-text";

export function SectionHeader({ label, title, description }) {
  return (
    <div className="mb-8 md:mb-12 max-w-3xl">
      <Title className="text-mainColor dark:text-otherColor mb-3" icon={false}>
        {label}
      </Title>
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-3">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      )}
    </div>
  );
}
