/**
* @jest-environment jsdom 
*/

import * as main from '../ts/main';
import { addTodo, changeTodo, removeAllTodos, sortByName } from '../ts/functions';
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

describe("test sortByName function", () => {
    test("should sort todos by name", () => {
        //arrange
        document.body.innerHTML = `<ul id="todo-list"></ul>`;
        const todos: Todo[] = [
            { text: 'CCC', done: false },
            { text: 'BBB', done: false },
            { text: 'AAA', done: false }
        ];
        const createHtmlSpy = jest.spyOn(main, "createHtml").mockReturnValue();
                
        //act
        sortByName(todos);
        
        //assert
        expect(todos[0].text).toBe('AAA');
        expect(todos[1].text).toBe('BBB');
        expect(todos[2].text).toBe('CCC');
        expect(createHtmlSpy).toBeCalledTimes(1);
    });

    test("should keep todo order if already alphabetized", () => {
        //arrange
        document.body.innerHTML = `<ul id="todo-list"></ul>`;
        const todos: Todo[] = [
            { text: 'AAA', done: false },
            { text: 'BBB', done: false },
            { text: 'CCC', done: false }
            ];
            
            //act
            sortByName(todos);

            //assert
            expect(todos[0].text).toBe('AAA');
            expect(todos[1].text).toBe('BBB');
            expect(todos[2].text).toBe('CCC');
    });

    test("should add sorted todos to localStorage", () => {
        //arrange
        document.body.innerHTML = `<ul id="todo-list"></ul>`;
        const todos: Todo[] = [
            { text: 'CCC', done: false },
            { text: 'BBB', done: false },
            { text: 'AAA', done: false }
        ];
                    
        //act
        sortByName(todos);
        
        //assert
        const fetchedTodos = JSON.parse(localStorage.getItem('todos')!);
        expect(fetchedTodos[0].text).toBe('AAA');
    });
});