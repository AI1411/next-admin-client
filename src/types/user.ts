import {Todo} from "./todo";

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
  email: string;
  password: string;

  todos: Todo[]
};
