"use client";

import { Card } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

export function ClinicSettingsForm() {
  return (
    <Card>
      <div className="mb-6">
        <h2
          className="
            text-lg font-semibold
            text-gray-900
          "
        >
          Clinic Settings
        </h2>

        <p
          className="
            mt-1 text-sm
            text-gray-500
          "
        >
          Configure clinic profile information and operating details.
        </p>
      </div>

      <form
        className="
          space-y-6
        "
      >
        {/* BASIC INFO */}

        <div
          className="
            grid gap-4
            md:grid-cols-2
          "
        >
          <Field label="Clinic Name" value="Sunrise Clinic" />

          <Field label="Phone Number" value="+91 9876543210" />

          <Field label="Email" value="contact@sunriseclinic.com" />

          <Field label="Address" value="Guwahati, Assam" />
        </div>

        {/* HOURS */}

        <div>
          <h3
            className="
              mb-4 text-sm
              font-semibold
              uppercase tracking-wide
              text-gray-500
            "
          >
            Working Hours
          </h3>

          <div
            className="
              grid gap-4
              md:grid-cols-2
            "
          >
            <Field label="Opening Time" value="09:00" />

            <Field label="Closing Time" value="19:00" />
          </div>
        </div>

        {/* ACTIONS */}

        <div
          className="
            flex justify-end
            border-t border-gray-200
            pt-6
          "
        >
          <Button>Save Settings</Button>
        </div>
      </form>
    </Card>
  );
}

type FieldProps = {
  label: string;

  value: string;
};

function Field({ label, value }: FieldProps) {
  return (
    <div>
      <label
        className="
          mb-2 block
          text-sm font-medium
          text-gray-700
        "
      >
        {label}
      </label>

      <Input defaultValue={value} />
    </div>
  );
}
