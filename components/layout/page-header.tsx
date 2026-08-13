// Component props
type PageHeaderProps = {
  // Main heading
  title: string;

  // Optional subtitle
  description?: string;

  // Optional buttons/UI
  actions?: React.ReactNode;
};

// Page heading
export function PageHeader({
  // Get props
  title,
  description,
  actions,
}: PageHeaderProps) {
  return (
    // Header layout
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Left side */}
      <div>
        {/* Title */}
        <h1 className="text-2xl font-bold">{title}</h1>

        {/* Show subtitle if provided */}
        {description && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}
      </div>

      {/* Right side */}
      {actions}
    </div>
  );
}
