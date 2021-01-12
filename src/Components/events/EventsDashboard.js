

//TODO Fetch DB Events
//TODO Wire up the Backend Edit and Delete logic to the frontend

import Item from 'antd/lib/list/Item';
import React from 'react';
import { Button, ButtonGroup, Card} from 'semantic-ui-react'

export const EventsDashboard = () => {

    //const { createdEvents } = useSelector(state => state.userState);

    const fakeData = [{
        "eventName": "International Brand Consultant",
        "eventDate": "Wed Jan 13 2021 05:27:46 GMT+0100 (GMT+01:00)",
        "description": "Sit a sint reprehenderit tempore saepe expedita molestiae id."
    },
    {
        "eventName": "International Brand Consultant",
        "eventDate": "Wed Jan 13 2021 05:27:46 GMT+0100 (GMT+01:00)",
        "description": "Sit a sint reprehenderit tempore saepe expedita molestiae id."
    },
    {
        "eventName": "International Brand Consultant",
        "eventDate": "Wed Jan 13 2021 05:27:46 GMT+0100 (GMT+01:00)",
        "description": "Sit a sint reprehenderit tempore saepe expedita molestiae id."
    }, {
        "eventName": "International Brand Consultant",
        "eventDate": "Wed Jan 13 2021 05:27:46 GMT+0100 (GMT+01:00)",
        "description": "Sit a sint reprehenderit tempore saepe expedita molestiae id."
    }, {
        "eventName": "International Brand Consultant",
        "eventDate": "Wed Jan 13 2021 05:27:46 GMT+0100 (GMT+01:00)",
        "description": "Sit a sint reprehenderit tempore saepe expedita molestiae id."
    }, {
        "eventName": "International Brand Consultant",
        "eventDate": "Wed Jan 13 2021 05:27:46 GMT+0100 (GMT+01:00)",
        "description": "Sit a sint reprehenderit tempore saepe expedita molestiae id."
    }, {
        "eventName": "International Brand Consultant",
        "eventDate": "Wed Jan 13 2021 05:27:46 GMT+0100 (GMT+01:00)",
        "description": "Sit a sint reprehenderit tempore saepe expedita molestiae id."
    }, {
        "eventName": "International Brand Consultant",
        "eventDate": "Wed Jan 13 2021 05:27:46 GMT+0100 (GMT+01:00)",
        "description": "Sit a sint reprehenderit tempore saepe expedita molestiae id."
    }, {
        "eventName": "International Brand Consultant",
        "eventDate": "Wed Jan 13 2021 05:27:46 GMT+0100 (GMT+01:00)",
        "description": "Sit a sint reprehenderit tempore saepe expedita molestiae id."
    }, {
        "eventName": "International Brand Consultant",
        "eventDate": "Wed Jan 13 2021 05:27:46 GMT+0100 (GMT+01:00)",
        "description": "Sit a sint reprehenderit tempore saepe expedita molestiae id."
    }, {
        "eventName": "International Brand Consultant",
        "eventDate": "Wed Jan 13 2021 05:27:46 GMT+0100 (GMT+01:00)",
        "description": "Sit a sint reprehenderit tempore saepe expedita molestiae id."
    }]

    return (
                            <Card.Group >
                                {fakeData.map((item) => (
                                    <Card>
                                        <img src='https://dummyimage.com/300x180.png' alt='' />
                                        <Card.Content>
                                            <Card.Header>{Item.eventName}</Card.Header>
                                            <Card.Meta>
                                                <span className='date'>{item.eventDate}</span>
                                            </Card.Meta>
                                            <Card.Description>
                                                {item.description}
                                            </Card.Description>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <ButtonGroup widths={2}>
                                                <Button basic color='blue' content='Edit' />
                                                <Button basic color='red' content='Delete' />
                                            </ButtonGroup>
                                        </Card.Content>
                                    </Card>
                                ))}
                            </Card.Group>
                

    )
}
