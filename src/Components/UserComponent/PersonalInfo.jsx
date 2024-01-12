import { Avatar } from "@mui/material";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TbCameraPlus } from "react-icons/tb";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import EditAvatar from "../../lib/EditAvatar";
import Axios from "../../lib/Axios";
import { editAvatar } from "../../Redux/Reducers/UserReducer";
import Navigationbar from "../Header/Navigationbar";
import { Loading } from "../RentPage/Loading";

function PersonalInfo() {
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [upload, setUpload] = useState(false);
  const [uploading, setUploading] = useState(false);

  // const [image,setImage]=useState();
  const fileRef = useRef(null);
  const [cookies] = useCookies(["access_token"]);
  const dispatch = useDispatch();

  // console.log(currentUser._id);

  const handleFileUpload = async () => {
      setUploading(true)
    try {
      const url = await EditAvatar(file);
      await Axios.put(
        `/api/users/${currentUser._id}/updateAvatar`,
        {
          image: url,
        },
        {
          headers: { Authorization: `Bearer ${cookies.access_token}` },
        }
      );

      setUploading(false)
      dispatch(editAvatar(url));
      toast.success("Updated sucessfully");
    } catch (error) {
      console.log("from upload", error.message);
      toast.error("updation failed:", error.message);
      setUploading(false)
    }
  };

  const uploadavatar = async (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div>
      <div>
        <Navigationbar />
      </div>
      <div className="personal-div">
        <h1 className="personal-h1">
          <u>Personal Info</u>
        </h1>
        <input
          type="file"
          onChange={(e) => uploadavatar(e)}
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <Avatar sx={{ width: 100, height: 100 }} src={currentUser?.image} />
        <TbCameraPlus
          style={{
            fontSize: "1.5rem",
            position: "relative",
            left: "4rem",
            bottom: "2rem",
            color: "gray",
            cursor: "pointer",
          }}
          onClick={() => {
            fileRef.current.click();
            setUpload(true);
          }}
        />
        {upload && (
          <button
            className="upload-btn1"
            onClick={() => {
              handleFileUpload();
              setUpload(false);
            }}
          >
            Upload
          </button>
        )}
        {uploading&&<Loading/>}
      </div>
      <div className="personal-sub-div">
        <div className="personal-sub-div1">
          <h1 style={{ fontWeight: "bold" }}>Full Name:</h1>
          <p style={{ color: "gray" }}>{currentUser.name}</p>
        </div>
        <div className="personal-sub-div1">
          <h1 style={{ fontWeight: "bold" }}>Email:</h1>
          <p style={{ color: "gray" }}>{currentUser.email}</p>
        </div>
        <div className="personal-sub-div1">
          <h1 style={{ fontWeight: "bold" }}>Mobile Number:</h1>
          <p style={{ color: "gray" }}>{currentUser.mobilenumber}</p>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;
