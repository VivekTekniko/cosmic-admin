import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import s from "./admin.module.css";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Custombutton from "../../Common/Custombutton";
import { create_admin_api, create_banner_api, getroll_admin_api, update_admin_api, update_banner_api } from "../api/admin";
import { notificationHandler } from "../../utils/Notification";
import { blankValidator, emailValidator } from "../../utils/Validation";
import { useLocation } from "react-router-dom";
import { Card, Grid } from "@mui/material";
import { getPackage_api } from "../api/package";
import { getBudgetRange_api } from "../api/budgetRange";
import { getAllLocation_api, getAllService_api } from "../api/service";
import { updateLead_api, updateVendor_api } from "../api/vendor";
const AddCustomer = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const id = location?.state?.data?._id;
    const [isLoading, setisLoading] = useState(false);
    const [name, setname] = useState("");
    const [mobile, setmobile] = useState("");
    const [email, setemail] = useState("");
    const [status, setstatus] = useState("");
    const [guest, setguest] = useState("");
    const [file, setfile] = useState(null);
    const [url, setUrl] = useState("");
    const [confirmguest, setconfirmguest] = useState("")
    const [search, setsearch] = useState("");
    const [pageCount, setpageCount] = useState(1);
    const [weddLocation , setWeddLocation] = useState()
    const [locations, setlocations] = useState("");
    const [allLocations, allsetLocations] = useState([]);

    const [allService, setallService] = useState([]);
    const [vendorService, setvendorService] = useState("")

    const [allBudgetRange, setallBudgetRange] = useState([]);
    const [vendorBudgetRange, setvendorBudgetRange] = useState("")
    const [eventDate, seteventDate] = useState("")

    const [allPackage, setallPackage] = useState([]);

    const pagetype = location.state.pagetype;
    console.log(location)
    useEffect(() => {
        setname(location?.state?.data?.name);
        setemail(location?.state?.data?.email);
        setlocations(location?.state?.data?.location);
        setmobile(location?.state?.data?.mobile)
        setvendorBudgetRange((location.state.data.budgetRange?._id))
        seteventDate(location?.state?.data?.eventDate.split("T")[0])
        setguest(location?.state?.data?.guest)
        setWeddLocation(location?.state?.data?.weedingLocation?._id)
        setlocations(location?.state?.data?.location?._id)
    }, [location]);




    const create_admin = async () => {
        if (pagetype == "Add") {
            const fd = new FormData();
            fd.append("userName", name);
            fd.append("guest", guest);
            fd.append("email", email);
            fd.append("confirmguest", confirmguest);
            fd.append("profileImage", file);

            try {
                let res = await create_banner_api(fd);
                if (res.data.status) {
                    navigate("/banner");
                    notificationHandler({ type: "success", msg: res.data.message });
                } else {
                    notificationHandler({ type: "success", msg: res.data.message });
                }
            } catch (error) {
                notificationHandler({ type: "danger", msg: error.message });
                console.log(error);
            }
        }
        if (pagetype == "Edit") {
            let details={
                name:name,
                mobile:mobile,
                email:email,
                location:locations,
                eventDate:eventDate,
                budgetRange:vendorBudgetRange,
                guest:guest,
                weedingLocation:weddLocation
            }

            try {
                let res = await updateLead_api(id, details);
                if (res.data.status) {
                  navigate("/customer-table")
                    notificationHandler({ type: "success", msg: res.data.message });
                } else {
                    notificationHandler({ type: "success", msg: res.data.message });
                }
            } catch (error) {
                notificationHandler({ type: "danger", msg: error.message });
                console.log(error);
            }
        }
    };


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

    async function fetchallLocationFunc(data) {
        setisLoading(true);
        try {
            const temp = {
                page: pageCount,
                limit: 100,
                search: search.trim(),
            };
            let res = await getAllLocation_api(temp);
            if (res.data.status) {
                allsetLocations(res.data.data.location);
                setisLoading(false);
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

        fetchallLocationFunc()
    }, []);

    async function fetchallBudgetRangeFunc() {
        setisLoading(true);
        const temp = {
            page: pageCount,
            limit: 100,
            search: search.trim(),
        };
        try {

            let res = await getBudgetRange_api(temp);
            if (res.data.status) {
                setallBudgetRange(res?.data?.data.budgetRanges);
                setisLoading(false);
            } else {
                setisLoading(false);
                console.log("status false!");
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        fetchAllPackageFunc();
    }, []);

    async function fetchAllPackageFunc(data) {
        setisLoading(true);
        try {
            const temp = {
                // id: type
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


    return (
        <>
            <div className="">
                <Card className={s["admin_container"]}>
                    <div className={s["title"]} onClick={() => navigate(-1)}>
                        <BiArrowBack />
                        Back
                    </div>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Name</label>
                                <input type="text" className="form-control" name="name" value={name} onChange={(e) => setname(e.target.value)} placeholder="name" />
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Email</label>
                                <input type="email" className="form-control" name="email" value={email} onChange={(e) => setemail(e.target.value)} placeholder="name" />
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Mobile Number</label>
                                <input type="text" className="form-control" name="mobile" value={mobile} onChange={(e) => setmobile(e.target.value)} placeholder="mobile" />
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Select Customer Location</label>
                                <select
                                    className="form-control"
                                    name="locations"
                                    value={locations}
                                    onChange={(e) => setlocations(e.target.value)}
                                >
                                    <option>Select Location</option>
                                    {
                                        allLocations.map((data) => (
                                            <option value={data._id}>{data.location}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Select Wedding Location</label>
                                <select
                                    className="form-control"
                                    name="weddLocation"
                                    value={weddLocation}
                                    onChange={(e) => setWeddLocation(e.target.value)}
                                >
                                    <option>Select Location</option>
                                    {
                                        allLocations.map((data) => (
                                            <option value={data._id}>{data.location}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </Grid>

                        <Grid item xs={6}>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Number of Guest</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="guest"
                                    value={guest}
                                    onChange={(e) => setguest(e.target.value)}
                                    placeholder="guest"
                                />
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Event Data</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="eventDate"
                                    value={eventDate}
                                    onChange={(e) => seteventDate(e.target.value)}
                                    placeholder="eventDate"
                                />
                            </div>
                        </Grid>


                        
                        <Grid item xs={6}>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Budget Range</label>
                                <select
                                    className="form-control"
                                    name="city"
                                    value={vendorBudgetRange}
                                    onChange={(e) => setvendorBudgetRange(e.target.value)}
                                >
                                    <option>select Budget Range</option>
                                    {
                                        allBudgetRange.map((data) => (
                                            <option value={data._id}>{data.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </Grid>
                        {/* <Grid item xs={6}>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Package</label>
                                <select
                                    className="form-control"
                                    name="city"
                                    value={vendorPackage}
                                    onChange={(e) => setvendorPackage(e.target.value)}
                                >
                                    <option>select Package</option>
                                    {
                                        allPackage.map((data) => (
                                            <option value={data._id}>{data.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </Grid> */}
                    </Grid>
                    <div className={s["form-login-btn"]} onClick={() => create_admin()}>
                        <Custombutton>Update</Custombutton>
                    </div>
                </Card>
            </div>
        </>
    );
};

export default AddCustomer;
