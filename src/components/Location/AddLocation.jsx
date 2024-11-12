import { Card, Grid } from '@mui/material';
import React, { useEffect, useInsertionEffect, useState } from 'react'
import { IoLocationSharp } from 'react-icons/io5';
import { addLocations_api, get_latLong, get_palces, locationList_api, updateLocations_api } from '../api/location';
import s from "./location.module.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { notificationHandler } from '../../utils/Notification';
import Custombutton from '../../Common/Custombutton';
import { BiArrowBack } from 'react-icons/bi';

const AddLocation = () => {

    const [location, setlocation] = useState("")
    const [description, setDescription] = useState("")
    const navigate = useNavigate()
    let locations = useLocation()


    let pagetype = locations?.state?.pagetype
    let id = locations?.state?.data?._id



    useInsertionEffect(() => {
        setlocation(locations?.state?.data?.location)
    }, [])


    const Category_function = async () => {
        if (pagetype === "Add") {

            let temp = {
                location: location
            }

            try {
                let res = await addLocations_api(temp);
                if (res.data.status) {
                    navigate("/location-list");

                    notificationHandler({ type: "success", msg: res.data.message });
                } else {
                    notificationHandler({ type: "success", msg: res.data.message });
                }
            } catch (error) {
                notificationHandler({ type: "danger", msg: error.message });
                console.log(error);
            }
        }
        if (pagetype === "Edit") {
            let temp = {
                location: location
            }

            try {
                let res = await updateLocations_api(temp, id);
                if (res.data.status) {
                    navigate("/location-list");

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





    return (
        <div >
            <Card className={s["admin_container"]}>
                <div className={s["title"]} onClick={() => navigate(-1)}>
                    <BiArrowBack />
                    Back
                </div>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item md={12} xs={12} sm={12}>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Add Location</label>
                            <div className="mr-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="location"
                                    placeholder="location"
                                    value={location}
                                    onChange={(e) => setlocation(e.target.value)}
                                />

                            </div>
                        </div>
                    </Grid>
                </Grid>
                <div className={s["form-login-btn"]} onClick={() => Category_function()}>
                    <Custombutton>Submit</Custombutton>
                </div>
            </Card>
        </div>
    )
}

export default AddLocation
