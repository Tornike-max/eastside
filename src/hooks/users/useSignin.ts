import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signin } from "../../services/userApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signin({ email, password }),
    onSuccess: () => {
      toast.success(`Welcome back Jini`);
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate("/news");
    },
    onError: () => {
      toast.error(`Error while login`);
    },
  });

  return { mutate, isPending };
}
