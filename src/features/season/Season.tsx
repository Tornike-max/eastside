import { useSeasonGames } from "../../hooks/season/useSeasonGames";
import Loader from "../../ui/Loader";
import { formatDateString } from "../../ui/formatDateString";
import { getMonth } from "../../ui/getMonth";
import { useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/users/useUser";
import { useChangeLanguage } from "../../context/useChangeLanguage";

export default function Season() {
  const { isGeoLang } = useChangeLanguage();
  const { authenticated } = useUser();
  const navigate = useNavigate();
  const { data, isPending } = useSeasonGames();
  const [val, setVal] = useState("");

  useEffect(() => {
    if (!val) return;
    navigate(`/edit/${val}`);
  }, [val, navigate]);

  if (isPending) return <Loader />;

  return (
    <div className="container mx-auto">
      <h2 className="text-4xl text-stone-100 font-bold mb-4">
        {isGeoLang ? "მატჩის შედეგები" : "Match Results"}
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300  ">
          <thead>
            <tr className="text-stone-100 font-semibold text-xs md:text-sm">
              <th className="border border-gray-300 p-2 ">Id</th>
              <th className="border border-gray-300 p-2">
                {isGeoLang ? "თარიღი" : "Date"}
              </th>
              <th className="border border-gray-300 p-2">
                {isGeoLang ? "გუნდის სახელი" : "Team Name"}
              </th>
              <th className="border border-gray-300 p-2">
                {isGeoLang ? "მოწინააღმდეგე" : "Opponent Team"}
              </th>
              <th className="border border-gray-300 p-2">
                {isGeoLang ? "შედეგი" : "Result"}
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((match, index) => (
              <tr className="text-stone-200 text-xs " key={index}>
                <td className="border border-gray-300 p-2 ">{match.id}</td>
                <td className="border border-gray-300 p-2">
                  {getMonth(match.date)} {formatDateString(match.date)}
                </td>
                <td className="border border-gray-300 p-2">
                  {match?.east_side}
                </td>
                <td className="border border-gray-300 p-2">{match.oponent}</td>
                <td
                  className={`border border-gray-300 p-2 flex items-center gap-1`}
                >
                  <span
                    className={`${
                      match.result === true ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {match.score === "" ? "-" : match.score.split(",")}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {authenticated && (
        <div className="w-full my-4 flex justify-center items-center ">
          <div className="flex w-full justify-center flex-wrap md:flex-nowrap gap-4">
            <Select
              onChange={(e) => setVal(e.target.value)}
              label={
                isGeoLang
                  ? "აირჩიე მატჩი, რომ შეასწორო"
                  : "Select a match to edit"
              }
              className="max-w-xs"
            >
              {data && Array.isArray(data) ? (
                data.map((item) => (
                  <SelectItem key={item.id} value={item?.id}>
                    {item.oponent}
                  </SelectItem>
                ))
              ) : (
                <SelectItem key="default" value="">
                  {isGeoLang ? "თამაშები ვერ მოიძებნა" : "No matches available"}
                </SelectItem>
              )}
            </Select>
          </div>
        </div>
      )}
    </div>
  );
}
