import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loadUserInfo } from '../redux/actions/Users/loadUserInfo';
import { Dimmer, Loader } from "semantic-ui-react";
import { loadCountries } from '../redux/actions/Users/loadCountries';


export const Redirect = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch(loadUserInfo());
        dispatch(loadCountries());
        setTimeout(() => {
            history.push("/Home");
        }, 2000);
    }, [dispatch, history])
    return (
        <div>
            <Dimmer active>
                <Loader content={"Loading App..."} />
            </Dimmer>
        </div>
    )
}
