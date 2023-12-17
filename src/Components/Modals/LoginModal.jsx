import React, { useContext } from "react";
import "../Modals/LoginModal.css";
import { myContext } from "../Context";
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
import { useNavigate } from "react-router-dom";


function LoginModal() {
  // const { modal, setModal } = useContext(myContext);
  const {handleLoginOpen}=useContext(myContext)
  const navigate=useNavigate()
  

  return (
    <div>
      
      <Dialog
        size="xs"
        open={open}
        handler={handleLoginOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="red" className="text-center">
              LOGIN
            </Typography>
            <Input label="Username" size="lg" />
            <Input label="Password" size="lg" />
            <div className="-ml-2.5 -mt-3">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              onClick={handleLoginOpen}
              fullWidth
              color="red"
            >
              Sign In
            </Button>
            {/* <Typography variant="small" className="mt-4 flex justify-center">
              Don't have an account?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="red"
                className="ml-1 font-bold"
                onClick={()=>{navigate('/register')}}
              >
                SignUp
              </Typography>
            </Typography> */}
          </CardFooter>
        </Card>
      </Dialog>
    </div>
  );
}

export default LoginModal;
