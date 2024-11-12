import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import s from "./vendor.module.css";
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
import { getAllService_api } from "../api/service";
import { create_vendor_api, updateVendor_api } from "../api/vendor";
import MultipleSelect from "../Location/MultiSelector";
import { locationList_api } from "../api/location";
const AddVendor = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setisLoading] = useState(false);
    const [name, setname] = useState("");
    const [mobile, setmobile] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [file, setfile] = useState(null);
    const [locations, setlocations] = useState()
    const [confirmPassword, setconfirmPassword] = useState("")
    const [allLocations, setallLocations] = useState([]);
    const [allLocationId, setallLocationId] = useState("")


    const create_admin = async () => {
        const fd = new FormData();
        fd.append("userName", name);
        fd.append("password", password);
        fd.append("email", email);
        fd.append("confirmPassword", confirmPassword);
        fd.append("profileImage", file);
        fd.append("mobile", mobile);
        if (allLocationId) {
            fd.append("location", JSON.stringify(allLocationId))
        }

        try {
            let res = await create_vendor_api(fd);
            if (res.data.status) {
                navigate("/vendor-listing");
                notificationHandler({ type: "success", msg: "Vendor Create successfully" });
            } else {
                notificationHandler({ type: "success", msg: res.data.message });
            }
        } catch (error) {
            notificationHandler({ type: "danger", msg: error.message });
            console.log(error);
        }

    };


    useEffect(() => {
        fetchAllLocationsFunc();
    }, []);


    const fetchAllLocationsFunc = async (data) => {
        try {
            const temp = {
            };
            let res = await locationList_api(temp);
            if (res.data.status) {
                setallLocations(res?.data?.data?.location);
            } else {
                console.log("status false!");
            }
        } catch (error) {
            console.log(error);
        }
    };



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
                                <input type="text" className="form-control" name="email" value={email} onChange={(e) => setemail(e.target.value)} placeholder="name" />
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
                                <label for="exampleInputEmail1"> Add Vendor's Weeding Location </label>

                                <MultipleSelect
                                    subjects={allLocations} setsubjectId={setallLocationId} />
                                {/* <input type="text" className="form-control" name="location" value={locations} onChange={(e) => setlocations(e.target.value)} placeholder="enter your location" /> */}
                            </div>
                        </Grid>
                        {/* <Grid item xs={6}>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Location</label>
                                <input type="text" className="form-control" name="location" value={locations} onChange={(e) => setlocations(e.target.value)} placeholder="location" />
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Profile Image</label>
                                <div className="mr-2">
                                    <input type="file" className="form-control" name="img" placeholder="" accept="image/*" onChange={(e) => setfile(e.target.files[0])} />
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Password</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setpassword(e.target.value)}
                                    placeholder="password"
                                />
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="form-group">
                                <label for="exampleInputEmail1"> Confirm Password</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setconfirmPassword(e.target.value)}
                                    placeholder="confirm Password"
                                />
                            </div>
                        </Grid>


                        <Grid item xs={6}>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Select Service</label>
                                <select
                                    className="form-control"
                                    name="city"
                                    value={vendorService}
                                    onChange={(e) => setvendorService(e.target.value)}
                                >
                                    <option>select Service</option>
                                    {
                                        allService.map((data) => (
                                            <option value={data._id}>{data.name}</option>
                                        ))
                                    }
                                </select>
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
                        </Grid> */}

                    </Grid>
                    <div className={s["form-login-btn"]} onClick={() => create_admin()}>
                        <Custombutton>Submit</Custombutton>
                    </div>
                </Card>
            </div>
        </>
    );
};

export default AddVendor;
