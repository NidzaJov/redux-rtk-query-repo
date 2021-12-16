import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

import { apiSlice } from "../api/apiSlice";

const todosAdapter = createEntityAdapter();

const initialState = todosAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => '/todos',
            transformResponse: responseData => {
                return todosAdapter.setAll(initialState, responseData)
            }
        })
    })
})

export const { useGetTodosQuery } = extendedApiSlice

export const selectTodosResult = extendedApiSlice.endpoints.getTodos.select();


export const selectTodosData = createSelector(
    selectTodosResult,
    (todosResult) => todosResult.data
);



export const {
    selectAll: selectAllTodos,
    selectById: selectTodoById,
} = todosAdapter.getSelectors((state) => selectTodosData(state) ?? initialState)
