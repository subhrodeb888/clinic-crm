import { NextRequest, NextResponse } from "next/server";
import { createPatientApiSchema } from "./schema";

import { hasValidApiKey } from "@/lib/api-auth";
import { auth } from "@/auth";
import { patientService } from "@/services/patient.service";

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

    const input = createPatientApiSchema.parse(body);

    const patient = await patientService.createPatient({
      ...input,

      status: "active",

      assignedDoctorId: null,

      address: "",

      emergencyContact: "",

      notes: "",
    });

    return NextResponse.json({
      success: true,
      data: patient,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create patient.",
      },
      { status: 400 },
    );
  }
}
