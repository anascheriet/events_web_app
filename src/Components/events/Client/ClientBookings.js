import axios from 'axios'
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { popup } from '../../../common/animations';
import { errorToast, successToast } from '../../../common/Notifications';
import { formatImageLink } from '../../../common/util';
import { clientUrls } from '../../../redux/api'

export const ClientBookings = () => {

    const [bookings, setBookings] = useState([]);

    const getMyBookings = async () => {
        const response = await axios.get(clientUrls.clientBookings);
        setBookings(response.data);
    }

    useEffect(() => {
        getMyBookings();
    }, [])



    const cancelBookingHandler = async (id) => {
        try {
            const resp = await axios.delete(clientUrls.cancelBooking(id));
            if (resp) {
                successToast(resp.data);
                getMyBookings();
            }
        } catch (error) {
            errorToast(error.data);
        }
    }
    return (
        <>
            <h2 style={{ fontFamily: "poppins", fontSize: "3rem", fontWeight: "7rem" }}>My Bookings</h2>
            <div style={{marginLeft: "4rem"}} className="flex flex-wrap lg:-mx-4">
                {bookings.map((item) => {
                    return (
                        <motion.div variants={popup} initial="hidden" animate="show" key={item.reservation.id} className="max-w-sm shadow-lg rounded overflow-hidden m-4 sm:flex">
                            <div className="h-48 sm:h-auto sm:w-48 md:w-64 flex-none bg-cover bg-center rounded rounded-t sm:rounded sm:rounded-l text-center overflow-hidden" style={{ backgroundImage: `url(${formatImageLink(item.imagePath)})` }} >
                            </div>
                            <div className="px-6 py-4">
                                <h2 className="mb-2 font-black">{item.eventName}</h2>
                                <p className="mb-4 text-grey-dark text-sm">
                                    <span className="font-black">Booked on:</span>
                                    <br />
                                    {item.reservation.bookedAt.split("T")[0]}
                                    <br />
                                    <span className="font-black">Booked For:</span>
                                    <br />
                                    {item.eventDate.split("T")[0]}
                                    <br />
                                    <span className="font-black">Total to Pay:</span>
                                    <br />
                                    ${item.toPay}
                                </p>
                                <button onClick={() => cancelBookingHandler(item.reservation.id)} className="bg-red-500 hover:bg-red-700 text-white text-md rounded-lg w-24 h-10 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50">Cancel</button>

                            </div>

                        </motion.div>
                    )
                })}
            </div>
        </>
    )
}