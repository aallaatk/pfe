
// import SideBar from "../Components/SideBar";
// import { Routes, Route } from "react-router-dom";
// import DashboardUsers from "../Components/DashboardUsers";
// import Create from "../Components/Create";
// import DashboardGuiders from "../Components/DashboardGuiders";

import DashboardGuiders from "../Components/DashboardGuiders";
// import DashboardUsers from "../Components/DashboardUsers";
import SideBar from "../Components/SideBar";

function AdminDashboard() {
  return (
    <div>
      <h1 className="text-center mt-3">Admin Dashboard</h1>
      <DashboardGuiders/>
      <SideBar/>
      {/* <SideBar />
      <Routes>
        <Route path="/dashboard/users" element={<DashboardUsers />} />
        <Route path="/dashboard/users/create" element={<Create />} />
        <Route path="/dashboard/guiders" element={<DashboardGuiders />} />
        <Route path="/dashboard/tours/create" element={<Create />} />
      </Routes> */}
    </div>
  );
}

export default AdminDashboard;
