import { Button } from "./UI/button";
import { TableRow, TableCell } from "./UI/table";
import type { Entry } from "./types/entry";

interface RowProps {
  entry: Entry;
  onEdit: (entry: Entry) => void;
  onDelete: (entry: Entry) => void;
}

const EntryTableRow = ({ entry, onEdit, onDelete }: RowProps) => {
  const { title, type, director, budget, location, duration, year, createdAt } =
    entry;

  return (
    <TableRow>
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
      <TableCell className="flex gap-2 flex-wrap">
        <Button
          className="cursor-pointer"
          variant="secondary"
          onClick={() => onEdit(entry)}
        >
          Edit
        </Button>
        <Button
          className="cursor-pointer"
          variant="destructive"
          onClick={() => onDelete(entry)}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default EntryTableRow;
