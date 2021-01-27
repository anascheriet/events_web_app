import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loadUserInfo } from '../redux/actions/Users/loadUserInfo';

export const Redirect = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch(loadUserInfo());
        history.push("/Home");
    }, [])
    return (
        <div>
            HHHHH
        </div>
    )
}
