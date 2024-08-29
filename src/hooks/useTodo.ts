import api from '@/api/api';
import { Tables } from '@/types/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useTodoList = (workspaceUserId: string | null) => {
  const queryClient = useQueryClient();
  const {
    data: todoList,
    isPending,
    isError
  } = useQuery<Tables<'todo'>[] | undefined>({
    queryKey: [`todo${workspaceUserId}`],
    queryFn: () => {
      if (!workspaceUserId) return;
      return api.todo.getTodoList(workspaceUserId);
    },
    enabled: !!workspaceUserId
  });

  const { mutateAsync: delTodo } = useMutation({
    mutationFn: (todoId: string) => api.todo.delTodo(todoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`todo${workspaceUserId}`] });
    }
  });

  const { mutateAsync: addTodo } = useMutation({
    mutationFn: (todo: Tables<'todo'>) => {
      return api.todo.postTodo(todo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`todo${workspaceUserId}`] });
    }
  });

  const { mutateAsync: updateTodo } = useMutation({
    mutationFn: ({ todo, id }: { todo: Partial<Tables<'todo'>>; id: string }) => {
      return api.todo.putTodo(todo, id);
    },
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: [`todo${workspaceUserId}`] });

      const previousTodos = queryClient.getQueryData([`todo${workspaceUserId}`]);

      queryClient.setQueryData([`todo${workspaceUserId}`], (old: Tables<'todo'>[]) => [...old, newTodo]);

      return { previousTodos };
    },

    onError: (err, newTodo, context) => {
      if (context) queryClient.setQueryData([`todo${workspaceUserId}`], context.previousTodos);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [`todo${workspaceUserId}`] });
    }
  });
  return { todoList, isPending, isError, delTodo, addTodo, updateTodo };
};

export default useTodoList;
