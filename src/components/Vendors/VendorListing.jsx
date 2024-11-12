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
import s from "./vendor.module.css";
import { useNavigate } from "react-router-dom";
import { delete_admin_api, delete_banner_api, status_admin_api, status_banner_api } from "../api/admin";
import Loder from "../../Loder/Loder";
import { Dialog, DialogActions, DialogTitle, DialogContent, Pagination, CircularProgress } from "@mui/material";
import { notificationHandler } from "../../utils/Notification";
import { BiFilter, BiSearch } from "react-icons/bi";
import DataNotFound from "../ErrorPage/DataNotFound";
import { getBaseUrl2 } from "../../utils";
import { assingPackage_api, deleteVendor_api, getVendor_api, updateVendor_api } from "../api/vendor";
import { getPackage_api } from "../api/package";
import xlsx from "json-as-xlsx";
import Cookies from "js-cookie";
import { getBudgetRange_api } from "../api/budgetRange";
import { importVendors } from "../api/customerTable";

const VendorListing = () => {
    const navigate = useNavigate();
    const [isloading, setisLoading] = useState(false);
    const [allVendor, setallVendor] = useState([]);
    const [pageCount, setpageCount] = useState(1);
    const [deleteId, setdeleteId] = useState(null);
    const [deletePopup, setdeletePopup] = useState(false);
    const [currentGroup, setcurrentGroup] = useState({});
    const [pageLength, setpageLength] = useState();
    const [startDate, setStartDate] = useState("");
    const [endDate , setendDate] = useState("");


    const [packagefil, setPackagefil] = useState("");
    const [statusFil, setStatusFil] = useState("");
    const [statusFilArr, setStatusFilArr] = useState();
    const [exportBtnLoading, setexportBtnLoading] = useState(false);
    const [search, setsearch] = useState("");
    const [location, setLocation] = useState("");
    const [active, setactive] = useState("")
    const [allPackage, setallPackage] = useState([]);
    const role = Cookies.get("role");
    useEffect(() => {
        fetchallVendorFunc();
    }, [pageCount, search, location, packagefil,statusFil]);

    const fetchallVendorFunc = async (data) => {
        setisLoading(true);
        try {
            let temp;
            if (data == "reset") {
              setPackagefil("");
              setStatusFil("");
              setsearch("");
              setStartDate("");
              setendDate("");
               temp = {
                page: pageCount,
                limit: 10,
                search: "",
                location: "",
                package: "",
                verify:"",
                startDate: "",
                endDate: "",
            };
            } else {
                 temp = {
                    page: pageCount,
                    limit: 10,
                    search: search.trim(),
                    location: location,
                    package: packagefil,
                    verify:statusFil,
                    startDate: startDate,
                    endDate: endDate,
                };
            }
            
            let res = await getVendor_api(temp);
            if (res.data.status) {
                setallVendor(res.data.data.vendors);
                setStatusFilArr(res.data.data.vendors);
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

    async function deleteBrandFunc() {
        setisLoading(true);
        try {
            let res = await deleteVendor_api(deleteId);
            if (res.data.status) {
                setdeletePopup(false);
                setisLoading(false);
                fetchallVendorFunc();
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

    const update_vendor = async (row) => {
        let ver = row.verify
        let temp = {
            verify: ver === "Verified" ? "Unverified" : "Verified"
        }

        try {
            let res = await updateVendor_api(row._id, temp);
            if (res.data.status) {
                fetchallVendorFunc()
                notificationHandler({ type: "success", msg: res.data.message });
            } else {
                notificationHandler({ type: "success", msg: res.data.message });
            }
        } catch (error) {
            notificationHandler({ type: "danger", msg: error.message });
            console.log(error);
        }
    }

    //  This api is used for the package listing this is used 
    useEffect(() => {
        fetchAllPackageFunc();
    }, [pageCount]);

    async function fetchAllPackageFunc(data) {
        setisLoading(true);
        try {
            const temp = {
            };
            let res = await getPackage_api(temp);
            if (res.data.status) {
                setallPackage(res?.data?.data.packageData);
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




    // This is used to export the data 
    let settings = {
        fileName: "Vendor table", // Name of the resulting spreadsheet
        extraLength: 3, // A bigger number means that columns will be wider
        writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
        writeOptions: {}, // Style options from https://github.com/SheetJS/sheetjs#writing-options
        RTL: false, // Display the columns from right-to-left (the default value is false)
    };

    const exportFunc = () => {
        if (allVendor?.length < 1) {
            return notificationHandler({
                type: "danger",
                msg: "Vnedor List is empty!",
            });
        }
        let data = [
            {
                sheet: "Vendors",
                columns: [
                    { label: "ID", value: (row) => (row._id ? row._id : "") },
                    { label: "Name", value: (row) => (row.userName ? row.userName : "") },
                    { label: "Phone", value: (row) => (row.mobile ? row.mobile : "") },
                    { label: "Email", value: (row) => (row.email ? row.email : "") },
                    // {
                    //     label: "Location",
                    //     value: (row) => (row.location ? row.location.map((elem)=>elem.location) : ""),
                    // },
                    // {
                    //     label: "Assign Customer Number",
                    //     value: (row) => (row.assignCustomerNumber ? row.assignCustomerNumber : ""),
                    // },
                    // {
                    //     label: "Last Assigned Date",
                    //     value: (row) => (row.lastAssignedAt ? String(row?.lastAssignedAt)?.slice(0, 10) : ""),
                    // },
                    // {
                    //     label: "Package Name",
                    //     value: (row) => (row?.package.name ? row?.package.name : ""),
                    // },
                    // {
                    //     label: "Package Validity",
                    //     value: (row) => (row?.package?.validity ? row?.package.validity : ""),
                    // },
                    // {
                    //     label: "Package Lead Value",
                    //     value: (row) => (row.package?.assignLeadValue ? String(row?.package?.assignLeadValue)?.slice(0, 10) : ""),
                    // },
                    // {
                    //     label: "Package Expire Date",
                    //     value: (row) => (row.packageExpiry ? String(row?.packageExpiry)?.slice(0, 10) : ""),
                    // },

                    // {
                    //     label: "Status",
                    //     value: (row) =>
                    //         row?.verify ? row?.verify : "",
                    // },
                ],
                content: allVendor,
            },
        ];
        try {
            xlsx(data, settings, callback);
        } catch (error) {
            console.log(error);
        }
    };

    let callback = function (sheet) {
        console.log("Download complete:", sheet);
    };

    let importVendorsFunc = async (e) => {
        setisLoading(true);
        const file = e.target.files[0];
        try {
          let res = await importVendors(file);
          if (res.data.status) {
            setisLoading(false);
            fetchallVendorFunc()
          } else {
            // toast.error(res.data.message);
            console.log("some error");
            setisLoading(false);
          }
        } catch (error) {
          console.log(error);
          setisLoading(false);
        }
      };

    return (
        <div className="">
            <div className="beat_heading">
                <div className={s["user_list_filter"]}>
                    <div className={s["user-list-title"]}>
                        <h3>Vendor List</h3>
                    </div>
                    <div className={s["user-list-search"]}>
                        <div
                            className={s["search-box"]}
                            style={{ display: "flex", gap: "1rem", alignItems: "center" }}
                        >
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
                                placeholder="Search vendor by name ..."
                            />
                        </div>
                        {role !== "Vendor" && 
                        <>
                        <div>
              <label className={s["title"]}>
                  <span>Import</span>
                  <input
                    type="file"
                    accept=".xlsx, .xls, .csv"
                    onChange={importVendorsFunc}
                    name="file"
                    style={{ display: "none" }}
                  />
                </label>
            </div>
                        <div>
                            <label className={s["title"]} onClick={() => exportFunc()}>
                                {exportBtnLoading ? <CircularProgress size={24} /> : "Export"}
                            </label>
                        </div>
                        </>}

                    </div>
                </div>
                <div style={{ display: "flex" }}>
                    <div className="beat_left">
                        <div
                            className={s["title"]}
                            onClick={() =>
                                navigate("/addVendor", {
                                    state: {
                                        pagetype: "Add",
                                    },
                                })
                            }
                        >
                            <IoMdAdd />Vendor
                        </div>
                    </div>
                    <div className="">
                        <select className="search-inp1" value={packagefil} onChange={(e) => setPackagefil(e.target.value)}>
                            <option value="">Filter by Package</option>
                            {
                                allPackage?.map((elem, id) => {
                                    return (
                                        <option key={id} value={elem._id}>{elem?.name}</option>

                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className="">
                        <select className="search-inp1" value={statusFil} onChange={(e)=>setStatusFil(e.target.value)}>
                            <option value="">Filter by Status</option>
                            <option value="Verified">Active</option>
                            <option value="Unverified">InActive</option>
                            <option value="Pending">Pending</option>
                        </select>
                    </div>
                    <div className="">
            {/* <span style={{fontSize:"x-small"}}>Filter by date From and To</span> */}
            <div style={{ display: "flex" }}>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="search-inp1" />
              <input type="date" value={endDate} onChange={(e) => setendDate(e.target.value)} className="search-inp1" />
              <button className="search-inp1" onClick={() => fetchallVendorFunc()}>Apply</button>
              <button className="search-inp1" style={{ border: "1px solid #fff" }} onClick={() => fetchallVendorFunc("reset")}>Reset Filter</button>
            </div>
          </div>

                </div>
                <div className={s["user-list-heading"]}>
                    <div className={s["user-list-title"]}>

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
                            <StyledTableCell>S.No.</StyledTableCell>
                            <StyledTableCell align="center">Name</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="center">Mobile No.</StyledTableCell>
                            <StyledTableCell align="center">Password</StyledTableCell>
                            <StyledTableCell align="center"> Service Assigned </StyledTableCell>
                            <StyledTableCell align="center"> Location</StyledTableCell>
                            <StyledTableCell align="center"> Date</StyledTableCell>
                            <StyledTableCell align="center"> Assigned Package</StyledTableCell>
                            <StyledTableCell align="center"> Package Status</StyledTableCell>
                            <StyledTableCell align="center">Assign Leads</StyledTableCell>
                            <StyledTableCell align="center">Register</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allVendor?.map((row,id) => (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell>{id+1}</StyledTableCell>
                                <StyledTableCell>{row?.userName} </StyledTableCell>
                                <StyledTableCell align="center">{row?.email} </StyledTableCell>
                                <StyledTableCell align="center">{row?.mobile}</StyledTableCell>
                                <StyledTableCell align="center">{row?.password}</StyledTableCell>
                                <StyledTableCell align="center">{row?.service ? row?.service?.name : "Wedding"} </StyledTableCell>
                                <StyledTableCell align="center">{row?.location == "undefined" ? "" : row?.location?.map((data) => <div>
                                    {data.location},
                                </div>)} </StyledTableCell>
                                <StyledTableCell align="center">{row?.createdAt.slice(0,10)}</StyledTableCell>
                                <StyledTableCell align="center">{row?.package?.name} </StyledTableCell>
                                <StyledTableCell align="center">
                                    <div style={{ cursor: "pointer" }} onClick={() => update_vendor(row)} className={row.verify === "Pending" ? s.unverified_admin : row.verify === "Verified" ? s.active_admin : s.inactive_admin}>
                                        {`${row.verify=="Pending"?"Pending":row.verify=="Unverified"?"InActive":"Active"}`}
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell align="center">{row?.assignCustomerNumber}</StyledTableCell>
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
                                    >
                                        <option value="pending">Select Service</option>
                                        <option value="pending">Photographer</option>
                                        <option value="rejected">Catering</option>
                                        <option value="approved">Designer</option>
                                    </select>
                                </StyledTableCell> */}
                                {/* <StyledTableCell align="center">
                  <div style={{ cursor: "pointer" }} onClick={() => admin_status(row)} className={`${row.status === true ? s.active_admin : s.inactive_admin}`}>
                    {`${row.status === true ? "Active" : "InActive"}`}
                  </div>
                </StyledTableCell> */}
                                <StyledTableCell align="center">
                                    <CiEdit
                                        title="Registered"
                                        onClick={() =>
                                            navigate("/register-vendor", {
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
                {allVendor.length <= 0 && <DataNotFound />}
                {allVendor?.length > 0 && (
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

export default VendorListing;
