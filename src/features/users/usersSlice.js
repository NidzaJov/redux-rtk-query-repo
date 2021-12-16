import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

import { apiSlice } from "../api/apiSlice";

const usersAdapter = createEntityAdapter();
const initialState = usersAdapter.getInitialState();

export const extUsersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => '/users',
            keepUnusedDataFor: 3600,
            transformResponse: responseData => {
                return usersAdapter.setAll(initialState, responseData)
            },
            providedTags: (result = [], error, arg) => [
                'User',
                ...result.map(({ id }) => ({ type: 'User', id}))
            ]
        }),
        getUser: builder.query({
            query: (userId) => `/users/${userId}`,
            transformResponse: responseData => {
                return usersAdapter.setOne(initialState, responseData)
            },
            providedTags: (result, error, arg) => [{ type: 'User', id: arg}]
        }),
    })

    
})

export const { 
    useGetUsersQuery,
    useGetUserQuery,
} = extUsersApiSlice;

export const selectUsersResult = extUsersApiSlice.endpoints.getUsers.select();

export const selectUsersData = createSelector(
    selectUsersResult,
    (usersResult) => usersResult.data
)

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById
} = usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialState);