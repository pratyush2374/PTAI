import { Loader2 } from "lucide-react";

const LoadingSpinner = () => {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center gap-4 bg-background">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <div className="text-lg font-medium animate-pulse">
                Loading your profile...
            </div>
            <div className="text-sm text-muted-foreground">
                Please wait while we fetch your data
            </div>
        </div>
    );
};

export default LoadingSpinner;
