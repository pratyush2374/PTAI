"use client";

import Navbar from "@/app/(common-components)/Navbar"
import Parent from "./Parent";
import LowerParent from "./LowerParent";
import Footer from "./Footer";

const Dashboard: React.FC = () => {
  return (
    <>
      <Navbar />
      <Parent />
      <LowerParent />
      <Footer />
    </>
  );
}

export default Dashboard;