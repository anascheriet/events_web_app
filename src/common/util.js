import { Icon } from "semantic-ui-react";

export const formatImageLink = (path) => {
    return "http://localhost:8080/" + path?.split("/").pop();
}

export const formatDate = (date) => {
    return (<div>{<Icon name="calendar" />}{date?.split("T")[0]}&nbsp;&nbsp;{<Icon name="clock" />}{date?.split("T")[1].split(".")[0]}</div>);
}