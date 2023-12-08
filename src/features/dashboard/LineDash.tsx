import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from "recharts";
import WinRatioList from "./WinRatioList";
import { useChangeLanguage } from "../../context/useChangeLanguage";

type RatioType =
  | {
      name: string;
      wins: number;
      losses: number;
      opponent: string;
      score: string;
      result: string;
    }[]
  | undefined;

export default function LineDash({ winRatio }: { winRatio: RatioType }) {
  const { isGeoLang } = useChangeLanguage();
  return (
    <div className="m-auto">
      <ResponsiveContainer
        className={"max-w-5xl w-full flex justify-center items-center"}
        height={250}
      >
        <LineChart
          data={winRatio}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="wins"
            name={isGeoLang ? "მოგება" : "Wins"}
            stroke="#8884d8"
          />
          <Line
            type="monotone"
            dataKey="losses"
            name={isGeoLang ? "წაგება" : "Losses"}
            stroke="#82ca9d"
          />
        </LineChart>
      </ResponsiveContainer>
      <ul className="flex justify-center items-center flex-col text-stone-200 w-full">
        <li
          className={`flex justify-between items-center p-4 border-b border-gray-300 w-full font-semibold ${
            isGeoLang ? "text-[10px]" : "text-xs"
          } sm:text-sm md:text-lg`}
        >
          <p className="w-1/4 text-center">{isGeoLang ? "თარიღი" : "Date"}</p>
          <p className="w-1/4 text-center">
            {isGeoLang ? "მოწინააღმდეგე" : "Opponent"}
          </p>
          <p className="w-1/4 text-center">{isGeoLang ? "შედეგი" : "Result"}</p>
          <p className="w-1/4 text-center">
            {isGeoLang ? "ანგარიში" : "Score"}
          </p>
        </li>
        {winRatio?.map((item) => (
          <WinRatioList key={item.name} item={item} />
        ))}
      </ul>
    </div>
  );
}
