import { useContext } from "react";
import { CustomContext } from "../providers/Access.provider";

export function useAccessContext() {
  const context = useContext(CustomContext);
  if (!context)
    throw new Error(
      "useAccessContext debe estar dentro de un <AccessProvider></AccessProvider>"
    );
  return context;
}
