clinic-dashboard/
├── .gitignore
├── auth.ts
├── CLAUDE.md
├── design-system.md
├── drizzle.config.ts
├── eslint.config.mjs
├── flowchart.html
├── middleware.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── project.md
├── README.md
├── tsconfig.json
│
├── actions/
│   ├── appointments/
│   ├── auth/
│   ├── billing/
│   ├── consultations/
│   ├── dashboard/
│   ├── doctor-dashboard/
│   ├── doctors/
│   ├── patient-timeline/
│   ├── patients/
│   ├── prescriptions/
│   ├── reminders/
│   ├── reports/
│   └── search/
│
├── app/
│   ├── api/
│   ├── appointments/
│   ├── billing/
│   ├── dashboard/
│   ├── doctors/
│   ├── patients/
│   ├── queues/
│   ├── reminders/
│   ├── reports/
│   ├── settings/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── dashboard/
│   ├── layout/
│   ├── tables/
│   └── ui/
│
├── db/
│   ├── index.ts
│   ├── seed.ts
│   ├── relations/
│   └── schema/
│
├── features/
│   ├── appointments/
│   ├── billing/
│   ├── consultations/
│   ├── dashboard/
│   ├── doctor-dashboard/
│   ├── patients/
│   ├── queue/
│   ├── reminders/
│   ├── reports/
│   └── settings/
│
├── Flowcharts/
│   └── patients/
│
├── hooks/
│
├── lib/
│   ├── navigation.ts
│   ├── utils.ts
│   ├── activity/
│   ├── auth/
│   └── validations/
│
├── mock/
│   ├── appointments.ts
│   ├── dashboard-analytics.ts
│   ├── doctors.ts
│   ├── invoices.ts
│   ├── patient-timeline.ts
│   ├── patients.ts
│   ├── reminders.ts
│   └── staff.ts
│
├── openai/
│   └── client.ts
│
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── repositories/
│   ├── activity.repository.ts
│   ├── appointment.repository.ts
│   ├── consultation.repository.ts
│   ├── doctor.repository.ts
│   ├── invoice.repository.ts
│   ├── patient-timeline.repository.ts
│   ├── patient.repository.ts
│   ├── prescription.repository.ts
│   └── reminder.repository.ts
│
├── services/
│   ├── mappers/
│   ├── activity.service.ts
│   ├── ai.service.ts
│   ├── appointment.service.ts
│   ├── consultation.service.ts
│   ├── dashboard.service.ts
│   ├── doctor-dashboard.service.ts
│   ├── doctor.service.ts
│   ├── invoice.service.ts
│   ├── notification.service.ts
│   ├── patient-timeline.service.ts
│   ├── patient.service.ts
│   ├── prescription.service.ts
│   ├── reminder.service.ts
│   ├── report.service.ts
│   ├── search.service.ts
│   └── staff.schema.ts
│
├── store/
│   └── sidebar-store.ts
│
├── styles/
│   └── theme.css
│
├── types/
│   ├── appointment.ts
│   ├── consultation-model.ts
│   ├── doctor.ts
│   ├── enums.ts
│   ├── invoice.ts
│   ├── next-auth.d.ts
│   ├── patient.ts
│   ├── patient-timeline.ts
│   ├── prescription.ts
│   ├── prescription-model.ts
│   ├── reminder.ts
│   ├── staff.ts
│   └── timeline.ts
│
└── validations/
    ├── appointment.schema.ts
    ├── consultation.schema.ts
    ├── doctor.schema.ts
    ├── invoice.schema.ts
    ├── invoice-item.schema.ts
    ├── patient.schema.ts
    ├── prescription.schema.ts
    ├── reminder.schema.ts
    ├── search.schema.ts
    └── staff.schema.ts
