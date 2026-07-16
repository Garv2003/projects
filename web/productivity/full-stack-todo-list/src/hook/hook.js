import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  DeleteTodo,
  toggleCompleteTodo,
  updateTodo,
  getTodos,
  postTodo,
} from "@/utils/fnc";

const useGetTodo = () => {
  return useQuery({ queryKey: ["todos"], queryFn: getTodos });
};

const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DeleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

const useToggleCompleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleCompleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export {
  useDeleteTodo,
  useToggleCompleteTodo,
  useUpdateTodo,
  useGetTodo,
  useCreatePost,
};
