import * as Yup from "yup";

export const validationSchema = Yup.object({
  title: Yup.string().required("Required"),
  type: Yup.string().oneOf(["Movie", "TV Show"]).required("Required"),
  director: Yup.string().required("Required"),
  budget: Yup.number().required("Required").min(0),
  location: Yup.string().required("Required"),
  duration: Yup.number().required("Required").min(1),
  year: Yup.number().required("Required").min(1900),
});
