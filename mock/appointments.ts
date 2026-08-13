import { Appointment } from "@/types/appointment";

import { doctors } from "./doctors";

import { patients } from "./patients";

export const appointments: Appointment[] = [
  {
    id: "a1",

    patientId: "p1",
    doctorId: "d1",

    patient: patients[0],
    doctor: doctors[0],

    appointmentDate: "2026-05-24",

    startTime: "10:00 AM",
    endTime: "10:30 AM",

    status: "confirmed",

    queueStatus: "waiting",

    reason: "Chest pain",

    notes: "Patient reported mild chest discomfort during exercise.",

    createdAt: "2026-05-20",
  },

  {
    id: "a2",

    patientId: "p2",
    doctorId: "d2",

    patient: patients[1],
    doctor: doctors[1],

    appointmentDate: "2026-05-24",

    startTime: "11:00 AM",
    endTime: "11:30 AM",

    status: "checked_in",

    queueStatus: "checked_in",

    reason: "Skin allergy",

    notes: "Recurring seasonal allergy symptoms.",

    createdAt: "2026-05-21",
  },

  {
    id: "a3",

    patientId: "p1",
    doctorId: "d2",

    patient: patients[0],
    doctor: doctors[1],

    appointmentDate: "2026-05-24",

    startTime: "12:00 PM",
    endTime: "12:30 PM",

    status: "in_consultation",

    queueStatus: "in_consultation",

    reason: "Follow-up consultation",

    notes: "Doctor reviewing previous test reports.",

    createdAt: "2026-05-22",
  },

  {
    id: "a4",

    patientId: "p2",
    doctorId: "d1",

    patient: patients[1],
    doctor: doctors[0],

    appointmentDate: "2026-05-24",

    startTime: "02:00 PM",
    endTime: "02:30 PM",

    status: "completed",

    queueStatus: "completed",

    reason: "Routine checkup",

    notes: "Consultation completed successfully.",

    createdAt: "2026-05-22",
  },

  {
    id: "a5",

    patientId: "p1",
    doctorId: "d1",

    patient: patients[0],
    doctor: doctors[0],

    appointmentDate: "2026-05-25",

    startTime: "09:30 AM",
    endTime: "10:00 AM",

    status: "scheduled",

    queueStatus: "waiting",

    reason: "Blood pressure review",

    notes: "Patient asked to bring previous prescriptions.",

    createdAt: "2026-05-23",
  },

  {
    id: "a6",

    patientId: "p2",
    doctorId: "d2",

    patient: patients[1],
    doctor: doctors[1],

    appointmentDate: "2026-05-25",

    startTime: "03:00 PM",
    endTime: "03:30 PM",

    status: "cancelled",

    queueStatus: "completed",

    reason: "Cancelled by patient",

    notes: "Patient requested rescheduling next week.",

    createdAt: "2026-05-23",
  },
];
