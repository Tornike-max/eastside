import { useNavigate, useParams } from "react-router-dom";
import { useGetPlayer } from "../../hooks/players/useGetPlayer";
import Loader from "../../ui/Loader";
import {
  HiOutlineArrowLeftCircle,
  HiOutlineArrowRightCircle,
  HiOutlinePencilSquare,
} from "react-icons/hi2";
import { useUser } from "../../hooks/users/useUser";
import { useChangeLanguage } from "../../context/useChangeLanguage";
import { useState } from "react";
import { supabaseUrl } from "../../services/supabase";

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
  points_scored: number;
};

type PlayerType = {
  aces: number;
  digs: number;
  spikes: number;
  blocks: number;
  matches_played: number;
  player_id: number;
  sets: number;
  stat_id: number;
  players: PlayersType;
};

export default function PlayerDetails() {
  const { playerId } = useParams();
  const { player, isPlayerLoading } = useGetPlayer(Number(playerId));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { isGeoLang } = useChangeLanguage();
  const navigate = useNavigate();
  const { authenticated } = useUser();

  if (isPlayerLoading) return <Loader />;
  if (!player) return <div>No player found</div>;

  const images = [player.image, player.image2, player.image3];

  const filteredImages = images.filter((img) => img !== null);
  console.log(filteredImages);
  const maxImages = filteredImages.length;
  const nextImage = () => {
    if (filteredImages.length <= 1) return;
    const newIndex = (currentImageIndex + 1) % maxImages;
    setCurrentImageIndex(newIndex);
  };

  const prevImage = () => {
    if (filteredImages.length <= 1) return;
    const newIndex = (currentImageIndex - 1 + maxImages) % maxImages;
    setCurrentImageIndex(newIndex);
  };
  console.log(images);

  return (
    <div className="max-w-3xl mx-auto px-6 py-6">
      <div className="border border-gray-300 text-stone-200 rounded-lg overflow-hidden">
        <div className="flex justify-end pt-2 pr-2">
          {authenticated && (
            <span
              onClick={() => navigate(`/players/edit/${player.player_id}`)}
              className="cursor-pointer hover:text-purple-500 transition duration-200"
            >
              <HiOutlinePencilSquare className="text-2xl" />
            </span>
          )}
        </div>
        <div className="text-center">
          <h1 className="text-base md:text-3xl font-semibold">
            {isGeoLang ? player.full_name_geo : player.full_name}
          </h1>
          <div className="flex justify-center items-center mt-4 relative">
            {filteredImages.length > 1 && (
              <button
                onClick={prevImage}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 border-[2px] bg-none border-red-500 rounded-full p-2 z-50"
              >
                <HiOutlineArrowLeftCircle className="text-xl md:text-3xl text-red-500" />
              </button>
            )}
            {/* Image Section */}
            <div className="relative w-full h-60 flex justify-center overflow-hidden rounded-full">
              <img
                src={
                  maxImages >= 1
                    ? filteredImages[currentImageIndex]
                    : "https://kdrqpaamnwfvnkoeyogf.supabase.co/storage/v1/object/public/avatars/AdobeStock_650113777_Preview.png"
                }
                alt="playerimage"
                className="rounded-md max-w-[300px] w-full h-full object-fill"
              />
            </div>
            {filteredImages.length > 1 && (
              <button
                onClick={nextImage}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-none border-[2px] border-red-500 rounded-full p-2 z-50"
              >
                <HiOutlineArrowRightCircle className="text-xl md:text-3xl text-red-500" />
              </button>
            )}
          </div>
          <div className="text-center pb-2 mt-6">
            <h2 className="text-lg font-semibold">
              {isGeoLang ? "მოთამაშის ინფორმაცია" : "Player Info"}
            </h2>
            <p>
              {isGeoLang ? "მაისურის ნომერი" : "Jersey Number"}:{" "}
              {player.jersey_number}
            </p>
            <p>
              {isGeoLang ? "პოზიცია" : "Position"}: {player.position}
            </p>
            <p>
              {isGeoLang ? "სიმაღლე" : "Height"}: {player.height} CM
            </p>
            <p>
              {isGeoLang ? "წონა" : "Weight"}: {player.weight} KG
            </p>
            {/* Add more player information here */}
          </div>
        </div>
      </div>
    </div>
  );
}
