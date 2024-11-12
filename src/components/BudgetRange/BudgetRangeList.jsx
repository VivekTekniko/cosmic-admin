import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { tableCellClasses } from "@mui/material/TableCell";
import s from "./budget.module.css";
import { useNavigate } from "react-router-dom";
import { fetchAllAdmin } from "../api/admin";
import { Dialog, DialogActions, DialogTitle, DialogContent, Pagination } from "@mui/material";
import { notificationHandler } from "../../utils/Notification";
import Loder from "../../Loder/Loder";
import { BiFilter, BiSearch } from "react-icons/bi";
import DataNotFound from "../ErrorPage/DataNotFound";
import { IoIosArrowRoundDown, IoIosArrowRoundUp, IoMdAdd } from "react-icons/io";
import { deleteBudgetRange_api, deleteCategory_api, getBudgetRange_api, getCategories_api, status_update_categories_api } from "../api/budgetRange";
import { getBaseUrl2 } from "../../utils";

const BudgetRangeList = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [allBudgetRange, setallBudgetRange] = useState([]);
  const [pageCount, setpageCount] = useState(1);
  const [deleteId, setdeleteId] = useState("");
  const [deletePopup, setdeletePopup] = useState(false);
  const [currentGroup, setcurrentGroup] = useState({});
  const [pageLength, setpageLength] = useState();
  const [search, setsearch] = useState("");
  const [active, setactive] = useState("");
  useEffect(() => {
    fetchallBudgetRangeFunc();
  }, [pageCount, search]);
  console.log(pageLength, " this is the page length of the page")

  async function fetchallBudgetRangeFunc(data) {
    setisLoading(true);
    try {
      const temp = {
        page: pageCount,
        limit: 8,
        search: search.trim(),
      };
      let res = await getBudgetRange_api(temp);
      if (res.data.status) {
        setallBudgetRange(
          res?.data?.data?.budgetRanges.sort((a, b) => a.min - b.min)
        );
        setpageLength(res?.data?.toatalPage);
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

  async function deleteuserFunc() {
    setisLoading(true);

    try {
      let res = await deleteBudgetRange_api(deleteId);
      console.log(res);
      if (res.data.status) {
        setisLoading(false);
        setdeletePopup(false);
        fetchallBudgetRangeFunc();
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

  const categories_status = async (data) => {
    const id = data._id;
    setisLoading(true);
    const fd = new FormData();
    fd.append("status", data.status == true ? false : true);

    try {
      let res = await status_update_categories_api(id, fd);
      console.log(res);
      if (res.data.status) {
        setisLoading(false);
        fetchallBudgetRangeFunc();
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

  //filter code
  const sortByField = (array, field, order = "asc") => {
    const compareFunction = (a, b) => {
      let aValue = a[field];
      let bValue = b[field];

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      let comparison = 0;

      if (aValue > bValue) {
        comparison = 1;
      } else if (aValue < bValue) {
        comparison = -1;
      }

      return order === "desc" ? comparison * -1 : comparison;
    };
    setallBudgetRange([...array].sort(compareFunction));
    return [...array].sort(compareFunction);
  };
  return (
    <div className="">
      <div className="beat_heading">
        <div className={s["user-list-heading"]}>
          <div className="user-list-title">
            <h3>Budget Range List</h3>
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
                  setactive(null);
                  setsearch(e.target.value);
                }}
                placeholder="Search by name..."
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
        <div className="beat_left">
          <div
            className={s["title"]}
            onClick={() =>
              navigate("/add-budget-range", {
                state: {
                  pagetype: "Add",
                },
              })
            }
          >
            <IoMdAdd /> Budget Range
          </div>
        </div>
      </div>
      <div className="beat_table">
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">
                Name
                {/* <span
                  style={{ cursor: "pointer", color: `${active == 0 ? "red" : null}` }}
                  onClick={() => {
                    setactive(0);
                    sortByField(allBudgetRange, "name");
                  }}
                >
                  <IoIosArrowRoundUp size={20} />
                </span> */}
                {/* <span
                  style={{ cursor: "pointer", color: `${active == 1 ? "red" : null}` }}
                  onClick={() => {
                    setactive(1);
                    sortByField(allBudgetRange, "name", "desc");
                  }}
                >
                  <IoIosArrowRoundDown size={20} />
                </span> */}
              </StyledTableCell>
              <StyledTableCell align="center">Minimum Amount</StyledTableCell>
              <StyledTableCell align="center">Maximum Amount</StyledTableCell>

              {/* <StyledTableCell align="center">
                Status
                <span
                  style={{ cursor: "pointer", color: `${active == 2 ? "red" : null}` }}
                  onClick={() => {
                    setactive(2);
                    sortByField(allBudgetRange, "status");
                  }}
                >
                  <IoIosArrowRoundUp size={20} />
                </span>
                <span
                  style={{ cursor: "pointer", color: `${active == 3 ? "red" : null}` }}
                  onClick={() => {
                    setactive(3);
                    sortByField(allBudgetRange, "status", "desc");
                  }}
                >
                  <IoIosArrowRoundDown size={20} />
                </span>
              </StyledTableCell> */}
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {allBudgetRange?.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell>{row.name} </StyledTableCell>
                <StyledTableCell>{row.min} </StyledTableCell>
                <StyledTableCell>{row.max} </StyledTableCell>
                {/* <StyledTableCell>{row.created_at} </StyledTableCell> */}
                {/* <StyledTableCell align="center">
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => categories_status(row)}
                    className={`${row.status === true ? s.active_admin : s.inactive_admin}`}
                  >
                    {row.status === true ? "Active" : "Inactive"}
                  </div>
                </StyledTableCell> */}

                <StyledTableCell align="center">
                  <CiEdit
                    onClick={() =>
                      navigate("/add-budget-range", {
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
        {allBudgetRange?.length <= 0 && <DataNotFound />}
        {allBudgetRange?.length > 0 && (
          <div className={s["pagination"]}>
            <Pagination count={pageLength} size="large" style={{ color: "#D21903" }} onChange={(e, value) => setpageCount(value)} page={pageCount} />
          </div>
        )}
      </div>

      <Dialog open={deletePopup} aria-labelledby="form-dialog-title" maxWidth="xs" fullWidth="true" onClose={() => setdeletePopup(false)}>
        <DialogTitle className={s.dialog_title}>
          <div>Do you want to delete {currentGroup.name}?</div>
        </DialogTitle>
        <DialogContent className={s.cardpopup_content}>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div className={s.employee_gl_popup} onClick={() => setdeletePopup(false)}>
              Cancel
            </div>
            <div className={s.employee_gl_popup_del} onClick={() => deleteuserFunc()}>
              Delete
            </div>
          </div>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
      <Loder loading={isLoading} />
    </div>
  );
};

export default BudgetRangeList;
