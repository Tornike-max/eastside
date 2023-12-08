import {
  HiArrowRightOnRectangle,
  HiMiniPhoto,
  HiMiniTableCells,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineCalendarDays,
  HiOutlineCloudArrowDown,
  HiOutlineHomeModern,
  HiOutlineNewspaper,
  HiOutlineUserGroup,
} from "react-icons/hi2";

import { FaVolleyballBall } from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";
import { useUser } from "../hooks/users/useUser";
import { useLogout } from "../hooks/users/useLogout";
import { useChangeLanguage } from "../context/useChangeLanguage";
import { Switch } from "@nextui-org/react";

export default function SideBar() {
  const { isGeoLang, changeLanguage } = useChangeLanguage();
  const { logout } = useLogout();
  const { authenticated } = useUser();
  const { pathname } = useLocation();
  const paths = [
    {
      path: "/",
      label: `${isGeoLang ? "მთავარი გვერდი" : "Home"}`,
      icon: <HiOutlineHomeModern />,
    },
    {
      path: "/news",
      label: `${isGeoLang ? "სიახლეები" : "News"}`,
      icon: <HiOutlineNewspaper />,
    },
    {
      path: "/history",
      label: `${isGeoLang ? "ისტორია" : "History"}`,
      icon: <HiOutlineCalendarDays />,
    },
    {
      path: "/season",
      label: `${isGeoLang ? "სეზონი" : "Season"}`,
      icon: <HiMiniTableCells />,
    },
    {
      path: "/players",
      label: `${isGeoLang ? "მოთამაშეები" : "Players"}`,
      icon: <HiOutlineUserGroup />,
    },
  ];
  function handleChangeLang() {
    changeLanguage();
  }
  return (
    <ul
      className={`flex flex-col justify-start items-start gap-3 ${
        authenticated ? "my-2" : "my-10"
      } `}
    >
      <div className="flex justify-center flex-col items-start mb-2 w-full">
        <Link
          to="/"
          className="text-3xl text-stone-200 flex items-center gap-2 font-serif cursor-pointer"
        >
          <span>East Side</span> <FaVolleyballBall />
        </Link>
        <Switch
          onChange={() => handleChangeLang()}
          size="sm"
          color="secondary"
        />
      </div>
      {paths.map((path) => (
        <Link
          key={path.label}
          to={path.path}
          className={`text-stone-300 hover:text-stone-100 hover:bg-purple-600 ${
            pathname === path.path && "bg-purple-600"
          } py-2 px-4 rounded-lg duration-150 transition-all text-lg md:text-xl`}
        >
          <li className="flex items-center gap-2 ">
            <span>{path.icon}</span>
            <span>{path.label}</span>
          </li>
        </Link>
      ))}
      {authenticated && (
        <>
          <Link
            to="/createNews"
            className={`text-stone-300 hover:text-stone-100 hover:bg-purple-600 ${
              pathname === "/createNews" && "bg-purple-600"
            } py-2 px-4 rounded-lg duration-150 transition-all text-lg md:text-xl`}
          >
            <p className="flex items-center gap-2">
              <HiMiniPhoto />
              <span>{isGeoLang ? "შექმენი სიახლე" : "Create News"}</span>
            </p>
          </Link>
          <Link
            to="/createMatch"
            className={`text-stone-300 hover:text-stone-100 hover:bg-purple-600 ${
              pathname === "/createMatch" && "bg-purple-600"
            } py-2 px-4 rounded-lg duration-150 transition-all text-lg md:text-xl`}
          >
            <p className="flex items-center gap-2">
              <HiOutlineCloudArrowDown />
              <span>{isGeoLang ? "შექმენი მატჩი" : "Create Match"}</span>
            </p>
          </Link>
        </>
      )}

      {!authenticated && (
        <Link
          to="/signin"
          className={`text-stone-300 hover:text-stone-100 hover:bg-purple-600 ${
            pathname === "/signin" && "bg-purple-600"
          } py-2 px-4 rounded-lg duration-150 transition-all text-lg md:text-xl`}
        >
          <p className="flex items-center gap-2">
            <HiArrowRightOnRectangle />
            <span>{isGeoLang ? "შესვლა" : "Sign in"}</span>
          </p>
        </Link>
      )}
      {authenticated && (
        <button
          onClick={() => logout()}
          className={`text-stone-300 flex items-center gap-2 hover:text-stone-100 hover:bg-purple-600  py-2 px-4 rounded-lg duration-150 transition-all text-lg md:text-xl`}
        >
          <HiOutlineArrowLeftOnRectangle />
          <span>{isGeoLang ? "გასვლა" : "Log out"}</span>
        </button>
      )}
      <p
        className={`text-stone-200 text-[10px] px-4 ${
          !authenticated ? "pt-32" : ""
        }`}
      >
        © 2023 ozbeta. All rights reserved
      </p>
    </ul>
  );
}
