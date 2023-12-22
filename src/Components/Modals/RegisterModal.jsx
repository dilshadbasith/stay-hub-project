import React, { useContext } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { myContext } from "../Context";
import { useFormik } from "formik";
import { basicSchema } from "./RegisterSchema";

const onSubmit = () =>{
  console.log("submitted")
}

export default function DialogWithForm() {
  const { handleOpen } = useContext(myContext);

  const {values,errors,handleBlur,handleChange,handleSubmit} = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      username: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema:basicSchema,
    onSubmit,
  });
  console.log(errors)

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Dialog
          size="xs"
          open={open}
          handler={handleOpen}
          className="bg-transparent shadow-none"
        >
          <Card className="mx-auto w-full max-w-[24rem]">
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="red" className="text-center">
                Register
              </Typography>

              <Input
                label="Fullname"
                type="text"
                id="name"
                size="lg"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={name?"input-error":""}
              />
              <Input
                label="Email"
                type="email"
                id="email"
                size="lg"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                label="Mobile"
                size="lg"
                id="mobile"
                type="number"
                value={values.mobile}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                label="Username"
                size="lg"
                id="username"
                type="text"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                label="Password"
                size="lg"
                id="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                label="Confirm Password"
                size="lg"
                id="confirmpassword"
                type="password"
                value={values.confirmpassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className="-ml-2.5 -mt-3">
                <Checkbox label="Remember Me" />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                type="submit"
                variant="gradient"
                onClick={handleOpen}
                fullWidth
                color="red"
              >
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
        </Dialog>
      </form>
    </>
  );
}
