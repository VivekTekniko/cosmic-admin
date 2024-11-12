import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { tableCellClasses } from "@mui/material/TableCell";
import s from "./admin.module.css";
import { useNavigate } from "react-router-dom";
import { delete_admin_api, delete_banner_api, fetchallAdmin, status_banner_api } from "../api/admin";
import Loder from "../../Loder/Loder";
import { Dialog, DialogActions, DialogTitle, DialogContent, Pagination } from "@mui/material";
import { notificationHandler } from "../../utils/Notification";
import { BiFilter, BiSearch } from "react-icons/bi";
import DataNotFound from "../ErrorPage/DataNotFound";
import { getBaseUrl2 } from "../../utils";
import { getAllService_api } from "../api/service";

const AdminList = () => {
  const navigate = useNavigate();
  const [isloading, setisLoading] = useState(false);
  const [allAdmin, setallAdmin] = useState([]);
  const [pageCount, setpageCount] = useState(1);
  const [deleteId, setdeleteId] = useState(null);
  const [deletePopup, setdeletePopup] = useState(false);
  const [currentGroup, setcurrentGroup] = useState({});
  const [pageLength, setpageLength] = useState();
  const [search, setsearch] = useState("");

  const [allService, setallService] = useState([])
  useEffect(() => {
    fetchallAdminFunc();
  }, [pageCount, search]);

  const fetchallAdminFunc = async (data) => {
    setisLoading(true);
    try {
      const temp = {
        page: pageCount,
        limit: 8,
        search: search.trim(),
      };
      let res = await fetchallAdmin(temp);
      if (res.data.status) {
        setallAdmin(res.data.data.admins);
        setpageLength(res?.data?.toatalPage);
        setisLoading(false);
      } else {
        setisLoading(false);
        console.log("status false!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "var(--clr-theme)",
      color: theme.palette.common.white,
      fontWeight: "bold",
      borderRight: "1px solid #fff",
      overflow: "hidden",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      border: "none",
      borderLeft: "2px solid #00000011",
      "&:last-child": {
        borderRight: "2px solid #00000011",
      },
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    borderBottom: "2px solid #00000011",
  }));

  async function deleteBrandFunc() {
    setisLoading(true);
    try {
      let res = await delete_banner_api(deleteId);
      console.log(res);
      setdeletePopup(false);
      setisLoading(false);
      fetchallAdminFunc();
      if (res.data.status) {
        setdeletePopup(false);
        setisLoading(false);
        fetchallAdminFunc();
        notificationHandler({ type: "success", msg: res.data.message });
      } else {
        setisLoading(false);
        notificationHandler({ type: "danger", msg: res.data.message });
      }
    } catch (error) {
      console.log(error);
      notificationHandler({ type: "danger", msg: error.message });
    }
  }

  const admin_status = async (data) => {
    console.log(data._id);
    setisLoading(true);
    const fd = new FormData();
    fd.append("status", data.status == true ? false : true);
    try {
      let res = await status_banner_api(data._id, fd);
      if (res.data.status) {
        setisLoading(false);
        fetchallAdminFunc();
        notificationHandler({ type: "success", msg: res.data.message });
      } else {
        setisLoading(false);
        notificationHandler({ type: "danger", msg: res.data.message });
      }
    } catch (error) {
      console.log(error);
      notificationHandler({ type: "danger", msg: error.message });
    }
  };





  //  this is used to select the service 
  useEffect(() => {
    fetchallServiceFunc();
  }, []);

  async function fetchallServiceFunc(data) {
    setisLoading(true);
    try {
      const temp = {
        page: pageCount,
        limit: 100,
        search: search.trim(),
      };
      let res = await getAllService_api(temp);
      if (res.data.status) {
        setallService(res.data.data.services);
        setisLoading(false);
      } else {
        setisLoading(false);
        console.log("status false!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="beat_heading">
        <div className={s["user-list-title"]}>
          <h3>Admin List</h3>
        </div>
        <div className={s["user-list-heading"]}>
          <div className={s["user-list-title"]}>
            <div className="beat_left">
              <div
                className={s["title"]}
                onClick={() =>
                  navigate("/add-admin", {
                    state: {
                      pagetype: "Add",
                    },
                  })
                }
              >
                <IoMdAdd />Admin
              </div>
            </div>
          </div>
          <div className={s["user-list-search"]}>
            <div className={s["search-box"]}>
              <span style={{ paddingRight: "0.5rem" }}>
                <BiSearch size={23} />
              </span>
              <input
                type="text"
                spellCheck="false"
                onChange={(e) => {
                  setpageCount(1);
                  setsearch(e.target.value);
                }}
                placeholder="Search name..."
              />
            </div>
          </div>
        </div>
      </div>
      <div className="beat_table">
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {/* <StyledTableCell>Image</StyledTableCell> */}
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              {/* <StyledTableCell align="center">Mobile No.</StyledTableCell> */}
              <StyledTableCell align="center">Password</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allAdmin?.map((row) => (
              <StyledTableRow key={row.id}>
                {/* <StyledTableCell>{row.image ? <img style={{ height: "2rem", width: "3rem" }} src={getBaseUrl2() + row.image} alt="" /> : null}</StyledTableCell> */}
                <StyledTableCell>{row.userName} </StyledTableCell>
                <StyledTableCell align="center">{row.email} </StyledTableCell>
                {/* <StyledTableCell align="center">7013456432</StyledTableCell> */}
                <StyledTableCell align="center">{row.password}</StyledTableCell>
                {/* <StyledTableCell align="center">

                  <select
                    // class="form-select"
                    style={{
                      border: " 1.5px solid #d63384",
                      borderRadius: "5px",
                      fontSize: "14px",
                      outline: "none",
                      color: "black",
                      fontWeight: "600",
                      padding: "8px",
                      cursor: "pointer"
                    }}
                    value={row?.status}
                  // onChange={(e) => updateUserStatus(e, row)}
                  // aria-label="Default select example" 
                  >
                    <option>select Service</option>
                    {
                      allService.map((data) => (
                        <option value={data._id}>{data.name}</option>
                      ))
                    }
                  </select>
                </StyledTableCell> */}
                {/* <StyledTableCell align="center">
                  <div style={{ cursor: "pointer" }} onClick={() => admin_status(row)} className={`${row.status === true ? s.active_admin : s.inactive_admin}`}>
                    {`${row.status === true ? "Active" : "InActive"}`}
                  </div>
                </StyledTableCell> */}
                <StyledTableCell align="center">
                  <CiEdit
                    onClick={() =>
                      navigate("/add-admin", {
                        state: {
                          pagetype: "Edit",
                          data: row,
                        },
                      })
                    }
                    style={{
                      fontSize: "1rem",
                      color: "var(--clr-theme",
                      marginRight: "0.5rem",
                      cursor: "pointer",
                    }}
                  />
                  <MdDelete
                    onClick={() => {
                      setdeletePopup(true);
                      setdeleteId(row._id);
                      setcurrentGroup(row);
                    }}
                    style={{ fontSize: "1rem", color: "red", cursor: "pointer" }}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        {allAdmin.length <= 0 && <DataNotFound />}
        {allAdmin?.length > 0 && (
          <div className={s["pagination"]}>
            <Pagination count={pageLength} size="large" style={{ color: "#D21903" }} onChange={(e, value) => setpageCount(value)} page={pageCount} />
          </div>
        )}
      </div>

      <Dialog open={deletePopup} aria-labelledby="form-dialog-title" maxWidth="xs" fullWidth="true" onClose={() => setdeletePopup(false)}>
        <DialogTitle className={s.dialog_title}>
          <div>Do you want to delete {currentGroup.title}?</div>
        </DialogTitle>
        <DialogContent className={s.cardpopup_content}>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div className={s.employee_gl_popup} onClick={() => setdeletePopup(false)}>
              Cancel
            </div>
            <div className={s.employee_gl_popup_del} onClick={() => deleteBrandFunc()}>
              Delete
            </div>
          </div>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
      <Loder loading={isloading} />
    </div>
  );
};

export default AdminList;
