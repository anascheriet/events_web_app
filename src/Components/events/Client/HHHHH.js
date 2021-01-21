import { motion } from 'framer-motion';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'semantic-ui-react';
import { popup } from '../../../common/animations';
import { getAllEventsAction } from '../../../redux/actions/clientActions/getAllEventsAction';

export const HHHHH = () => {

    const dispatch = useDispatch();
    //fetch existing events from the api
    useEffect(() => {
        dispatch(getAllEventsAction());
    }, [])

    //get events from the state
    const { availableEvents } = useSelector(state => state.clientState);
    return (
        <div>
            
        </div>
    )
}
