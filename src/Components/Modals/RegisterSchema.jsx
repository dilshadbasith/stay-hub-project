import * as Yup from 'yup'

export const basicSchema = Yup.object().shape({
    name:Yup.string().min(3).required("required"),
    email:Yup.string().email("Please enter valid email").required("required"),
    mobile:Yup.number().positive().integer().required("required"),
    username:Yup.string().min(3).required("required"),
    password:Yup.string().min(5).required("required"),
    confirmpassword:Yup.string().oneOf([Yup.ref("password")],"password not matched").required("required")
})