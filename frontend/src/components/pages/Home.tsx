import EntryForm from "../EntryForm";
import EntryTable from "../EntryTable";
import { useState } from "react";
import type { Entry } from "../types/entry";
import { deleteEntry } from "../utils/api";

const initialForm: Omit<Entry, "id" | "createdAt"> = {
  title: "",
  type: "",
  director: "",
  budget: 0,
  location: "",
  duration: 0,
  year: new Date().getFullYear(),
};

export default function Home() {
  const [formValues, setFormValues] = useState(initialForm);
  const [editingId, setEditingId] = useState<number | undefined>(undefined);
  const [refresh, setRefresh] = useState(false);

  // When editing, fill the form with the entry's data
  const handleEdit = (entry: Entry) => {
    setFormValues({
      title: entry.title,
      type: entry.type,
      director: entry.director,
      budget: entry.budget,
      location: entry.location,
      duration: entry.duration,
      year: entry.year,
    });
    setEditingId(entry.id);
  };

  // Confirm before deleting
  const handleDelete = async (entry: Entry) => {
    if (window.confirm(`Delete "${entry.title}"?`)) {
      await deleteEntry(entry.id);
      setRefresh((r) => !r);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Favorite Movies & TV Shows</h1>
      <EntryForm
        initialValues={formValues}
        entryId={editingId}
        onSuccess={() => {
          setEditingId(undefined);
          setFormValues(initialForm);
          setRefresh((r) => !r);
        }}
      />
      <EntryTable
        key={refresh ? "refresh" : "no-refresh"}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
