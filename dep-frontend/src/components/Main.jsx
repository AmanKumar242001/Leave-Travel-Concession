import React from "react";
import { Route, Routes } from "react-router";
import NewApplication from "../pages/NewApplication.jsx";
import LiveApplication from "../pages/LiveApplication.jsx";
import DoneLTC from "../pages/DoneLTC.jsx";
import PastApplication from "../pages/PastApplication.jsx";
import PendingApplication from "../pages/PendingApplication.jsx";
import ReviewApplication from "../pages/ReviewApplication.jsx";
import EstabSubmission from "../pages/EstabSubmission.jsx";
import AccountsSubmission from "../pages/AccountsSubmission.jsx";
import HodSubmission from "../pages/HodSubmission.jsx";
import DeanSubmission from "../pages/DeanSubmission.jsx";
import RegistrarSubmission from "../pages/RegistrarSubmission.jsx";
import AuditSubmission from "../pages/AuditSubmission.jsx";
import NewTaApplication from "../pages/NewTaApplication.jsx";
import PendingTaApplication from "../pages/PendingTaApplication.jsx";
import EstabTaSubmission from "../pages/EstabTaSubmission.jsx";
import HodTaSubmission from "../pages/HodTaSubmission.jsx";
import AccountsTaSubmission from "../pages/AccountsTaSubmission.jsx";
import AuditTaSubmission from "../pages/AuditTaSubmission.jsx";
import DeanTaSubmission from "../pages/DeanTaSubmission.jsx";
import RegistrarTaSubmission from "../pages/RegistrarTaSubmission.jsx";
import LiveTaApplication from "../pages/LiveTaApplication.jsx";
import ShowUserApplication from "../pages/ShowUserApplication.jsx";
import ShowUserTaApplication from "../pages/ShowUserTaApplication.jsx";
import NotificationPage from "../pages/NotificationPage.jsx";
import UserProfile from "../pages/UserProfile.jsx";
import OfficeOrder from "./OfficeOrder.jsx";
import ListOfficeOrders from "../pages/ListOfficeOrders.jsx";

export default function Main() {
  return (
    <Routes>
      <Route path="/" element={<NewApplication />} />
      <Route path="officeOrder" element={<ListOfficeOrders />} />
      <Route path="notification" element={<NotificationPage />} />
      <Route path="applicant">
        <Route path="new" element={<NewApplication />} />
        <Route path="live" element={<LiveApplication />} />
        <Route path="view">
          <Route path=":id" element={<ShowUserApplication />} />
        </Route>
        <Route path="newTa/:ltcId" element={<NewTaApplication />} />
        <Route path="newTa" element={<DoneLTC />} />
        <Route path="liveTa" element={<LiveTaApplication />} />
        <Route path="viewTa">
          <Route path=":id" element={<ShowUserTaApplication />} />
        </Route>
      </Route>

      <Route path="establish">
        <Route path="pending" element={<PendingApplication />} />
        <Route path="view">
          <Route path=":id" element={<EstabSubmission />} />
        </Route>
        <Route path="pendingTa" element={<PendingTaApplication />} />
        <Route path="viewTa">
          <Route path=":id" element={<EstabTaSubmission />} />
        </Route>
      </Route>
      <Route path="accounts">
        <Route path="pending" element={<PendingApplication />} />
        <Route path="view">
          <Route path=":id" element={<AccountsSubmission />} />
        </Route>
        <Route path="pendingTa" element={<PendingTaApplication />} />
        <Route path="viewTa">
          <Route path=":id" element={<AccountsTaSubmission />} />
        </Route>
      </Route>
      <Route path="hod">
        <Route path="pending" element={<PendingApplication />} />
        <Route path="view">
          <Route path=":id" element={<HodSubmission />} />
        </Route>
        <Route path="pendingTa" element={<PendingTaApplication />} />
        <Route path="viewTa">
          <Route path=":id" element={<HodTaSubmission />} />
        </Route>
      </Route>
      <Route path="audit">
        <Route path="pending" element={<PendingApplication />} />
        <Route path="view">
          <Route path=":id" element={<AuditSubmission />} />
        </Route>
        <Route path="pendingTa" element={<PendingTaApplication />} />
        <Route path="viewTa">
          <Route path=":id" element={<AuditTaSubmission />} />
        </Route>
      </Route>
      <Route path="dean">
        <Route path="pending" element={<PendingApplication />} />
        <Route path="view">
          <Route path=":id" element={<DeanSubmission />} />
        </Route>
        <Route path="pendingTa" element={<PendingTaApplication />} />
        <Route path="viewTa">
          <Route path=":id" element={<DeanTaSubmission />} />
        </Route>
      </Route>
      <Route path="registrar">
        <Route path="pending" element={<PendingApplication />} />
        <Route path="view">
          <Route path=":id" element={<RegistrarSubmission />} />
        </Route>
        <Route path="pendingTa" element={<PendingTaApplication />} />
        <Route path="viewTa">
          <Route path=":id" element={<RegistrarTaSubmission />} />
        </Route>
      </Route>
      <Route path="avatar" element={<UserProfile />} />
    </Routes>
  );
}
