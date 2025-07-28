import { useEntries } from "../hooks/useEntries";
import { useRef, useEffect } from "react";
import type { Entry } from "./types/entry";
import { Button } from "./UI/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./UI/table";

interface EntryTableProps {
  onEdit: (entry: Entry) => void;
  onDelete: (entry: Entry) => void;
}

export default function EntryTable({ onEdit, onDelete }: EntryTableProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useEntries();
  const loader = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log("Pages loaded:", data?.pages.length);
    console.log("Has next page:", hasNextPage);
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Director</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.pages
            .flat()
            .map(
              ({
                id,
                title,
                type,
                director,
                budget,
                location,
                duration,
                year,
                createdAt,
              }: Entry) => (
                <TableRow key={id}>
                  <TableCell>{title}</TableCell>
                  <TableCell>{type}</TableCell>
                  <TableCell>{director}</TableCell>
                  <TableCell>{budget}</TableCell>
                  <TableCell>{location}</TableCell>
                  <TableCell>{duration}</TableCell>
                  <TableCell>{year}</TableCell>
                  <TableCell>
                    {new Date(createdAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      className="cursor-pointer"
                      variant="secondary"
                      onClick={() =>
                        onEdit({
                          id,
                          title,
                          type,
                          director,
                          budget,
                          location,
                          duration,
                          year,
                          createdAt,
                        })
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      className="cursor-pointer"
                      variant="destructive"
                      onClick={() =>
                        onDelete({
                          id,
                          title,
                          type,
                          director,
                          budget,
                          location,
                          duration,
                          year,
                          createdAt,
                        })
                      }
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )}
        </TableBody>
      </Table>

      <div ref={loader} className="h-8 flex items-center justify-center">
        {isFetchingNextPage && <span>Loading more...</span>}
      </div>
    </div>
  );
}
