import * as yup from "yup";

const entrySchema = yup.object({
  title: yup.string().required(),
  type: yup.string().oneOf(["Movie", "TV Show"]).required(),
  director: yup.string().required(),
  budget: yup.number().required(),
  location: yup.string().required(),
  duration: yup.number().required(),
  year: yup.number().required(),
});

export default entrySchema;
