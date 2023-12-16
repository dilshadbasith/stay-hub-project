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
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { TextField } from "@mui/material";

function LoginModal() {
  // const { modal, setModal } = useContext(myContext);
  const {handleLoginOpen}=useContext(myContext)
  // const toggleModal = () => {
  //   setModal(!modal);
  // };

  return (
    <div>
      {/* <div className="modal">
        <div className="overlay"></div>
        <div className="modal-content">
          <h2 className="login">LOGIN</h2>
          <div className="text-div">
            <TextField variant="outlined" label="Username"></TextField>
            <TextField variant="outlined" label="Password"></TextField>
          </div>

          <button onClick={toggleModal} className="close-modal">
            <CloseRoundedIcon />
          </button>
        </div>
      </div> */}
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
            <Typography variant="small" className="mt-4 flex justify-center">
              Don&apos;t have an account?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="red"
                className="ml-1 font-bold"
                onClick={handleLoginOpen}
              >
                SignUp
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
    </div>
  );
}

export default LoginModal;
