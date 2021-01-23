import { Icon } from "semantic-ui-react";

export const formatImageLink = (path) => {
    return "http://localhost:8080/" + path?.split("/").pop();
}

export const formatDate = (date) => {
    return (
        <div class="flex-col items-center divide-purple-100 mt-1">
            <p class="text-grey-darker text-sm"><Icon name="calendar" color="grey" />{date?.split("T")[0]}</p>
            <p class="text-grey-darker text-sm"><Icon name="clock" color="grey" />{date?.split("T")[1].split(".")[0]}</p>
        </div>
    )
    /* (<div>{<Icon name="calendar" color="grey" />}{date?.split("T")[0]}<br/>{<Icon name="clock" color="grey" />}{date?.split("T")[1].split(".")[0]}</div>); */
}