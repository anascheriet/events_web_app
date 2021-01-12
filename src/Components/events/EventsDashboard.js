

//TODO Events list 
//TODO Style Event Card
//TODO Edit & Delete Button in Card

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';


export const EventsDashboard = () => {
    const { createdEvents } = useSelector(state => state.userState);


    useEffect(() => {
        console.log(createdEvents);
    }, [])

    return (
        <div>
            {createdEvents[0]?.eventName}
        </div>
    )
}
