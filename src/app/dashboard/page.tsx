"use client";

import DashboardNavbar from "./dashboard-components/DashboardNavbar";
import Parent from "./dashboard-components/Parent";
import LowerParent from "./dashboard-components/LowerParent";
import Footer from "./dashboard-components/Footer";

const Dashboard: React.FC = () => {
  return (
    <>
      <DashboardNavbar />
      <Parent />
      <LowerParent />
      <Footer />
    </>
  );
}

export default Dashboard;