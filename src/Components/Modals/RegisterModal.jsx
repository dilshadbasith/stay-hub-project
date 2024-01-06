import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import { myContext } from "../Context";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./LoginModal.css";
import Axios from "../../lib/Axios";
import { toast } from "react-toastify";

export default function DialogWithForm() {
  const { handleOpen } = useContext(myContext);

  const basicSchema = Yup.object().shape({
    name: Yup.string().min(3).required("required"),
    email: Yup.string().email("Please enter valid email").required("required"),
    mobilenumber: Yup.number().positive().integer().required("required"),
    password: Yup.string().min(5).required("required"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobilenumber: "",
      password: "",
    },
    validationSchema: basicSchema,
    onSubmit: async (values) => {
      try {
        const res = await Axios.post("/api/users/auth/signup", values);
        toast.success("Registration successful!");
        handleOpen();
      } catch (error) {
        if (error.response.status == 403) {
          toast.error("User already exists,Try with another email!");
          handleOpen()
        } else {
          toast.error("Registration failed. Please try again.");
          handleOpen();
        }
      }
    },
  });

  return (
    <>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <form onSubmit={formik.handleSubmit}>
          <Card className="mx-auto w-full max-w-[24rem]">
            <CardBody className="flex flex-col gap-4 max-h-modal-body overflow-auto">
              <Typography variant="h4" color="red" className="text-center">
                Register
              </Typography>

              <Input
                label="Fullname"
                type="text"
                id="name"
                size="lg"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.errors.name && formik.touched.name && (
                <p className="error">{formik.errors.name}</p>
              )}
              <Input
                label="Email"
                type="email"
                id="email"
                size="lg"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched.email && (
                <p className="error">{formik.errors.email}</p>
              )}
              <Input
                label="Mobile"
                size="lg"
                id="mobilenumber"
                type="number"
                value={formik.values.mobilenumber}
                onChange={formik.handleChange}
              />
              {formik.errors.mobilenumber && formik.touched.mobilenumber && (
                <p className="error">{formik.errors.mobilenumber}</p>
              )}
              <Input
                label="Password"
                size="lg"
                id="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password && formik.touched.password && (
                <p className="error">{formik.errors.password}</p>
              )}
            </CardBody>
            <CardFooter className="pt-0">
              <Button type="submit" variant="gradient" fullWidth color="red">
                SignUp
              </Button>
              {/* <Typography variant="small" className="mt-4 flex justify-center">
              Already have an account?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="red"
                className="ml-1 font-bold"
                onClick={handleOpen}
              >
                SignIn
              </Typography>
            </Typography> */}
            </CardFooter>
          </Card>
        </form>
      </Dialog>
    </>
  );
}
