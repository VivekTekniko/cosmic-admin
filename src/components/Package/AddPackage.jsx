import React, { useState, useEffect } from "react";
import s from "./package.module.css";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Custombutton from "../../Common/Custombutton";
import { notificationHandler } from "../../utils/Notification";
import { blankValidator, emailValidator } from "../../utils/Validation";
import { useLocation } from "react-router-dom";
import { Card, Grid } from "@mui/material";
import {
  addCategory_api,
  getBudgetRange_api,
  updateCategory_api,
} from "../api/budgetRange";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Pagination,
} from "@mui/material";
import Select from "react-select";
import {
  addPackage_api,
  updateCondition_api,
  updatePackage_api,
} from "../api/package";
import zIndex from "@mui/material/styles/zIndex";
const AddPackage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setname] = useState("");
  const [file, setfile] = useState(null);
  const [validity, setvalidity] = useState("");
  const [assingLead, setassingLead] = useState("");
  const [pageCount, setpageCount] = useState(1);
  const [search, setsearch] = useState("");
  const [price, setprice] = useState("");
  const pagetype = location.state.pagetype;
  const id = location?.state?.data?._id;

  const [allBudgetRange, setallBudgetRange] = useState([]);
  const [packageBudget, setpackageBudget] = useState([]);
  console.log(packageBudget, typeof packageBudget, "packageBudget");
  useEffect(() => {
    if (pagetype === "Edit") {
      setname(location?.state?.data?.name);
      setpackageBudget(location?.state?.data?.price);
      setvalidity(location?.state?.data?.validity);
      setassingLead(location?.state?.data?.assignLeadValue);
    }

    // setvalidity(location?.state?.data?)
  }, [location]);
  const Category_function = async () => {
    if (pagetype == "Add") {
      let temp = {
        name: name,
        budgetRange: packageBudget,
        validity: validity,
        assignLeadValue: assingLead,
      };
      try {
        let res = await addPackage_api(temp);
        if (res.data.status) {
          navigate("/package-list");
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
        name: name,
        budgetRange: packageBudget,
        validity: validity,
        assignLeadValue: assingLead,
      };
      try {
        let res = await updatePackage_api(id, temp);
        if (res.data.status) {
          navigate("/package-list");
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

  //    RThis api is used to select budget range according to the package

  useEffect(() => {
    fetchallBudgetRangeFunc();
  }, []);

  async function fetchallBudgetRangeFunc() {
    const temp = {
      page: pageCount,
      limit: 100,
      search: search.trim(),
    };
    try {
      let res = await getBudgetRange_api(temp);
      if (res.data.status) {
        setallBudgetRange(res?.data?.data.budgetRanges);
      } else {
        console.log("status false!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const budgetoptions = allBudgetRange?.map((elem, id) => {
    return {
      value: elem?._id,
      label: elem?.name,
    };
  });

  const handleBudgetChange = (selectedOptions) => {
    // Set budgetRange to the selected value ids
    setpackageBudget(selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

  return (
    <>
      <div className="">
        <Card className={s["admin_container"]}>
          <div className={s["title"]} onClick={() => navigate(-1)}>
            <BiArrowBack />
            Back
          </div>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1"> Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  placeholder="Name"
                />
              </div>
            </Grid>

            {/* <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Priority</label>
                <input type="text" className="form-control" value={priority} onChange={(e) => setpriority(e.target.value)} placeholder="Priority" />
              </div>
            </Grid> */}
            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Select Validity</label>
                <select
                  className="form-control"
                  value={validity}
                  onChange={(e) => setvalidity(e.target.value)}
                >
                  <option> select Validity</option>
                  <option value="1">1 day</option>
                  <option value="10">10 days</option>
                  <option value="15">15 days</option>
                  <option value="40">40 days</option>
                  <option value="60">60 days</option>
                  <option value="100">100 days</option>
                  <option value="190">190 days</option>
                  <option value="375">375 days</option>
                </select>
              </div>
            </Grid>

            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Assigned Lead Values</label>
                <select
                  className="form-control"
                  value={assingLead}
                  onChange={(e) => setassingLead(e.target.value)}
                >
                  <option>Assign Leads</option>
                  <option value="1">1</option>
                  <option value="5">5 </option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20 </option>
                  <option value="30">30 </option>
                  <option value="35">35 </option>
                  <option value="40">40</option>
                  <option value="45">45 </option>
                  <option value="50">50 </option>
                  <option value="60">60</option>
                  <option value="80">80 </option>
                  <option value="90">90 </option>
                  <option value="100">100</option>
                  <option value="190">190</option>
                  <option value="375">375</option>
                </select>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Select Budget Range</label>
                <Select
                  isMulti
                  name="colors"
                  options={budgetoptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={handleBudgetChange}
                  style={{zIndex:"999"}}
                />
               
              </div>
            </Grid>
          </Grid>

          <div
            className={s["form-login-btn"]}
            onClick={() => Category_function()}
          >
            <Custombutton>
              {pagetype == "Add" ? "Submit" : "Update"}{" "}
            </Custombutton>
          </div>
        </Card>
      </div>
    </>
  );
};

export default AddPackage;
