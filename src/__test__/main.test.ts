/**
* @jest-environment jsdom 
*/

import * as main from "../ts/main";
import * as functions from "../ts/functions";
import { Todo } from "../ts/models/Todo";

beforeEach(() => {
	document.body.innerHTML = '';
});

afterEach(() => {
	jest.restoreAllMocks();
});

describe("tests for createNewTodo()", () => {
    
    test("should call addTodo() correctly", () => {
        //arrange
        const todoText = "Hello";
        const todos: Todo[] = [];
        const createHtmlSpy = jest.spyOn(main, "createHtml").mockReturnValue();
        const addTodoSpy = jest.spyOn(functions, "addTodo");
        
        //act
        main.createNewTodo(todoText, todos);
        
        //assert
        expect(addTodoSpy).toBeCalledTimes(1);
        expect(createHtmlSpy).toBeCalledTimes(1);
    });
    
    test("should call createHtml() correctly", () => {
        //arrange
        const todoText = "Hello";
        const todos: Todo[] = [];
        const createHtmlSpy = jest.spyOn(main, "createHtml").mockReturnValue();

        //act
        main.createNewTodo(todoText, todos);

        //assert
        expect(createHtmlSpy).toBeCalledTimes(1);
    });
    
    test("should call displayError()", () => {
        //arrange
        const todos: Todo[] = [];
        const emptyString = "";
        const displayErrorSpy = jest.spyOn(main, "displayError").mockReturnValue();
        
        //act
        main.createNewTodo(emptyString, todos);
        
        //assert
        expect(displayErrorSpy).toBeCalledTimes(1);
    });
});

describe("tests for createHtml()", () => {
    test("should create HTML", () => {
        //arrange
        document.body.innerHTML = `<ul id="todos" class="todo"></ul>`;
    
        const todos: Todo[] = [
            { text: "Hello", done: false },
            { text: "There!", done: true },
        ];
    
        const todoList = 
        `<ul id="todos" class="todo"><li class="todo__text">Hello</li><li class="todo__text--done todo__text">There!</li></ul>`;
    
        //act
        main.createHtml(todos);
    
        //assert
        const todosContainer = document.getElementById("todos") as HTMLUListElement;
        expect(todosContainer.outerHTML).toEqual(todoList);
    });

    test("should add class 'todo__text--done' to completed todos", () => {
        //arrange
        document.body.innerHTML = `<ul id="todos" class="todo"></ul>`;
    
        const todos: Todo[] = [
            { text: "Hello", done: false },
            { text: "There!", done: true },
        ];
    
        //act
        main.createHtml(todos);
    
        //assert
        const todosContainer = document.getElementById("todos") as HTMLUListElement;
        const completedTodo = todosContainer.children[1];
        expect(completedTodo.classList.contains("todo__text--done")).toBe(true);
    });

    test("should add class 'todo__text' to all todos", () => {
        //arrange
        document.body.innerHTML = `<ul id="todos" class="todo"></ul>`;
    
        const todos: Todo[] = [
            { text: "Hello", done: false },
            { text: "There!", done: true },
        ];
    
        //act
        main.createHtml(todos);
    
        //assert
        const todosContainer = document.getElementById("todos") as HTMLUListElement;
        const firstTodo = todosContainer.children[0];
        const secondTodo = todosContainer.children[1];

        expect(firstTodo.classList.contains("todo__text")).toBe(true);
        expect(secondTodo.classList.contains("todo__text")).toBe(true);
    });

    test("should call 'toggleTodo' when li is clicked", () => {
        //arrange
        document.body.innerHTML = `<ul id="todos" class="todo"></ul>`;

        const todos: Todo[] = [
            { text: "Hello", done: false },
            { text: "There!", done: true },
        ];

        const toggleTodoSpy = jest.spyOn(main, "toggleTodo").mockReturnValue();
        
        //act
        main.createHtml(todos);
        
        const todoLi = document.getElementById("todos")?.firstElementChild as HTMLElement;
        todoLi.click();

        //assert
        expect(toggleTodoSpy).toHaveBeenCalledTimes(1);
    });

    test("should appendchild li to todosContainer", () => {
        //arrange
        document.body.innerHTML = `<ul id="todos" class="todo"></ul>`;
        
        const todos: Todo[] = [
            { text: "Hello", done: false },
            { text: "There!", done: true },
            ];
            
        const todosContainer = document.getElementById("todos") as HTMLUListElement;

        //act
        main.createHtml(todos);

        //assert
        expect(todosContainer.children.length).toBe(2);
    });
});

test("should call toggleTodo() correctly", () => {
    //arrange
    const exampleTodo: Todo = {
        text: "Example text", 
        done: false
    };

    const changeTodoSpy = jest.spyOn(functions, "changeTodo").mockReturnValue();
    const createHtmlSpy = jest.spyOn(main, "createHtml").mockReturnValue();

    //act
    main.toggleTodo(exampleTodo);

    //assert
    expect(changeTodoSpy).toBeCalledTimes(1);
    expect(createHtmlSpy).toBeCalledTimes(1);
});

describe("tests for displayError()", () => {
    test("should set errorMessage in errorContainer", () => {
        //arrange
        document.body.innerHTML = `<div id="error" class="error"></div>`;
        const errorContainer = document.getElementById("error") as HTMLDivElement;
        const errorMessage: string = "Something went wrong!";
        const showError: boolean = true;

        //act
        main.displayError(errorMessage, showError);

        //assert
        expect(errorContainer.innerHTML).toBe(errorMessage);
    });

    test("should ADD class show to errorContainer", () => {
        //arrange
        document.body.innerHTML = `<div id="error" class="error"></div>`;
        const errorContainer = document.getElementById("error") as HTMLDivElement;
        const errorMessage: string = "Something went wrong!";
        const showError: boolean = true;

        //act
        main.displayError(errorMessage, showError);

        //assert
        expect(errorContainer.classList.contains("show")).toBe(true);
    });

    test("should REMOVE class show to errorContainer", () => {
        //arrange
        document.body.innerHTML = `<div id="error" class="error"></div>`;
        const errorContainer = document.getElementById("error") as HTMLDivElement;
        const errorMessage: string = "Something went wrong!";
        const showError: boolean = false;

        //act
        main.displayError(errorMessage, showError);

        //assert
        expect(errorContainer.classList.contains("show")).toBe(false);
    });
});

test("should call clearTodos() correctly", () => {
    //arrange
    document.body.innerHTML = `
        <ul>
            <li>Hello</li>
            <li>There!</li>
        </ul>
        `;
        
        const todos: Todo[] = [
            { text: "Hello", done: false },
            { text: "There!", done: false },
        ];
        
        const spyOnRemoveAllTodos = jest.spyOn(functions, "removeAllTodos").mockReturnValue();
        const spyOnCreateHtml = jest.spyOn(main, "createHtml").mockReturnValue();
        
        //act
        main.clearTodos(todos);
        
    //assert
    expect(spyOnRemoveAllTodos).toHaveBeenCalledTimes(1);
    expect(spyOnCreateHtml).toHaveBeenCalledTimes(1);
});
