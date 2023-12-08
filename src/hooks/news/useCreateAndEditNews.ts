import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditNews } from "../../services/newsApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type NewRowType = {
  title: string;
  content: string;
  image: any;
  category: string;
  author_id: number;
};
export function useCreateAndEditNews() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: createAndEdit, isPending: isWorking } = useMutation({
    mutationFn: ({
      newRow,
      id,
    }: {
      newRow: NewRowType;
      id: number | undefined;
    }) => createEditNews({ newRow, id }),
    onSuccess: () => {
      toast.success("New news added successfully");
      queryClient.invalidateQueries({ queryKey: ["news"] });
      navigate("/news");
    },
  });

  return { createAndEdit, isWorking };
}
