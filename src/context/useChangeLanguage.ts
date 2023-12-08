import { useContext } from "react";
import { LangContext } from "./LanguageContext";

export type LangContextType = {
  isGeoLang: boolean;
  changeLanguage: () => void;
};

export const useChangeLanguage = (): LangContextType => {
  const context = useContext(LangContext);

  if (context === null)
    throw new Error(
      "useChangeLanguage must be used within a LangContextProvider"
    );

  return context;
};
