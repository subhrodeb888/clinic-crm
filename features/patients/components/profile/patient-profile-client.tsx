"use client";

import { useState } from "react";

import { PatientProfileLayout } from "./patient-profile-layout";
import { PatientProfileHeader } from "./patient-profile-header";
import { PatientSummaryCards } from "./patient-summary-cards";
import { PatientProfileTabs, Tab } from "./patient-profile-tabs";
import { PatientStickyActions } from "./patient-sticky-actions";

import { OverviewTab } from "../tabs/overview-tab";
import { BillingTab } from "../tabs/billing-tab";
import { DocumentsTab } from "../tabs/documents-tab";
import { PatientChat } from "../chat/patient-chat";
import { AppointmentsTab } from "../tabs/appointments-tab";

import type { PatientTimelineEvent } from "@/types/patient-timeline";
import type { Doctor } from "@/types/doctor";
import type { Patient } from "@/types/patient";
import type { Invoice } from "@/types/invoice";
import type { PatientDocument } from "@/types/document";
import type { Appointment } from "@/types/appointment";

type Props = {
  patient: Patient;
  doctors: Doctor[];
  totalAppointments: number;
  appointments: Appointment[];
  totalPrescriptions: number;
  lastVisit: Date | null;
  timeline: PatientTimelineEvent[];
  invoices: Invoice[];
  documents: PatientDocument[];
};

export function PatientProfileClient({
  patient,
  doctors,
  totalAppointments,
  totalPrescriptions,
  lastVisit,
  timeline,
  invoices,
  documents,
  appointments
}: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const outstandingBalance = invoices
    .filter(
      (invoice) => invoice.status === "pending" || invoice.status === "partial",
    )
    .reduce((sum, invoice) => sum + invoice.total, 0);

  return (
    <PatientProfileLayout
      header={
        <PatientProfileHeader
          patient={patient}
          outstandingBalance={outstandingBalance}
        />
      }
      summary={
        <PatientSummaryCards
          totalAppointments={totalAppointments}
          outstandingBalance={outstandingBalance}
          prescriptions={totalPrescriptions}
          lastVisit={lastVisit ? lastVisit.toLocaleDateString() : "Never"}
        />
      }
      actions={<PatientStickyActions patient={patient} doctors={doctors} />}
      tabs={
        <PatientProfileTabs activeTab={activeTab} onChange={setActiveTab} />
      }
    >
      {activeTab === "overview" && (
        <OverviewTab
          patient={patient}
          lastVisit={lastVisit}
          timeline={timeline}
          outstandingBalance={outstandingBalance}
        />
      )}

      {activeTab === "appointments" && (
        <AppointmentsTab appointments={appointments} />
      )}

      {activeTab === "billing" && <BillingTab invoices={invoices} />}

      {activeTab === "documents" && (
        <DocumentsTab patient={patient} documents={documents} />
      )}

      {activeTab === "assistant" && <PatientChat patient={patient} />}
    </PatientProfileLayout>
  );
}
