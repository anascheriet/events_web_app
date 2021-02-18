import { Icon } from "semantic-ui-react";

export const formatImageLink = (path) => {
    return "http://localhost:8080/" + path?.split("/").pop();
}

export const formatDate = (date) => {
    return (
        <div className="flex-col items-center divide-purple-100 mt-1">
            <p className="text-grey-darker text-sm"><Icon name="calendar" color="grey" />{date?.split("T")[0]}</p>
            <p className="text-grey-darker text-sm"><Icon name="clock" color="grey" />{date?.split("T")[1].split(".")[0]}</p>
        </div>
    )
    /* (<div>{<Icon name="calendar" color="grey" />}{date?.split("T")[0]}<br/>{<Icon name="clock" color="grey" />}{date?.split("T")[1].split(".")[0]}</div>); */
}



export const contains = (event, prop, against) => event.event[prop].toLowerCase().includes(against.toLowerCase());

export const containsForEvDash = (event, prop, against) => event[prop].toLowerCase().includes(against.toLowerCase());