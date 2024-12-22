import styles from "../diet.module.css";
import Message from "./Message";
import DayOverview from "./DayOverview";
import AllMeals from "./AllMeals";
import TrackDiet from "./TrackDiet";
import Navbar from "@/app/(common-components)/Navbar";

const Diet: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <Message />
        <AllMeals />
        <DayOverview />
      </div>
      
    </>
  );
};

export default Diet;
