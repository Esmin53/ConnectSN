import * as yup from "yup";

export const registerSchema = yup.object().shape({
    firstName:  yup.string(),
    lastName:  yup.string(),
    email: yup.string(),
    password: yup.string(),
    confirmPassword: yup.string(),
    location: yup.string(),
    occupation: yup.string(),
});