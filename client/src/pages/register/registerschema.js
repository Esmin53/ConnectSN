import * as yup from "yup";

export const registerSchema = yup.object().shape({
    firstName:  yup.string().required("Please provide valid first name!"),
    lastName:  yup.string().required("Please provide valid last name!"),
    email: yup.string().email("Please provide valid email!").required(),
    password: yup.string().min(6).required("Please provide valid password!"),
    confirmPassword: yup.string().min(6).required("Please provide valid password!"),
    location: yup.string(),
    occupation: yup.string(),
});