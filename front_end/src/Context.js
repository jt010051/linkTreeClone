import { createContext } from "react";

export const booleanContext =createContext(false);
export const oppositeContext =createContext(true);

export const incrementContext =createContext(false);
export const refreshContext =createContext(0);
export const usernameContext =createContext('');
export const proccessContext =createContext('');

export const usersContext = createContext([]);