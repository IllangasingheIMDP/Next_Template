import { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

type ProtectedRouteProps = {
  allowedRoles: string[];
  children: ReactNode;
};

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/login"); // Redirect if not logged in
    return null;
  }

  if (!allowedRoles.includes(user.role)) {
    router.push("/unauthorized"); // Redirect if role not allowed
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
