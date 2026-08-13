"use client";

import { Card } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

export function ProfileSettingsForm() {
  return (
    <Card>
      <div className="mb-6">
        <h2
          className="
            text-lg font-semibold
            text-gray-900
          "
        >
          Profile Settings
        </h2>

        <p
          className="
            mt-1 text-sm
            text-gray-500
          "
        >
          Update your personal information.
        </p>
      </div>

      <form className="space-y-4">
        <Field label="Full Name" value="Admin User" />

        <Field label="Email" value="admin@clinic.com" />

        <Field label="Phone Number" value="+91 9090909090" />

        <div
          className="
            flex justify-end
            border-t border-gray-200
            pt-6
          "
        >
          <Button>Save Profile</Button>
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
