// EntryFormFields.tsx
import { Form, Field, ErrorMessage } from "formik";
import type { FormikProps } from "formik";
import { Input } from "./UI/input";
import { Label } from "./UI/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "./UI/select";
import { Button } from "./UI/button";
import type { Entry } from "./types/entry";

interface EntryFormFieldsProps
  extends FormikProps<Omit<Entry, "id" | "createdAt">> {
  entryId?: number;
}

const EntryFormFields = ({
  isSubmitting,
  setFieldValue,
  values,
  entryId,
}: EntryFormFieldsProps) => {
  return (
    <Form className="space-y-4 bg-white p-4 rounded shadow mb-6">
      {/* Title */}
      <FormField name="title" label="Title" />

      {/* Type */}
      <div>
        <Label htmlFor="type">Type</Label>
        <Select
          value={values.type}
          onValueChange={(value) => setFieldValue("type", value)}
        >
          <SelectTrigger id="type">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Movie">Movie</SelectItem>
            <SelectItem value="TV Show">TV Show</SelectItem>
          </SelectContent>
        </Select>
        <ErrorMessage
          name="type"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

      {/* Director */}
      <FormField name="director" label="Director" />

      {/* Budget */}
      <FormField name="budget" label="Budget" type="number" />

      {/* Location */}
      <FormField name="location" label="Location" />

      {/* Duration */}
      <FormField name="duration" label="Duration (min)" type="number" />

      {/* Year */}
      <FormField name="year" label="Year" type="number" />

      {/* Submit button */}
      <Button className="cursor-pointer" type="submit" disabled={isSubmitting}>
        {entryId ? "Update" : "Add"} Entry
      </Button>
    </Form>
  );
};

export default EntryFormFields;

// Reuseable Field Component
const FormField = ({
  name,
  label,
  type = "text",
}: {
  name: string;
  label: string;
  type?: string;
}) => (
  <div>
    <Label htmlFor={name}>{label}</Label>
    <Field name={name} type={type}>
      {({ field }: any) => <Input id={name} {...field} type={type} />}
    </Field>
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-sm"
    />
  </div>
);
