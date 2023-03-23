import * as yup from "yup";

export const loginSchema = yup.object().shape({
    email: yup.string().email("Please enter valid email!").required(),
    password: yup.string().min(6).required()
});