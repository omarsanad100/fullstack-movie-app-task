import { useEntries } from "../hooks/useEntries";
import { useRef, useEffect } from "react";
import EntryTableRow from "./EntryTableRow";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead as TH,
} from "./UI/table";
import type { Entry } from "./types/entry";

interface EntryTableProps {
  onEdit: (entry: Entry) => void;
  onDelete: (entry: Entry) => void;
}

const EntryTable = ({ onEdit, onDelete }: EntryTableProps) => {
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
    <div className="w-full overflow-x-auto pt-6">
      <div className="min-w-[900px] w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TH>Title</TH>
              <TH>Type</TH>
              <TH>Director</TH>
              <TH>Budget</TH>
              <TH>Location</TH>
              <TH>Duration</TH>
              <TH>Year</TH>
              <TH>Created At</TH>
              <TH>Actions</TH>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.pages.flat().map((entry: Entry) => (
              <EntryTableRow
                key={entry.id}
                entry={entry}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <div ref={loader} className="h-8 flex items-center justify-center">
        {isFetchingNextPage && <span>Loading more...</span>}
      </div>
    </div>
  );
};

export default EntryTable;
