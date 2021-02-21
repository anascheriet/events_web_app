import axios from 'axios';
import React, { useState } from 'react'
import "./register.scss"
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { authUrls } from '../../redux/api';
import { successToast } from '../../common/Notifications';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Icon } from 'semantic-ui-react';

export const Register = () => {


    const history = useHistory();

    //Formik Set Up

    //Admin Attributes
    const myInitialValues = {
        displayName: "",
        email: "",
        gender: "",
        country: "",
        password: "",
        age: 0,
        birthDate: null
    }

    //Set up object validation
    const myValidationSchema = new Yup.ObjectSchema({
        displayName: Yup.string().required(),
        email: Yup.string().email().required(),
        country: Yup.string().required(),
        gender: Yup.string().required(),
        age: Yup.number().required(),
        password: Yup.string().required()
    })

    //Submit method
    const registerHandler = async (values) => {
        console.log(values);
        try {
            const response = await axios.post(authUrls.register, values);
            if (response) {
                successToast(response.data);
                history.push("/");
            }
        } catch (error) {
            toast.error(error.data);
        }
    }

    //Set up formik object to handle the form
    const formik = useFormik({
        validationSchema: myValidationSchema,
        initialValues: myInitialValues,
    })


    const { countries } = useSelector(state => state.userState);


    //handle show/hide password
    const [isPassword, setIsPassword] = useState(true);

    const showPassword = () => {
        setIsPassword(!isPassword);
    }

    return (
        <div className="register">
            <div className="title">
                <h2>Register</h2>
            </div>
            <div className="form md:mt-10">
                <div className="flex py-0 px-9 mt-3">

                    <div className="flex-1 flex-col m-6 mt-28">

                        <label className="reglabel">Email</label>

                        <input className="reginput" type="text" name='email' value={formik.values.email} {...formik.getFieldProps("email")} />

                        {formik.touched.email && formik.errors.email &&
                            <pre className="error">{formik.errors.email}</pre>}
                        <label className="reglabel">Date of Birth</label>
                        <input className="reginput" type="date" name="birthDate" value={formik.values.birthDate} {...formik.getFieldProps('birthDate')} />
                       {/*  <input className="reginput" type="number" name='age' value={formik.values.age} {...formik.getFieldProps('age')} />
                        {formik.touched.age && formik.errors.age &&
                            <pre className="error">{formik.errors.age}</pre>} */}

                        <label className="reglabel">Country</label>
                        <select className="reginput" type="text" {...formik.getFieldProps("country")} >
                            <option value="" disabled></option>
                            {countries.map(c => {
                                return <option key={c.country} value={c.country}>{c.country}</option>
                            })}
                        </select>


                        <button className="regBtn" onClick={() => registerHandler(formik.values)}>
                            Create Account
                        </button>
                    </div>
                    <div className="flex-1 flex-col m-6 mt-28">

                        <label className="reglabel">Display Name</label>

                        <input className="reginput" type="text" name='displayName' value={formik.values.displayName} {...formik.getFieldProps("displayName")} />

                        {formik.touched.displayName && formik.errors.displayName &&
                            <pre className="error">{formik.errors.displayName}</pre>}

                        <label className="reglabel">Password</label>

                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <input className="reginput" type={isPassword ? "password" : "text"} name='password' value={formik.values.password} {...formik.getFieldProps('password')} />
                            <Icon name={isPassword ? "eye" : "eye slash"} onClick={showPassword} />
                        </div>
                        {formik.touched.password && formik.errors.password &&
                            <span className="error">{formik.errors.password}</span>}

                        <label className="reglabel">Gender</label>
                        <select className="reginput" type="text" {...formik.getFieldProps("gender")} >
                            <option value="" disabled></option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                </div>
            </div>
        </div >)
}