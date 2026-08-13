import { Card } from "@/components/ui/card";

export function ClinicInformationCard() {
  return (
    <Card>
      <div
        className="
          flex flex-col gap-6

          md:flex-row
          md:justify-between
        "
      >
        {/* LEFT */}

        <div>
          <h2
            className="
              text-xl font-semibold
              text-gray-900
            "
          >
            Sunrise Clinic
          </h2>

          <p
            className="
              mt-2 text-sm
              text-gray-500
            "
          >
            General Medicine & Multi-Speciality Care
          </p>
        </div>

        {/* RIGHT */}

        <div
          className="
            grid gap-4
            md:grid-cols-2
          "
        >
          <InfoItem label="Phone" value="+91 9876543210" />

          <InfoItem label="Email" value="contact@sunriseclinic.com" />

          <InfoItem label="Address" value="Guwahati, Assam" />

          <InfoItem label="Working Hours" value="09:00 AM - 07:00 PM" />
        </div>
      </div>
    </Card>
  );
}

type InfoItemProps = {
  label: string;

  value: string;
};

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div>
      <p
        className="
          text-xs font-medium
          uppercase tracking-wide
          text-gray-500
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1 text-sm
          font-medium
          text-gray-900
        "
      >
        {value}
      </p>
    </div>
  );
}
