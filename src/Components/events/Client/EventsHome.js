import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Event } from "./Event"
import { EventDetail } from './EventDetail';
import "./EventHome.scss"
import "../../searchItems.scss";
import { getAllEventsAction } from '../../../redux/actions/clientActions/getAllEventsAction';
import { contains } from '../../../common/util';
import { EventsFilterBar } from '../../../common/EventsFilterBar';
import filterEvents from "../../../common/EventsFilterMethod"
export const EventsHome = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllEventsAction());
    }, [])
    //get current location
    const location = useLocation();
    const pathId = location.pathname.split("/")[2];

    //get events from the state
    const { availableEvents } = useSelector(state => state.clientState);

    //set up search inputs (event name, event type, event country)
    const [searchedEName, setSearchedEName] = useState("");
    const [searchedECountry, setSearchedECountry] = useState("");
    const [searchedECity, setSearchedECity] = useState("");

    return (
        <motion.div className="eventList" style={{ marginTop: location.pathname === "/Guest" ? "3rem" : "1rem" }}>
            <AnimateSharedLayout type="switch">
                {/* wrap all the components that will be transitioning*/}
                <AnimatePresence>
                    {/* The component that will be animated should have a conditional toggle, pathId here */}
                    {pathId && <EventDetail key={pathId} pathId={pathId} />}
                </AnimatePresence>
                <h2 style={{ padding: "0.3rem", marginTop: "3rem" }}>Upcoming events</h2>

                {/* Filter component */}
                <EventsFilterBar setSearchedECity={setSearchedECity} searchedECity={searchedECity} setSearchedECountry={setSearchedECountry} searchedECountry={searchedECountry} setSearchedEName={setSearchedEName} searchedEName={searchedEName} />

                <motion.div className="events" >
                    {filterEvents(availableEvents, contains, searchedEName, "eventName", searchedECity, "city", searchedECountry, "country").map((event) => {
                        return <Event key={event.event.id} event={event.event} />
                    })}
                </motion.div>
            </AnimateSharedLayout>
        </motion.div>
    )
}