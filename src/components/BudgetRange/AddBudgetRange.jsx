import React, { useState, useEffect } from "react";
import s from "./budget.module.css";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Custombutton from "../../Common/Custombutton";
import { notificationHandler } from "../../utils/Notification";
import { useLocation } from "react-router-dom";
import { Card, Grid } from "@mui/material";
import { addBudgetRanges_api, addCategory_api, updateBudgetRange_api, updateCategory_api } from "../api/budgetRange";
const AddBudgetRange = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [budgetRange, setbudgetRange] = useState("");
  const [file, setfile] = useState(null);
  const [max, setmax] = useState("");
  const [min, setmin] = useState("");
  const [categoryType, setCategoryType] = useState("")
  const pagetype = location.state.pagetype;
  const id = location?.state?.data?._id;
  console.log(location);
  useEffect(() => {
    setbudgetRange(location?.state?.data?.name);
    setmax(location?.state?.data?.max);
    setmin(location?.state?.data?.min);
  }, [location]);

  const Category_function = async () => {
    if (pagetype == "Add") {
      let temp = {
        name: budgetRange,
        min: min,
        max: max
      }
      try {
        let res = await addBudgetRanges_api(temp);
        if (res.data.status) {
          navigate("/budget-range");
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
      let temp = {
        name: budgetRange,
        min: min,
        max: max
      }
      try {
        let res = await updateBudgetRange_api(id, temp);
        if (res.data.status) {
          navigate("/budget-range");
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
                <label for="exampleInputEmail1">Budget Range</label>
                <input type="text" className="form-control" name="budgetRange" value={budgetRange} onChange={(e) => setbudgetRange(e.target.value)} placeholder="budgetRange" />
              </div>
            </Grid>

            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Minimum Amount</label>
                <input type="number" className="form-control" value={min} onChange={(e) => setmin(e.target.value)} placeholder="min" />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Maximum Amount</label>
                <input type="number"
                  className="form-control"
                  onChange={(e) => setmax(e.target.value)}
                  placeholder="max"
                  value={max}
                >
                </input>
              </div>
            </Grid>
          </Grid>
          <div className={s["form-login-btn"]} onClick={() => Category_function()}>
            <Custombutton>{pagetype == "Add" ? "Submit" : "Update"} </Custombutton>
          </div>
        </Card>
      </div >
    </>
  );
};

export default AddBudgetRange;
