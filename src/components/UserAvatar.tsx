import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  avatarUrl?: string | null;
  fullName?: string | null;
  size?: "sm" | "md" | "lg";
}

const UserAvatar = ({ avatarUrl, fullName, size = "md" }: UserAvatarProps) => {
  const getInitials = (name: string | null) => {
    if (!name) return "U";
    
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2);
  };

  const sizeClasses = {
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10 text-base", 
    lg: "h-12 w-12 text-lg"
  };

  return (
    <Avatar className={sizeClasses[size]}>
      {avatarUrl && <AvatarImage src={avatarUrl} alt={fullName || "User"} />}
      <AvatarFallback className="bg-orange-100 text-orange-700 font-semibold">
        {getInitials(fullName)}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;