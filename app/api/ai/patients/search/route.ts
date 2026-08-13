import { NextRequest, NextResponse } from "next/server";

import { hasValidApiKey } from "@/lib/api-auth";
import { auth } from "@/auth";
import { patientService } from "@/services/patient.service";

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
    const query = request.nextUrl.searchParams.get("query") ?? "";

    const patients = await patientService.searchPatients({
      query,
    });

    return NextResponse.json({
      success: true,
      data: patients,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to search patients.",
      },
      { status: 500 },
    );
  }
}
