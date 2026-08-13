import { AppointmentStatus } from "./enums";
import { QueueStatus } from "./enums";

import { Doctor } from "./doctor";
import { Patient } from "./patient";

export type Appointment = {
  id: string;

  patientId: string;
  doctorId: string;

  patient: Patient;
  doctor: Doctor;

  appointmentDate: string;

  startTime: string;
  endTime: string;

  status: AppointmentStatus;

  reason?: string;

  notes?: string;

  createdAt: string;

  queueStatus?: QueueStatus;
};
