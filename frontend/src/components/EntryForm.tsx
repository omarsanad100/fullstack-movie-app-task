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
  type: Yup.string().required("Required"),
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
        <Form className="space-y-4 bg-white p-4 rounded shadow">
          <div>
            <label className="block font-medium">Title</label>
            <Field name="title" className="input input-bordered w-full" />
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          {/* Repeat for other fields: type, director, budget, location, duration, year */}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {entryId ? "Update" : "Add"} Entry
          </button>
        </Form>
      )}
    </Formik>
  );
}
