import { GetCurrentUser } from "@/actions/user";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LogIn } from "lucide-react";
import React from "react";
import AvatarComponent from "./AvatarComponent";
import EditProfileSheet from "./EditProfileSheet";

const UserAvatar = async () => {
  const user = await GetCurrentUser();
  if (!user) return <LogIn />;
  return (
    <EditProfileSheet user={user}>
      <AvatarComponent
        fallback={user.name?.slice(0, 2).toUpperCase() || "AD"}
        src={user?.image}
      />
    </EditProfileSheet>
  );
};

export default UserAvatar;
