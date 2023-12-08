import { createContext, useState } from "react";

type LangContextType = {
  isGeoLang: boolean;
  changeLanguage: () => void;
};

export const LangContext = createContext<LangContextType | null>(null);

type LanguageContextProps = {
  children: React.ReactNode;
};

export default function LanguageContext({ children }: LanguageContextProps) {
  const [isGeoLang, setIsGeoLang] = useState(false);

  const changeLanguage = () => {
    setIsGeoLang((lang) => !lang);
  };

  const contextValue: LangContextType = {
    isGeoLang,
    changeLanguage,
  };

  return (
    <LangContext.Provider value={contextValue}>{children}</LangContext.Provider>
  );
}
