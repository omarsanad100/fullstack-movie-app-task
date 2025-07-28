import { Formik } from "formik";
import type { Entry } from "./types/entry";
import { createEntry, updateEntry } from "./utils/api";
import { validationSchema } from "./constant";
import EntryFormFields from "./EntryFormFields";

interface EntryFormProps {
  initialValues: Omit<Entry, "id" | "createdAt">;
  onSuccess: () => void;
  entryId?: number;
}

const EntryForm = ({ initialValues, onSuccess, entryId }: EntryFormProps) => {
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
      {(formikProps) => <EntryFormFields {...formikProps} entryId={entryId} />}
    </Formik>
  );
};

export default EntryForm;
