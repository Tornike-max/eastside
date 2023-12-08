import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateHistory } from "../../services/historyApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useUpdateHistory() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: newHistory, isPending: isHistoryPending } = useMutation({
    mutationFn: ({
      newData,
    }: {
      newData: {
        titles: number;
        founded: number;
        lang_geo: string;
        lang_eng: string;
      };
    }) => updateHistory({ newData }),
    onSuccess: () => {
      toast.success("Successfully updated history");
      queryClient.invalidateQueries({ queryKey: ["clubHistory"] });
      navigate("/history");
    },
    onError: () => {
      toast.error("Error updating history");
    },
  });

  return { newHistory, isHistoryPending };
}
