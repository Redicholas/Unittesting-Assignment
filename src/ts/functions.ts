import { IAddResponse } from "./models/IAddResult";
import { Todo } from "./models/Todo";
import { createHtml } from "./main";

// Tested
export function addTodo(todoText: string, todos: Todo[]): IAddResponse {
  if (todoText.length > 2) {
    let newTodo = new Todo(todoText, false);
    todos.push(newTodo);
    return { success: true, error: "" };
  } else {
    return { success: false, error: "Du måste ange minst tre bokstäver" };
  }
}

// Tested
export function changeTodo(todo: Todo) {
  todo.done = !todo.done;
}

// Tested
export function removeAllTodos(todos: Todo[]) {
  todos.splice(0, todos.length);
}

export function sortByName(todos: Todo[]) {

  todos.sort((a, b) => {
    if (a.text < b.text) {
      return -1;
    }
    if (a.text > b.text) {
      return 1;
    }
    return 0;
  });

  localStorage.setItem("todos", JSON.stringify(todos));
  createHtml(todos);
}
