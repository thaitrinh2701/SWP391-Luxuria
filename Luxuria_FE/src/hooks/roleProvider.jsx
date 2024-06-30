import React, { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { getRoleId } from "@/services";

const RoleContext = createContext(null);

export function RoleProvider({ children }) {
  const [cookies] = useCookies(["token"]);
  const [roleID, setRoleID] = useState(null);

  useEffect(() => {
    async function fetchRoleID() {
      const roleIDFromAPI = await getRoleId(cookies.token);
      setRoleID(roleIDFromAPI);
    }
    fetchRoleID();
  }, [cookies.token]);

  return <RoleContext.Provider value={roleID}>{children}</RoleContext.Provider>;
}

export function useRole() {
  return useContext(RoleContext);
}
