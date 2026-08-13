const patients = [
  { id: 1, name: "Rahul Sharma" },
  { id: 2, name: "Priya Das" },
  { id: 3, name: "Amit Kumar" },
  { id: 4, name: "Rohit Sharma" },
];

function searchPatients(
  patients: { id: number; name: string }[],
  query: string,
) {
  const results: { id: number; name: string }[] = [];
  patients.forEach((patient) => {
    if (patient.name.toLowerCase().includes(query.toLowerCase().trim())) {
      results.push(patient);
    }
  });

  return results;
}

console.log(searchPatients(patients, "rahul"));
