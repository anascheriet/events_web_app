import { Form, Input, Select } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./register.scss"
import * as Yup from 'yup';
import { useFormik } from 'formik';

export const Register = () => {


    //populate country dropdown
    const [CountryData, setCountryData] = useState([]);


    useEffect(() => {
        const fetchCountryAPI = async () => {
            let response = await axios.get("https://countriesnow.space/api/v0.1/countries");
            setCountryData(response.data.data);
        }
        fetchCountryAPI();
    }, [])

    //Formik Set Up

    //Admin Attributes
    const myInitialValues = {
        displayName: "",
        email: "",
        gender: "",
        country: "",
        password: "",
        age: null
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
        /* try {
            const response = await axios.post(registerUrl, values);
            if (response) {
                successToast(response.data);
                closeModal();
                getAdminData();
            }
        } catch (error) {
            toast.error(error.data);
        } */
    }

    //Set up formik object to handle the form
    const formik = useFormik({
        validationSchema: myValidationSchema,
        initialValues: myInitialValues,
    })

    return (
        <div className="register">
            <div className="title">
                <h2>Register</h2>
            </div>
            <div className="form md:mt-10">
                <div className="flex py-0 px-9 mt-3">

                    <div className="flex-1 flex-col m-6 mt-28">

                        <label className="reglabel">Email</label>

                        <input className="reginput" type="text" name='email' {...formik.getFieldProps("email")} />

                        {formik.touched.email && formik.errors.email &&
                            <pre className="error">{formik.errors.email}</pre>}
                        <label className="reglabel">Age</label>
                        <input className="reginput" type="number" name='age' {...formik.getFieldProps('age')} />
                        {formik.touched.age && formik.errors.age &&
                            <pre className="error">{formik.errors.age}</pre>}

                        <label className="reglabel">Country</label>
                        <select className="reginput" type="text" >
                            <option disabled></option>
                            {CountryData.map(c => {
                                return <option key={c.country} value={c.country}>{c.country}</option>
                            })}
                        </select>


                        <button class="w-80 h-10 rounded-lg text-white bg-indigo-900 hover:bg-indigo-800 text-1xl">
                            Create Account
                        </button>
                    </div>
                    <div className="flex-1 flex-col m-6 mt-28">

                        <label className="reglabel">Display Name</label>

                        <input className="reginput" type="text" name='displayName' {...formik.getFieldProps("displayName")} />

                        {formik.touched.displayName && formik.errors.displayName &&
                            <pre className="error">{formik.errors.displayName}</pre>}

                        <label className="reglabel">Password</label>

                        <input className="reginput" type="password" name='password' {...formik.getFieldProps('password')} />
                        {formik.touched.password && formik.errors.password &&
                            <span className="error">{formik.errors.password}</span>}

                        <label className="reglabel">Gender</label>
                        <select className="reginput" type="text" >
                            <option disabled></option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                </div>
            </div>
        </div >)
}