import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Event } from "./Event"
import { EventDetail } from './EventDetail';
import "./EventHome.scss"
import "../../searchItems.scss";
export const EventsHome = () => {

    //get current location
    const location = useLocation();
    const pathId = location.pathname.split("/")[2];

    //get events from the state
    const { availableEvents } = useSelector(state => state.clientState);

    //set up search inputs (event name, event type, event country)
    const [searchedEName, setSearchedEName] = useState("");
    const [searchedEType, setSearchedEType] = useState("Any");
    const [searchedECountry, setSearchedECountry] = useState("");
    const [searchedECity, setSearchedECity] = useState("");


    //Clear filters
    const clearFilters = () => {
        setSearchedECity("");
        setSearchedECountry("");
        setSearchedEType("Any");
        setSearchedEName("");

        //console.table(searchedECountry, searchedEName);
    }

    const contains = (event, prop, against) => event.event[prop].toLowerCase().includes(against.toLowerCase());

    //const eventTypeContains = (event, against) => event.event.eventType.name.toLowerCase() ==== against.toLowerCase();

    return (
        <motion.div className="eventList" style={{ marginTop: location.pathname === "/Guest" ? "3rem" : "0rem" }}>
            <AnimateSharedLayout type="switch">
                {/* wrap all the components that will be transitioning*/}
                <AnimatePresence>
                    {/* The component that will be animated should have a conditional toggle, pathId here */}
                    {pathId && <EventDetail pathId={pathId} />}
                </AnimatePresence>
                <h2 style={{ padding: "0.3rem", marginTop: "3rem" }}>Upcoming events</h2>

                <div className="flex flex-row space-x-10 items-center">
                    <div className="styled-input wide multi">
                        <div >
                            <input type="text" value={searchedEName} name="fn" id="fn" autoComplete="off" data-placeholder-focus="false" required onChange={(e) => setSearchedEName(e.target.value)} />
                            <label>Event Name</label>
                        </div>
                        <div>
                            <input type="text" value={searchedECountry} name="fn" id="fn" autoComplete="off" data-placeholder-focus="false" onChange={(e) => setSearchedECountry(e.target.value)} />
                            <label>Country</label>
                        </div>

                        <div >
                            <input type="text" value={searchedECity} name="ln" id="ln" autoComplete="off" data-placeholder-focus="false" required
                                onChange={(e) => setSearchedECity(e.target.value)} />
                            <label>City</label>
                        </div>
                    </div>
                    <div >
                        <button onClick={clearFilters} className="bg-pink-500 hover:bg-pink-700 text-white text-md rounded-lg w-32 h-20 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-opacity-50">Clear</button>
                    </div>
                </div>

                <motion.div className="events" >
                    {availableEvents.filter((event) => {
                        if (contains(event, "eventName", searchedEName) && searchedECity === "" && searchedECountry === "" && searchedEType === "Any") {
                            return event;
                        }
                        else if (contains(event, "country", searchedECountry) && searchedECity === "" && searchedEName === "") {
                            return event;
                        }
                        else if (contains(event, "city", searchedECity) && searchedEName === "" && searchedECountry === "") {
                            return event;
                        }
                        else if (contains(event, "eventName", searchedEName) && contains(event, "city", searchedECity) && searchedECountry === "") {
                            return event;
                        }

                        else if (contains(event, "eventName", searchedEName) && contains(event, "country", searchedECountry) && searchedECity === "") {
                            return event;
                        }
                        else if (contains(event, "city", searchedECity) && contains(event, "country", searchedECountry) && searchedEName === "") {
                            return event;
                        }
                        else if (contains(event, "eventName", searchedEName) && contains(event, "country", searchedECountry) && contains(event, "city", searchedECity)) {
                            return event;
                        }
                    }).map((event) => {
                        return <Event key={event.event.id} event={event.event} />
                    })}
                </motion.div>
            </AnimateSharedLayout>
        </motion.div>
    )
}