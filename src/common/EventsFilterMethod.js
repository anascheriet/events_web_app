

//TODO implement this function in EventsHome and EventsDashboard to reduce boilerplate

export const filterEvents = (arr, containsMethod, nameInput, nameProp, cityInput, cityProp, countryInput, countryProp) => {
    arr.filter((item) => {
        if (containsMethod(item, nameProp, nameInput) && cityInput === "" && countryInput === "") {
            return item;
        }
        else if (containsMethod(item, countryProp, countryInput) && cityInput === "" && nameInput === "") {
            return item;
        }
        else if (containsMethod(item, cityProp, cityInput) && nameInput === "" && countryInput === "") {
            return item;
        }
        else if (containsMethod(item, nameProp, nameInput) && containsMethod(item, cityProp, cityInput) && countryInput === "") {
            return item;
        }

        else if (containsMethod(item, nameProp, nameInput) && containsMethod(item, countryProp, countryInput) && cityInput === "") {
            return item;
        }
        else if (containsMethod(item, cityProp, cityInput) && containsMethod(item, countryProp, countryInput) && nameInput === "") {
            return item;
        }
        else if (containsMethod(item, nameProp, nameInput) && containsMethod(item, countryProp, countryInput) && containsMethod(item, cityProp, cityInput)) {
            return item;
        }
        return arr;
    })
};