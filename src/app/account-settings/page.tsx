import { Toaster } from "@/components/ui/toaster";
import AccountSettings from "./account-setting-components/AccountSettings";
import Navbar from "../(common-components)/Navbar";

const Page: React.FC = () => {
    return (
        <>
            <Navbar />
            <AccountSettings />
            <Toaster />
        </>
    );
};

export default Page;
