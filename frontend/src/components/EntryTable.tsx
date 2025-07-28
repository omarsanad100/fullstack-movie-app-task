import { useEntries } from "../hooks/useEntries";
import { useRef, useEffect } from "react";
import type { Entry } from "./types/entry";

interface EntryTableProps {
  onEdit: (entry: Entry) => void;
  onDelete: (entry: Entry) => void;
}

export default function EntryTable({ onEdit, onDelete }: EntryTableProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useEntries();
  const loader = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loader.current || !hasNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { threshold: 1 }
    );
    observer.observe(loader.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Director</th>
            <th className="px-4 py-2">Budget</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Duration</th>
            <th className="px-4 py-2">Year</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.pages.flat().map((entry: Entry) => (
            <tr key={entry.id}>
              <td className="border px-4 py-2">{entry.title}</td>
              <td className="border px-4 py-2">{entry.type}</td>
              <td className="border px-4 py-2">{entry.director}</td>
              <td className="border px-4 py-2">{entry.budget}</td>
              <td className="border px-4 py-2">{entry.location}</td>
              <td className="border px-4 py-2">{entry.duration}</td>
              <td className="border px-4 py-2">{entry.year}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => onEdit(entry)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded"
                  onClick={() => onDelete(entry)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div ref={loader} className="h-8 flex items-center justify-center">
        {isFetchingNextPage && <span>Loading more...</span>}
      </div>
    </div>
  );
}
