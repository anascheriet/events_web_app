import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { successToast } from '../../common/Notifications';
import { resetPasswordUrl } from "../../redux/api"
import "./reset.scss"

export const ResetPassword = () => {
    const history = useHistory();

    //get Url
    const location = useLocation();

    //split url to extract needed values
    const token = location.search.split("&email")[0].split("token=")[1];
    const email = location.search.split("email=")[1];

    //Set up form initial values
    const myInitialValues = {
        confirmationtoken: token,
        email: email,
        password: '',
        confirmpassword: ''
    }

    //validation
    const myValidationSchema = new Yup.ObjectSchema({
        password: Yup.string().required(),
        confirmpassword: Yup.string().required()
    })

    //submit handler
    const mySubmitHandler = (values) => {
        axios.post(resetPasswordUrl, values).then((resp) => {
            successToast(resp.data);
            history.push("/");
        }, (error) => {
            console.log(error);
            toast.error(error.data);
        })

    }

    //formik wiring up
    const formik = useFormik({
        initialValues: myInitialValues,
        validationSchema: myValidationSchema,
        onSubmit: mySubmitHandler
    })




    return (
        <div className="global">

            <div className="title">
                <h2>Reset Password</h2>
            </div>
            <div className="form">
                <form onSubmit={formik.handleSubmit}>
                    <label className="label">New Password</label>
                    <br />
                    <input type="password" name="password" className="input" {...formik.getFieldProps("password")} />
                    <br />
                    {formik.touched.password && formik.errors.password &&
                        <span style={{ color: "red" }}>{formik.errors.password}</span>}
                    <br />
                    <label className="label">Confirm New Password</label>
                    <br />
                    <input type="password" name="confirmpassword" className="input" {...formik.getFieldProps("confirmpassword")} />
                    <br />
                    {formik.touched.confirmpassword && formik.errors.confirmpassword &&
                        <span style={{ color: "red" }}>{formik.errors.confirmpassword}</span>}
                    <br />
                    <button type="submit" className="submitBtn" >Confirm</button>
                </form>
            </div>
        </div>
    )
}
