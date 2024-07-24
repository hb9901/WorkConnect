import api from "@/api/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

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

  return { todoList, isPending, isError };
};

export default useTodo;
