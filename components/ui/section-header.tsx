type SectionHeaderProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
};

export function SectionHeader({
  title,
  description,
  actions,
}: SectionHeaderProps) {
  return (
    <div
      className="
        mb-4 flex items-center justify-between
      "
    >
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>

        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>

      {actions}
    </div>
  );
}
