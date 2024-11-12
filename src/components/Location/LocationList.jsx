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
import s from "./location.module.css";
import { useNavigate } from "react-router-dom";
import Loder from "../../Loder/Loder";
import { Dialog, DialogActions, DialogTitle, DialogContent, Pagination } from "@mui/material";
import { notificationHandler } from "../../utils/Notification";
import { BiFilter, BiSearch } from "react-icons/bi";
import DataNotFound from "../ErrorPage/DataNotFound";
import { getBaseUrl2 } from "../../utils";
import { deleteLocation_api, locationList_api } from "../api/location";

const LocationsList = () => {
    const navigate = useNavigate();
    const [isloading, setisLoading] = useState(false);
    const [allLocations, setallLocations] = useState([]);
    const [pageCount, setpageCount] = useState(1);
    const [deleteId, setdeleteId] = useState(null);
    const [deletePopup, setdeletePopup] = useState(false);
    const [currentGroup, setcurrentGroup] = useState({});
    const [pageLength, setpageLength] = useState();
    const [search, setsearch] = useState("");
    useEffect(() => {
        fetchAllLocationsFunc();
    }, [pageCount, search]);


    const fetchAllLocationsFunc = async (data) => {
        setisLoading(true);
        try {
            const temp = {
                page: pageCount,
                limit: 10,
                search: search?.trim(),
            };
            let res = await locationList_api(temp);
            if (res.data.status) {
                setallLocations(res?.data?.data?.location);
                setpageLength(res?.data?.totalPage);
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

    async function deleteLocationFunc() {
        setisLoading(true);
        let temp = {
            id: deleteId
        }

        try {
            let res = await deleteLocation_api(temp);
            if (res.data.status) {
                setisLoading(false);
                setdeletePopup(false);
                fetchAllLocationsFunc();
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
        <div>
            <div className="">
                <div className="beat_heading">
                    <div className={s["user-list-title"]}>
                        <h3>Locaions List</h3>
                    </div>
                    <div className={s["user-list-heading"]}>
                        <div className={s["user-list-title"]}>
                            <div className="beat_left">
                                <div
                                    className={s["title"]}
                                    onClick={() =>
                                        navigate("/add-location", {
                                            state: {
                                                pagetype: "Add",
                                            },
                                        })
                                    }
                                >
                                    <IoMdAdd /> Location
                                </div>
                            </div>
                        </div>
                        {/* <div className={s["user-list-search"]}>
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
                    </div> */}
                    </div>
                </div>
                <div className="beat_table">
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Location</StyledTableCell>
                                 <StyledTableCell align="center">Id</StyledTableCell>
                                {/*<StyledTableCell align="center">Description</StyledTableCell> */}
                                <StyledTableCell align="center">Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allLocations?.map((row) => (
                                <StyledTableRow key={row?.id}>
                                    <StyledTableCell align="center">{row?.location} </StyledTableCell>
                                     <StyledTableCell align="center">{row?._id} </StyledTableCell>
                                    {/*<StyledTableCell align="center">{row?.description} </StyledTableCell> */}

                                    <StyledTableCell align="center">
                                        <CiEdit
                                            onClick={() =>
                                                navigate("/add-location", {
                                                    state: {
                                                        pagetype: "Edit",
                                                        data: row,
                                                    },
                                                })
                                            }
                                            style={{
                                                fontSize: "1rem",
                                                color: "var(--clr-theme)",
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
                    {allLocations?.length <= 0 && <DataNotFound />}
                    {allLocations?.length > 0 && (
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
                            <div className={s.employee_gl_popup_del} onClick={() => deleteLocationFunc()}>
                                Delete
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions></DialogActions>
                </Dialog>
                <Loder loading={isloading} />
            </div>
        </div>
    )
}

export default LocationsList;
