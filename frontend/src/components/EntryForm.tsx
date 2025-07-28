import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createEntry, updateEntry } from "./utils/api";
import type { Entry } from "./types/entry";

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
      {({ isSubmitting }) => (
        <Form className="space-y-4 bg-white p-4 rounded shadow mb-6">
          <div>
            <label className="block font-medium">Title</label>
            <Field name="title" className="input input-bordered w-full" />
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div>
            <label className="block font-medium">Type</label>
            <Field
              as="select"
              name="type"
              className="input input-bordered w-full"
            >
              <option value="">Select</option>
              <option value="Movie">Movie</option>
              <option value="TV Show">TV Show</option>
            </Field>
            <ErrorMessage
              name="type"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div>
            <label className="block font-medium">Director</label>
            <Field name="director" className="input input-bordered w-full" />
            <ErrorMessage
              name="director"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div>
            <label className="block font-medium">Budget</label>
            <Field
              name="budget"
              type="number"
              className="input input-bordered w-full"
            />
            <ErrorMessage
              name="budget"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div>
            <label className="block font-medium">Location</label>
            <Field name="location" className="input input-bordered w-full" />
            <ErrorMessage
              name="location"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div>
            <label className="block font-medium">Duration (min)</label>
            <Field
              name="duration"
              type="number"
              className="input input-bordered w-full"
            />
            <ErrorMessage
              name="duration"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div>
            <label className="block font-medium">Year</label>
            <Field
              name="year"
              type="number"
              className="input input-bordered w-full"
            />
            <ErrorMessage
              name="year"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={isSubmitting}
          >
            {entryId ? "Update" : "Add"} Entry
          </button>
        </Form>
      )}
    </Formik>
  );
}
