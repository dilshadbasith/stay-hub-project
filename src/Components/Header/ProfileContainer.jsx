import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IoPersonCircleSharp } from "react-icons/io5";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext } from "react";
import { myContext } from "../Context";

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const {handleOpen,handleLoginOpen}=useContext(myContext)

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
          <IoPersonCircleSharp />
        </div>
      </Button>
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
        <MenuItem onClick={handleClose}>Airbnb your home</MenuItem>
        <MenuItem onClick={handleClose}>Help Centre</MenuItem>
      </Menu>
    </div>
  );
}
