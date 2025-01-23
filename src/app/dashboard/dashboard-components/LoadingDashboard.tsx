import { Loader2 } from "lucide-react";

const Loading = () => {
    return (
        <div className="min-h-screen w-full flex flex-col mt-14">
            <div className="p-2 rounded-lg flex flex-col items-center space-y-6">
                {/* Primary loader */}
                <div className="relative">
                    <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
                    <div className="absolute -inset-1 rounded-full animate-pulse bg-blue-100 dark:bg-blue-900 -z-10" />
                </div>

                {/* Loading text */}
                <div className="flex flex-col items-center gap-2">
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                        Loading....This might take upto 30 seconds
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Please wait while we set things up...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Loading;