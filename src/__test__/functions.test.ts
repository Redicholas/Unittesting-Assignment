import { addTodo, changeTodo, removeAllTodos } from '../ts/functions';
import { Todo } from '../ts/models/Todo';

describe("test addTodo function", () => {
    test('should add todo', () => {
        //arrange
        const todoText = 'Hello there!';
        const todos: Todo[] = [];

        //act
        const result = addTodo(todoText, todos);
        
        //assert
        expect(result.success).toBe(true);
    });
    
    test('should NOT add new todo', () => {
        //arrange
        const todoText = 'He';
        const todos: Todo[] = [];

        //act
        const result = addTodo(todoText, todos);
        
        //assert
        expect(result.success).toBe(false);
    });
});

test("should change todo 'done' state", () => {
    const todo: Todo = {
        text: 'Hello there!',
        done: false
    };

    changeTodo(todo);

    expect(todo.done).toBe(true);
    });

test("should remove all todos", () => {
    const todos: Todo[] = [
        {
            text: 'Hello',
            done: false
        },
        {
            text: 'There!',
            done: true
        }
    ];

    removeAllTodos(todos);

    expect(todos.length).toBe(0);
});