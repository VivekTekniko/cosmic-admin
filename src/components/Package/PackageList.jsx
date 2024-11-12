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
import s from "./package.module.css";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogActions, DialogTitle, DialogContent, Pagination } from "@mui/material";
import Loder from "../../Loder/Loder";
import DataNotFound from "../ErrorPage/DataNotFound";

import { getBaseUrl2 } from "../../utils";
import { best_treatment_api, deleteCondition_api, deletePackage_api, get_condition_api, get_expertise_api, getPackage_api } from "../api/package";
import MultipleSelect from "./MultiSelector";
import { getBudgetRange_api } from "../api/budgetRange";
import { notificationHandler } from "../../utils/Notification";
import { BiSearch } from "react-icons/bi";
const PackageList = () => {

    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(false);
    const [allPackage, setallPackage] = useState([]);
    const [pageCount, setpageCount] = useState(1);
    const [deleteId, setdeleteId] = useState();
    const [deletePopup, setdeletePopup] = useState(false);
    const [currentGroup, setcurrentGroup] = useState({});
    const [pageLength, setpageLength] = useState();
    const [search, setsearch] = useState("");
    const [type, setType] = useState("")

    useEffect(() => {
        fetchAllPackageFunc();
    }, [pageCount, type]);

    async function fetchAllPackageFunc(data) {
        setisLoading(true);
        try {
            const temp = {
                id: type,
                page: pageCount,
                limit: 20,
            };
            let res = await getPackage_api(temp);
            if (res.data.status) {
                setallPackage(res?.data?.data.packageData);
                setpageLength(res?.data?.totalPage);
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
                fetchAllPackageFunc();
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
                <h3>Package List</h3>
            </div>
            <div className={s["user-list-heading"]}>
                <div className={s["user-list-search"]}>
                    <div className="beat_left">
                        <div
                            className={s["title"]}
                            onClick={() =>
                                navigate("/add-package", {
                                    state: {
                                        pagetype: "Add",
                                    },
                                })
                            }
                        >
                            <IoMdAdd /> Package
                        </div>
                    </div>
                </div>
            </div>
            <div className="beat_table">
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Name</StyledTableCell>
                            <StyledTableCell align="center">Price</StyledTableCell>
                            <StyledTableCell align="center">Validity</StyledTableCell>
                            <StyledTableCell align="center">Assigned Lead Value</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allPackage?.map((row) => (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell>{row.name} </StyledTableCell>
                                <StyledTableCell>{row.budgetRange?.map((elem)=>elem?.name + " , ")}</StyledTableCell>
                                <StyledTableCell>{row.validity} Days</StyledTableCell>
                                <StyledTableCell>{row.assignLeadValue} </StyledTableCell>
                                <StyledTableCell align="center">
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
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}

                    </TableBody>
                </Table>
                {allPackage?.length <= 0 && <DataNotFound />}
                {allPackage?.length > 0 && (
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
        </div >
    )
}
export default PackageList;
