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
    <Form className="w-full max-w-2xl mx-auto bg-background p-6 rounded shadow-md space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField name="title" label="Title" />
        <div>
          <Label htmlFor="type">Type</Label>
          <Select
            value={values.type}
            onValueChange={(value) => setFieldValue("type", value)}
          >
            <SelectTrigger id="type" className="w-full">
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
        <FormField name="director" label="Director" />
        <FormField name="budget" label="Budget" type="number" />
        <FormField name="location" label="Location" />
        <FormField name="duration" label="Duration (min)" type="number" />
        <FormField name="year" label="Year" type="number" />
      </div>

      <div className="pt-2">
        <Button
          className="w-full sm:w-auto cursor-pointer"
          type="submit"
          disabled={isSubmitting}
        >
          {entryId ? "Update" : "Add"} Entry
        </Button>
      </div>
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
