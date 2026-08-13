import { NextRequest, NextResponse } from "next/server";

import { hasValidApiKey } from "@/lib/api-auth";
import { auth } from "@/auth";
import { doctorService } from "@/services/doctor.service";

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
    const specialization = request.nextUrl.searchParams.get("specialization");

    const doctors = specialization
      ? await doctorService.getDoctorsBySpecialization(specialization)
      : await doctorService.getDoctors();

    return NextResponse.json({
      success: true,
      data: doctors,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to search doctors.",
      },
      { status: 500 },
    );
  }
}
