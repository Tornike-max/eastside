import { Link, useLocation } from "react-router-dom";
import { useChangeLanguage } from "../context/useChangeLanguage";

export default function Footer() {
  const { isGeoLang } = useChangeLanguage();
  const { pathname } = useLocation();
  const paths = [
    { path: "/", label: `${isGeoLang ? "დაფა" : "Dashboard"}` },
    { path: "/news", label: `${isGeoLang ? "სიახლეები" : "News"}` },
    { path: "/season", label: `${isGeoLang ? "სეზონი" : "Season"}` },
    { path: "/players", label: `${isGeoLang ? "მოთამაშეები" : "Players"}` },
  ];
  return (
    <ul className="flex justify-evenly items-center gap-1 text-sm">
      {paths.map((path) => (
        <Link
          key={path.path}
          to={path.path}
          className={`text-stone-200 hover:bg-purple-600 ${
            pathname === path.path ? "bg-purple-600" : ""
          } py-3 px-2 rounded-lg duration-150 transition-all`}
        >
          <li>{path.label}</li>
        </Link>
      ))}
    </ul>
  );
}
