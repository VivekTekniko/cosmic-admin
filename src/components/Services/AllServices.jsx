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
import s from "./services.module.css";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogActions, DialogTitle, DialogContent, Pagination } from "@mui/material";
import { notificationHandler } from "../../utils/Notification";
import Loder from "../../Loder/Loder";
import DataNotFound from "../ErrorPage/DataNotFound";
import { BiFilter, BiSearch } from "react-icons/bi";
import { deleteService_api, deleteSkill_api, getAllService_api } from "../api/service";
import { getBaseUrl2 } from "../../utils";
import { get_condition_api } from "../api/package";

const AllService = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [allService, setallService] = useState([]);
  const [pageCount, setpageCount] = useState(1);
  const [deleteId, setdeleteId] = useState();
  const [deletePopup, setdeletePopup] = useState(false);
  const [currentGroup, setcurrentGroup] = useState({});
  const [pageLength, setpageLength] = useState();
  const [search, setsearch] = useState("");
  useEffect(() => {
    fetchallServiceFunc();
  }, [pageCount, search]);

  async function fetchallServiceFunc(data) {
    setisLoading(true);
    try {
      const temp = {
        page: pageCount,
        limit: 8,
        search: search.trim(),
      };
      let res = await getAllService_api(temp);
      if (res.data.status) {
        setpageLength(res?.data?.data?.totalPage);
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

  async function deleteServiceFunc() {
    setisLoading(true);

    try {
      let res = await deleteService_api(deleteId);
      console.log(res);
      if (res.data.status) {
        setisLoading(false);
        setdeletePopup(false);
        fetchallServiceFunc();
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


  return (
    <div className="">
      <div className={s["article-list-title"]}>
        <h3>Services List</h3>
      </div>
      <div className={s["user-list-heading"]}>
        <div className={s["user-list-title"]}>
          <div className="beat_left" style={{ display: "flex", gap: "1rem" }}>
            <div
              className={s["title"]}
              onClick={() =>
                navigate("/add-services", {
                  state: {
                    pagetype: "Add",
                  },
                })
              }
            >
              <IoMdAdd /> Services
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
              placeholder="Search by Service name..."
            />
          </div>
          <div className={s["filter-btn"]}>
            <span style={{ paddingRight: "2px" }}>
              <BiFilter size={20} />
            </span>
            Filter
          </div>
        </div>
      </div>
      <div className="beat_table">
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Id</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>

              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allService?.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell align="center">{row._id}</StyledTableCell>
                <StyledTableCell>{row.name} </StyledTableCell>

                <StyledTableCell align="center">
                  <CiEdit
                    onClick={() =>
                      navigate("/add-services", {
                        state: {
                          pagetype: "Edit",
                          data: row,
                        },
                      })
                    }
                    style={{
                      fontSize: "1rem",
                      color: "var(--clr-primary)",
                      marginRight: "0.5rem",
                      cursor: "pointer",
                    }}
                  />
                  <MdDelete
                    onClick={() => {
                      setdeletePopup(true);
                      setcurrentGroup(row);
                      setdeleteId(row._id);
                    }}
                    style={{ fontSize: "1rem", color: "var(--clr-primary)", cursor: "pointer" }}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        {allService.length <= 0 && <DataNotFound />}
        {allService?.length > 0 && (
          <div className={s["pagination"]}>
            <Pagination count={pageLength} size="large" style={{ color: "#D21903" }} onChange={(e, value) => setpageCount(value)} page={pageCount} />
          </div>
        )}
      </div>
      <Dialog open={deletePopup} aria-labelledby="form-dialog-title" maxWidth="xs" fullWidth="true" onClose={() => setdeletePopup(false)}>
        <DialogTitle className={s.dialog_title}>
          <div>Do you want to delete {currentGroup.skill_name}?</div>
        </DialogTitle>
        <DialogContent className={s.cardpopup_content}>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div className={s.employee_gl_popup} onClick={() => setdeletePopup(false)}>
              Cancel
            </div>
            <div className={s.employee_gl_popup_del} onClick={() => deleteServiceFunc()}>
              Delete
            </div>
          </div>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
      <Loder loading={isLoading} />
    </div >
  );
};

export default AllService;
