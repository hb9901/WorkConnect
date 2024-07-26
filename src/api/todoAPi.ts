import { Tables } from "@/types/supabase";
import { AxiosInstance } from "axios";

class TodoAPI {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async getTodoList(userId: string) {
    const path = "/api/todo";
    const response = await this.axios.get(path, {
      params: {
        userId,
      },
    });
    const data = response.data;

    return data;
  }
  async delTodo(todoId: number) {
    const path = "/api/todo";
    const response = await this.axios.delete(path, {
      params: {
        todoId,
      },
    });
    const data = response.data;

    return data;
  }

  async postTodo(todo: Tables<"todo">) {
    const path = "/api/todo";

    const response = await this.axios.post(path, todo);
    const data = response.data;

    return data;
  }
}

export default TodoAPI;