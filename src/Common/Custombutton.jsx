import React from "react";
import styles from "./common.module.css";
const Custombutton = ({ children }) => {
  return (
    <>
      <button className={styles.custombutton}>{children}</button>
    </>
  );
};

export default Custombutton;
