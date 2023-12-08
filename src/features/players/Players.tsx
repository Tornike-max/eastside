import { useGetPlayers } from "../../hooks/players/useGetPlayers";
import Loader from "../../ui/Loader";
import PlayersCard from "./PlayersCard";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/button";
import { useUser } from "../../hooks/users/useUser";
import { useChangeLanguage } from "../../context/useChangeLanguage";

export default function Players() {
  const { isGeoLang } = useChangeLanguage();
  const { players, isPlayersLoading } = useGetPlayers();
  const navigate = useNavigate();
  const { authenticated } = useUser();

  if (isPlayersLoading) return <Loader />;
  return (
    <div className="max-w-5xl w-full ">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl pb-8 text-stone-200 font-bold">
          {isGeoLang ? "გუნდის სია" : "Squad List"}
        </h1>
      </div>
      <ul className="grid-container ">
        {players?.map((item) => (
          <PlayersCard key={item.player_id} players={item} />
        ))}
      </ul>
      {authenticated && (
        <div className="flex justify-center items-center w-full my-4">
          <Button
            type="button"
            color="secondary"
            variant="ghost"
            onClick={() => navigate(`/players/create`)}
          >
            {isGeoLang ? "შექმენი მოთამაშე" : "Create Player"}
          </Button>
        </div>
      )}
    </div>
  );
}
