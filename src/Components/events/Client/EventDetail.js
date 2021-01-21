import { motion } from 'framer-motion';
import React from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { formatDate, formatImageLink } from '../../../common/util';
import "./eventDetail.scss";
import emptyStar from "../../../../src/Layout/img/star-empty.svg";
import fullStar from "../../../../src/Layout/img/star-full.svg";

export const EventDetail = ({ pathId }) => {

    const { event } = useSelector(state => state.eventState);
    const history = useHistory();

    const exitCardHandler = (e) => {
        const element = e.target;
        if (element.classList.contains('card-shadow')) {
            document.body.style.overflow = 'auto';
        }
        history.push("/Events/")
    }

    const stopevent = (e) => {
        //make game detail unclickable
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }


    const getStars = () => {
        let length = event.clientReservations.length;
        let stars = [];

        if (length === 0) {
            for (let i = 0; i < 5; i++) {
                stars.push(<img key={i} alt="star" src={emptyStar} />)
            }
        } else if (length > 13) {
            for (let i = 0; i < 5; i++) {
                stars.push(<img key={i} alt="star" src={fullStar} />)
            }
        } else if (length > 3 && length < 5) {
            for (let i = 0; i < 1; i++) {
                stars.push(<img key={i} alt="star" src={fullStar} />)
            }
            for (let i = 0; i < 4; i++) {
                stars.push(<img key={i} alt="star" src={emptyStar} />)
            }
        } else if (length > 5 && length < 10) {
            for (let i = 0; i < 2; i++) {
                stars.push(<img key={i} alt="star" src={fullStar} />)
            }
            for (let i = 0; i < 3; i++) {
                stars.push(<img key={i} alt="star" src={emptyStar} />)
            }

        } else if (length > 10 && length < 13) {
            for (let i = 0; i < 4; i++) {
                stars.push(<img key={i} alt="star" src={fullStar} />)
            }
            for (let i = 0; i < 1; i++) {
                stars.push(<img key={i} alt="star" src={emptyStar} />)
            }
        }
        return stars;
    }


    return (
        <>
            (
            <motion.div
                className="card-shadow" onClick={(e) => exitCardHandler(e)}>
                <motion.div
                    onClick={stopevent}
                    layoutId={pathId}
                    /* I added the layoutId because framer motion needs an id for each component it uses */
                    className="detail"
                >

                    <motion.div className="stats">
                        <motion.div className="rating">
                            <motion.h3 layoutId={`name ${pathId}`} style={{ fontSize: "2rem" }} >{event.eventName}</motion.h3>
                            <motion.p>Popularity: {/* {game.rating} */}</motion.p >
                            {getStars()}

                        </motion.div>
                        <motion.div className="info">
                            <motion.p layoutId={`location ${pathId}`}><Icon name="map pin" />{event.city}, {event.country}</motion.p>
                            <motion.p layoutId={`date ${pathId}`}>{formatDate(event.eventDate)}</motion.p>
                        </motion.div>
                    </motion.div>
                    <motion.div className="media">
                        <motion.img layoutId={`image ${pathId}`} src={formatImageLink(event.imagePath)} alt="image" />
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
