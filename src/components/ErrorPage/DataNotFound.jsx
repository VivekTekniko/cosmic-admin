import React from "react";
import a from "../../assets/images/datanotfound.gif";
const DataNotFound = () => {
  return (
    <>
      <section className="data-notfound">
        <img style={{ height: "200px" }} src={a} />
        <p>Data Not Found</p>
      </section>
    </>
  );
};

export default DataNotFound;
