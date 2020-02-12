import React from "react";
import { StoreContextProvider } from "./context";
export const wrapRootElement = ({ element }) => (
  <StoreContextProvider>{element}</StoreContextProvider>
);
