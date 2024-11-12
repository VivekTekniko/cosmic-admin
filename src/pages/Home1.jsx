import React, { useState, useEffect, useContext } from "react";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import s from "../Layout/Header/Header.module.css";
import { useProSidebar } from "react-pro-sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineMessage } from "react-icons/md";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Header from "../Layout/Header/Header";
import Sidebar from "../Layout/Sidebar/Sidebar";
import MoreOption from "../Common/MoreOption";
import routeArray from "./../routes.js";
import Cookies from "js-cookie";
import get_admin_profile_api from "../components/api/profile";
import { UserContext } from "../App";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(6)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7.4)} + 1px)`,
  },
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Home1 = () => {
  const { route } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const { state, dispatch } = useContext(UserContext);
  const auth = sessionStorage.getItem("auth") || Cookies.get("auth");
  const handleDrawerOpen = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  useEffect(() => {
    const allRoutes = [];
    routeArray.map((item) => {
      allRoutes.push(item.params);
    });
    if (!allRoutes.includes(route)) {
      navigate("/error");
    }
    if (auth === "true") {
    } else {
      return navigate("/");
    }
  }, []);

  useEffect(() => {
    getProfile();
  }, []);
  const getProfile = async () => {
    try {
      const res = await get_admin_profile_api();
      if (res.data.status) {
        dispatch({
          type: "USER",
          payload: {
            ...state,
            profile: res.data.data,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}>
        <section className={s["header-top-section"]}>
          <div className={s["header-container"]}>
            <div className={s["header-content"]}>
              <div className="header-content-left" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ color: "#fff" }} onClick={handleDrawerOpen}>
                  <GiHamburgerMenu size={20} style={{ cursor: "pointer" }} />
                </div>
                <div>
                  <h3 style={{ color: "#fff" }}>Dashboard</h3>
                </div>
              </div>
              <div style={{ color: "#2c3e50" }} className={s["header-content-right"]}>
                {/* <IoIosNotificationsOutline size={27} />
                <MdOutlineMessage size={27} /> */}
                <span className="header-content-profile">
                  <MoreOption />
                </span>
              </div>
            </div>
          </div>
        </section>
      </AppBar>

      <Drawer className={s["drawer-sidebar"]} variant="permanent" open={open}>
        <div onClick={() => setOpen(true)}>
          <Sidebar open={open} />
        </div>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, marginTop: "7rem", backgroundColor: "#f9f9fa" }}>
        <div style={{ paddingInline: "1rem" }} id={`${open === true ? "open" : "close"}`}>
          {routeArray.map((item) => route === item.params && item.component)}
        </div>
      </Box>
    </Box>
  );
};

export default Home1;
