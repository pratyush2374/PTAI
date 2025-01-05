import { Toaster } from "@/components/ui/toaster";
import TrackExercises from "./TrackExercises";
import Navbar from "@/app/(common-components)/Navbar";

const TrackExercise: React.FC = () => {
    return (
        <>
            <Navbar />
            <TrackExercises />
            <Toaster />
        </>
    );
};

export default TrackExercise;
