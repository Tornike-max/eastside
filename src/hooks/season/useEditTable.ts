import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editTable } from "../../services/seasonApi";
import toast from "react-hot-toast";

type EditTableType = {
  oponent: string;
  result: boolean;
  east_side: string;
  score: string;
  date: string;
  location_id: number;
};
export function useEditTable() {
  const queryClient = useQueryClient();
  const { mutate: edit, isPending: isEditing } = useMutation({
    mutationFn: ({
      id,
      editedData,
    }: {
      id: number;
      editedData: EditTableType;
    }) => editTable({ id, editedData }),
    onSuccess: () => {
      toast.success("Table Successfully edited");
      queryClient.invalidateQueries({ queryKey: ["seasong"] });
    },
    onError: () => {
      toast.error("Error while editing");
    },
  });

  return { edit, isEditing };
}
