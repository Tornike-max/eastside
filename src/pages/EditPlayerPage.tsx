import { useParams } from "react-router-dom";
import CreateOrEditPlayer from "../features/players/CreateOrEditPlayer";
import { usePlayer } from "../hooks/players/usePlayer";
import Loader from "../ui/Loader";

export default function EditPlayerPage() {
  const { editId } = useParams();
  const { player, isPlayerLoading } = usePlayer(Number(editId));

  if (isPlayerLoading) return <Loader />;
  if (!player) return;

  console.log(player);
  return (
    <>
      <CreateOrEditPlayer player={player} />
    </>
  );
}
