"use client";

import DashboardNavbar from "./DashboardNavbar";
import Parent from "./Parent";
import LowerParent from "./LowerParent";
import Footer from "./Footer";

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