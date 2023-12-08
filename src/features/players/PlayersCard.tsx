import { Link } from "react-router-dom";
import { useUser } from "../../hooks/users/useUser";
import { HiOutlineTrash } from "react-icons/hi2";
import { useDeletePlayer } from "../../hooks/players/useDeletePlayer";
import { useChangeLanguage } from "../../context/useChangeLanguage";

type PlayersType = {
  player_id: number;
  full_name: string;
  position: string;
  jersey_number: number;
  nationality: string;
  height: number;
  weight: number;
  image: string;
  captain: boolean;
  full_name_geo: string;
};

export default function PlayersCard({ players }: { players: PlayersType }) {
  const { isGeoLang } = useChangeLanguage();
  const { authenticated } = useUser();
  const { deletePlayer, isDeleting } = useDeletePlayer();

  function handleDelete(e: React.MouseEvent, player_id: number) {
    e.preventDefault();
    deletePlayer(player_id);
  }
  return (
    <Link
      to={`/players/playersId/${players.player_id}`}
      className="text-stone-200 max-w-[400px] w-full m-auto flex-col shadow-lg hover:shaddow-2xl px-2 py-4 border-[1px] border-stonr-200 rounded-lg hover:bg-stone-900 duration-150 transition-all cursor-pointer"
    >
      <div className="relative w-full">
        {/* Image */}
        <img
          src={players.image}
          alt={players.full_name}
          className="w-full h-64 sm:h-72 lg:h-64 rounded-lg"
        />

        {/* Delete button */}
        {authenticated && (
          <div className="absolute top-2 right-2 w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 duration-200 transition-all flex justify-center items-center">
            <button
              disabled={isDeleting}
              type="button"
              onClick={(e) => handleDelete(e, players.player_id)}
              className="cursor-pointer font-bold  text-red-500 hover:text-red-600 duration-200 transition-all"
            >
              <HiOutlineTrash className="text-2xl" />
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-center items-center flex-col py-4">
        <h1 className="text-stome-100 font-bold text-lg flex items-center gap-1">
          <span>{isGeoLang ? players.full_name_geo : players?.full_name}</span>
          <span>{players?.captain ? "©️" : ""}</span>
        </h1>
        <p>
          {isGeoLang ? "ეროვნება" : "Nationality"}-{players.nationality}
        </p>

        <span>
          {isGeoLang ? "სიმაღლე" : "Height"}-{players.height} CM
        </span>

        <span>
          {isGeoLang ? "წონა" : "Weight"}-{players.weight} KG
        </span>
        <span>
          {isGeoLang ? "მაისურის ნომერუ" : "Jersey Number"}:{" "}
          {players.jersey_number}
        </span>
        <span>
          {isGeoLang ? "პოზიცია" : "Position"}: {players.position}
        </span>
      </div>
    </Link>
  );
}
