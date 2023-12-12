import * as Yup from "yup";


export const PostScheme = Yup.object().shape({
  title: Yup.string()
    .min(2, "Please Insert At Least 2 Characters")
    .max(50, "Please Insert Maximum 50 Characters")
    .required("Required"),
  description: Yup.string().required("Required"),
});