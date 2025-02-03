"use client";

import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

type ProtectedRouteProps = {
  allowedRoles: string[];
  children: ReactNode;
};

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

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
