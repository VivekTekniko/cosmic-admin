import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { tableCellClasses } from "@mui/material/TableCell";
import s from "./admin.module.css";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Pagination } from "@mui/material";
import {
  addRemark,
  assignedLead,
  fetchallCustomers,
  fetchFilterVendorfunc,
  fetchManuallyAssigned,
  importLeads,
  user_delete_api,
  user_status_api,
} from "../api/customerTable";
import { notificationHandler } from "../../utils/Notification";
import Loder from "../../Loder/Loder";
import { BiSearch } from "react-icons/bi";
import DataNotFound from "../ErrorPage/DataNotFound";
import DeletePopup from "../Dialogbox/DeletePopup";
import { IoIosArrowRoundUp } from "react-icons/io";
import { IoIosArrowRoundDown } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import xlsx from "json-as-xlsx";
import Cookies from "js-cookie";
import { MdDelete } from "react-icons/md";
import { getBudgetRange_api } from "../api/budgetRange";
import ReasonModal from "./ReasonModal";
import { locationList_api } from "../api/location";
import { updateLead_api } from "../api/vendor";
import Reminder from "../Dashboard/Reminder";
import VendorManuallyModal from "./VendorManuallyodal";
import ShufflingModal from "./ShufflingModal";
const CustomerTable = () => {
  const navigate = useNavigate();
  const role = Cookies.get("role");
  const [isLoading, setisLoading] = useState(false);
  const [allCustomers, setallCustomers] = useState([]);
  const [pageCount, setpageCount] = useState(1);
  const [deleteId, setdeleteId] = useState("");
  const [exportBtnLoading, setexportBtnLoading] = useState(false);
  const [deletename, setdeletename] = useState();
  const [pageLength, setpageLength] = useState();
  const [active, setactive] = useState("");
  const [deletePopup, setdeletePopup] = useState(false);
  const [allBudgetRange, setallBudgetRange] = useState([]);
  const [search, setsearch] = useState("");
  const [location, setLocation] = useState("");
  const [allLocation, setallLocation] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setendDate] = useState("")
  const [budgetRangeFilter, setbudgetRangeFilter] = useState("")
  const [open, setOpen] = useState(false)
  const [customerId, setcustomerId] = useState("")
  const [assignedVendor , setAssignedVendor] = useState([])
  const [isManually , setIsManually] = useState(false)
  const [manualId , setManualId] = useState();
  const [shuffleModal , setShuffleModal] = useState(false)

 


const fetchAllLocationsFunc = async () => {
    try {
      const temp = {
        page: 1,
        limit: 10,
        search: "",
    };
        let res = await locationList_api(temp);
        if (res.data.status) {
          setallLocation(res?.data?.data?.location);
        } else {
            console.log("status false!");
        }
    } catch (error) {
        console.log(error);
    }
};

 useEffect(() => {
    fetchAllLocationsFunc();
}, []);

  useEffect(() => {
    fetchallCustomersFunc();
  }, [pageCount, search, location, budgetRangeFilter, open ,assignedVendor,isManually]);

  async function fetchallCustomersFunc(data) {
    setisLoading(true);
    try {
      let temp;
      if (data == "reset") {
        setbudgetRangeFilter("");
        setLocation("");
        setsearch("");
        setStartDate("");
        setendDate("");
        temp = {
          page: pageCount,
          limit: 10,
          search: "",
          startDate: "",
          endDate: "",
          location: "",
          budgetRange: ""
        };
      } else {
        temp = {
          page: pageCount,
          limit: 10,
          search: search.trim(),
          startDate: startDate,
          endDate: endDate,
          location: location,
          budgetRange: budgetRangeFilter
        };
      }
      let res = await fetchallCustomers(temp, role);
      if (res.data.status) {
        if (role == "Vendor") {
          setallCustomers(res?.data?.data);
          setpageLength(res?.data?.totalPage);
          setisLoading(false);
        } else {
          setallCustomers(res?.data?.data?.customers);
          setpageLength(res?.data?.totalPage);
          setisLoading(false);
        }
      } else {
        setisLoading(false);
        console.log("status false!");
      }

    } catch (error) {
      console.log(error);
    }
  }

  async function fetchallBudgetRangeFunc(data) {
    setisLoading(true);
    try {
      const temp = {
        page: pageCount,
        limit: 10,
        search: search.trim(),
      };
      let res = await getBudgetRange_api(temp);
      if (res.data.status) {
        setallBudgetRange(res?.data?.data.budgetRanges);
      } else {
        setisLoading(false);
        console.log("status false!");
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchallBudgetRangeFunc();
  }, [])

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
    let temp = {
      id: deleteId,
    };
    try {
      let res = await user_delete_api(temp);
      if (res.data.status) {
        setisLoading(false);
        setdeletePopup(false);
        fetchallCustomersFunc();
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

  let settings = {
    fileName: "Cosmic Wedding", // Name of the resulting spreadsheet
    extraLength: 3, // A bigger number means that columns will be wider
    writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
    writeOptions: {}, // Style options from https://github.com/SheetJS/sheetjs#writing-options
    RTL: false, // Display the columns from right-to-left (the default value is false)
  };

  const exportFunc = () => {
    if (allCustomers?.length < 1) {
      return notificationHandler({
        type: "danger",
        msg: "Customer List is empty!",
      });
    }
    let data = [
      {
        sheet: "Customers",
        columns: [
          { label: "Sr.No", value: (row) => (row._id ? row._id : "") },
          { label: "Name", value: (row) => (row.name ? row.name : "") },
          { label: "Mobile", value: (row) => (row.mobile ? row.mobile : "") },
          { label: "Email", value: (row) => (row.email ? row.email : "") },
          { label: "Budget", value: (row) => (row.budgetRange ? row.budgetRange : "") },
          {
            label: "Location",
            value: (row) => (row?.location?.location ? row?.location?.location : ""),
          },
          {
            label: "Wedding Location",
            value: (row) => (row?.weedingLocation?.location ? row?.weedingLocation?.location : ""),
          },
          {
            label: "Guest",
            value: (row) => (row.guest ? row.guest : ""),
          },
          {
            label: "Date",
            value: (row) => (row.eventDate ? row.eventDate : ""),
          },
          // {
          //   label: "Vendor Name",
          //   value: (row) =>
          //     row?.vendor?.userName ? row?.vendor?.userName : "",
          // },
        ],
        content: allCustomers,
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

  //filter code
  const sortByField = (array, field, order) => {
    const compareFunction = (a, b) => {
      let aValue = a[field];
      let bValue = b[field];

      if (typeof aValue === "string") {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }

      let comparison = 0;

      if (aValue > bValue) {
        comparison = 1;
      } else if (aValue < bValue) {
        comparison = -1;
      }

      return order === "desc" ? comparison * -1 : comparison;
    };
    setallCustomers([...array].sort(compareFunction));
    return [...array].sort(compareFunction);
  };

  const assignLeads = async () => {
    try {
      let res = await assignedLead();
      if (res.data.status) {
        navigate("/vendor-listing");
        notificationHandler({
          type: "success",
          msg: "Assigned Lead Successfully",
        });
      } else {
        notificationHandler({ type: "success", msg: res.data.message });
      }
    } catch (error) {
      notificationHandler({ type: "danger", msg: error.message });
      console.log(error);
    }
  };

  const handleAddRemark = async (e, row) => {
    let data;
    if (e.target.value === "Reject") {
      setOpen(true)
      setcustomerId(row?._id)
      return;
    }
    else {
      data = {
        status: e.target.value
      }
    }
    try {
      let res = await addRemark(data, row?._id)
      if (res.data.status) {
        fetchallCustomersFunc()
        notificationHandler({
          type: "success",
          msg: "Add Remark Successfully",
        });
      } else {
        notificationHandler({ type: "success", msg: res.data.message });
      }
    } catch (error) {
      notificationHandler({ type: "danger", msg: error.message });
      console.log(error);
    }
  }

  let importFunc = async (e) => {
    setisLoading(true);
    const file = e.target.files[0];
    try {
      let res = await importLeads(file);
      if (res.data.status) {
        setisLoading(false);
        fetchallCustomersFunc()
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

  const update_Lead = async (row) => {
    let ver = row.verify
    let temp = {
        verify:ver?false:true
    }

    try {
        let res = await updateLead_api(row._id, temp);
        if (res.data.status) {
          fetchallCustomersFunc()
            notificationHandler({ type: "success", msg: res.data.message });
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
      <div className="beat_heading">
        <div className={s["user-list-heading"]}>
          <div className="user-list-title">
            <h3>Customer List</h3>
          </div>

          <div className={s["user-list-search"]}>
            <div
              className={s["search-box"]}
              style={{ display: "flex", alignItems: "center" }}
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
                placeholder="Search users by name..."
              />
            </div>
            {role !== "Vendor" && <div>
              <label className={s["title"]}>
                  <span>Import</span>
                  <input
                    type="file"
                    accept=".xlsx, .xls, .csv"
                    onChange={importFunc}
                    name="file"
                    style={{ display: "none" }}
                  />
                </label>
            </div>}
            {role !== "Vendor" && <div>
              <label className={s["title"]} onClick={() => exportFunc()}>
                {exportBtnLoading ? <CircularProgress size={24} /> : "Export"}
              </label>
            </div>}
            {role !== "Vendor" ? (
              <div>
                <label className={s["title"]} onClick={() => assignLeads()}>
                  {exportBtnLoading ? (
                    <CircularProgress size={24} />
                  ) : (
                    "Assign"
                  )}
                </label>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div className="search-123">
            <select className="search-inp1" value={budgetRangeFilter} onChange={(e) => setbudgetRangeFilter(e.target.value)}>
              <option value="">Filter by budget range</option>
              {
                allBudgetRange?.map((elem, id) => {
                  return (
                    <option key={id} value={elem._id}>{elem?.name}</option>

                  )
                })
              }
            </select>
          </div>
          <div className="search-123">
            <select className="search-inp1" value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="">Filter by Locations</option>
              {
                allLocation?.map((elem, id) => {
                  return (
                    <option key={id} value={elem._id}>{elem?.location}</option>

                  )
                })
              }
            </select>
          </div>
          <div className="search-123">
            {/* <span style={{fontSize:"x-small"}}>Filter by date From and To</span> */}
            <div style={{ display: "flex" }}>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="search-inp1" />
              <input type="date" value={endDate} onChange={(e) => setendDate(e.target.value)} className="search-inp1" />
              <button className="search-inp1" onClick={() => fetchallCustomersFunc()}>Apply</button>
              <button className="search-inp1" style={{ border: "1px solid #fff" }} onClick={() => fetchallCustomersFunc("reset")}>Reset Filter</button>
              <button className="search-inp1" onClick={() => setShuffleModal(true)}>Lead Shuffling</button>

            </div>
          </div>

        </div>
      </div>
      <div className="beat_table">
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">S. No.</StyledTableCell>
              {role !== "Vendor" && (
                <StyledTableCell align="center">Date</StyledTableCell>
              )}
              <StyledTableCell align="center">
                Name
                <span
                  style={{
                    cursor: "pointer",
                    color: `${active == 0 ? "red" : null}`,
                  }}
                  onClick={() => {
                    setactive(0);
                    sortByField(allCustomers, "name", "asc");
                  }}
                >
                  <IoIosArrowRoundUp size={20} />
                </span>
                <span
                  style={{
                    cursor: "pointer",
                    color: `${active == 1 ? "red" : null}`,
                  }}
                  onClick={() => {
                    setactive(1);
                    sortByField(allCustomers, "name", "desc");
                  }}
                >
                  <IoIosArrowRoundDown size={20} />
                </span>
              </StyledTableCell>
              <StyledTableCell align="center">
                BudgetRange 
              </StyledTableCell>
              <StyledTableCell align="center">Phone No.</StyledTableCell>
              <StyledTableCell align="center">Location</StyledTableCell>
              <StyledTableCell align="center">Weeding Location</StyledTableCell>
              <StyledTableCell align="center">Weeding Date</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>

              <StyledTableCell align="center">Guest</StyledTableCell>
              {/* <StyledTableCell align="center">Services</StyledTableCell> */}
              {role !== "Vendor" && (
                <StyledTableCell align="center">Assign Status</StyledTableCell>
              )}
              {role !== "Vendor" && (
                <StyledTableCell align="center" >Lead Status</StyledTableCell>
              )}
             
              {/* {role !== "Vendor" && (
                <StyledTableCell align="center">
                  Assigned Vendor
                </StyledTableCell>
              )} */}
               {role !== "Vendor" && (
                <StyledTableCell align="center" >Assigned Manually</StyledTableCell>
              )}
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {allCustomers?.map((row, id) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell>{id + 1} </StyledTableCell>
                {role !== "Vendor" && (
                  <StyledTableCell align="center" >
                    {row?.createdAt?.split("T")[0]}
                  </StyledTableCell>
                )}
                <StyledTableCell>{row.name} </StyledTableCell>
                <StyledTableCell align="center">
                  {role !== "Vendor"
                    ? row.budgetRange.name
                    : row.budgetRangeName}
                </StyledTableCell>
                <StyledTableCell
                  style={{ cursor: "pointer" }}
                  // onClick={() => navigate("/user-details", { state: row })}
                >
                  {row.mobile}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {role !== "Vendor"?row.location?.location:row.locationName}{" "}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {role !== "Vendor"?row?.weedingLocation?.location:row?.weedingLocationName}{" "}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.eventDate.slice(0, 10)}
                </StyledTableCell>
                <StyledTableCell align="center">{row.email}</StyledTableCell>
                <StyledTableCell align="center">{row.guest}</StyledTableCell>
                {/* <StyledTableCell align="center">{
                  row.services.length>0?row.services.map((data) => (
                    <div>
                      {data.name}
                    </div>
                  ))

                :"Wedding"}</StyledTableCell> */}
                {role !== "Vendor" && (
                  <StyledTableCell align="center">
                    <div
                      style={{ cursor: "pointer" }}
                      className={
                        row.isAssigned === false
                          ? s.inactive_admin
                          : s.active_admin
                      }
                    >
                      {`${row.isAssigned == true ? "Assigned" : "Unssigned"}`}
                    </div>
                  </StyledTableCell>
                )}
                {role !== "Vendor" && (
                  <StyledTableCell align="center" style={{ cursor: "pointer" }} onClick={() => update_Lead(row)}>
                    <div
                      style={{ cursor: "pointer" }}
                      className={
                        row.verify === false
                          ? s.inactive_admin
                          : s.active_admin
                      }
                    >
                      {`${row.verify == true ? "Verified" : "Unverified"}`}
                    </div>
                  </StyledTableCell>
                )}
                {/* {role !== "Vendor" && (
                  <StyledTableCell align="center">
              <label  onClick={() => {setIsManually(true);setAssignedVendor(row.vendors)}} style={{cursor:"pointer" , color:"#e82e79"}}>View All Vendors</label>

                  </StyledTableCell>
                )} */}
                {role !== "Vendor" && (
                  <StyledTableCell align="center" >
                    <label  onClick={() => {setIsManually(true);setManualId(row?._id);setAssignedVendor(row.vendors)}} style={{cursor:"pointer" , color:"#e82e79"}}>Assigned Manually</label>
                    
                  </StyledTableCell>
                )}
                <StyledTableCell align="center ">
                 
                  {role == "Vendor" ? (
                    <select className="remark-design" disabled={row.status=="Reject"} value={row.status} onChange={(e) => handleAddRemark(e, row)}>
                      <option value="">Add Remark</option>
                      <option value="Pending">Pending</option>
                      <option value="Contact">Contact</option>
                      <option value="Accept">Accept</option>
                      <option value="Reject">Reject</option>
                    </select>
                  ) : <>
                      
                      <CiEdit
                    onClick={() =>
                      navigate("/add-customer", {
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
                        // setcurrentGroup(row);
                      }}
                      style={{
                        fontSize: "1rem",
                        color: "red",
                        cursor: "pointer",
                      }}
                    />
                  </>
                  }
                      
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        {allCustomers?.length <= 0 && <DataNotFound />}
        {allCustomers?.length > 0 && (
          <div className={s["pagination"]}>
            <Pagination
              count={pageLength}
              size="large"
              style={{ color: "#D21903" }}
              onChange={(e, value) => setpageCount(value)}
              page={pageCount}
            />
          </div>
        )}
      </div>
      <DeletePopup
        open={deletePopup}
        name={deletename}
        close={() => setdeletePopup(!deletePopup)}
        onsubmit={() => {
          deleteuserFunc();
        }}
      />
      <Loder loading={isLoading} />
      <ReasonModal open={open} setOpen={setOpen} customerId={customerId} />
      <VendorManuallyModal open={isManually} setOpen={setIsManually} customerId={manualId} assignedVendor={assignedVendor} />
      <ShufflingModal  shuffleModal={shuffleModal} setShuffleModal={setShuffleModal}/>
      <Reminder/>
    </div>
  );
};

export default CustomerTable;
