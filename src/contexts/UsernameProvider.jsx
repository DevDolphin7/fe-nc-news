import { createContext } from "react";

export const UsernameContext = createContext();

export function UsernameProvider(props) {
  return (
    <UsernameContext.Provider value={"cooljmessy"}>
      {props.children}
    </UsernameContext.Provider>
  );
}
