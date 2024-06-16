import React, { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const IBookContext = {
  isNotAuthenticated: Boolean,
  setAuthenticated: function (isNotAuthenticated) {},
};

const defaultVal = {
  isNotAuthenticated: false,
  setAuthenticated: () => null,
};

export const BookContext = createContext(defaultVal);
export const BookContextProvider = (props) => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [isNotAuthenticated, setAuthenticated] = useState(cookies.access_token === undefined);
  console.log("auth " + isNotAuthenticated);
  console.log("access_token " + cookies.access_token);
  useEffect(() => {
    if (isNotAuthenticated) {
      localStorage.clear();
      setCookies("access_token", undefined);
    }
  }, [isNotAuthenticated]);
  const contextValue = { isNotAuthenticated, setAuthenticated };
  return <BookContext.Provider value={contextValue}>{props.children}</BookContext.Provider>;
};
