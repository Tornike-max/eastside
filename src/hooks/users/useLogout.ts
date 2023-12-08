import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/userApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isPending: isLogingOut } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      toast.success("Log Out");
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate("/signin");
    },
    onError: () => {
      toast.error("Errow while log out");
    },
  });

  return { logout, isLogingOut };
}
