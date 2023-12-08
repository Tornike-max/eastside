type RatioType = {
  name: string;
  wins: number;
  losses: number;
  opponent: string;
  result: string;
  score: string;
};

export default function WinRatioList({ item }: { item: RatioType }) {
  return (
    <>
      {item.wins === 0 || (item.losses === 0 && item.wins < 1) ? (
        ""
      ) : (
        <li className="flex justify-between items-center p-4 border-b border-gray-300 w-full text-xs sm:text-sm md:text-lg">
          <p className="w-1/4 text-center">{item.name}</p>
          <p className="w-1/4 text-center">{item.opponent}</p>
          <p
            className={`w-1/4 text-center ${
              item.result === "Win" ? "text-green-500" : "text-red-500"
            }`}
          >
            {item.result}
          </p>
          <p
            className={`w-1/4 text-center ${
              item.result === "Win" ? "text-green-500" : "text-red-500"
            }`}
          >
            {item.score}
          </p>
        </li>
      )}
    </>
  );
}
