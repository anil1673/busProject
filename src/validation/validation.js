import * as Yup from "yup";

export const registerFormValidation=Yup.object({
    name:Yup.string().min(3).max(30).required("* please fill this field *"),
    email:Yup.string().email().required("* please fill this field *"),
    phone:Yup.string().min(10).max(10).required("* please fill this field *"),
    password:Yup.string().min(8).max(20).required("* please fill this field *"),
    location:Yup.string().min(4).required("* please fill this field *"),
    picturePath:Yup.string().min(4).required("* please fill this field *")


});

export const loginFormValidation=Yup.object({
    email:Yup.string().email().required("* please fill this field *"),
    password:Yup.string().min(8).max(20).required("* please fill this field *")
})