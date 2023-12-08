import { useParams } from "react-router-dom";
import CreateMatch from "../features/season/CreateMatch";
import { useGetGame } from "../hooks/season/useGetGame";
import Loader from "../ui/Loader";

export default function EditMatchTable() {
  const { tableId } = useParams();
  console.log(tableId);
  const { match, isMatchLoading } = useGetGame(Number(tableId));

  if (isMatchLoading) return <Loader />;
  const matchData = match;

  console.log(matchData);
  return (
    <div>
      <CreateMatch matchData={matchData} />
    </div>
  );
}
