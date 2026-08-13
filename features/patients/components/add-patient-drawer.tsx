// Runs in the browser
"use client";

// React state hook
import { useState } from "react";

// Reusable button
import { Button } from "@/components/ui/button";

// Reusable drawer
import { Drawer } from "@/components/ui/drawer";

// Patient form
import { PatientForm } from "./patient-form";

// Add patient drawer
export function AddPatientDrawer() {
  // Drawer open/close state
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Open drawer */}
      <Button onClick={() => setOpen(true)}>Add Patient</Button>

      {/* Drawer */}
      <Drawer open={open} onClose={() => setOpen(false)} title="Add Patient">
        {/* Patient form */}
        <PatientForm mode="create" onSuccess={() => setOpen(false)} />
      </Drawer>
    </>
  );
}
