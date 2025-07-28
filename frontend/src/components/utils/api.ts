import axios from "axios";
import type { Entry } from "../types/entry";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/entries";

// Fetch entries with pagination
export const fetchEntries = async (page = 1, limit = 10) => {
  const res = await axios.get<Entry[]>(
    `${API_URL}?page=${page}&limit=${limit}`
  );
  return res.data;
};

// Create a new entry
export const createEntry = async (entry: Omit<Entry, "id" | "createdAt">) => {
  const res = await axios.post<Entry>(API_URL, entry);
  return res.data;
};

// Update an entry
export const updateEntry = async (
  id: number,
  entry: Omit<Entry, "id" | "createdAt">
) => {
  const res = await axios.put<Entry>(`${API_URL}/${id}`, entry);
  return res.data;
};

// Delete an entry
export const deleteEntry = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
