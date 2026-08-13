"use client";

import { Card } from "@/components/ui/card";

export function DiagnosisSection() {
  return (
    <Card className="p-6">
      {/* HEADER */}

      <div className="mb-6">
        <h2 className="section-title">Diagnosis</h2>

        <p className="helper-text">Clinical assessment and diagnosis</p>
      </div>

      {/* FORM */}

      <div className="space-y-6">
        {/* PRIMARY DIAGNOSIS */}

        <div>
          <label
            htmlFor="primaryDiagnosis"
            className="
              mb-2 block
              text-sm font-medium
              text-gray-700
            "
          >
            Primary Diagnosis
          </label>

          <input
            id="primaryDiagnosis"
            type="text"
            placeholder="Enter primary diagnosis..."
            className="
              w-full
              rounded-xl
              border border-gray-300
              px-4 py-3
              text-sm
              outline-none
              transition-colors

              focus:border-blue-500
            "
          />
        </div>

        {/* SECONDARY DIAGNOSIS */}

        <div>
          <label
            htmlFor="secondaryDiagnosis"
            className="
              mb-2 block
              text-sm font-medium
              text-gray-700
            "
          >
            Secondary Diagnosis
          </label>

          <input
            id="secondaryDiagnosis"
            type="text"
            placeholder="Enter secondary diagnosis..."
            className="
              w-full
              rounded-xl
              border border-gray-300
              px-4 py-3
              text-sm
              outline-none
              transition-colors

              focus:border-blue-500
            "
          />
        </div>

        {/* CLINICAL ASSESSMENT */}

        <div>
          <label
            htmlFor="clinicalAssessment"
            className="
              mb-2 block
              text-sm font-medium
              text-gray-700
            "
          >
            Clinical Assessment
          </label>

          <textarea
            id="clinicalAssessment"
            placeholder="Enter assessment..."
            className="
              min-h-[140px]
              w-full
              rounded-xl
              border border-gray-300
              px-4 py-3
              text-sm
              outline-none
              transition-colors

              focus:border-blue-500
            "
          />
        </div>

        {/* TREATMENT PLAN */}

        <div>
          <label
            htmlFor="treatmentPlan"
            className="
              mb-2 block
              text-sm font-medium
              text-gray-700
            "
          >
            Treatment Plan
          </label>

          <textarea
            id="treatmentPlan"
            placeholder="Enter treatment plan..."
            className="
              min-h-[140px]
              w-full
              rounded-xl
              border border-gray-300
              px-4 py-3
              text-sm
              outline-none
              transition-colors

              focus:border-blue-500
            "
          />
        </div>
      </div>
    </Card>
  );
}
