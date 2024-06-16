import React, { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const IBookContext = {
  isAuthenticated: Boolean,
  setAuthenticated: function (isAuthenticated) {},
};

const defaultVal = {
  isAuthenticated: false,
  setAuthenticated: () => undefined,
};

export const BookContext = createContext(defaultVal);
export const BookContextProvider = (props) => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [isAuthenticated, setAuthenticated] = useState(cookies.access_token === undefined);
  console.log("auth " + isAuthenticated + " access_token " + cookies.access_token);
  // console.log(cookies.access_token !== undefined);

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("masuk");
      localStorage.clear();
      setCookies("access_token", undefined);
    }
  }, [isAuthenticated]);
  const contextValue = { isAuthenticated, setAuthenticated };
  return <BookContext.Provider value={contextValue}>{props.children}</BookContext.Provider>;
};
