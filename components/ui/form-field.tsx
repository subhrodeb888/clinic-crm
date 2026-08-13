type FormFieldProps = {
  label: string;

  error?: string;

  children: React.ReactNode;
};

export function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="label-text">{label}</label>

      {children}

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
