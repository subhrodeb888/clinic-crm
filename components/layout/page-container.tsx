// Component props
type PageContainerProps = {
  // Content inside <PageContainer>
  children: React.ReactNode;
};

// Adds page padding
export function PageContainer({
  // Get children from props
  children,
}: PageContainerProps) {
  return (
    // Wrapper
    <div className="p-4 md:p-6">
      {/* Render page content */}
      {children}
    </div>
  );
}
