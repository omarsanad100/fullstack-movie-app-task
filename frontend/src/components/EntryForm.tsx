import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createEntry, updateEntry } from "./utils/api";
import type { Entry } from "./types/entry";
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

interface EntryFormProps {
  initialValues: Omit<Entry, "id" | "createdAt">;
  onSuccess: () => void;
  entryId?: number;
}

const validationSchema = Yup.object({
  title: Yup.string().required("Required"),
  type: Yup.string().oneOf(["Movie", "TV Show"]).required("Required"),
  director: Yup.string().required("Required"),
  budget: Yup.number().required("Required").min(0),
  location: Yup.string().required("Required"),
  duration: Yup.number().required("Required").min(1),
  year: Yup.number().required("Required").min(1900),
});

export default function EntryForm({
  initialValues,
  onSuccess,
  entryId,
}: EntryFormProps) {
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          if (entryId) {
            await updateEntry(entryId, values);
          } else {
            await createEntry(values);
          }
          resetForm();
          onSuccess();
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, setFieldValue, values }) => (
        <Form className="space-y-4 bg-white p-4 rounded shadow mb-6">
          {/* Title */}
          <div>
            <Label htmlFor="title">Title</Label>
            <Field name="title">
              {({ field }: any) => <Input id="title" {...field} />}
            </Field>
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

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
          <div>
            <Label htmlFor="director">Director</Label>
            <Field name="director">
              {({ field }: any) => <Input id="director" {...field} />}
            </Field>
            <ErrorMessage
              name="director"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Budget */}
          <div>
            <Label htmlFor="budget">Budget</Label>
            <Field name="budget" type="number">
              {({ field }: any) => (
                <Input id="budget" type="number" {...field} />
              )}
            </Field>
            <ErrorMessage
              name="budget"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Location */}
          <div>
            <Label htmlFor="location">Location</Label>
            <Field name="location">
              {({ field }: any) => <Input id="location" {...field} />}
            </Field>
            <ErrorMessage
              name="location"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Duration */}
          <div>
            <Label htmlFor="duration">Duration (min)</Label>
            <Field name="duration" type="number">
              {({ field }: any) => (
                <Input id="duration" type="number" {...field} />
              )}
            </Field>
            <ErrorMessage
              name="duration"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Year */}
          <div>
            <Label htmlFor="year">Year</Label>
            <Field name="year" type="number">
              {({ field }: any) => <Input id="year" type="number" {...field} />}
            </Field>
            <ErrorMessage
              name="year"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Submit button */}
          <Button
            className="cursor-pointer"
            type="submit"
            disabled={isSubmitting}
          >
            {entryId ? "Update" : "Add"} Entry
          </Button>
        </Form>
      )}
    </Formik>
  );
}
