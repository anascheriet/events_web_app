import { motion } from 'framer-motion';
import React from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Divider, Icon } from 'semantic-ui-react';
import { formatDate, formatImageLink } from '../../../common/util';
import "./eventDetail.scss";
import emptyStar from "../../../../src/Layout/img/star-empty.svg";
import fullStar from "../../../../src/Layout/img/star-full.svg";
import { Form, InputNumber } from 'antd';
import { Button } from 'semantic-ui-react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { clientUrls } from '../../../redux/api';
import { errorToast, successToast } from '../../../common/Notifications';
import { toast } from 'react-toastify';


export const EventDetail = ({ pathId }) => {

    const { event } = useSelector(state => state.eventState);
    const { user, token } = useSelector(state => state.userState);
    const history = useHistory();

    const exitCardHandler = (e) => {
        const element = e.target;
        if (element.classList.contains('card-shadow')) {
            document.body.style.overflow = 'auto';
        }
        if (user === null) {
            history.push("/Guest/");
        }
        else {
            history.push("/Home/");
        }

    }

    const stopevent = (e) => {
        //make game detail card unclickable
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
        } else if (length >= 2 && length <= 5) {
            for (let i = 0; i < 1; i++) {
                stars.push(<img key={i} alt="star" src={fullStar} />)
            }
            for (let i = 0; i < 4; i++) {
                stars.push(<img key={i} alt="star" src={emptyStar} />)
            }
        } else if (length > 5 && length <= 10) {
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

    //Set up Booking form



    const myValidationSchema = new Yup.ObjectSchema({
        numOfPeople: Yup.number().required(),
        eventid: Yup.number().required(),
    })

    const myInitialValues = {
        numOfPeople: null,
        eventid: pathId
    }

    const formik = useFormik({
        initialValues: myInitialValues,
        validationSchema: myValidationSchema
    })


    const bookEventHandler = async (values) => {
        console.log(values);

        try {
            const response = await axios.post(clientUrls.book, values);
            successToast(response?.data);
            document.body.style.overflow = 'auto';
            history.push("/Home/");
        } catch (error) {
            errorToast(error.data);
        }


    }

    return (
        <>
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
                            <motion.h3 layoutId={`name ${pathId}`} style={{ fontSize: "2rem", marginBottom: "0rem", marginTop: "0rem" }} >{event.eventName}</motion.h3>
                            <Divider style={{ margin: "0rem 0rem", marginBottom: "0.5rem" }} />
                            <motion.h4 style={{ fontSize: "2rem", marginBottom: "0rem", marginTop: "0rem" }}><Icon name="dollar" />{event.ticketPrice}</motion.h4>
                            <Divider style={{ margin: "1rem 0rem", padding: "0rem 0rem" }} />
                            <motion.p style={{ marginBottom: "0.5rem" }} >Popularity: {/* {game.rating} */}</motion.p>
                            {getStars()}
                        </motion.div>
                        <motion.div style={{ marginTop: "2rem" }} className="info">
                            <motion.p layoutId={`location ${pathId}`}><Icon name="map pin" />{event.city}, {event.country}</motion.p>
                            <motion.p layoutId={`date ${pathId}`}>{formatDate(event.eventDate)}</motion.p>
                            <Divider />
                            <Form layout="vertical" onFinish={() => bookEventHandler(formik.values)} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <Form.Item style={{ left: "2rem", marginBottom: "0.5rem" }}>
                                    <InputNumber name="numOfPeople" onChange={(numOfPeople) => formik.setFieldValue("numOfPeople", numOfPeople)} placeholder="Number Of Tickets" style={{ width: "12rem" }} />
                                </Form.Item>
                                <Button disabled={formik.values.numOfPeople === null || formik.values.numOfPeople === 0 || user === null} style={{ width: "8rem", backgroundColor: "#ff7676", color: "white", marginTop: "0.5rem" }} type="submit">Book</Button>
                                {formik.values.numOfPeople !== null && user === null && <span style={{ color: "red" }}>Please Log In before Booking</span>}
                            </Form>
                        </motion.div>
                    </motion.div>
                    <motion.div style={{ marginTop: "1rem" }} className="media">
                        <motion.img layoutId={`image ${pathId}`} src={formatImageLink(event.imagePath)} alt="image" />
                    </motion.div>
                    <div className="description">
                        <p>{event.description}</p>
                    </div>
                </motion.div>
            </motion.div>
        </>
    )
}
