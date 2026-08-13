import {
  createAppointmentSchema,
  updateAppointmentSchema,
  appointmentSearchSchema,
  type CreateAppointmentInput,
  type UpdateAppointmentInput,
  type AppointmentSearchInput,
} from "@/validations/appointment.schema";

import { appointmentRepository } from "@/repositories/appointment.repository";

import { mapAppointmentToUI } from "./mappers/appointment.mapper";

import { activityService } from "./activity.service";

import { ACTIVITY_ACTIONS } from "@/lib/activity/actions";

import type { AppointmentStatus } from "@/types/enums";

type AppointmentUpdateData = Omit<UpdateAppointmentInput, "appointmentTime"> & {
  startTime?: string;
  endTime?: string;
};

// Calendar/list views load a rolling window by default instead of the entire
// appointments table.
const DEFAULT_RANGE_DAYS = 30;

// Formats a Date as "YYYY-MM-DD" using local time so day boundaries in the
// request window align with the calendar dates users see.
function formatDateOnly(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export class AppointmentService {
  async createAppointment(data: CreateAppointmentInput) {
    const validated = createAppointmentSchema.parse(data);

    const startTime = validated.appointmentTime;

    const endTime = this.calculateEndTime(validated.appointmentTime);

    const appointment = await appointmentRepository.createAppointment({
      ...validated,

      startTime,

      endTime,

      status: "scheduled",

      queueStatus: "waiting",
    });

    await activityService.log({
      action: ACTIVITY_ACTIONS.APPOINTMENT_CREATED,

      entityType: "appointment",

      entityId: appointment.id,
    });

    return appointment;
  }

  async updateAppointment(id: string, data: UpdateAppointmentInput) {
    const existing = await appointmentRepository.getAppointmentById(id);

    if (!existing) {
      throw new Error("Appointment not found");
    }

    const validated = updateAppointmentSchema.parse(data);

    const { appointmentTime, ...rest } = validated;

    const updateData: AppointmentUpdateData = {
      ...rest,
    };

    if (appointmentTime) {
      updateData.startTime = appointmentTime;

      updateData.endTime = this.calculateEndTime(appointmentTime);
    }

    const appointment = await appointmentRepository.updateAppointment(
      id,
      updateData,
    );

    await activityService.log({
      action: ACTIVITY_ACTIONS.APPOINTMENT_UPDATED,

      entityType: "appointment",

      entityId: id,
    });

    return appointment;
  }

  async deleteAppointment(id: string) {
    const existing = await appointmentRepository.getAppointmentById(id);

    if (!existing) {
      throw new Error("Appointment not found");
    }

    await activityService.log({
      action: ACTIVITY_ACTIONS.APPOINTMENT_CANCELLED,

      entityType: "appointment",

      entityId: id,
    });

    return appointmentRepository.deleteAppointment(id);
  }

  async getAppointment(id: string) {
    const appointment = await appointmentRepository.getAppointmentById(id);

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    return mapAppointmentToUI(appointment);
  }

  async getAppointments(
    startDate?: Date,
    endDate?: Date,
    doctorId?: string,
    status?: AppointmentStatus,
  ) {
    const now = new Date();

    const effectiveStartDate =
      startDate ??
      new Date(now.getTime() - DEFAULT_RANGE_DAYS * 24 * 60 * 60 * 1000);

    const effectiveEndDate =
      endDate ??
      new Date(now.getTime() + DEFAULT_RANGE_DAYS * 24 * 60 * 60 * 1000);

    const appointments = await appointmentRepository.getAppointments(
      formatDateOnly(effectiveStartDate),
      formatDateOnly(effectiveEndDate),
      doctorId,
      status,
    );

    return appointments.map(mapAppointmentToUI);
  }

  async getAppointmentsByDoctorAndDate(
    doctorId: string,
    appointmentDate: string,
  ) {
    return appointmentRepository.getAppointmentsByDoctorAndDate(
      doctorId,
      appointmentDate,
    );
  }

  async getTodaysAppointments(doctorId?: string) {
    const appointments =
      await appointmentRepository.getTodaysAppointments(doctorId);

    return appointments.map(mapAppointmentToUI);
  }

  async searchAppointments(filters: AppointmentSearchInput) {
    const validated = appointmentSearchSchema.parse(filters);

    const appointments =
      await appointmentRepository.searchAppointments(validated);

    return appointments.map(mapAppointmentToUI);
  }

  async countAppointmentsByPatient(patientId: string) {
    return appointmentRepository.countAppointmentsByPatient(patientId);
  }

  async getAppointmentsByPatient(patientId: string) {
    const appointments =
      await appointmentRepository.getAppointmentsByPatient(patientId);

    return appointments.map(mapAppointmentToUI);
  }

  async updateAppointmentStatus(id: string, status: string) {
    return appointmentRepository.updateAppointmentStatus(id, status);
  }

  async changeStatus(
    appointmentId: string,
    status:
      | "scheduled"
      | "confirmed"
      | "checked_in"
      | "in_consultation"
      | "completed"
      | "cancelled"
      | "no_show",
  ) {
    const appointment =
      await appointmentRepository.getAppointmentById(appointmentId);

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    await activityService.log({
      action: ACTIVITY_ACTIONS.APPOINTMENT_STATUS_CHANGED,

      entityType: "appointment",

      entityId: appointmentId,

      metadata: {
        status,
      },
    });

    return appointmentRepository.updateAppointment(appointmentId, {
      status,
    });
  }

  async changeQueueStatus(
    appointmentId: string,
    queueStatus: "waiting" | "checked_in" | "in_consultation" | "completed",
  ) {
    const appointment =
      await appointmentRepository.getAppointmentById(appointmentId);

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    await activityService.log({
      action: ACTIVITY_ACTIONS.QUEUE_STATUS_CHANGED,

      entityType: "appointment",

      entityId: appointmentId,

      metadata: {
        queueStatus,
      },
    });

    return appointmentRepository.updateQueueStatus(appointmentId, queueStatus);
  }

  private calculateEndTime(startTime: string) {
    const [hours, minutes] = startTime.split(":").map(Number);

    const date = new Date();

    date.setHours(hours, minutes + 30, 0, 0);

    return date.toTimeString().slice(0, 5);
  }
}

export const appointmentService = new AppointmentService();
