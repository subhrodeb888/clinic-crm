import { Card } from "@/components/ui/card";

const notes = [
  {
    id: 1,
    author: "Dr. Amit Roy",
    date: "2026-05-10",
    content:
      "Patient advised to continue blood pressure medication for another 30 days.",
  },

  {
    id: 2,
    author: "Reception",
    date: "2026-04-18",
    content: "Patient requested appointment rescheduling due to travel.",
  },
];

export function NotesTab() {
  return (
    <div className="space-y-5">
      {notes.map((note) => (
        <Card key={note.id} className="p-5">
          {/* HEADER */}

          <div
            className="
              mb-4 flex flex-col gap-2
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            <div>
              <h3 className="font-semibold">{note.author}</h3>

              <p className="text-sm text-gray-500">Internal Note</p>
            </div>

            <div
              className="
                rounded-xl bg-gray-100
                px-3 py-2 text-sm
                text-gray-600
              "
            >
              {note.date}
            </div>
          </div>

          {/* CONTENT */}

          <div
            className="
              rounded-2xl border
              border-gray-200 bg-gray-50
              p-4
            "
          >
            <p className="text-sm leading-7 text-gray-700">{note.content}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
