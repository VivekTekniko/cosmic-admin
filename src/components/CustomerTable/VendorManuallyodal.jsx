import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import s from "./admin.module.css";
import { Grid } from "@mui/material";
import { notificationHandler } from "../../utils/Notification";
import {
  addRemark,
  fetchFilterVendorfunc,
  fetchManuallyAssigned,
  updateAssignedVendor,
} from "../api/customerTable";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "4px solid  #b22029",
  boxShadow: 24,
  p: 4,
};

export default function VendorManuallyModal({
  open,
  setOpen,
  customerId,
  assignedVendor,
}) {
    console.log(assignedVendor)
  // const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [filterVendor, setFilterVendor] = React.useState([]);

  const fetchFilterVendor = async () => {
    let payload = {
      customerId: customerId,
    };
    let res = await fetchFilterVendorfunc(payload);
    setFilterVendor(res?.data?.data);
  };

  const handleManuallyAdd = async (value) => {
    let payload = {
      customer: customerId,
      vendor: value,
    };
    let res = await fetchManuallyAssigned(payload);
    console.log(res)
    if (res?.data?.status) {
      notificationHandler({ type: "success", msg: "Assigned Successfully" });
      setOpen(false);
    }else{
        notificationHandler({ type: "success", msg: res?.data?.message });
    }
  };

  React.useEffect(() => {
    if (open) {
      fetchFilterVendor();
    }
  }, [open]);

  const handleUnassigned = async (id) => {
    let payload = {
      status: "Pending",
      assignVendor: id,
    };
    let res = await updateAssignedVendor(payload, customerId);
    console.log(res, "reesuuuu");
    if (res?.data?.status) {
      notificationHandler({ type: "success", msg: "UnAssigned Successfully" });
      setOpen(false);
    }else{
        notificationHandler({ type: "success", msg: res?.data?.message });
    }
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Assigned Manually Lead to Vendor
            <span style={{ color: "red" }}>*</span>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Grid xs={12}>
              <div className="form-group">
                {/* <textarea className='form-control'  value={assignedVendor?.map((elem,id)=>elem?.userName , )} style={{marginBottom:"12px"}} /> */}
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">S.No.</th>
                      <th scope="col">Vendor Name</th>
                      <th scope="col">Assigned Date</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignedVendor?.map((elem, id) => (
                      <tr key={elem?._id}>
                        <th scope="row">{id + 1}</th>
                        <td>{elem?.userName}</td>
                        <td>{elem?.assignAt?.split("T")[0]}</td>
                        <td
                          style={{ cursor: "pointer", color: "#e82e79" }}
                          onClick={() => handleUnassigned(elem?._id)}
                        >
                          Unassigned Lead
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <select
                  className="remark-design"
                  onChange={(e) => handleManuallyAdd(e.target.value)}
                >
                  <option value="">Manually Send</option>
                  {filterVendor?.map((elem, id) => {
                    return <option value={elem?.id}>{elem?.userName}</option>;
                  })}
                </select>
              </div>
            </Grid>
          </Typography>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                        <div style={{ display: "flex", justifyContent: "end", marginTop: "1rem" }}>
                            <span className={s["title"]} onClick={() => handleAddRemark()}>
                                Submit
                            </span>
                        </div>
                    </Typography> */}
        </Box>
      </Modal>
    </div>
  );
}
