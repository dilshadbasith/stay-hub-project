import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext } from "react";
import { myContext } from "../Context";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Avatar } from "@mui/material";
import { logout } from "../../Redux/Reducers/UserReducer";
import { toast } from "react-toastify";


export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate=useNavigate()
  const [cookie, setCookie, removeCookie]=useCookies(["access_token"])
  const dispatch = useDispatch()
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const {handleOpen,handleLoginOpen}=useContext(myContext)
  const { currentUser } = useSelector((state) => state.user);


  
  // console.log(currentUser,"hi")


  const handleLogout = () => {
    if(window.confirm("Are you sure to logout?")){
      removeCookie("access_token");
      navigate('/')
      dispatch(logout())
    }
    toast.success("logout successfully")
  }
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <div className="profile-div">
          <MenuIcon />
          {/* <IoPersonCircleSharp  className="avatar" /> */}
          <Avatar src={currentUser?.image}/>
        </div>
      </Button>
      {currentUser?(
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{".MuiPaper-root":{borderRadius:"1rem"}}}
      >
        <MenuItem >{`Hello ${currentUser?.name}`}</MenuItem>
        <MenuItem onClick={()=>navigate('/userprofile')}>Account</MenuItem>
        {/* <MenuItem onClick={()=>navigate('/trips')}>Trips</MenuItem> */}
        <MenuItem onClick={()=>{handleLogout();setAnchorEl(null);}}>Logout</MenuItem>
      </Menu>

      ):(
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{".MuiPaper-root":{borderRadius:"1rem"}}}
      >
        <MenuItem onClick={()=>{handleOpen();setAnchorEl(null)}}>SignUp</MenuItem>
        <MenuItem onClick={()=>{handleLoginOpen();setAnchorEl(null);}}>Login</MenuItem><br />
        <MenuItem onClick={()=>{navigate('/airbnbhome');setAnchorEl(null);}}>Host your home</MenuItem>
        <MenuItem onClick={handleClose}>Help Centre</MenuItem>
      </Menu> 
      )}
    </div>
  );
}
