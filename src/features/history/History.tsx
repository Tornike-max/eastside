import { Button } from "@nextui-org/button";
import { useGetHistory } from "../../hooks/history/useGetHistory";
import Loader from "../../ui/Loader";
import { useNavigate } from "react-router-dom";
import { useChangeLanguage } from "../../context/useChangeLanguage";
import { useUser } from "../../hooks/users/useUser";

export default function History() {
  const { isGeoLang } = useChangeLanguage();
  const { authenticated } = useUser();

  const { data, isPending } = useGetHistory();
  const navigate = useNavigate();

  if (isPending) return <Loader />;

  return (
    <div className="py-8 w-full">
      <div className="flex justify-center items-start flex-col gap-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl px-4 font-serif text-left text-stone-200">
          {isGeoLang ? "East Side-ის ისტორია" : "East Side History"}
        </h1>
        <div className="px-4 text-stone-300 text-sm sm:text-md ">
          <span className="text-center">
            {isGeoLang ? data.lang_geo : data.lang_eng}
          </span>
        </div>

        <div className="px-4 text-stone-300 flex flex-col justify-between items-center w-full">
          <div className="flex items-center gap-1">
            <span>{isGeoLang ? "დაარსდა" : "Founded in"} </span>
            <span>
              {data.founded} {isGeoLang ? "წელს" : ""}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-center">
              {isGeoLang
                ? `ამ მომენტისთვის გუნდს აქვს ${data.titles} ტიტული`
                : `At this Moment Club has ${data.titles} titles.`}
            </span>
          </div>
        </div>
        {authenticated && (
          <div className="w-full flex justify-end items-end">
            <Button
              onClick={() => navigate(`/updateHistory/${data.id}`)}
              type="button"
              variant="shadow"
              color="secondary"
            >
              {isGeoLang ? "განაახლე ისტორია" : "Update History"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
