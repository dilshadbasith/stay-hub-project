import React, { useContext, useState } from "react";
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
import Axios from "../../lib/Axios";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

function LoginModal() {
  const { handleLoginOpen } = useContext(myContext);
  const [formdata, setFormdata] = useState({ email: "", password: "" });
  const [_, setCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleChange = async (e) => {
    const { id, value } = e.target;
    setFormdata({ ...formdata, [id]: value });
  };
  console.log(formdata);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("/api/auth/login", formdata);
      if (response.data.role === "admin") {
        toast.success("Admin Login Successfull!");
        navigate("/adminhome");
        setCookie("access_token", response.data.accessToken);
        handleLoginOpen();
      } else {
        toast.success("Login Successfull!");
        navigate("/");
        handleLoginOpen();
      }
    } catch (error) {
      if(error.response.status == 401){
        toast.error("Login failed. You are a Suspended User")
      }else{
        toast.error("Login failed. Please try again.");
      }
      handleLoginOpen();
    }
  };

  return (
    <div>
      <Dialog
        size="xs"
        open={open}
        handler={handleLoginOpen}
        className="bg-transparent shadow-none"
      >
        <form onSubmit={handleSubmit}>
          <Card className="mx-auto w-full max-w-[24rem]">
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="red" className="text-center">
                LOGIN
              </Typography>
              <Input
                type="email"
                label="email"
                id="email"
                size="lg"
                onChange={handleChange}
                value={formdata.email}
              />
              <Input
                type="password"
                label="Password"
                id="password"
                size="lg"
                onChange={handleChange}
                value={formdata.password}
              />
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" fullWidth color="red" type="submit">
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
        </form>
      </Dialog>
    </div>
  );
}

export default LoginModal;
