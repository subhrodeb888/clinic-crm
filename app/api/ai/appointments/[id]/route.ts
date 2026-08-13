import { NextRequest, NextResponse } from "next/server";

import { hasValidApiKey } from "@/lib/api-auth";
import { auth } from "@/auth";
import { appointmentService } from "@/services/appointment.service";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
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

    const body = await request.json();

    const appointment = await appointmentService.updateAppointment(id, body);

    return NextResponse.json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update appointment.",
      },
      { status: 400 },
    );
  }
}
