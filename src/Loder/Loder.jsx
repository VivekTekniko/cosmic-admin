import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loder(props) {
  return (
    <div>
      {props.loading && (
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={props.loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </div>
  );
}
