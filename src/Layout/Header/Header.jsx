import React, { useContext } from "react";
import s from "./Header.module.css";
import { useProSidebar } from "react-pro-sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineMessage } from "react-icons/md";
import { UserContext } from "../../App";
import MoreOption from "../../Common/MoreOption";

const Header = () => {
  const { state, dispatch } = useContext(UserContext);
  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } = useProSidebar();
  return (
    <>
      <section className={s["header-top-section"]}>
        <div className={s["header-container"]}>
          <div className={s["header-content"]}>
            <div className="header-content-left">
              <div onClick={() => collapseSidebar()}>
                <GiHamburgerMenu size={20} style={{ cursor: "pointer" }} />
              </div>
            </div>
            <div className={s["header-content-right"]}>
              {/* <IoIosNotificationsOutline size={27} /> */}
              {/* <MdOutlineMessage size={27} /> */}
              <span className="header-content-profile">
                <MoreOption />
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
