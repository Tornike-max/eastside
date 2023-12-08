import { HiOutlineArrowLeftOnRectangle } from "react-icons/hi2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/users/useLogout";
import { useUser } from "../hooks/users/useUser";
import { Switch } from "@nextui-org/react";
import { useChangeLanguage } from "../context/useChangeLanguage";

export default function Header() {
  const { isGeoLang, changeLanguage } = useChangeLanguage();
  const navigate = useNavigate();
  const { logout, isLogingOut } = useLogout();
  const { authenticated } = useUser();
  const { pathname } = useLocation();

  function handleLogout(e: React.MouseEvent) {
    e.preventDefault();
    if (!authenticated) return;
    logout();
  }

  function handleChangeLang() {
    changeLanguage();
  }
  return (
    <ul className="flex justify-evenly items-center gap-1 text-xs text-stone-200">
      <Link
        to="/"
        className={`text-stone-200 hover:bg-purple-600 ${
          pathname === "/" ? "bg-purple-600" : ""
        } py-3 px-2 rounded-lg duration-150 transition-all text-center `}
      >
        <li>{isGeoLang ? "მთავარი გვერდი" : "Home"}</li>
      </Link>
      {authenticated && (
        <Link
          to="/createNews"
          className={`text-stone-200 hover:bg-purple-600 ${
            pathname === "/createNews" ? "bg-purple-600" : ""
          } py-3 px-2 rounded-lg duration-150 transition-all text-center`}
        >
          <li>{isGeoLang ? "შექმენი სიახლე" : "Create News"}</li>
        </Link>
      )}
      <Link
        to="/history"
        className={`text-stone-200 hover:bg-purple-600 ${
          pathname === "/history" ? "bg-purple-600" : ""
        } py-3 px-2 rounded-lg duration-150 transition-all text-center`}
      >
        <li>{isGeoLang ? "ისტორია" : "History"}</li>
      </Link>
      {authenticated ? (
        <button
          onClick={(e) => handleLogout(e)}
          disabled={isLogingOut}
          className="text-stone-200 hover:bg-purple-600 py-3 px-2 rounded-lg duration-150 transition-all text-center cursor-pointer"
        >
          <HiOutlineArrowLeftOnRectangle className="text-lg" />
        </button>
      ) : (
        <button
          onClick={() => navigate("/signin")}
          className="text-stone-200 hover:bg-purple-600 py-3 px-2 rounded-lg duration-150 transition-all text-center cursor-pointer"
        >
          {isGeoLang ? "შესვლა" : "Sign In"}
        </button>
      )}

      <Switch onChange={() => handleChangeLang()} size="sm" color="secondary" />
    </ul>
  );
}
