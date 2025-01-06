import Navbar from "@/app/(common-components)/Navbar";
import Graph from "./Graph";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import styles from "../healthTracker.module.css";
import { Toaster } from "@/components/ui/toaster";
import UserStats from "./UserStats";
import BloodPressure from "./BloodPressure";
import BloodGlucose from "./BloodGlucose";
import SleepStats from "./SleepStats";

const HealthAndStats: React.FC = () => {
    return (
        <>
            <Navbar />
            <div className={styles.outerHealthAndStats}>
                <Tabs defaultValue="weightData" className="md:w-[800px] w-[400px] mx-auto">
                    <TabsList>
                        <TabsTrigger value="weightData">Weight Data</TabsTrigger>
                        <TabsTrigger value="userStats">User Stats</TabsTrigger>
                        <TabsTrigger value="bloodPressure" className="mr-1">Blood Pressure</TabsTrigger>
                        <TabsTrigger value="bloodGlucose">Blood Glucose</TabsTrigger>
                        <TabsTrigger value="sleepStats">Sleep Stats</TabsTrigger>
                    </TabsList>

                    <TabsContent value="weightData">
                        <Graph />
                    </TabsContent>
                    <TabsContent value="userStats">
                        <UserStats />
                    </TabsContent>
                    <TabsContent value="bloodPressure">
                        <BloodPressure />
                    </TabsContent>
                    <TabsContent value="bloodGlucose">
                        <BloodGlucose />
                    </TabsContent>
                    <TabsContent value="sleepStats">
                        <SleepStats />
                    </TabsContent>
                </Tabs>
            </div>
            <Toaster />
        </>
    );
};

export default HealthAndStats;
