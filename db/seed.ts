import "dotenv/config";

import { eq } from "drizzle-orm";

import { db } from "./index";

import {
  users,
  doctors,
  patients,
  appointments,
  consultations,
  prescriptions,
  prescriptionItems,
  invoices,
  invoiceItems,
  reminders,
  notifications,
  activityLogs,
  aiUsageLogs,
  documents,
  documentChunks,
  chatSessions,
  chatMessages,
} from "./schema";

/* ======================================================================
 * Deterministic PRNG (mulberry32)
 * ---------------------------------------------------------------
 * Every piece of "randomness" flows through this generator so that re-running
 * the seed produces the same dataset (content is stable; UUIDs differ).
 * ====================================================================== */

const SEED = 20260213;

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rng = mulberry32(SEED);

function randomElement<T>(arr: readonly T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number, decimals = 2): number {
  return parseFloat((rng() * (max - min) + min).toFixed(decimals));
}

function chance(p: number): boolean {
  return rng() < p;
}

function hashString(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  }
  return h >>> 0;
}

/* ======================================================================
 * Domain constants
 * ====================================================================== */

const INDIAN_FIRST_NAMES_MALE = [
  "Aarav", "Vihaan", "Vivaan", "Ananya", "Diya", "Advik", "Kabir", "Aarush",
  "Arjun", "Reyansh", "Ayaan", "Ishaan", "Shaurya", "Aadi", "Dhruv", "Rudra",
  "Tanay", "Pranav", "Kian", "Aryan", "Rohan", "Krishna", "Shiv", "Ved",
  "Rahul", "Amit", "Vikram", "Rajesh", "Suresh", "Mahesh", "Dinesh", "Ramesh",
  "Sunil", "Sanjay", "Vijay", "Ajay", "Manoj", "Rajiv", "Alok", "Deepak",
];

const INDIAN_FIRST_NAMES_FEMALE = [
  "Aanya", "Aadhya", "Anaya", "Anika", "Aarohi", "Ishita", "Myra", "Sara",
  "Aashi", "Riya", "Priya", "Neha", "Pooja", "Shreya", "Sneha", "Kavya",
  "Divya", "Nisha", "Kriti", "Anjali", "Swati", "Pallavi", "Ritu", "Garima",
  "Deepika", "Shalini", "Megha", "Namita", "Roshni", "Vandana", "Rekha", "Asha",
];

const INDIAN_LAST_NAMES = [
  "Sharma", "Verma", "Gupta", "Kumar", "Singh", "Patel", "Reddy", "Rao",
  "Nair", "Menon", "Iyer", "Iyengar", "Joshi", "Deshmukh", "Kulkarni",
  "Desai", "Patil", "Jadhav", "Chavan", "Pawar", "More", "Yadav", "Pandey",
  "Mishra", "Tiwari", "Dubey", "Tripathi", "Chaturvedi", "Agarwal", "Jain",
  "Mehta", "Shah", "Kapoor", "Malhotra", "Chopra", "Bhatia", "Saxena",
  "Garg", "Bansal", "Goel", "Arora", "Sood", "Bhatt", "Rawat", "Negi",
];

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const STREETS = [
  "MG Road", "Jayanagar", "Indiranagar", "Koramangala", "BTM Layout",
  "JP Nagar", "HSR Layout", "Marathahalli", "Whitefield", "Electronic City",
  "Banashankari", "Basavanagudi", "Malleshwaram", "Rajajinagar", "Vijayanagar",
  "Sadashivanagar", "Ulsoor", "Shivajinagar", "Frazer Town", "Koramangala",
];

const CITIES = [
  "Bengaluru", "Mumbai", "Delhi", "Chennai", "Kolkata", "Hyderabad",
  "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Surat", "Mysuru",
];

const APPOINTMENT_REASONS = [
  "General Checkup", "Fever and Cold", "Headache", "Body Pain",
  "Routine Blood Test", "Vaccination", "Eye Examination", "Dental Pain",
  "Stomach Ache", "Skin Rash", "Allergy Consultation", "Diabetes Follow-up",
  "Blood Pressure Check", "Thyroid Check", "Annual Physical Examination",
  "Chest Pain", "Back Pain", "Joint Pain", "Cough and Cold",
  "Digestive Issues", "Hair Loss", "Weight Management",
  "Sleep Disorders", "Anxiety Consultation", "Prenatal Checkup",
];

const DIAGNOSES = [
  "Acute Upper Respiratory Tract Infection", "Hypertension Stage 1",
  "Type 2 Diabetes Mellitus", "Iron Deficiency Anemia", "Acute Gastroenteritis",
  "Urinary Tract Infection", "Allergic Rhinitis", "Bronchial Asthma",
  "Osteoarthritis", "Hypothyroidism", "Vitamin D Deficiency",
  "Migraine without Aura", "Anxiety Disorder", "Contact Dermatitis",
  "Conjunctivitis", "Otitis Media", "Sinusitis", "Tonsillitis",
  "Cervical Spondylosis", "Lumbar Spondylosis", "Gastritis",
  "Irritable Bowel Syndrome", "Insomnia", "Hyperlipidemia",
];

const MEDICINE_NAMES = [
  "Paracetamol 500mg", "Amoxicillin 500mg", "Azithromycin 500mg",
  "Ciprofloxacin 500mg", "Dolo 650mg", "Ibuprofen 400mg",
  "Omeprazole 20mg", "Pantoprazole 40mg", "Metformin 500mg",
  "Amlodipine 5mg", "Telmisartan 40mg", "Atorvastatin 10mg",
  "Thyronorm 50mcg", "Levothyroxine 25mcg", "Augmentin 625mg",
  "Montelukast 10mg", "Levocetirizine 5mg", "Cetirizine 10mg",
  "Allegra 120mg", "Calcium Carbonate 500mg", "Vitamin D3 60K",
  "Ferrous Sulfate 200mg", "Folic Acid 5mg", "Metrogyl 400mg",
  "Ondansetron 4mg", "Domperidone 10mg", "Rabeprazole 20mg",
  "Salbutamol Inhaler", "Fluticasone Inhaler", "Becosules Capsule",
];

const INVOICE_ITEM_PRICES: [string, number][] = [
  ["Consultation Fee", 400],
  ["Blood Test - CBC", 300],
  ["Blood Test - Thyroid Profile", 550],
  ["Blood Test - Lipid Profile", 650],
  ["Blood Test - Liver Function", 700],
  ["Blood Test - Kidney Function", 700],
  ["X-Ray Chest", 500],
  ["X-Ray Knee", 450],
  ["ECG", 350],
  ["Echocardiogram", 1800],
  ["Ultrasound Abdomen", 1200],
  ["CT Scan Head", 3200],
  ["MRI Scan", 6500],
  ["Vaccination Fee", 500],
  ["Dressing Charge", 250],
  ["Injection Charge", 150],
  ["Nebulization", 300],
  ["HbA1c Test", 600],
  ["Urine Routine Test", 250],
  ["Dengue NS1 Test", 900],
  ["Vitamin D Test", 1200],
  ["Allergy Test Panel", 2400],
];

const AI_FEATURES = [
  "consultation-summary", "diagnosis-suggestion", "prescription-generator",
  "lab-report-analysis", "patient-history-summary", "appointment-notes",
  "followup-recommendation", "medical-report-generation",
];

/* 30-minute clinic slots — must match ../appointments constants/slots.ts */
const TIME_SLOTS: [string, string][] = [
  ["09:00", "09:30"], ["09:30", "10:00"], ["10:00", "10:30"], ["10:30", "11:00"],
  ["11:00", "11:30"], ["11:30", "12:00"], ["12:00", "12:30"], ["12:30", "13:00"],
  ["14:00", "14:30"], ["14:30", "15:00"], ["15:00", "15:30"], ["15:30", "16:00"],
  ["16:00", "16:30"], ["16:30", "17:00"],
];

const STAFF_SPECS = [
  { name: "Clinic Admin", email: "admin@sunriseclinic.in", role: "admin" as const },
  { name: "Rekha Receptionist", email: "reception1@sunriseclinic.in", role: "receptionist" as const },
  { name: "Manoj Receptionist", email: "reception2@sunriseclinic.in", role: "receptionist" as const },
];

const DOCTOR_SPECS = [
  { name: "Dr. Amit Roy", email: "dr.amit.roy@sunriseclinic.in", firstName: "Amit", lastName: "Roy", specialization: "Cardiology", license: "MED-10001" },
  { name: "Dr. Priya Sen", email: "dr.priya.sen@sunriseclinic.in", firstName: "Priya", lastName: "Sen", specialization: "Dermatology", license: "MED-10002" },
  { name: "Dr. Rajesh Verma", email: "dr.rajesh.verma@sunriseclinic.in", firstName: "Rajesh", lastName: "Verma", specialization: "General Medicine", license: "MED-10003" },
  { name: "Dr. Sunita Iyer", email: "dr.sunita.iyer@sunriseclinic.in", firstName: "Sunita", lastName: "Iyer", specialization: "Pediatrics", license: "MED-10004" },
];

/* ======================================================================
 * Date helpers (all local time so day boundaries match the UI)
 * ====================================================================== */

function dateOnly(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function addDays(d: Date, days: number): Date {
  const c = new Date(d);
  c.setDate(c.getDate() + days);
  return c;
}

function isWeekend(d: Date): boolean {
  const day = d.getDay();
  return day === 0 || day === 6;
}

function shiftToBusinessDay(d: Date): Date {
  let c = new Date(d);
  while (isWeekend(c)) c = addDays(c, 1);
  return c;
}

function atTime(d: Date, time: string): Date {
  const [h, m] = time.split(":").map(Number);
  const c = new Date(d);
  c.setHours(h, m, 0, 0);
  return c;
}

/* ======================================================================
 * Embeddings (RAG demo)
 * ---------------------------------------------------------------
 * Real OpenAI embeddings are used when an OPENAI_API_KEY is present; otherwise
 * (or on failure) deterministic pseudo-embeddings keep vector storage valid.
 * ====================================================================== */

function pseudoEmbedding(text: string, dims = 1536): number[] {
  const r = mulberry32(hashString(text));
  const v = new Array<number>(dims);
  let norm = 0;
  for (let i = 0; i < dims; i++) {
    const x = r() * 2 - 1;
    v[i] = x;
    norm += x * x;
  }
  norm = Math.sqrt(norm) || 1;
  for (let i = 0; i < dims; i++) v[i] = v[i] / norm;
  return v;
}

async function embedAll(texts: string[]): Promise<number[][]> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || process.env.SEED_REAL_EMBEDDINGS === "0") {
    return texts.map((t) => pseudoEmbedding(t));
  }
  try {
    const OpenAI = (await import("openai")).default;
    const client = new OpenAI({ apiKey });
    const res = await client.embeddings.create({
      model: "text-embedding-3-small",
      input: texts,
    });
    return res.data.map((d) => d.embedding);
  } catch (e) {
    console.warn(
      "  ⚠ Real embeddings unavailable, using deterministic pseudo-embeddings:",
      (e as Error).message,
    );
    return texts.map((t) => pseudoEmbedding(t));
  }
}

async function seed() {
  console.log("🌱 Seeding database...\n");

  /* ---- Clear existing data (reverse dependency order) ---- */
  console.log("🧹 Clearing existing data...");
  await db.delete(chatMessages);
  await db.delete(chatSessions);
  await db.delete(documentChunks);
  await db.delete(documents);
  await db.delete(reminders);
  await db.delete(invoiceItems);
  await db.delete(invoices);
  await db.delete(prescriptionItems);
  await db.delete(prescriptions);
  await db.delete(consultations);
  await db.delete(appointments);
  await db.delete(aiUsageLogs);
  await db.delete(activityLogs);
  await db.delete(notifications);
  await db.delete(patients);
  await db.delete(doctors);
  await db.delete(users);
  console.log("✅ Existing data cleared\n");

  /* ---- Users ---- */
  console.log("🌱 Seeding users...");
  const userRecords = [
    ...STAFF_SPECS.map((s) => ({
      id: crypto.randomUUID(),
      name: s.name,
      email: s.email,
      role: s.role,
      emailVerified: true,
      createdAt: new Date("2024-01-01T09:00:00Z"),
      updatedAt: new Date("2024-01-01T09:00:00Z"),
    })),
    ...DOCTOR_SPECS.map((d) => ({
      id: crypto.randomUUID(),
      name: d.name,
      email: d.email,
      role: "doctor" as const,
      emailVerified: true,
      createdAt: new Date("2024-01-01T09:00:00Z"),
      updatedAt: new Date("2024-01-01T09:00:00Z"),
    })),
  ];
  const insertedUsers = await db.insert(users).values(userRecords).returning();
  console.log(`✅ ${insertedUsers.length} users seeded`);

  const adminUser = insertedUsers[0];
  const receptionistUsers = insertedUsers.filter((u) => u.role === "receptionist");
  const doctorUsers = insertedUsers.filter((u) => u.role === "doctor");

  /* ---- Doctors ---- */
  console.log("🌱 Seeding doctors...");
  const doctorRecords = DOCTOR_SPECS.map((spec, i) => ({
    userId: insertedUsers[STAFF_SPECS.length + i].id,
    specialization: spec.specialization,
    licenseNumber: spec.license,
  }));
  const insertedDoctors = await db.insert(doctors).values(doctorRecords).returning();
  console.log(`✅ ${insertedDoctors.length} doctors seeded`);

  /* ---- Patients ---- */
  console.log("🌱 Seeding patients...");
  const PATIENT_COUNT = 40;
  const patientRecords: {
    firstName: string; lastName: string; email: string; phone: string;
    gender: string; dateOfBirth: string; bloodGroup: string; address: string;
    notes: string | null; emergencyContact: string | null;
    assignedDoctorId: string | null; lastVisit: Date | null; balance: string;
    status: string; createdAt: Date; updatedAt: Date;
  }[] = [];

  for (let i = 0; i < PATIENT_COUNT; i++) {
    const gender = i % 2 === 0 ? "male" : "female";
    const firstPool = gender === "male" ? INDIAN_FIRST_NAMES_MALE : INDIAN_FIRST_NAMES_FEMALE;
    const firstName = firstPool[i % firstPool.length];
    const lastName = INDIAN_LAST_NAMES[(i * 7) % INDIAN_LAST_NAMES.length];
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`;
    const phone = `+91 ${String(7000000000 + i * 9973).slice(0, 10)}`;
    const age = 18 + ((i * 7) % 62);
    const dob = new Date(new Date().getFullYear() - age, i % 12, 1 + (i % 27));
    const bloodGroup = BLOOD_GROUPS[i % BLOOD_GROUPS.length];
    const assignedDoctor = i % 9 === 7 ? null : insertedDoctors[i % insertedDoctors.length].id;
    const status = i % 13 === 0 ? "follow_up" : i % 17 === 0 ? "high_risk" : i % 19 === 0 ? "inactive" : "active";
    const notes =
      status === "follow_up" || status === "high_risk"
        ? "Needs priority follow-up; monitor symptoms closely."
        : i % 5 === 0
          ? "Routine care; no significant medical history."
          : null;
    const createdAt = addDays(new Date(), -(((i * 13) % 700) + 30));

    patientRecords.push({
      firstName,
      lastName,
      email,
      phone,
      gender,
      dateOfBirth: dateOnly(dob),
      bloodGroup,
      address: `${10 + i}, ${STREETS[i % STREETS.length]}, ${CITIES[i % CITIES.length]}`,
      notes,
      emergencyContact: `+91 ${String(8000000000 + i * 9973).slice(0, 10)}`,
      assignedDoctorId: assignedDoctor,
      lastVisit: null,
      balance: "0",
      status,
      createdAt,
      updatedAt: createdAt,
    });
  }

  const insertedPatients = await db.insert(patients).values(patientRecords).returning();
  console.log(`✅ ${insertedPatients.length} patients seeded`);

  /* ---- Appointments ---- */
  console.log("🌱 Seeding appointments...");

  const usedSlots = new Set<string>();
  function pickSlot(doctorId: string, date: Date): [string, string] {
    const dateStr = dateOnly(date);
    let slot = TIME_SLOTS[randomInt(0, TIME_SLOTS.length - 1)];
    let guard = 0;
    while (usedSlots.has(`${doctorId}|${dateStr}|${slot[0]}`) && guard < 50) {
      slot = TIME_SLOTS[randomInt(0, TIME_SLOTS.length - 1)];
      guard++;
    }
    usedSlots.add(`${doctorId}|${dateStr}|${slot[0]}`);
    return slot;
  }

  type AppointmentPlan = {
    patientId: string;
    doctorId: string;
    date: Date;
    slot: [string, string];
    status: string;
    queueStatus: string;
    reason: string;
    notes: string | null;
  };

  const appointmentPlan: AppointmentPlan[] = [];

  function addAppointment(
    patientId: string,
    doctorId: string,
    date: Date,
    status: string,
    queueStatus: string,
  ) {
    const slot = pickSlot(doctorId, date);
    appointmentPlan.push({
      patientId,
      doctorId,
      date,
      slot,
      status,
      queueStatus,
      reason: randomElement(APPOINTMENT_REASONS),
      notes: chance(0.4) ? "Follow-up recommended after this visit." : null,
    });
  }

  // 1) Today's appointments with live queue states.
  const today = shiftToBusinessDay(new Date());
  const todaysPlan = [
    { queueStatus: "waiting", status: "scheduled" },
    { queueStatus: "waiting", status: "scheduled" },
    { queueStatus: "waiting", status: "scheduled" },
    { queueStatus: "waiting", status: "confirmed" },
    { queueStatus: "checked_in", status: "checked_in" },
    { queueStatus: "checked_in", status: "checked_in" },
    { queueStatus: "checked_in", status: "checked_in" },
    { queueStatus: "in_consultation", status: "in_consultation" },
    { queueStatus: "in_consultation", status: "in_consultation" },
    { queueStatus: "completed", status: "completed" },
    { queueStatus: "completed", status: "completed" },
    { queueStatus: "completed", status: "completed" },
  ];
  todaysPlan.forEach((p, i) => {
    addAppointment(
      insertedPatients[i % insertedPatients.length].id,
      insertedDoctors[i % insertedDoctors.length].id,
      today,
      p.status,
      p.queueStatus,
    );
  });

  // 2) Upcoming appointments (scheduled, waiting).
  for (let i = 0; i < 14; i++) {
    const date = shiftToBusinessDay(addDays(today, 1 + randomInt(1, 13)));
    addAppointment(
      insertedPatients[randomInt(0, insertedPatients.length - 1)].id,
      insertedDoctors[randomInt(0, insertedDoctors.length - 1)].id,
      date,
      "scheduled",
      "waiting",
    );
  }

  // 3) Past completed appointments.
  for (let i = 0; i < 40; i++) {
    const date = shiftToBusinessDay(addDays(today, -(3 + randomInt(0, 117))));
    addAppointment(
      insertedPatients[randomInt(0, insertedPatients.length - 1)].id,
      insertedDoctors[randomInt(0, insertedDoctors.length - 1)].id,
      date,
      "completed",
      "completed",
    );
  }

  // 4) Past cancelled / no-show appointments.
  for (let i = 0; i < 5; i++) {
    const date = shiftToBusinessDay(addDays(today, -(1 + randomInt(0, 45))));
    addAppointment(
      insertedPatients[randomInt(0, insertedPatients.length - 1)].id,
      insertedDoctors[randomInt(0, insertedDoctors.length - 1)].id,
      date,
      "cancelled",
      "cancelled",
    );
  }
  for (let i = 0; i < 3; i++) {
    const date = shiftToBusinessDay(addDays(today, -(1 + randomInt(0, 45))));
    addAppointment(
      insertedPatients[randomInt(0, insertedPatients.length - 1)].id,
      insertedDoctors[randomInt(0, insertedDoctors.length - 1)].id,
      date,
      "no_show",
      "cancelled",
    );
  }

  const appointmentRecords = appointmentPlan.map((p) => ({
    patientId: p.patientId,
    doctorId: p.doctorId,
    appointmentDate: dateOnly(p.date),
    startTime: p.slot[0],
    endTime: p.slot[1],
    status: p.status,
    queueStatus: p.queueStatus,
    reason: p.reason,
    notes: p.notes,
    createdAt: atTime(p.date, p.slot[0]),
    updatedAt: atTime(p.date, p.slot[0]),
  }));
  const insertedAppointments = await db.insert(appointments).values(appointmentRecords).returning();
  console.log(`✅ ${insertedAppointments.length} appointments seeded`);

  // Sync patient.lastVisit to the most recent completed appointment.
  const lastVisitByPatient = new Map<string, Date>();
  appointmentPlan.forEach((p, i) => {
    if (p.status !== "completed") return;
    const created = insertedAppointments[i].createdAt;
    const current = lastVisitByPatient.get(p.patientId);
    if (!current || created > current) lastVisitByPatient.set(p.patientId, created);
  });
  for (const [patientId, lastVisit] of lastVisitByPatient) {
    await db.update(patients).set({ lastVisit }).where(eq(patients.id, patientId));
  }

  /* ---- Consultations (one per completed appointment) ---- */
  console.log("🌱 Seeding consultations...");

  const DEMO_PATIENT_INDICES = [0, 1, 2, 3];
  const consultationRecords: {
    patientId: string;
    doctorId: string;
    appointmentId: string;
    chiefComplaint: string;
    diagnosis: string;
    notes: string;
    aiSummary: string | null;
    createdAt: Date;
    status: "completed";
  }[] = [];

  appointmentPlan.forEach((p, i) => {
    if (p.status !== "completed") return;
    const patientIdx = insertedPatients.findIndex((pt) => pt.id === p.patientId);
    const isDemo = DEMO_PATIENT_INDICES.includes(patientIdx);
    const diagnosis = randomElement(DIAGNOSES);

    consultationRecords.push({
      patientId: p.patientId,
      doctorId: p.doctorId,
      appointmentId: insertedAppointments[i].id,
      chiefComplaint: p.reason,
      diagnosis,
      notes:
        "Patient presented with the complaint listed above. Vitals were recorded and " +
        "relevant examination was performed. Response to treatment will be reviewed at the " +
        "next scheduled follow-up.",
      aiSummary: isDemo || chance(0.5)
        ? `Consultation for ${diagnosis.toLowerCase()}. Chief complaint: ${p.reason}. ` +
          "Examination findings and vitals documented; treatment plan prescribed. " +
          "Follow-up advised in 2 weeks."
        : null,
      createdAt: atTime(p.date, p.slot[1]),
      status: "completed",
    });
  });

  const insertedConsultations = await db.insert(consultations).values(consultationRecords).returning();
  console.log(`✅ ${insertedConsultations.length} consultations seeded`);

  /* ---- Prescriptions (one per completed consultation) ---- */
  console.log("🌱 Seeding prescriptions...");

  const prescriptionRecords: { consultationId: string; createdAt: Date }[] =
    insertedConsultations.map((c) => ({
      consultationId: c.id,
      createdAt: c.createdAt,
    }));
  const insertedPrescriptions = await db.insert(prescriptions).values(prescriptionRecords).returning();
  console.log(`✅ ${insertedPrescriptions.length} prescriptions seeded`);

  /* ---- Prescription items ---- */
  console.log("🌱 Seeding prescription items...");

  const dosageOptions = [
    "1 tablet", "2 tablets", "1 capsule", "2 capsules", "5 ml", "10 ml",
    "1 spray", "2 sprays", "1 drop", "2 drops", "1 application",
  ];
  const frequencyOptions = [
    "once daily", "twice daily", "three times daily", "every 8 hours",
    "every 12 hours", "as needed", "before meals", "after meals", "at bedtime",
  ];
  const instructionOptions = [
    "Take with food", "Take on empty stomach", "Take after meals",
    "Drink plenty of water", "Avoid alcohol", "Complete the full course",
    "Do not skip doses", "Take at same time daily",
  ];

  const prescriptionItemRecords: {
    prescriptionId: string;
    medicineName: string;
    dosage: string;
    frequency: string;
    durationDays: number;
    instructions: string;
  }[] = [];

  for (const prescription of insertedPrescriptions) {
    const itemCount = randomInt(2, 4);
    const used = new Set<string>();
    for (let j = 0; j < itemCount; j++) {
      let medicineName = randomElement(MEDICINE_NAMES);
      let guard = 0;
      while (used.has(medicineName) && guard < 20) {
        medicineName = randomElement(MEDICINE_NAMES);
        guard++;
      }
      used.add(medicineName);
      prescriptionItemRecords.push({
        prescriptionId: prescription.id,
        medicineName,
        dosage: randomElement(dosageOptions),
        frequency: randomElement(frequencyOptions),
        durationDays: randomInt(3, 14),
        instructions: randomElement(instructionOptions),
      });
    }
  }

  await db.insert(prescriptionItems).values(prescriptionItemRecords);
  console.log(`✅ ${prescriptionItemRecords.length} prescription items seeded`);

  /* ---- Invoices (one per completed consultation, coherent line items) ---- */
  console.log("🌱 Seeding invoices...");

  const invoiceItemPlans: { name: string; quantity: number; price: number }[][] = [];
  const invoiceRecords: {
    patientId: string;
    subtotal: string;
    discount: string;
    total: string;
    paymentMethod: string;
    status: string;
    issuedAt: Date;
  }[] = [];

  for (const consultation of insertedConsultations) {
    const issuedAt = consultation.createdAt;
    const daysAgo = Math.floor((today.getTime() - issuedAt.getTime()) / 86400000);

    // Build line items so the invoice subtotal reconciles exactly.
    const usedNames = new Set<string>();
    const items: { name: string; quantity: number; price: number }[] = [];
    const consultFee = INVOICE_ITEM_PRICES[0];
    items.push({ name: consultFee[0], quantity: 1, price: consultFee[1] });
    usedNames.add(consultFee[0]);

    const extraCount = randomInt(1, 3);
    for (let j = 0; j < extraCount; j++) {
      let entry = INVOICE_ITEM_PRICES[randomInt(1, INVOICE_ITEM_PRICES.length - 1)];
      let guard = 0;
      while (usedNames.has(entry[0]) && guard < 20) {
        entry = INVOICE_ITEM_PRICES[randomInt(1, INVOICE_ITEM_PRICES.length - 1)];
        guard++;
      }
      usedNames.add(entry[0]);
      items.push({ name: entry[0], quantity: randomInt(1, 2), price: entry[1] });
    }

    const subtotal = Math.round(items.reduce((s, it) => s + it.price * it.quantity, 0) * 100) / 100;
    const discount = chance(0.3) ? Math.round(subtotal * 0.05 * 100) / 100 : 0;
    const total = Math.round((subtotal - discount) * 100) / 100;
    const status = daysAgo > 20 ? "paid" : chance(0.55) ? "paid" : "pending";

    invoiceRecords.push({
      patientId: consultation.patientId,
      subtotal: subtotal.toFixed(2),
      discount: discount.toFixed(2),
      total: total.toFixed(2),
      paymentMethod: status === "paid" ? randomElement(["cash", "card", "upi"]) : "cash",
      status,
      issuedAt,
    });
    invoiceItemPlans.push(items);
  }

  const insertedInvoices = await db.insert(invoices).values(invoiceRecords).returning();
  console.log(`✅ ${insertedInvoices.length} invoices seeded`);

  /* ---- Invoice items ---- */
  const invoiceItemRecords: {
    invoiceId: string;
    name: string;
    quantity: number;
    price: string;
  }[] = [];

  insertedInvoices.forEach((invoice, idx) => {
    for (const item of invoiceItemPlans[idx]) {
      invoiceItemRecords.push({
        invoiceId: invoice.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price.toFixed(2),
      });
    }
  });

  await db.insert(invoiceItems).values(invoiceItemRecords);
  console.log(`✅ ${invoiceItemRecords.length} invoice items seeded`);

  /* ---- Sync patient balances with unpaid invoice totals ---- */
  const pendingByPatient = new Map<string, number>();
  for (const invoice of insertedInvoices) {
    if (invoice.status === "pending") {
      pendingByPatient.set(
        invoice.patientId,
        (pendingByPatient.get(invoice.patientId) ?? 0) + Number(invoice.total),
      );
    }
  }
  for (const [patientId, balance] of pendingByPatient) {
    await db
      .update(patients)
      .set({ balance: (Math.round(balance * 100) / 100).toFixed(2) })
      .where(eq(patients.id, patientId));
  }
  console.log(`✅ ${pendingByPatient.size} patient balances synced with pending invoices`);

  /* ---- Reminders (for today's + upcoming appointments) ---- */
  console.log("🌱 Seeding reminders...");

  const doctorNameMap = new Map<string, string>();
  insertedDoctors.forEach((d, i) => doctorNameMap.set(d.id, DOCTOR_SPECS[i].name));
  const doctorUserByDoctor = new Map<string, string>();
  insertedDoctors.forEach((d, i) => doctorUserByDoctor.set(d.id, doctorUsers[i].id));

  const reminderRecords: {
    patientId: string;
    title: string;
    message: string | null;
    scheduledFor: Date;
    sent: boolean;
    createdAt: Date;
  }[] = [];

  appointmentPlan.forEach((p) => {
    const isUpcoming =
      p.status === "scheduled" || p.status === "confirmed" ||
      p.status === "checked_in" || p.status === "in_consultation";
    if (!isUpcoming) return;
    reminderRecords.push({
      patientId: p.patientId,
      title: "Appointment Reminder",
      message: `Your appointment with ${doctorNameMap.get(p.doctorId) ?? "the clinic"} is on ${dateOnly(p.date)} at ${p.slot[0]}.`,
      scheduledFor: atTime(addDays(p.date, -1), "09:00"),
      sent: false,
      createdAt: addDays(p.date, -2),
    });
  });

  for (let i = 0; i < 8; i++) {
    const patient = insertedPatients[randomInt(0, insertedPatients.length - 1)];
    reminderRecords.push({
      patientId: patient.id,
      title: randomElement([
        "Follow-up Appointment", "Lab Test Reminder",
        "Medication Reminder", "Annual Checkup Reminder",
      ]),
      message: "Please contact the clinic to schedule your follow-up.",
      scheduledFor: addDays(today, -(1 + randomInt(0, 30))),
      sent: true,
      createdAt: addDays(today, -(2 + randomInt(0, 31))),
    });
  }

  await db.insert(reminders).values(reminderRecords);
  console.log(`✅ ${reminderRecords.length} reminders seeded`);

  /* ---- Notifications ---- */
  console.log("🌱 Seeding notifications...");

  const notificationTitles = [
    "New Appointment", "Payment Received", "Lab Results Ready",
    "Prescription Refill", "Patient Follow-up Required", "Consultation Completed",
  ];
  const notificationRecords: {
    userId: string;
    title: string;
    message: string | null;
    read: boolean;
    createdAt: Date;
  }[] = [];
  const allUsers = [...doctorUsers, receptionistUsers[0], adminUser];

  for (let i = 0; i < 30; i++) {
    const user = randomElement(allUsers);
    notificationRecords.push({
      userId: user.id,
      title: randomElement(notificationTitles),
      message: "A clinic event requires your attention.",
      read: chance(0.5),
      createdAt: addDays(today, -randomInt(0, 20)),
    });
  }

  await db.insert(notifications).values(notificationRecords);
  console.log(`✅ ${notificationRecords.length} notifications seeded`);

  /* ---- Activity logs (coherent — reference real seeded entities) ---- */
  console.log("🌱 Seeding activity logs...");

  const receptionist = receptionistUsers[0];
  const patientName = (id: string) => {
    const p = insertedPatients.find((x) => x.id === id);
    return p ? `${p.firstName} ${p.lastName}` : "Patient";
  };

  const activityLogRecords: {
    userId: string | null;
    action: string;
    entityType: string;
    entityId: string;
    metadata: Record<string, unknown>;
    createdAt: Date;
  }[] = [];

  // Login events.
  for (const u of insertedUsers) {
    activityLogRecords.push({
      userId: u.id, action: "login", entityType: "user", entityId: u.id,
      metadata: {}, createdAt: addDays(today, -randomInt(1, 30)),
    });
  }

  // Patient lifecycle.
  for (const p of insertedPatients) {
    activityLogRecords.push({
      userId: receptionist.id, action: "patient_created", entityType: "patient",
      entityId: p.id, metadata: { patientName: `${p.firstName} ${p.lastName}` },
      createdAt: p.createdAt,
    });
  }

  // Appointment lifecycle.
  appointmentPlan.forEach((p, i) => {
    const appt = insertedAppointments[i];
    const meta = {
      patientName: patientName(p.patientId),
      doctor: doctorNameMap.get(p.doctorId) ?? "Doctor",
      appointmentDate: dateOnly(p.date),
    };
    activityLogRecords.push({
      userId: receptionist.id, action: "appointment_created",
      entityType: "appointment", entityId: appt.id, metadata: meta, createdAt: appt.createdAt,
    });
    if (p.status === "cancelled") {
      activityLogRecords.push({
        userId: receptionist.id, action: "cancel_appointment",
        entityType: "appointment", entityId: appt.id, metadata: meta, createdAt: appt.createdAt,
      });
    }
  });

  // Consultation completion.
  for (const c of insertedConsultations) {
    activityLogRecords.push({
      userId: doctorUserByDoctor.get(c.doctorId) ?? adminUser.id,
      action: "complete_consultation", entityType: "consultation", entityId: c.id,
      metadata: { patientName: patientName(c.patientId), diagnosis: c.diagnosis },
      createdAt: c.createdAt,
    });
  }

  // Invoice creation.
  for (const inv of insertedInvoices) {
    activityLogRecords.push({
      userId: adminUser.id, action: "create_invoice", entityType: "invoice",
      entityId: inv.id,
      metadata: { patientName: patientName(inv.patientId), amount: Number(inv.total), status: inv.status },
      createdAt: inv.issuedAt,
    });
  }

  // Prescription generation.
  const itemCountByPrescription = new Map<string, number>();
  for (const item of prescriptionItemRecords) {
    itemCountByPrescription.set(
      item.prescriptionId,
      (itemCountByPrescription.get(item.prescriptionId) ?? 0) + 1,
    );
  }
  for (const prescription of insertedPrescriptions) {
    const consultation = insertedConsultations.find((c) => c.id === prescription.consultationId);
    activityLogRecords.push({
      userId: consultation
        ? (doctorUserByDoctor.get(consultation.doctorId) ?? adminUser.id)
        : adminUser.id,
      action: "generate_prescription", entityType: "prescription", entityId: prescription.id,
      metadata: { medicineCount: itemCountByPrescription.get(prescription.id) ?? 0 },
      createdAt: prescription.createdAt,
    });
  }

  await db.insert(activityLogs).values(activityLogRecords);
  console.log(`✅ ${activityLogRecords.length} activity logs seeded`);

  /* ---- AI usage logs ---- */
  console.log("🌱 Seeding ai usage logs...");

  const aiUsageRecords: {
    userId: string;
    feature: string;
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    createdAt: Date;
  }[] = [];

  for (let i = 0; i < 40; i++) {
    const user = randomElement(allUsers);
    const promptTokens = randomInt(80, 1800);
    const completionTokens = randomInt(40, 900);
    aiUsageRecords.push({
      userId: user.id,
      feature: randomElement(AI_FEATURES),
      promptTokens,
      completionTokens,
      totalTokens: promptTokens + completionTokens,
      createdAt: addDays(today, -randomInt(0, 60)),
    });
  }

  await db.insert(aiUsageLogs).values(aiUsageRecords);
  console.log(`✅ ${aiUsageRecords.length} ai usage logs seeded`);

  /* ---- Documents for the RAG demo ---- */
  console.log("🌱 Seeding documents...");

  const uploader = receptionistUsers[0];
  const demoPatients = DEMO_PATIENT_INDICES.map((i) => insertedPatients[i]);

  const DEMO_DOCS: { docType: DocType; filename: string }[][] = [
    [
      { docType: "LAB_REPORT", filename: "CBC-Lipid-Profile.pdf" },
      { docType: "PRESCRIPTION", filename: "Prescription-Diabetes-Followup.pdf" },
      { docType: "DISCHARGE_SUMMARY", filename: "Discharge-Summary-IPD.pdf" },
    ],
    [
      { docType: "LAB_REPORT", filename: "Thyroid-Profile.pdf" },
      { docType: "X_RAY", filename: "Chest-XRay-Report.pdf" },
      { docType: "CONSULTATION_NOTE", filename: "Consultation-Note.pdf" },
    ],
    [
      { docType: "MRI", filename: "MRI-Brain-Report.pdf" },
      { docType: "LAB_REPORT", filename: "HbA1c-Vitamin-Profile.pdf" },
    ],
    [
      { docType: "REFERRAL", filename: "Referral-Cardiology.pdf" },
      { docType: "CT_SCAN", filename: "CT-Scan-Head-Report.pdf" },
    ],
  ];

  const documentPlans: {
    patientId: string;
    documentType: DocType;
    originalFilename: string;
    chunks: string[];
  }[] = [];

  demoPatients.forEach((patient, pIdx) => {
    for (const spec of DEMO_DOCS[pIdx]) {
      documentPlans.push({
        patientId: patient.id,
        documentType: spec.docType,
        originalFilename: spec.filename,
        chunks: buildDocumentChunks(`${patient.firstName} ${patient.lastName}`, spec.docType, pIdx),
      });
    }
  });

  const documentRecords: {
    patientId: string;
    uploadedBy: string;
    filename: string;
    originalFilename: string;
    mimeType: string;
    fileSize: number;
    storagePath: string;
    documentType: DocType;
    status: "READY";
    createdAt: Date;
    updatedAt: Date;
  }[] = [];

  for (const plan of documentPlans) {
    const filename = `${crypto.randomUUID()}.pdf`;
    documentRecords.push({
      patientId: plan.patientId,
      uploadedBy: uploader.id,
      filename,
      originalFilename: plan.originalFilename,
      mimeType: "application/pdf",
      fileSize: randomInt(120000, 1500000),
      storagePath: `patients/${plan.patientId}/documents/${filename}`,
      documentType: plan.documentType,
      status: "READY",
      createdAt: addDays(today, -randomInt(3, 30)),
      updatedAt: addDays(today, -1),
    });
  }

  const insertedDocuments = await db.insert(documents).values(documentRecords).returning();
  console.log(`✅ ${insertedDocuments.length} documents seeded`);

  /* ---- Document chunks ---- */
  const documentChunkRecords: {
    documentId: string;
    chunkIndex: number;
    content: string;
  }[] = [];
  insertedDocuments.forEach((doc, idx) => {
    documentPlans[idx].chunks.forEach((content, chunkIndex) => {
      documentChunkRecords.push({ documentId: doc.id, chunkIndex, content });
    });
  });

  const insertedChunks = await db.insert(documentChunks).values(documentChunkRecords).returning();
  console.log(`✅ ${insertedChunks.length} document chunks seeded`);

  /* ---- Embeddings ---- */
  const usedRealEmbeddings =
    Boolean(process.env.OPENAI_API_KEY) && process.env.SEED_REAL_EMBEDDINGS !== "0";
  console.log(
    `🧠 Generating embeddings for ${insertedDocuments.length} documents (${usedRealEmbeddings ? "OpenAI text-embedding-3-small" : "deterministic pseudo-embeddings"})...`,
  );

  let embeddingOffset = 0;
  for (let i = 0; i < insertedDocuments.length; i++) {
    const texts = documentPlans[i].chunks;
    const embeddings = await embedAll(texts);
    for (let j = 0; j < embeddings.length; j++) {
      const chunk = insertedChunks[embeddingOffset + j];
      await db
        .update(documentChunks)
        .set({ embedding: embeddings[j] })
        .where(eq(documentChunks.id, chunk.id));
    }
    embeddingOffset += embeddings.length;
  }
  console.log(`✅ ${insertedChunks.length} embeddings stored`);

  /* ---- Chat sessions (RAG demo history) ---- */
  console.log("🌱 Seeding chat sessions...");

  const chatUserId = doctorUsers[0].id;
  const demo0 = insertedPatients[0];
  const demo1 = insertedPatients[1];

  const sessionRecords: {
    id: string;
    patientId: string;
    userId: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
  }[] = [];
  const messageRecords: {
    sessionId: string;
    role: "user" | "assistant";
    content: string;
    citations: ChatCitation[] | null;
    createdAt: Date;
  }[] = [];

  // Session 1 — patient 0 (blood test results).
  const s1 = crypto.randomUUID();
  sessionRecords.push({
    id: s1,
    patientId: demo0.id,
    userId: chatUserId,
    title: "Blood test results",
    createdAt: addDays(today, -2),
    updatedAt: addDays(today, -1),
  });
  messageRecords.push({
    sessionId: s1,
    role: "user",
    content: "What were the blood test results from the last visit?",
    citations: null,
    createdAt: addDays(today, -2),
  });
  messageRecords.push({
    sessionId: s1,
    role: "assistant",
    content:
      "Based on the CBC and lipid profile [1], hemoglobin was 12.4 g/dL and total cholesterol was 198 mg/dL with LDL 124 mg/dL. The HbA1c was 6.1% and fasting glucose 104 mg/dL [1]. Vitamin D was low at 22 ng/mL, indicating a deficiency [2].",
    citations: [
      { ref: 1, documentId: insertedDocuments[0].id, filename: insertedDocuments[0].filename, originalFilename: insertedDocuments[0].originalFilename, documentType: insertedDocuments[0].documentType, chunkIndex: 1, similarity: 0.87 },
      { ref: 2, documentId: insertedDocuments[0].id, filename: insertedDocuments[0].filename, originalFilename: insertedDocuments[0].originalFilename, documentType: insertedDocuments[0].documentType, chunkIndex: 3, similarity: 0.81 },
    ],
    createdAt: addDays(today, -1),
  });

  // Session 2 — patient 1 (thyroid profile and chest X-ray).
  const s2 = crypto.randomUUID();
  sessionRecords.push({
    id: s2,
    patientId: demo1.id,
    userId: chatUserId,
    title: "Thyroid profile and chest X-ray",
    createdAt: addDays(today, -5),
    updatedAt: addDays(today, -4),
  });
  messageRecords.push({
    sessionId: s2,
    role: "user",
    content: "Explain the thyroid profile and the chest X-ray findings.",
    citations: null,
    createdAt: addDays(today, -5),
  });
  messageRecords.push({
    sessionId: s2,
    role: "assistant",
    content:
      "The thyroid profile [1] shows a TSH of 4.9 µIU/mL with normal free T4, consistent with subclinical hypothyroidism. The chest X-ray [2] reported clear lung fields with no active lesion or effusion.",
    citations: [
      { ref: 1, documentId: insertedDocuments[3].id, filename: insertedDocuments[3].filename, originalFilename: insertedDocuments[3].originalFilename, documentType: insertedDocuments[3].documentType, chunkIndex: 0, similarity: 0.9 },
      { ref: 2, documentId: insertedDocuments[4].id, filename: insertedDocuments[4].filename, originalFilename: insertedDocuments[4].originalFilename, documentType: insertedDocuments[4].documentType, chunkIndex: 1, similarity: 0.85 },
    ],
    createdAt: addDays(today, -4),
  });

  await db.insert(chatSessions).values(sessionRecords);
  await db.insert(chatMessages).values(messageRecords);
  console.log(`✅ ${sessionRecords.length} chat sessions and ${messageRecords.length} chat messages seeded`);

  /* ---- Summary ---- */
  console.log("\n✅ Database seeded successfully");
  console.log(`   • ${insertedUsers.length} users (${insertedDoctors.length} doctors)`);
  console.log(`   • ${insertedPatients.length} patients`);
  console.log(`   • ${insertedAppointments.length} appointments (incl. today's queue)`);
  console.log(`   • ${insertedConsultations.length} consultations`);
  console.log(`   • ${insertedPrescriptions.length} prescriptions (${prescriptionItemRecords.length} items)`);
  console.log(`   • ${insertedInvoices.length} invoices (${invoiceItemRecords.length} line items)`);
  console.log(`   • ${reminderRecords.length} reminders, ${notificationRecords.length} notifications`);
  console.log(`   • ${activityLogRecords.length} activity logs, ${aiUsageRecords.length} ai usage logs`);
  console.log(`   • ${insertedDocuments.length} documents, ${insertedChunks.length} chunks (${usedRealEmbeddings ? "real" : "pseudo"} embeddings)`);
  console.log("   • RAG demo patients: the first 4 seeded patients have medical documents to query.");
}

/* ======================================================================
 * RAG document content builder (deterministic, synthetic clinical text)
 * ====================================================================== */

type DocType =
  | "LAB_REPORT" | "PRESCRIPTION" | "DISCHARGE_SUMMARY" | "MRI"
  | "CT_SCAN" | "X_RAY" | "REFERRAL" | "CONSULTATION_NOTE" | "OTHER";

type ChatCitation = {
  ref: number;
  documentId: string;
  filename: string;
  originalFilename: string;
  documentType: string;
  chunkIndex: number;
  similarity: number;
};

function buildDocumentChunks(patientName: string, docType: DocType, seedIdx: number): string[] {
  const date = dateOnly(addDays(new Date(), -(seedIdx + 5)));
  switch (docType) {
    case "LAB_REPORT":
      return [
        `${patientName} — Laboratory Report. Date: ${date}. Sample: Venous blood.`,
        "Complete Blood Count: Hemoglobin 12.4 g/dL, Total WBC 7,200 /µL, Platelets 2.1 lakh/µL.",
        "Lipid Profile: Total Cholesterol 198 mg/dL, LDL 124 mg/dL, HDL 42 mg/dL, Triglycerides 168 mg/dL.",
        "Fasting Glucose 104 mg/dL, HbA1c 6.1%. Serum Vitamin D 22 ng/mL (deficient).",
        "Conclusion: Mildly elevated LDL and low Vitamin D; no acute abnormality detected.",
      ];
    case "PRESCRIPTION":
      return [
        `${patientName} — Prescription. Date: ${date}.`,
        "Tab Metformin 500 mg — 1 tablet twice daily after meals for 30 days.",
        "Tab Atorvastatin 10 mg — 1 tablet at bedtime for 30 days.",
        "Syp. Vitamin D3 60K — 1 sachet weekly for 4 weeks.",
        "Review after 1 month with fasting glucose and lipid profile.",
      ];
    case "DISCHARGE_SUMMARY":
      return [
        `${patientName} — Discharge Summary. Date: ${date}.`,
        "Admitted for observation and management of acute gastroenteritis with dehydration.",
        "IV fluids and supportive care administered; vitals stable throughout stay.",
        "Discharged on oral rehydration salts and a 3-day course of antibiotics.",
        "Follow-up in 7 days or sooner if symptoms recur.",
      ];
    case "MRI":
      return [
        `${patientName} — MRI Brain Report. Date: ${date}.`,
        "Technique: Multiplanar, multisequence MRI of the brain without contrast.",
        "Findings: No acute infarct or hemorrhage. Mild age-appropriate cerebral atrophy.",
        "No mass lesion, midline shift, or abnormal leptomeningeal enhancement.",
        "Impression: Unremarkable for acute pathology; correlate clinically with headache.",
      ];
    case "CT_SCAN":
      return [
        `${patientName} — CT Head Report. Date: ${date}.`,
        "Axial non-contrast CT of the head was performed.",
        "No evidence of acute intracranial hemorrhage, mass effect, or midline shift.",
        "Ventricles and basal cisterns are normal. No skull fracture seen.",
        "Impression: Normal study; no acute intracranial abnormality.",
      ];
    case "X_RAY":
      return [
        `${patientName} — Chest X-Ray Report. Date: ${date}.`,
        "PA view of the chest was obtained.",
        "Both lung fields are clear with no focal opacity or consolidation.",
        "Cardiac silhouette is within normal limits; no pleural effusion or pneumothorax.",
        "Impression: Normal chest radiograph.",
      ];
    case "REFERRAL":
      return [
        `${patientName} — Referral Letter. Date: ${date}.`,
        "Referred to Cardiology for evaluation of recurrent chest pain and palpitations.",
        "Recent ECG showed sinus rhythm with occasional ventricular ectopics.",
        "Please evaluate for ischemic heart disease; resting and stress echo recommended.",
        "Kindly review and advise further management.",
      ];
    case "CONSULTATION_NOTE":
      return [
        `${patientName} — Consultation Note. Date: ${date}.`,
        "Chief complaint: intermittent sore throat and mild fever for 3 days.",
        "Exam: Oropharynx congested, tonsils mildly enlarged without exudate.",
        "Assessment: Acute tonsillitis. Plan: Symptomatic care and analgesics.",
        "Advise review if symptoms persist beyond 5 days.",
      ];
    default:
      return [
        `${patientName} — Medical document. Date: ${date}.`,
        "General clinical documentation for this patient.",
      ];
  }
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });