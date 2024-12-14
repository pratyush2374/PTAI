import styles from "../diet.module.css";
import DietNavbar from "./DietNavbar";
import { Toaster } from "@/components/ui/toaster";
import Message from "./Message";
import DayOverview from "./DayOverview";
import AllMeals from "./AllMeals";
import TrackDiet from "./TrackDiet";

const Diet: React.FC = () => {
  return (
    <>
      <DietNavbar />
      <div className={styles.container}>
        <Message />
        <AllMeals />
        <DayOverview />
      </div>
      <TrackDiet />
      <Toaster />
    </>
  );
};

export default Diet;
