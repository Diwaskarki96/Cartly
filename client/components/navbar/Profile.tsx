import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { $axios } from "@/axios/axiosInstance";
import { useAuth } from "../global/AuthContext";

const Profile = () => {
  const router = useRouter();
  const userId = localStorage.getItem("userID");
  const { isLoggedIn, logout } = useAuth();
  const userID =
    typeof window !== "undefined" ? localStorage.getItem("userID") : null;

  if (isLoggedIn === null) return null;
  const queryClient = useQueryClient();
  const { isPending: getUserDetailPending, data } = useQuery({
    queryKey: ["get-user-details"],
    queryFn: () => {
      return $axios.post(`/user/user-detail/${userId}`);
    },
  });
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push(`/account/${userId}`)}
          >
            Account
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              localStorage.removeItem("accessToken");
              queryClient.invalidateQueries(["get-user-details"]);
            }}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Profile;
