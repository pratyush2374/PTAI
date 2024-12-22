import Navbar from "@/app/(common-components)/Navbar";
import { Toaster } from "@/components/ui/toaster";
import DietTracker from "@/app/diet/diet-components/TrackDiet";


const TrackDiet : React.FC = () => {
  return (
    <>
        <Navbar />
        <DietTracker/>
        <Toaster />
    </>
  );
}

export default TrackDiet;