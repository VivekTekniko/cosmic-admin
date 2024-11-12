import React, { useState } from "react";
import { RxDashboard } from "react-icons/rx";
import s from "./sidebar.module.css";
import { FiUsers } from "react-icons/fi";
import { MdOutlineArticle, MdEvent, MdHomeRepairService, MdOutlinePortrait } from "react-icons/md";
import { GiKnightBanner } from "react-icons/gi";
import logo from "../../assets/icons/logo.png";
import { useNavigate } from "react-router-dom";
import { BiCategory, BiHomeHeart } from "react-icons/bi";
import { MdOutlineCategory } from "react-icons/md";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { MdMiscellaneousServices } from "react-icons/md";
import { RiCustomerService2Line } from "react-icons/ri";
import { BiSolidOffer } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { GrBusinessService, GrHomeOption } from "react-icons/gr";
import Cookies from "js-cookie";
const Sidebar = ({ open }) => {
  const navigate = useNavigate();

  const role = Cookies.get("role")
  const [menuItems, setmenuItems] = useState([
    {
      title: "Dashboard",
      icons: <RxDashboard size={20} />,
      navigate: "dashboard",
      show: false,
      subItems: [],
    },
    {
      title: "Customer Table",
      icons: <FaUsers size={20} />,
      navigate: "customer-table",
      show: false,
      subItems: []
    },
    {
      title: "Admin Table",
      icons: <GiKnightBanner size={20} />,
      navigate: "admin-list",
      show: false,
      subItems: [],
    },
    {
      title: "Vendor Table",
      icons: <GiKnightBanner size={20} />,
      navigate: "vendor-listing",
      show: false,
      subItems: [],
    },
    // {
    //   title: " Users",
    //   icons: <FiUsers size={20} />,
    //   navigate: "users",
    //   show: false,
    //   subItems: [],
    // },
    {
      title: "Budget Range",
      icons: <BiCategory size={20} />,
      navigate: "budget-range",
      show: false,
      subItems: [],
    },
    // {
    //   title: "Sub Categories",
    //   icons: <MdOutlineCategory size={20} />,
    //   navigate: "sub-categories-list",
    //   show: false,
    //   subItems: [],
    // },
    {
      title: "Services",
      icons: <MdHomeRepairService size={20} />,
      navigate: "service-list",
      show: false,
      subItems: [],
    },
    {
      title: "Package",
      icons: <BiHomeHeart size={20} />,
      navigate: "package-list",
      show: false,
      subItems: [],
    },
    {
      title: "Location",
      icons: <FaUsers size={20} />,
      navigate: "location-list",
      show: false,
      subItems: [],
    },
    {
      title: "Rejected Leads",
      icons: <GiKnightBanner size={20} />,
      navigate: "rejected-List",
      show: false,
      subItems: [],
    },
    // {
    //   title: "Blogs",
    //   icons: <FaUsers size={20} />,
    //   navigate: "blog-list",
    //   show: false,
    //   subItems: [],
    // },
    // {
    //   title: "Admin Table",
    //   icons: <FaUsers size={20} />,
    //   navigate: "admin-list",
    //   show: false,
    //   subItems: [],
    // },

    // {
    //   title: " Booking List",
    //   icons: <MdOutlineArticle size={20} />,
    //   navigate: "booking-list",
    //   show: false,
    //   subItems: [],
    // },
    // {
    //   title: " Callback Requests",
    //   icons: <VscGitPullRequestGoToChanges size={20} />,
    //   navigate: "call-request",
    //   show: false,
    //   subItems: [],
    // },
    // {
    //   title: "Service Requests",
    //   icons: <MdMiscellaneousServices size={20} />,
    //   navigate: "service-requests",
    //   show: false,
    //   subItems: [],
    // },
    // {
    //   title: "Consults Requests",
    //   icons: <RiCustomerService2Line size={20} />,
    //   navigate: "consult-requests",
    //   show: false,
    //   subItems: [],
    // },
    // {
    //   title: "Offers",
    //   icons: <BiSolidOffer size={20} />,
    //   navigate: "offer-list",
    //   show: false,
    //   subItems: [],
    // },
  ]);
  const [admin, setAdmin] = useState([
    {
      title: "Dashboard",
      icons: <RxDashboard size={20} />,
      navigate: "dashboard",
      show: false,
      subItems: [],
    },
    // {
    //   title: "Customer Table",
    //   icons: <FaUsers size={20} />,
    //   navigate: "customer-table",
    //   show: false,
    //   subItems: []
    // },

    {
      title: "Vendor Table",
      icons: <GiKnightBanner size={20} />,
      navigate: "vendor-listing",
      show: false,
      subItems: [],
    },
    {
      title: "Rejected Leads",
      icons: <GiKnightBanner size={20} />,
      navigate: "rejected-List",
      show: false,
      subItems: [],
    },


  ]);

  const [vendor, setVendor] = useState([
    {
      title: "Dashboard",
      icons: <RxDashboard size={20} />,
      navigate: "dashboard",
      show: false,
      subItems: [],
    },
    {
      title: "Customer Table",
      icons: <FaUsers size={20} />,
      navigate: "customer-table",
      show: false,
      subItems: []
    },
    {
      title: "Rejected Leads",
      icons: <GiKnightBanner size={20} />,
      navigate: "rejected-List",
      show: false,
      subItems: [],
    },
    // {
    //   title: "Admin Table",
    //   icons: <GiKnightBanner size={20} />,
    //   navigate: "banner",
    //   show: false,
    //   subItems: [],
    // },
    // {
    //   title: "Vendor Table",
    //   icons: <GiKnightBanner size={20} />,
    //   navigate: "vendor-listing",
    //   show: false,
    //   subItems: [],
    // },

  ]);
  return (
    <>
      <section className={s["sidebar"]}>
        <div className={`${s["collapsed-logo"]} ${open ? `${s["logo-section"]}` : `${s["logo-section-hide"]}`}`} style={{ marginLeft: "1rem" }}>
          <img style={{ width: "95%", margin: "auto" }} src={logo} alt="logo" draggable="false" />
        </div>
        {/* {menuItems.map((data, i) => (
          <div className={s["sidebar-content"]}>
            <div className={s["sidebar-item"]} onClick={() => navigate(`/${data?.navigate}`)}>
              <div className="sidebaricons">{data.icons}</div>
              <div className={open ? `${s["sidebar-title"]}` : `${s["sidebar-title-hide"]}`}>{data.title}</div>
            </div>
          </div>
        ))} */}
        {role === "Admin" ? (admin.map((data, i) => (
          <div key={i}>
            <div
              className={s["sidebar-content"]}
              onClick={() => navigate(`/${data?.navigate}`)}
            >
              <div className={s["sidebar-item"]}>
                <div className="sidebaricons">{data.icons}</div>
                <div
                  className={
                    open ? `${s["sidebar-title"]}` : `${s["sidebar-title-hide"]}`
                  }
                >
                  {data.title}
                </div>
              </div>
            </div>
          </div>
        ))) : role === "Vendor" ? (vendor.map((data, i) => (
          <div key={i}>
            <div
              className={s["sidebar-content"]}
              onClick={() => navigate(`/${data?.navigate}`)}
            >
              <div className={s["sidebar-item"]}>
                <div className="sidebaricons">{data?.icons}</div>
                <div
                  className={
                    open ? `${s["sidebar-title"]}` : `${s["sidebar-title-hide"]}`
                  }
                >
                  {data.title}
                </div>
              </div>
            </div>
          </div>
        ))) :
          (menuItems.map((data, i) => (
            <div key={i}>
              <div
                className={s["sidebar-content"]}
                onClick={() => navigate(`/${data?.navigate}`)}
              >
                <div className={s["sidebar-item"]}>
                  <div className="sidebaricons">{data?.icons}</div>
                  <div
                    className={
                      open ? `${s["sidebar-title"]}` : `${s["sidebar-title-hide"]}`
                    }
                  >
                    {data.title}
                  </div>
                </div>
              </div>
            </div>
          )))
        }
      </section>
    </>
  );
};

export default Sidebar;
