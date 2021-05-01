// __tests__/fetch.test.js
import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../..'
import App from '../../../App'
import { EventTypes } from './EventTypes'


test('make sure i can add an eventType', async () => {
    render(<EventTypes />)
    /*  const { getByPlaceholderText, getByTestId, debug } = render(
         <h1>TTT</h1>
     );
 
     const eventNameInput = getByPlaceholderText("Event type name ...");
     const submitButton = getByTestId("submit-button");
 
     fireEvent.click(submitButton);
 
     debug(); */

})