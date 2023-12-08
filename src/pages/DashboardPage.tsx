import { useChangeLanguage } from "../context/useChangeLanguage";
import LineDash from "../features/dashboard/LineDash";
import { useSeasonGames } from "../hooks/season/useSeasonGames";
import Loader from "../ui/Loader";
import { getFormattedDateSm } from "../ui/formattedDate";

export default function DashboardPage() {
  const { data, isPending } = useSeasonGames();
  const { isGeoLang } = useChangeLanguage();

  if (isPending) return <Loader />;
  let totalWins = 0;
  let totalLose = 0;
  const winRatio = data?.map((item) => {
    if (item.result === true) {
      totalWins++;
    } else if (item.result === false && item.score !== "") {
      totalLose++;
    }

    return {
      name: getFormattedDateSm(item.date),
      wins: totalWins,
      losses: totalLose,
      opponent: item?.oponent ? item.oponent : "",
      score: item.score,
      result: item.result === true ? "Win" : "lose",
    };
  });
  return (
    <div>
      <h1 className="text-center text-lg md:text-2xl lg:text-3xl py-4 text-stone-200 font-bold">
        {isGeoLang ? "გუნდის სტატისტიკა" : "Team Stat"}
      </h1>
      <LineDash winRatio={winRatio} />
    </div>
  );
}
