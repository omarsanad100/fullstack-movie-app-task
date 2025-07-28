import { useEntries } from "../hooks/useEntries";
import { useRef, useEffect } from "react";
import { Entry } from "./types/entry";

export default function EntryTable() {
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
            <th>Title</th>
            <th>Type</th>
            <th>Director</th>
            <th>Budget</th>
            <th>Location</th>
            <th>Duration</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.pages.flat().map((entry: Entry) => (
            <tr key={entry.id}>
              <td>{entry.title}</td>
              <td>{entry.type}</td>
              <td>{entry.director}</td>
              <td>{entry.budget}</td>
              <td>{entry.location}</td>
              <td>{entry.duration}</td>
              <td>{entry.year}</td>
              <td>{/* Add edit/delete buttons here */}</td>
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
