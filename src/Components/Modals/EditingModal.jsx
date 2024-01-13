import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../../lib/Axios";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { updateUser } from "../../Redux/Reducers/UserReducer";

export function EditingModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const { currentUser } = useSelector((state) => state.user);
  const [formdata, setFormdata] = useState({});
  const [cookies] = useCookies(["access_token"]);
  const dispatch=useDispatch()
  //   console.log(formdata);

  const UpdateUser = async (e) => {
    e.preventDefault();
    try {
     const res= await Axios.put( "/api/users/update",
        formdata,
        {
          headers: { Authorization: `Bearer ${cookies.access_token}` },
        }
        );
        // console.log(res.data.data);
        const Data=res.data.data
        dispatch(updateUser(Data))
      toast.success("Updated sucessfully");
      handleOpen()
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };

  return (
    <>
      <div
        style={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "5%",
          fontSize: "2rem",
        }}
      >
        <FaEdit onClick={handleOpen} />
      </div>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <form onSubmit={UpdateUser}>
          <Card className="mx-auto w-full max-w-[24rem]">
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                Edit you Info
              </Typography>

              <Typography className="-mb-2" variant="h6">
                Your Name
              </Typography>
              <Input
                label="FullName"
                size="lg"
                value={formdata.name}
                defaultValue={currentUser.name}
                id="name"
                onChange={handleChange}
              />
              <Typography className="-mb-2" variant="h6">
                Your Mobile Number
              </Typography>
              <Input
                label="Mobile"
                type="number"
                size="lg"
                value={formdata.mobilenumber}
                defaultValue={currentUser.mobilenumber}
                id="mobilenumber"
                onChange={handleChange}
              />
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" fullWidth type="submit">
                Submit
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Dialog>
    </>
  );
}
