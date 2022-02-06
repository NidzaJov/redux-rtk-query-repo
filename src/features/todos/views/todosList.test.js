import React from "react";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { LiItem } from "../components/LiItem";

test('Display the LiItem component', () => {
    const todo = {
        "userId": 1,
        "id": 1,
        "title": "delectus aut autem",
        "completed": false
    }
    render (
        <LiItem todo={todo} />
    )
    screen.debug()
})

test('Li item should have div with text \'delectus aut autem\'', () => {
    const todo = {
        "userId": 1,
        "id": 1,
        "title": "delectus aut autem",
        "completed": false
    }
    render (
        <LiItem todo={todo} />
    )

    const titleDiv = screen.getByText('delectus aut autem');
    expect(titleDiv).toBeInTheDocument();
    expect(titleDiv).toHaveTextContent('delectus aut autem');
})

test('Li item shold have checkbox input with display none', () => {
    const todo = {
        "userId": 1,
        "id": 1,
        "title": "delectus aut autem",
        "completed": false
    }
    render (
        <LiItem todo={todo} />
    )
    const checkBox = screen.queryByRole('input');

    expect(checkBox).toBeNull();
})

test('Li item should have checkbox input unchecked when user hovers', async () => {
    const todo = {
        "userId": 1,
        "id": 1,
        "title": "delectus aut autem",
        "completed": false
    }
    render (
        <LiItem todo={todo} />
    )

    const container = screen.getByRole('listitem')
    userEvent.click(container);    
    const checkBox = await screen.findByRole('checkbox');
    expect(checkBox).toBeInTheDocument();
    expect(checkBox).not.toBeChecked();
})
