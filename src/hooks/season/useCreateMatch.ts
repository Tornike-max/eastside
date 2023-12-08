import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMatch } from "../../services/seasonApi";
import toast from "react-hot-toast";

type NewObjType = {
  oponent: string;
  result: boolean;
  east_side: string;
  score: string;
  date: string;
  location_id: number;
};
export function useCreateMatch() {
  const queryClient = useQueryClient();
  const { mutate: createRow, isPending: isCreating } = useMutation({
    mutationFn: ({ newObj }: { newObj: NewObjType }) => createMatch({ newObj }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["season"] });
      toast.success("Table row created successfully");
    },
    onError: () => {
      toast.error("Error creating table row");
    },
  });

  return { createRow, isCreating };
}
