import { Invoice } from "@/types/invoice";

import { patients } from "./patients";

export const invoices: Invoice[] = [
  {
    id: "INV-1001",

    patientId: "p1",

    patient: patients[0],

    items: [
      {
        id: "i1",
        name: "Consultation",
        quantity: 1,
        price: 500,
      },
    ],

    subtotal: 500,

    discount: 0,

    total: 500,

    status: "paid",

    paymentMethod: "upi",

    issuedAt: "2026-05-15",
  },

  {
    id: "INV-1002",

    patientId: "p2",

    patient: patients[1],

    items: [
      {
        id: "i2",
        name: "Blood Test",
        quantity: 1,
        price: 1200,
      },
    ],

    subtotal: 1200,

    discount: 100,

    total: 1100,

    status: "pending",

    paymentMethod: "cash",

    issuedAt: "2026-05-18",
  },

  {
    id: "INV-1003",

    patientId: "p3",

    patient: patients[2],

    items: [
      {
        id: "i3",
        name: "ECG",
        quantity: 1,
        price: 1800,
      },
    ],

    subtotal: 1800,

    discount: 0,

    total: 1800,

    status: "partial",

    paymentMethod: "card",

    issuedAt: "2026-05-20",
  },

  {
    id: "INV-1004",

    patientId: "p4",

    patient: patients[3],

    items: [
      {
        id: "i4",
        name: "Dermatology Consultation",
        quantity: 1,
        price: 700,
      },
    ],

    subtotal: 700,

    discount: 0,

    total: 700,

    status: "paid",

    paymentMethod: "upi",

    issuedAt: "2026-05-21",
  },

  {
    id: "INV-1005",

    patientId: "p1",

    patient: patients[0],

    items: [
      {
        id: "i5",
        name: "Follow-Up Consultation",
        quantity: 1,
        price: 600,
      },
    ],

    subtotal: 600,

    discount: 0,

    total: 600,

    status: "pending",

    paymentMethod: "bank_transfer",

    issuedAt: "2026-05-24",
  },

  {
    id: "INV-1006",

    patientId: "p2",

    patient: patients[1],

    items: [
      {
        id: "i6",
        name: "Skin Allergy Panel",
        quantity: 1,
        price: 2500,
      },
    ],

    subtotal: 2500,

    discount: 300,

    total: 2200,

    status: "refunded",

    paymentMethod: "card",

    issuedAt: "2026-05-26",
  },

  {
    id: "INV-1007",

    patientId: "p3",

    patient: patients[2],

    items: [
      {
        id: "i7",
        name: "Cardiology Review",
        quantity: 1,
        price: 1500,
      },
    ],

    subtotal: 1500,

    discount: 0,

    total: 1500,

    status: "paid",

    paymentMethod: "upi",

    issuedAt: "2026-05-28",
  },

  {
    id: "INV-1008",

    patientId: "p4",

    patient: patients[3],

    items: [
      {
        id: "i8",
        name: "Prescription Renewal",
        quantity: 1,
        price: 400,
      },
    ],

    subtotal: 400,

    discount: 0,

    total: 400,

    status: "partial",

    paymentMethod: "cash",

    issuedAt: "2026-05-30",
  },
];
