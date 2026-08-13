"use client";

import { useState } from "react";

import { Patient } from "@/types/patient";
import { Appointment } from "@/types/appointment";
import { Doctor } from "@/types/doctor";

import { DataTable } from "@/components/tables/data-table";

import { getAppointmentColumns } from "./appointment-columns";
import { AppointmentsTableToolbar } from "./appointments-table-toolbar";

import { AppointmentDetailsDrawer } from "./appointment-details-drawer";

// type Doctor = {
//   id: string;
//   userId: string;
//   firstName: string | null;
//   specialization: string | null;
// };

type AppointmentsTableProps = {
  appointments: Appointment[];

  patients: Patient[];

  doctors: Doctor[];
};

export function AppointmentsTable({
  appointments,
  patients,
  doctors,
}: AppointmentsTableProps) {
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);

  
  function handleViewAppointment(appointment: Appointment) {
    setSelectedAppointment(appointment);
    setDrawerOpen(true);
  }
  
  const columns = getAppointmentColumns(patients, doctors, handleViewAppointment);
  return (
    <>
      <DataTable
        columns={columns}
        data={appointments}
        toolbar={(table) => <AppointmentsTableToolbar table={table} />}
        
      />

      <AppointmentDetailsDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        appointment={selectedAppointment}
      />
    </>
  );
}
