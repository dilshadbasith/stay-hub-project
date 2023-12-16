import React, { useContext } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { myContext } from "../Context";

export default function DialogWithForm() {
  const {handleOpen}=useContext(myContext)

  return (
    <>
      {/* <Button onClick={handleOpen}>Sign In</Button> */}
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

            <Input label="Fullname" size="lg" />
            <Input label="Email" size="lg" />
            <Input label="Mobile" size="lg" />
            <Input label="Password" size="lg" />
            <div className="-ml-2.5 -mt-3">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              onClick={handleOpen}
              fullWidth
              color="red"
            >
              SignUp
            </Button>
            <Typography variant="small" className="mt-4 flex justify-center">
              Don&apos;t have an account?
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
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
