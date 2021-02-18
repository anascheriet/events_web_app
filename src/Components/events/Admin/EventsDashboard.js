import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Header, Icon, Divider } from 'semantic-ui-react'
import { Drawer } from 'antd';
import "./eventsDashboard.scss"
import { popup } from '../../../common/animations';
import { EventForm } from './EventForm';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserInfo } from '../../../redux/actions/Users/loadUserInfo';
import { EventEditForm } from './EventEditForm';
import { getAllEventTypes } from '../../../redux/actions/eventTypes/getTypesAction';
import { loadEventAction, unMountDrawer } from '../../../redux/actions/eventActions/loadEventAction';
import { containsForEvDash, formatDate, formatImageLink } from '../../../common/util';
import axios from 'axios';
import { eventsUrls } from '../../../redux/api';
import { errorToast, successToast } from '../../../common/Notifications';
import { EventsFilterBar } from '../../../common/EventsFilterBar';

export const EventsDashboard = () => {

    //set up the dispatcher for actions (api calls)
    const dispatch = useDispatch();

    //get user Info on component load 
    useEffect(() => {
        dispatch(loadUserInfo());
        dispatch(getAllEventTypes());
    }, [dispatch]);

    //Getting the state
    const { createdEvents } = useSelector(state => state.userState);

    const { drawer } = useSelector(state => state.eventState);

    //setUp Drawer for Create/Edit event form
    const [visibleDrawer, setVisibleDrawer] = useState(false);

    const showDrawer = () => {
        setVisibleDrawer(true);
    };
    const closeDrawer = () => {
        setVisibleDrawer(false);
    };

    //Set up conditional rendering of edit event form
    const [editDrawer, setEditDrawer] = useState(false);

    const showEDrawer = () => {
        setEditDrawer(true);
    };

    const closeEDrawer = () => {
        setEditDrawer(false);
        dispatch(unMountDrawer());
    };

    const openEditEventForm = async (id) => {
        showEDrawer();
        dispatch(loadEventAction(id));
    }


    const deleteEventHandler = async (id) => {
        try {
            console.log("before delete: " + createdEvents);
            const resp = await axios.delete(eventsUrls.delete(id));
            successToast(resp.data);

            setTimeout(() => {
                dispatch(loadUserInfo());
            }, 1000);

        } catch (error) {
            errorToast(error.data);
        }
    }


    //set up search inputs (event name, event type, event country)
    const [searchedEName, setSearchedEName] = useState("");
    const [searchedECountry, setSearchedECountry] = useState("");
    const [searchedECity, setSearchedECity] = useState("");


    return (
        <div>
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

            {/* Filter component */}
            <EventsFilterBar setSearchedECity={setSearchedECity} searchedECity={searchedECity} setSearchedECountry={setSearchedECountry} searchedECountry={searchedECountry} setSearchedEName={setSearchedEName} searchedEName={searchedEName} />

            {/* List of Events */}
            <div className="container my-12 mx-auto px-4 md:px-12" style={{ backgroundImage: "" }}>
                <div className="flex flex-wrap -mx-1 lg:-mx-4">
                    {createdEvents.filter((event) => {
                        if (containsForEvDash(event, "eventName", searchedEName) && searchedECity === "" && searchedECountry === "") {
                            return event;
                        }
                        else if (containsForEvDash(event, "country", searchedECountry) && searchedECity === "" && searchedEName === "") {
                            return event;
                        }
                        else if (containsForEvDash(event, "city", searchedECity) && searchedEName === "" && searchedECountry === "") {
                            return event;
                        }
                        else if (containsForEvDash(event, "eventName", searchedEName) && containsForEvDash(event, "city", searchedECity) && searchedECountry === "") {
                            return event;
                        }

                        else if (containsForEvDash(event, "eventName", searchedEName) && containsForEvDash(event, "country", searchedECountry) && searchedECity === "") {
                            return event;
                        }
                        else if (containsForEvDash(event, "city", searchedECity) && containsForEvDash(event, "country", searchedECountry) && searchedEName === "") {
                            return event;
                        }
                        else if (containsForEvDash(event, "eventName", searchedEName) && containsForEvDash(event, "country", searchedECountry) && containsForEvDash(event, "city", searchedECity)) {
                            return event;
                        }
                    }).map((item) => {
                        return (
                            <motion.div key={item.id} className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3" variants={popup} initial="hidden" animate="show">

                                <article className="overflow-hidden rounded-lg shadow-lg">
                                    <img alt="Placeholder" className="block h-auto w-full" src={formatImageLink(item.imagePath)} style={{ width: "400px", height: "200px" }} />

                                    <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                        <h1 className="text-lg">
                                            <p className="text-lg text-gray-800">{item.eventName}</p>
                                            <p className="text-lg text-gray-800">${item.ticketPrice}</p>
                                        </h1>
                                        {formatDate(item.eventDate)}
                                    </header>
                                    <p className="ml-3 mr-3 mb-4 text-grey-dark text-sm"> {item.description.substring(1, 160)}...</p>
                                    <p style={{margin: "0rem 1rem", fontSize: "1rem"}}><Icon name="map pin" />{item.city}, {item.country}</p>
                                    <footer className="flex items-center justify-center leading-tight p-3 md:p-5">
                                        <button onClick={() => openEditEventForm(item.id)} className="bg-white text-blue-700 font-bold py-2 px-4">Edit</button>&nbsp;
          <button onClick={() => deleteEventHandler(item.id)} className="bg-white text-red-700 font-bold py-2 px-4">Delete</button>
                                    </footer>

                                </article>
                            </motion.div>)
                    })}
                </div>
            </div>

            {/* Create form Drawer  */}
            <Drawer
                width={400}
                placement="right"
                closable={false}
                onClose={closeDrawer}
                visible={visibleDrawer}
            >
                <EventForm
                    closeDrawer={closeDrawer}
                />
            </Drawer>

            {/* Edit form Drawer  */}
            {drawer &&
                <Drawer
                    width={400}
                    placement="right"
                    closable={false}
                    onClose={closeEDrawer}
                    visible={editDrawer}
                >
                    <EventEditForm closeEDrawer={closeEDrawer} />
                </Drawer>
            }
        </div>

    )
}
