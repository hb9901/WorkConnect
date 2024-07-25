import api from "@/api/api";
import { Tables } from "@/types/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const FAKE_USER_ID = "8062212a-f117-4492-a8ac-c642afab4a41";

const useTodo = () => {
  const queryClient = useQueryClient();
  const {
    data: todoList,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["todo"],
    queryFn: () => api.todo.getTodoList(FAKE_USER_ID),
  });
  const { mutateAsync: delTodo } = useMutation({
    mutationFn: (todoId: number) => api.todo.delTodo(todoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
    },
  });

  const { mutateAsync: addTodo } = useMutation({
    mutationFn: (todo: Tables<"todo">) => {
      return api.todo.postTodo(todo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
    },
  });
  return { todoList, isPending, isError, delTodo, addTodo };
};

export default useTodo;
