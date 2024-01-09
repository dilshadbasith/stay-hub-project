import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Axios from "../../lib/Axios";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

function Requests() {
  const [cardList, setCardList] = useState([]);
  const [cookies] = useCookies(["access_token"]);


  async function Cards() {
    const list = await Axios.get("/api/admin/properties", {
        headers: { Authorization: `Bearer ${cookies.access_token}` },
      });
    setCardList(list.data.data);
  }

  useEffect(() => {
    Cards();
  }, []);


  const handleApprove = async (e, id) => {
    e.preventDefault();
    try {
      const approve = await Axios.patch(
        `/api/admin/properties/${id}`,
        { adminApproved: true },
        {
          headers: { Authorization: `Bearer ${cookies.access_token}` },
        }
      );
      toast.success("Approved");
      Cards()
      // location.reload()
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleDisApprove = async (e, id) => {
    e.preventDefault();
    try {
      const disapprove = await Axios.patch(
        `/api/admin/properties/${id}`,
        { adminApproved: false },
        {
          headers: { Authorization: `Bearer ${cookies.access_token}` },
        }
      );
      toast.success("Disapproved");
      Cards()
      // location.reload()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <div className="requests-div">
    {cardList.slice().reverse().map((card,i)=>(
    <Card key={i} className="mt-6 w-96">
      <CardHeader color="blue-gray" className="relative h-56">
        <img
          src={card?.properties[0]}
          alt="card-image"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {card?.title}
        </Typography>
        <Typography>
        Bedrooms: {card?.roomCount} ◉ Bathrooms: {card?.bathroomCount} ◉ Guest Capacity: {card?.guestCount}
        </Typography>
        <Typography>
        Location:{card?.locationValue.location}
        </Typography>
        <Typography>
        Price:{card?.price}
        </Typography>
        <Typography>
        Category:{card?.category}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 flex justify-between ">
        {card.adminApproved===true?(
            <Button onClick={(e)=>handleDisApprove(e,card._id)}>DisApprove</Button>
        ):(
            <Button onClick={(e)=>handleApprove(e,card._id)}>Approve</Button>  
        )}
        {/* <Button>Delete</Button> */}
      </CardFooter>
    </Card>
    ))}
    </div>
  </>
  );
}

export default Requests;
