import { useLocation, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useCallback, useEffect, useState } from "react";
import { getRoleId } from "@services";
import { Loader } from "@components";

export const ProtectedRoute = ({ allowedRoles, children }) => {
  const [roleId, setRoleId] = useState(null);
  const [cookies] = useCookies(["token, user"]);
  const location = useLocation();

  const checkRoles = useCallback(async () => {
    const role = await getRoleId(cookies.token);
    setRoleId(role);
  }, [cookies.token]);

  useEffect(() => {
    checkRoles();
  }, [checkRoles]);
  if (roleId === null) return <Loader />;

  return allowedRoles?.includes(Number(roleId)) ? (
    children
  ) : cookies.user?.isLogin === true ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
