import { motion } from 'framer-motion';
import React from 'react'
import { useSelector } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { formatDate, formatImageLink } from '../../../common/util';
import "./eventDetail.scss"

export const EventDetail = () => {

    const { event } = useSelector(state => state.eventState);
    return (
        <>
            (
            <motion.div
                className="card-shadow" >
                <motion.div
                    /* I added the layoutId because framer motion needs an id for each component it uses */
                    className="detail">
                    <motion.div className="stats">
                        <motion.div className="rating">
                            <motion.h3 layoutId={`h3 ${event.id}`}>{event.eventName}</motion.h3>
                            <p>Popularity: {/* {game.rating} */}</p >
                                {/* {getStars()} */}

                        </motion.div>
                        <motion.div className="info">
                            <motion.p><Icon name="map pin" />{event.city}, {event.country}</motion.p>
                            <p>{formatDate(event.eventDate)}</p>
                        </motion.div>
                    </motion.div>
                    <motion.div className="media">
                        <motion.img layoutId={`image ${event.id}`} src={formatImageLink(event.imagePath)} alt="image" />
                    </motion.div>
                    <div className="description">
                        <p>{event.description}</p>
                    </div>



                </motion.div>
            </motion.div>
            )

        </>
    )
}
