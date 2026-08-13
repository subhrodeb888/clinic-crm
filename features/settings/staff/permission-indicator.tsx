import { UserRole } from "@/types/enums";

type PermissionIndicatorProps = {
  role: UserRole;
};

export function PermissionIndicator({ role }: PermissionIndicatorProps) {
  const permissions = {
    admin: ["Billing", "Reports", "Settings", "Staff"],

    doctor: ["Patients", "Consultations", "Prescriptions"],

    receptionist: ["Appointments", "Patients", "Reminders"],
  };

  return (
    <div className="flex flex-wrap gap-2">
      {permissions[role].map((permission) => (
        <span
          key={permission}
          className="
              rounded-md
              bg-gray-100
              px-2 py-1
              text-xs
              text-gray-600
            "
        >
          {permission}
        </span>
      ))}
    </div>
  );
}
