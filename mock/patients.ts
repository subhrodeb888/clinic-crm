import { Patient } from "@/types/patient";

export const patients: Patient[] = [
  {
    id: "p1",

    /* BASIC INFO */

    firstName: "Rahul",
    lastName: "Sharma",

    phone: "+91 9876543210",

    email: "rahul@example.com",

    gender: "male",

    dateOfBirth: "1994-03-12",

    /* MEDICAL */

    bloodGroup: "B+",

    notes: "Patient has a history of mild hypertension.",

    /* CONTACT */

    address: "Guwahati, Assam",

    emergencyContact: "+91 9876500000",

    /* OPERATIONAL */

    lastVisit: "2026-05-10",

    assignedDoctor: "Amit Roy",

    balance: 1200,

    status: "follow_up",

    /* SYSTEM */

    createdAt: "2026-01-05",
  },

  {
    id: "p2",

    /* BASIC INFO */

    firstName: "Ananya",
    lastName: "Das",

    phone: "+91 9123456780",

    email: "ananya@example.com",

    gender: "female",

    dateOfBirth: "1998-09-20",

    /* MEDICAL */

    bloodGroup: "O+",

    notes: "Recurring seasonal skin allergy symptoms.",

    /* CONTACT */

    address: "Silchar, Assam",

    emergencyContact: "+91 9123400000",

    /* OPERATIONAL */

    lastVisit: "2026-05-12",

    assignedDoctor: "Priya Sen",

    balance: 0,

    status: "active",

    /* SYSTEM */

    createdAt: "2026-02-10",
  },

  {
    id: "p3",

    /* BASIC INFO */

    firstName: "Sourav",
    lastName: "Dey",

    phone: "+91 9988776655",

    email: "sourav@example.com",

    gender: "male",

    dateOfBirth: "1989-11-05",

    /* MEDICAL */

    bloodGroup: "A+",

    notes: "Patient requires regular cardiac follow-up.",

    /* CONTACT */

    address: "Shillong, Meghalaya",

    emergencyContact: "+91 9988700000",

    /* OPERATIONAL */

    lastVisit: "2026-04-28",

    assignedDoctor: "Amit Roy",

    balance: 5400,

    status: "high_risk",

    /* SYSTEM */

    createdAt: "2025-12-18",
  },

  {
    id: "p4",

    /* BASIC INFO */

    firstName: "Megha",
    lastName: "Paul",

    phone: "+91 9090909090",

    email: "megha@example.com",

    gender: "female",

    dateOfBirth: "2001-07-14",

    /* MEDICAL */

    bloodGroup: "AB+",

    notes: "Routine dermatology consultation completed.",

    /* CONTACT */

    address: "Agartala, Tripura",

    emergencyContact: "+91 9090900000",

    /* OPERATIONAL */

    lastVisit: "2026-03-16",

    assignedDoctor: "Priya Sen",

    balance: 0,

    status: "inactive",

    /* SYSTEM */

    createdAt: "2025-11-22",
  },
];
