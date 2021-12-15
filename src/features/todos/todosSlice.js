import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

import { apiSlice } from "../api/apiSlice";
/*
const todosAdapter = createEntityAdapter();

const initialState = todosAdapter.getInitialState();
*/

export const selectTodosResult = apiSlice.endpoints.getTodos.select();

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