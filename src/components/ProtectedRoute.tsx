"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
import { getUserData } from "@/services/loginPageApi";
import { login } from "@/GlobalRedux/features/userSlice";

type ProtectedRouteProps = {
  allowedRoles: string[];
  children: ReactNode;
};

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserData();
        dispatch(login(response.user));
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };

    if (!user.role) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [user.role, dispatch]);

  if (loading) {
    return <p>Loading...</p>; // Show a loading indicator instead of returning `null`
  }

  if (!user.role) {
    router.replace("/login");
    return null;
  }

  if (!allowedRoles.includes(user.role)) {
    router.replace("/unauthorized");
    return null;
  }

  return children;
};

export default ProtectedRoute;
