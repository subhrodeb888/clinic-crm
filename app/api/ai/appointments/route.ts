import { NextRequest, NextResponse } from "next/server";

import { hasValidApiKey } from "@/lib/api-auth";
import { auth } from "@/auth";
import { appointmentService } from "@/services/appointment.service";

export async function GET(request: NextRequest) {
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
    const patientId =
      request.nextUrl.searchParams.get("patientId") ?? undefined;

    if (patientId) {
      const appointments = await appointmentService.searchAppointments({
        patientId,
      });

      return NextResponse.json({
        success: true,
        data: appointments,
      });
    }

    const appointments = await appointmentService.getAppointments();

    return NextResponse.json({ success: true, data: appointments });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to search appointments.",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
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
    const body = await request.json();
    const appointment = await appointmentService.createAppointment(body);

    return NextResponse.json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create appointment.",
      },
      { status: 400 },
    );
  }
}
