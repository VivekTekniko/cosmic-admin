import React from "react";
import Adminadd from "./pages/AdminAdd";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/profile";
import { ServicesList } from "./pages/ServicesList";
import AddServices from "./components/Services/AddServices";

import CustomerTablePage from "./pages/CustomerTablePage";
import VendorListing from "./components/Vendors/VendorListing";
import BudgetRange from "./pages/BudgetRange";
import AddBudgetRangePage from "./pages/AddBudgetRangePage"
import PackagePage from "./pages/PackagePage";
import AddPackage from "./components/Package/AddPackage";
import AddVendor from "./components/Vendors/AddVendors";
import Admin from "./pages/Admin";
import AddAdmin from "./components/Admin/AddAdmin";
import AddCustomer from "./components/CustomerTable/AddCustomer";
import RegisterVendor from "./components/Vendors/RegisteredVendor";
import LocationsList from "./components/Location/LocationList";
import AddLocation from "./components/Location/AddLocation";
import RejectedLeadList from "./components/RejectedLead/RejectedLeadList";

const routeArray = [


  // This is used for show the customer table
  { params: "customer-table", component: <CustomerTablePage /> },
  { params: "add-customer", component: <AddCustomer /> },

  // THis is used for vendor listing
  { params: "vendor-listing", component: <VendorListing /> },
  { params: "register-vendor", component: <RegisterVendor /> },
  { params: "addVendor", component: <AddVendor /> },





  { params: "admin-list", component: <Admin /> },
  { params: "add-admin", component: <AddAdmin /> },


  { params: "dashboard", component: <Dashboard /> },
  { params: "profile", component: <Profile /> },
  { params: "service-list", component: <ServicesList /> },
  { params: "add-services", component: <AddServices /> },
  { params: "budget-range", component: <BudgetRange /> },
  { params: "add-budget-range", component: <AddBudgetRangePage /> },

  //  Package Page
  { params: "package-list", component: <PackagePage /> },
  { params: "add-package", component: <AddPackage /> },


  //  Location
  { params: "location-list", component: <LocationsList /> },
  { params: "add-location", component: <AddLocation /> },



  // Rejected Leads
  { params: "rejected-List", component: <RejectedLeadList /> },


];

export default routeArray;
