import { expect, test } from 'vitest'
import React from 'react';
import { render } from 'vitest-browser-react'
import App from './App';

test('renders header', async () => {
    const {getByText} = render(<App/>);
    const headerElement = getByText(/Material-UI Example/i);
    await expect.element(headerElement).toBeInTheDocument();
});

test('Form is interactive', async () => {
    const {getByText} = render(<App/>);

    // full test:
    // - check that `Form is invalid.` exists in dom
    // - toggle the element of "Center Item Content"
    // - check that `Form is valid.` exists in dom
    const invalidText = getByText(/Form is invalid./i);
    await expect.element(invalidText).toBeInTheDocument();

    const centerItemContentToggle = getByText(/Center Item Content/i);
    await expect.element(centerItemContentToggle).toBeInTheDocument();
    await centerItemContentToggle.click();

    const validText = getByText(/Form is valid./i);
    await expect.element(validText).toBeInTheDocument();
});
