import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, User } from "lucide-react";

interface ProfileCardProps {
  name: string;
  email: string;
  username: string;
  image: string;
}

const ProfileCard = ({ name, email, username, image }: ProfileCardProps) => {
  return (
    <Card>
      <CardContent className="md:p-8 pt-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
          <div className="relative shrink-0">
            <Avatar className="h-24 w-24 border-4 border-primary/10">
              <AvatarImage src={image} alt={name} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Badge 
              variant="default" 
              className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-green-500 p-0 border-2 border-white"
            />
          </div>

          <div className="flex-1 space-y-2 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold truncate">{name}</h2>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span className="truncate text-sm sm:text-base">{email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4" />
                <span className="truncate text-sm sm:text-base">@{username}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;