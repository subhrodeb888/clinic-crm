"use client";

import { Card } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

export function PasswordSettings() {
  return (
    <Card>
      <div className="mb-6">
        <h2
          className="
            text-lg font-semibold
            text-gray-900
          "
        >
          Password Settings
        </h2>

        <p
          className="
            mt-1 text-sm
            text-gray-500
          "
        >
          Change your account password.
        </p>
      </div>

      <form className="space-y-4">
        <PasswordField label="Current Password" />

        <PasswordField label="New Password" />

        <PasswordField label="Confirm Password" />

        <div
          className="
            flex justify-end
            border-t border-gray-200
            pt-6
          "
        >
          <Button>Update Password</Button>
        </div>
      </form>
    </Card>
  );
}

type PasswordFieldProps = {
  label: string;
};

function PasswordField({ label }: PasswordFieldProps) {
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

      <Input type="password" placeholder={label} />
    </div>
  );
}
