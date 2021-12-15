import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

import { apiSlice } from "../api/apiSlice";
/*
const todosAdapter = createEntityAdapter();

const initialState = todosAdapter.getInitialState();
*/
export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => '/todos',
        })
    })
})

export const { useGetTodosQuery } = extendedApiSlice

export const selectTodosResult = extendedApiSlice.endpoints.getTodos.select();

const emptyTodos = [];

export const selectAllTodos = createSelector(
    selectTodosResult,
    (todosResult) => todosResult?.data ?? emptyTodos
);

export const selectTodoById = createSelector(
    selectAllTodos,
    (state, todoId) => todoId,
    (todos, todoId) => todos.find((todo) => todo.id === todoId)
)
/*
export const {
    selectAll: selectAllTodos,
    selectById: selectTodoById,
} = todosAdapter.getSelectors((state) => state.todos)
*/