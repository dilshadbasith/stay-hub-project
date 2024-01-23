import React, { useContext, useEffect, useState } from "react";
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
import { useCookies } from "react-cookie";
import { myContext } from "../Context";

function Favorites() {
  // const [favorites,setFavorites]=useState([])
  const [cookies] = useCookies(["access_token"]);
  const { favorites, setFavorites } = useContext(myContext);

  async function Fav() {
    const list = await Axios.get("/api/users/favorites", {
      headers: { Authorization: `Bearer ${cookies.access_token}` },
    });
    //   console.log(list.data.data)
    setFavorites(list.data.data);
  }
  useEffect(() => {
    Fav();
  }, []);
  //   console.log(favorites,"kii")
  return (
    <div>
      <div className="... sticky top-0 z-10">
        <Navigationbar />
      </div>
      <h1 className="fav-h1">Favorites❤</h1>
      <div className="user-card-list">
        {favorites?.length === 0 ? (
          <h1 className="no-list">No Favorites!</h1>
        ) : (
          favorites.map((item) => (
            <Card className="mt-6 w-96">
              <CardHeader color="blue-gray" className="relative h-56">
                <img src={item?.listingId?.properties[0]} alt="card-image" />
              </CardHeader>
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {item?.listingId?.title}
                </Typography>
                <Typography>
                  Bedrooms: {item?.listingId?.roomCount} ◉ Bathrooms:{" "}
                  {item?.listingId?.bathroomCount} ◉ Guest Capacity:{" "}
                  {item?.listingId?.guestCount}
                </Typography>
                <Typography>
                  Location:{item?.listingId?.locationValue.location}
                </Typography>
                <Typography>Price:{item?.listingId?.price}/-</Typography>
                <Typography>Category:{item?.listingId?.category}</Typography>
              </CardBody>
              <CardFooter className="pt-0">
                {/* <Button>Read More</Button> */}
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default Favorites;
