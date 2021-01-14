

//TODO Fetch DB Events
//TODO Wire up the Backend Edit and Delete logic to the frontend

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button, ButtonGroup, Card, Header, Icon, Divider, Flag } from 'semantic-ui-react'
import { Drawer } from 'antd';
import "./eventsDashboard.scss"
import { fadeIn, popup } from '../../animations';
import { EventForm } from './EventForm';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserInfo } from '../../redux/actions/loadUserInfo';

export const EventsDashboard = () => {

    //set up the dispatcher for actions (api calls)
    const dispatch = useDispatch();
    //get user Info on component load 
    useEffect(() => {
        dispatch(loadUserInfo());
    }, [])

    const { user } = useSelector(state => state.userState);
    const { createdEvents } = user;

    //setUp Drawer for Create/Edit event form
    const [visibleDrawer, setVisibleDrawer] = useState(false);

    const showDrawer = () => {
        setVisibleDrawer(true);
    };
    const closeDrawer = () => {
        setVisibleDrawer(false);
    };



    const fakeData = [{
        "id": 1,
        "eventName": "International Brand Consultant",
        "eventDate": "Wed Jan 13 2021 05:27:46 GMT+0100 (GMT+01:00)",
        "description": "Sit a sint reprehenderit tempore saepe expedita molestiae id."
    },
    {
        "id": 2,
        "eventName": "International Brand Consultant",
        "eventDate": "Wed Jan 13 2021 05:27:46 GMT+0100 (GMT+01:00)",
        "description": "Sit a sint reprehenderit tempore saepe expedita molestiae id."
    },
    {
        "id": 3,
        "eventName": "International Brand Consultant",
        "eventDate": "Wed Jan 13 2021 05:27:46 GMT+0100 (GMT+01:00)",
        "description": "Sit a sint reprehenderit tempore saepe expedita molestiae id."
    }, {
        "id": 4,
        "eventName": "International Brand Consultant",
        "eventDate": "Wed Jan 13 2021 05:27:46 GMT+0100 (GMT+01:00)",
        "description": "Sit a sint reprehenderit tempore saepe expedita molestiae id."
    }, {
        "id": 5,
        "eventName": "International Brand Consultant",
        "eventDate": "Wed Jan 13 2021 05:27:46 GMT+0100 (GMT+01:00)",
        "description": "Sit a sint reprehenderit tempore saepe expedita molestiae id."
    }, {
        "id": 6,
        "eventName": "International Brand Consultant",
        "eventDate": "Wed Jan 13 2021 05:27:46 GMT+0100 (GMT+01:00)",
        "description": "Sit a sint reprehenderit tempore saepe expedita molestiae id."
    }, {
        "id": 7,
        "eventName": "International Brand Consultant",
        "eventDate": "Wed Jan 13 2021 05:27:46 GMT+0100 (GMT+01:00)",
        "description": "Sit a sint reprehenderit tempore saepe expedita molestiae id."
    }, {
        "id": 8,
        "eventName": "International Brand Consultant",
        "eventDate": "Wed Jan 13 2021 05:27:46 GMT+0100 (GMT+01:00)",
        "description": "Sit a sint reprehenderit tempore saepe expedita molestiae id."
    }, {
        "id": 9,
        "eventName": "International Brand Consultant",
        "eventDate": "Wed Jan 13 2021 05:27:46 GMT+0100 (GMT+01:00)",
        "description": "Sit a sint reprehenderit tempore saepe expedita molestiae id."
    }, {
        "id": 10,
        "eventName": "International Brand Consultant",
        "eventDate": "Wed Jan 13 2021 05:27:46 GMT+0100 (GMT+01:00)",
        "description": "Sit a sint reprehenderit tempore saepe expedita molestiae id."
    }, {
        "id": 11,
        "eventName": "International Brand Consultant",
        "eventDate": "Wed Jan 13 2021 05:27:46 GMT+0100 (GMT+01:00)",
        "description": "Sit a sint reprehenderit tempore saepe expedita molestiae id."
    }]

    return (
        <>
            <div className="header">
                <Header as='h2'>
                    <Icon name='calendar' />
                    <Header.Content>
                        Events List
      <Header.Subheader>Manage your events</Header.Subheader>
                    </Header.Content>
                </Header>
                <Button onClick={showDrawer} color="green"><Icon name="calendar" /> Create new Event</Button>
            </div>

            <Divider />
             <Card.Group >
                {createdEvents.map((item) => (
                    <motion.div key={item.id} className="card" variants={popup} initial="hidden" animate="show">
                        <Card >
                            <img src='https://dummyimage.com/300x180.png' alt='' />
                            <Card.Content>
                                <Card.Header>{item.eventName}</Card.Header>
                                <Card.Meta>
                                    <span className='date'>{item.eventDate.split("T")[0]} {item.eventDate.split("T")[1].split(".")[0]}</span>
                                </Card.Meta>
                                <Card.Description>
                                    {item.description.substring(1, 60)}...
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <ButtonGroup widths={2}>
                                    <Button basic color='blue' content='Edit' />
                                    <Button basic color='red' content='Delete' />
                                </ButtonGroup>
                            </Card.Content>
                        </Card>
                    </motion.div>

                ))}
            </Card.Group>

            {/* Create/Edit form Drawer  */}

            <Drawer
                width={400}
                placement="right"
                closable={false}
                onClose={closeDrawer}
                visible={visibleDrawer}
            >
                <EventForm closeDrawer={closeDrawer} />
            </Drawer>

        </>

    )
}
