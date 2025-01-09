import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";

const GoogleRegister: React.FC = () => {
  return (
    <Card className="mt-6">
      <CardContent className="flex flex-col items-center gap-4 py-6">
        <div className="flex items-center gap-3">
          <Image
            src="/Images/googlefit.png"
            alt="Google Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <h2 className="text-xl font-semibold text-center text-muted-foreground">
            Register with Google Fit
          </h2>
        </div>
        <Button 
          onClick={async () => await signIn("google")} 
          className="md:w-fit bg-blue-500 hover:bg-blue-600 text-white w-[90%] py-2 px-4 rounded-md"
        >
          Register
        </Button>
      </CardContent>
    </Card>
  );
};

export default GoogleRegister;
