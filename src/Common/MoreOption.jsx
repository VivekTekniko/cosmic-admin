import React, { useContext } from "react";
import { HiVideoCamera, HiOutlineDotsHorizontal } from "react-icons/hi";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ImgBox from "./ImgBox";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
const MoreOption = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const profilePic = state?.profile?.profile_image;
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutfn = () => {
    Cookies.remove("token");
    Cookies.remove("auth");
    Cookies.remove("role");
    navigate("/");
    dispatch({ type: "USER", payload: {} });
  };
  return (
    <>
      <span
        style={{ cursor: "pointer" }}
        onClick={handleClick}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <ImgBox circle="50%" size="40px" url={profilePic} />
      </span>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => navigate("/profile")}>View Profile</MenuItem>
        {/* <MenuItem>Mute Notification</MenuItem> */}
        <MenuItem onClick={logoutfn}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default MoreOption;
