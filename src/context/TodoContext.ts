import { createContext, useContext } from "react";

export interface Todo{
    id: number;
    title: string;
    description: string;
    status: string;
};

export type todoList = {
    todos: Todo[],
    addTodo: (todo: Todo) => void,
    updateTodo : (id:number, todo: Todo) => void,
    deleteTodo : (id:number) => void,
    toggleStatus : (id:number, setStatus: string) => void,
}

export const TodoContext = createContext<todoList>({ todos: [], addTodo: () => {}, updateTodo: () => {}, deleteTodo: () => {}, toggleStatus: () => {} });

export const useTodo = () => {
    return useContext(TodoContext);
}

export const TodoContextProvider = TodoContext.Provider;