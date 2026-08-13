"use client"; // This component is designed to run on the client side in Next.js

// Import React hook for managing pending state during async actions
import { useTransition } from "react";
// Import React Hook Form for form state management and validation
import { useForm } from "react-hook-form";
// Import Zod resolver to integrate Zod validation with React Hook Form
import { zodResolver } from "@hookform/resolvers/zod";

// Import reusable UI components (Button and Input)
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Import Zod schema and TypeScript type for patient form validation
import {
  createPatientSchema,
  type CreatePatientInput,
} from "@/validations/patient.schema";

// Import server action for creating a new patient
import { createPatient } from "@/actions/patients/create-patient";
// Import Patient type for type safety
import { Patient } from "@/types/patient";

// Import server action for updating an existing patient
import { updatePatient } from "@/actions/patients/update-patient";

// Define props that the PatientForm component accepts
type PatientFormProps = {
  mode: "create" | "edit"; // Determines if form is for creating or editing

  patient?: Patient; // Existing patient data (only provided in edit mode)

  onSuccess?: () => void; // Callback function to execute after successful submission
};

// Main component definition
export function PatientForm({ mode, patient, onSuccess }: PatientFormProps) {
  // useTransition hook to handle async operations with a pending state
  const [isPending, startTransition] = useTransition();

  // Initialize React Hook Form with Zod validation schema and default values
  const {
    register, // Function to register form inputs
    handleSubmit, // Function to handle form submission
    reset, // Function to reset form fields
    formState: { errors }, // Object containing validation errors
  } = useForm<CreatePatientInput>({
    resolver: zodResolver(createPatientSchema), // Connect Zod schema for validation

    defaultValues: {
      // Set default values from patient prop (edit mode) or empty strings (create mode)
      firstName: patient?.firstName ?? "", // If patient exists, use firstName, otherwise empty string

      lastName: patient?.lastName ?? "", // Same pattern for lastName

      phone: patient?.phone ?? "", // Same pattern for phone

      email: patient?.email ?? "", // Same pattern for email

      gender: patient?.gender ?? "male", // Default to "male" if no patient data

      dateOfBirth: patient?.dateOfBirth ?? "", // Same pattern for dateOfBirth

      address: patient?.address ?? "", // Same pattern for address

      emergencyContact: patient?.emergencyContact ?? "", // Same pattern for emergencyContact

      notes: patient?.notes ?? "", // Same pattern for notes

      status: patient?.status ?? "active", // Default to "active" if no patient data
    },
  });

  // Function called when form is submitted and validation passes
  const onSubmit = (values: CreatePatientInput) => {
    // Wrap async operation in startTransition to handle pending state
    startTransition(async () => {
      // Check if mode is "edit" and patient exists
      if (mode === "edit" && patient) {
        // Update existing patient with new values
        await updatePatient(patient.id, values);
      } else {
        // Create new patient with provided values
        await createPatient(values);

        // Reset form fields to default values after successful creation
        reset();
      }

      // Call the onSuccess callback if provided (e.g., close modal, refresh list)
      onSuccess?.();
    });
  };

  // Render the form JSX
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* First row: First Name and Last Name in a grid layout */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-medium">First Name</p> {/* Label */}
          <Input {...register("firstName")} />{" "}
          {/* Input field registered with form */}
          {/* Display validation error if firstName has an error */}
          {errors.firstName && (
            <p className="mt-1 text-xs text-red-600">
              {errors.firstName.message} {/* Show error message */}
            </p>
          )}
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">Last Name</p> {/* Label */}
          <Input {...register("lastName")} />{" "}
          {/* Input field registered with form */}
          {/* Display validation error if lastName has an error */}
          {errors.lastName && (
            <p className="mt-1 text-xs text-red-600">
              {errors.lastName.message} {/* Show error message */}
            </p>
          )}
        </div>
      </div>

      {/* Second row: Phone and Email in a grid layout */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-medium">Phone</p> {/* Label */}
          <Input {...register("phone")} />{" "}
          {/* Input field registered with form */}
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">Email</p> {/* Label */}
          <Input type="email" {...register("email")} />{" "}
          {/* Email input field */}
        </div>
      </div>

      {/* Third row: Gender dropdown and Date of Birth in a grid layout */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-medium">Gender</p> {/* Label */}
          <select
            {...register("gender")} // Register select field with form
            className="
              h-10
              w-full
              rounded-lg
              border
              border-gray-300
              px-3
            "
          >
            <option value="male">Male</option> {/* Option for male */}
            <option value="female">Female</option> {/* Option for female */}
            <option value="other">Other</option> {/* Option for other */}
          </select>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">Date of Birth</p>{" "}
          {/* Label */}
          <Input type="date" {...register("dateOfBirth")} /> {/* Date input */}
        </div>
      </div>

      {/* Address field - full width */}
      <div>
        <p className="mb-2 text-sm font-medium">Address</p> {/* Label */}
        <Input {...register("address")} />{" "}
        {/* Input field registered with form */}
      </div>

      {/* Emergency Contact field - full width */}
      <div>
        <p className="mb-2 text-sm font-medium">Emergency Contact</p>{" "}
        {/* Label */}
        <Input {...register("emergencyContact")} />{" "}
        {/* Input field registered with form */}
      </div>

      {/* Notes textarea - full width */}
      <div>
        <p className="mb-2 text-sm font-medium">Notes</p> {/* Label */}
        <textarea
          rows={4} // Set height to 4 rows
          {...register("notes")} // Register textarea with form
          className="
            w-full
            rounded-lg
            border
            border-gray-300
            px-3
            py-2
          "
        />
      </div>

      {/* Submit button section - aligned to the right */}
      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {/* Show loading text if pending, otherwise show action text */}
          {isPending
            ? mode === "edit"
              ? "Updating..." // Show "Updating..." when editing and pending
              : "Creating..." // Show "Creating..." when creating and pending
            : mode === "edit"
              ? "Update Patient" // Show "Update Patient" in edit mode
              : "Create Patient"}{" "}
          {/* Show "Create Patient" in create mode */}
        </Button>
      </div>
    </form>
  );
}
