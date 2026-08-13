import { NextRequest, NextResponse } from "next/server";

import { hasValidApiKey } from "@/lib/api-auth";
import { auth } from "@/auth";
import { appointmentService } from "@/services/appointment.service";
import { TIME_SLOTS } from "@/constants/slots";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  const session = await auth();

  const authenticated = Boolean(session?.user?.id) || hasValidApiKey(request);

  if (!authenticated) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized.",
      },
      { status: 401 },
    );
  }

  try {
    const { id } = await params;

    const date = request.nextUrl.searchParams.get("date");

    if (!date) {
      return NextResponse.json(
        {
          success: false,
          message: "Date is required.",
        },
        {
          status: 400,
        },
      );
    }

    const appointments =
      await appointmentService.getAppointmentsByDoctorAndDate(id, date);

    const bookedSlots = new Set(
      appointments.map(
        (appointment) => `${appointment.startTime}-${appointment.endTime}`,
      ),
    );

    const availableSlots = TIME_SLOTS.filter(
      ([startTime, endTime]) => !bookedSlots.has(`${startTime}-${endTime}`),
    ).map(([startTime, endTime]) => ({
      startTime,
      endTime,
    }));

    return NextResponse.json({
      success: true,
      data: availableSlots,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch available slots.",
      },
      {
        status: 500,
      },
    );
  }
}
