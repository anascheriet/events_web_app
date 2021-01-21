import React from 'react'
import { formatDate, formatImageLink } from '../../../common/util'

export const Event = ({ event }) => {
    return (
        <div >
            <h3>{event.eventName}</h3>
            <h3> {formatDate(event.eventDate)}</h3>
            <img src={formatImageLink(event.imagePath)} alt="img" />
        </div>
    )
}
