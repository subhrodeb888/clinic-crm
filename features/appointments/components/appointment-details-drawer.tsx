"use client";

import { CalendarDays } from "lucide-react";

import { Drawer } from "@/components/ui/drawer";

import { Badge } from "@/components/ui/badge";

import { Appointment } from "@/types/appointment";

type AppointmentDetailsDrawerProps = {
  open: boolean;

  onClose: () => void;

  appointment: Appointment | null;
};

export function AppointmentDetailsDrawer({
  open,
  onClose,
  appointment,
}: AppointmentDetailsDrawerProps) {
  if (!appointment) return null;

  return (
    <Drawer open={open} onClose={onClose} title="Appointment Details">
      <div className="space-y-8">
        {/* PATIENT INFO */}

        <section>
          <h3 className="section-title mb-4">Patient Information</h3>

          <div className="space-y-3">
            <div>
              <p className="helper-text">Full Name</p>

              <p className="font-medium">
                {appointment.patient.firstName} {appointment.patient.lastName}
              </p>
            </div>

            <div>
              <p className="helper-text">Phone</p>

              <p className="font-medium">{appointment.patient.phone}</p>
            </div>

            <div>
              <p className="helper-text">Date of Birth</p>

              <p className="font-medium">{appointment.patient.dateOfBirth}</p>
            </div>
          </div>
        </section>

        {/* APPOINTMENT DETAILS */}

        <section>
          <h3 className="section-title mb-4">Appointment Details</h3>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CalendarDays size={18} className="text-blue-600" />

              <div>
                <p className="font-medium">{appointment.appointmentDate}</p>

                <p className="helper-text">
                  {appointment.startTime} - {appointment.endTime}
                </p>
              </div>
            </div>

            <div>
              <p className="helper-text mb-2">Status</p>

              <Badge variant="info">{appointment.status}</Badge>
            </div>

            <div>
              <p className="helper-text mb-2">Doctor</p>

              <p className="font-medium">
                Dr. {appointment.doctor.firstName} {appointment.doctor.lastName}
              </p>
            </div>
          </div>
        </section>

        {/* NOTES */}

        <section>
          <h3 className="section-title mb-4">Notes</h3>

          <div
            className="
              rounded-xl border border-gray-200
              bg-gray-50 p-4
            "
          >
            <p className="text-sm text-gray-700">
              {appointment.notes || "No notes available."}
            </p>
          </div>
        </section>

        {/* HISTORY */}

        <section>
          <h3 className="section-title mb-4">Appointment History</h3>

          <div className="space-y-4">
            <div
              className="
                flex gap-3 border-l-2
                border-blue-200 pl-4
              "
            >
              <div>
                <p className="font-medium">Appointment Created</p>

                <p className="helper-text">{appointment.createdAt}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Drawer>
  );
}
