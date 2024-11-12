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
import s from "./rejectedLead.module.css";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogActions, DialogTitle, DialogContent, Pagination } from "@mui/material";
import Loder from "../../Loder/Loder";
import DataNotFound from "../ErrorPage/DataNotFound";

import { getBaseUrl2 } from "../../utils";
import { best_treatment_api, deleteCondition_api, deletePackage_api, get_condition_api, get_expertise_api, getPackage_api } from "../api/package";
import { getBudgetRange_api } from "../api/budgetRange";
import { notificationHandler } from "../../utils/Notification";
import { BiSearch } from "react-icons/bi";
import Cookies from "js-cookie";
import { getRejectLeadForAdmin_api, rejectedLeadStatus_api } from "../api/rejectedLead";
import Reminder from "../Dashboard/Reminder";
const RejectedLeadList = () => {

    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(false);
    const [rejectLead, setrejectLead] = useState([]);
    const [pageCount, setpageCount] = useState(1);
    const [deleteId, setdeleteId] = useState();
    const [deletePopup, setdeletePopup] = useState(false);
    const [currentGroup, setcurrentGroup] = useState({});
    const [pageLength, setpageLength] = useState();
    const [type, setType] = useState("")
    const role = Cookies.get("role")

    useEffect(() => {
        fetchrejectLeadFunc();
    }, [pageCount, type]);

    async function fetchrejectLeadFunc(data) {
        setisLoading(true);
        try {
            const temp = {
                id: type,
                page: pageCount,
                limit: 8,
            };
            let res = await getRejectLeadForAdmin_api(temp);
            if (res.data.status) {
                setrejectLead(res?.data?.data?.rejectLead?.filter((elem)=>elem.status=="Pending" ));
                setpageLength(res?.data?.totalPage)
                setisLoading(false);
            } else {
                setisLoading(false);
                console.log("status false!");
            }
        } catch (error) {
            setisLoading(false)
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
            let res = await deletePackage_api(deleteId);
            console.log(res);
            if (res.data.status) {
                setisLoading(false);
                setdeletePopup(false);
                fetchrejectLeadFunc();
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


    const rejectedLeadFunc = async (e, row) => {
        let data = {
            status: e.target.value
        }
        try {
            let res = await rejectedLeadStatus_api(data, row?._id)
            if (res.data.status) {
                fetchrejectLeadFunc()
                notificationHandler({
                    type: "success",
                    msg: "Status Update Successfully",
                });
            } else {
                notificationHandler({ type: "success", msg: res.data.message });
            }
        } catch (error) {
            notificationHandler({ type: "danger", msg: error.message });
            console.log(error);
        }
    }

    return (
        <div className="">
            <div className={s["article-list-title"]}>
                <h3>Rejected Lead List</h3>
            </div>
            <div className="beat_table">
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Lead Data</StyledTableCell>
                            {(role == "Super Admin" || role == "Admin") && (<StyledTableCell align="center">Vendor Data</StyledTableCell>)}
                            <StyledTableCell align="center">Reason</StyledTableCell>
                            {/* <StyledTableCell align="center">Status</StyledTableCell> */}
                            {(role == "Super Admin" || role == "Admin") && (<StyledTableCell align="center">Action</StyledTableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rejectLead?.map((row) => (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell>
                                    <div>
                                        <p><b>Name:</b>{row?.lead?.name}</p>
                                        {(role == "Super Admin" || role == "Admin") && (<p><b>Location:</b>{row?.lead?.location?.location}</p>)}
                                        {(role == "Super Admin" || role == "Admin") && (<p><b>Mobile NO.:</b>{row?.lead?.mobile}</p>)}
                                    </div>
                                </StyledTableCell>
                                {(role == "Super Admin" || role == "Admin") && (<StyledTableCell>
                                    <div>
                                        <p><b>Name:</b>{row?.rejectedBy?.userName}</p>
                                        <p><b>Mobile NO.:</b>{row?.rejectedBy?.mobile}</p>
                                    </div>
                                </StyledTableCell>)}
                                <StyledTableCell>{row?.reason} </StyledTableCell>
                                {(role == "Super Admin" || role == "Admin") && (<StyledTableCell align="center">
                                    <select className="remark-design"
                                        value={row.status}
                                        onChange={(e) => rejectedLeadFunc(e, row)}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Success">Verified</option>
                                        <option value="Reject">Reject</option>
                                    </select>
                                </StyledTableCell>)}
                                {/* <StyledTableCell align="center">
                                    <CiEdit
                                        onClick={() =>
                                            navigate("/add-package", {
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
                                </StyledTableCell> */}
                            </StyledTableRow>
                        ))}

                    </TableBody>
                </Table>
                {rejectLead?.length <= 0 && <DataNotFound />}
                {rejectLead?.length > 0 && (
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
                        <div className={s.employee_gl_popup_del} onClick={() => deleteuserFunc()}>
                            Delete
                        </div>
                    </div>
                </DialogContent>
                <DialogActions></DialogActions>
            </Dialog>
            <Loder loading={isLoading} />
            <Reminder/>
        </div >
    )
}
export default RejectedLeadList;
