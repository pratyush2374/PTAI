"use client";

import Navbar from "@/app/(common-components)/Navbar";
import Parent from "./Parent";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const Dashboard: React.FC = () => {
    return (
        <>
            <Navbar />
            <Parent />
        </>
    );
};

export default Dashboard;
