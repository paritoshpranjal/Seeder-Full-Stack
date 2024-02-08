import React, { createContext, useContext, useEffect, useState } from "react";
import { USER } from "../utils/constant";

export interface UserDataProps {
  id: number;
  name: string;
  email: string;
  password: string;
  availableCredit: number;
}

type ThemeContextType = {
  currUser: UserDataProps;
  handleUpdateCurrUser: (
    id: number,
    name: string,
    email: string,
    password: string,
    availableCredit:number
  ) => void;
  handleUpdateAvailableCredit: (availableCredit: number) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  currUser: USER,
  handleUpdateCurrUser: () => {},
  handleUpdateAvailableCredit: () => {},
});

export const useUserContext = () => useContext(ThemeContext);

export const UserContext = ({ children }: any) => {
  const [currUser, setCurrUser] = useState<UserDataProps>(() => {
    const storedUser = localStorage.getItem("userData");
    return storedUser
      ? JSON.parse(storedUser)
      : USER
  });
  const handleUpdateCurrUser = (id: number, name: string, email: string,password:string,availableCredit:number) => {
    setCurrUser({
      id: id,
      name: name,
      email: email,
      password:password,
      availableCredit:availableCredit
    });
  };
  const handleUpdateAvailableCredit = (availableCredit: number) => {
    setCurrUser({
      ...currUser,
      availableCredit: availableCredit,
    });
  };
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(currUser));
  }, [currUser]);
  return (
    <ThemeContext.Provider
      value={{ currUser, handleUpdateCurrUser, handleUpdateAvailableCredit }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
