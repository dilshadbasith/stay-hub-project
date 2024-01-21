import React, { useEffect, useState } from "react";
import Navigationbar from "../Header/Navigationbar";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Axios from "../../lib/Axios";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

function UserListing() {
  const [cardList, setCardList] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [cookies] = useCookies(["access_token"]);


  async function Cards() {
    const list = await Axios.get(`/api/data/listings`);
    // console.log(list.data, "kooi");
    setCardList(list.data.data);
  }
  useEffect(() => {
    Cards();
  }, []);
  // console.log(cardList, "k");

  const filtered = cardList.filter((item) => item.userId == currentUser._id);
  // console.log(filtered, "f");


  const handleDelete=async(id)=>{
    if(window.confirm("Are you sure to delete?")){
      await Axios.delete(`/api/users/listings/${id}`,{
        headers: { Authorization: `Bearer ${cookies.access_token}` },
      })
      toast.success("successfully deleted")
      Cards();
    }
  }

  return (
    <div>
      <div className="... sticky top-0 z-10">
        <Navigationbar />
      </div>
      <div className="user-card-list">
        {filtered.map((item) => (
          <Card key={item._id} className="mt-6 w-96">
            <CardHeader color="blue-gray" className="relative h-56">
              <img src={item?.properties[0]} alt="card-image" />
            </CardHeader>
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {item.title}
              </Typography>
              <Typography>
                Bedrooms: {item?.roomCount} ◉ Bathrooms: {item?.bathroomCount} ◉
                Guest Capacity: {item?.guestCount}
              </Typography>
              <Typography>Location:{item?.locationValue.location}</Typography>
              <Typography>Price:{item?.price}</Typography>
              <Typography>Category:{item?.category}</Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button onClick={()=>handleDelete(item._id)}>Delete</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default UserListing;
