"use client";

import { ReactNode, useEffect, useState } from "react";
import api from "@/redux/api";
import { useRouter } from "next/navigation";
import { RootState } from "@/GlobalRedux/store";
import { useSelector,useDispatch } from "react-redux";
import { getUserData } from "@/services/loginPageApi";
import { login } from "@/GlobalRedux/features/userSlice";
type ProtectedRouteProps = {
  allowedRoles: string[];
  children: ReactNode;
};

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const user=useSelector((state:RootState)=>state.user);
  const dispatch=useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await getUserData();
        dispatch(login(response.user));
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    if(!user){
      getUserDetails();
    }
    
    }
  ,[user]);

  useEffect(() => {
    // Perform redirection logic after the component mounts
    console.log("protected route",user);
    if (!user) {
      router.push("/login"); // Redirect to login if not authenticated
    } else if (!allowedRoles.includes(user.role)) {
      router.push("/unauthorized"); // Redirect to unauthorized if user role is not allowed
    } else {
      setLoading(false); // Set loading to false if user is authenticated and authorized
    }
  }, [user, allowedRoles, router]);

  if (loading) {
    return null; // Prevent rendering content while checking auth/role
  }

  return <>{children}</>;
};

export default ProtectedRoute;
