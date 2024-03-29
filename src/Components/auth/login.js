import { motion } from 'framer-motion';
import React, { useState } from 'react'
import "./login.scss"
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/Users/loginAction';
import { Link, useHistory } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import axios from 'axios';
import { authUrls } from '../../redux/api';
import { successToast } from '../../common/Notifications';
import { toast } from 'react-toastify';

export const Login = () => {

  //Check if user is logged in
  const { user } = useSelector(state => state.userState);

  //need a dispatcher that executes the action !!!!!!!!!!:D
  const dispatch = useDispatch();

  const history = useHistory();

  const initialValues = {
    username: '',
    password: ''
  }

  const ValidationSchema = new Yup.ObjectSchema({
    username: Yup.string().email().required("Email is required"),
    password: Yup.string().required()
    /* password: Yup.string().matches("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$") */
  })

  const submitHandler = (values) => {
    dispatch(login(values, history));
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ValidationSchema,
    onSubmit: submitHandler
  })

  //Forgot Password 

  //Set up conditional rendering

  const [forgotForm, setForgotForm] = useState(false);

  const openForgotPass = () => {
    setForgotForm(true);
  }

  const closeForgotPass = () => {
    setForgotForm(false);
  }

  //Set up forgot password from
  const forgotInitialValues = {
    username: '',
  }

  const forgotValidationSchema = new Yup.ObjectSchema({
    username: Yup.string().email().required("Email is required"),
  })



  const forgotSubmitHandler = async (values) => {
    try {
      const resp = await axios.post(authUrls.forgotPassword, values);
      successToast(resp.data);
      closeForgotPass();
      forgotFormik.values.username = '';
    } catch (error) {
      toast.error(error.data);
    }
  }

  const forgotFormik = useFormik({
    initialValues: forgotInitialValues,
    validationSchema: forgotValidationSchema,
    onSubmit: forgotSubmitHandler
  })

  //handle show/hide password
  const [isPassword, setIsPassword] = useState(true);

  const showPassword = () => {
    setIsPassword(!isPassword);
  }

  return (
    <div className="all">
      <motion.div
        className="logo-container"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ ease: "backOut", duration: 1 }}>
        <div className="name">
          <h2>eventor</h2>
        </div>
        <div className="description">
          {forgotForm ? <h2 style={{ fontSize: "25px" }}>Forgot Password</h2> : <h2>EVENT PLANNING.</h2>}
          {user === null && forgotForm === false &&
            <Link to="/Guest" >
              <button className="explore">Explore Events &nbsp;<Icon size="large" name="arrow alternate circle right" /></button>
            </Link>}
        </div>
      </motion.div>

      {user === null ?
        (
          forgotForm ?
            <div className="form">
              <form onSubmit={forgotFormik.handleSubmit}>
                <label className="label">Please Enter Your Email</label>
                <br />
                <input type="text" name="username" className="input" {...forgotFormik.getFieldProps("username")} />
                <br />
                {forgotFormik.touched.username && forgotFormik.errors.username &&
                  <span style={{ color: "red" }}>{forgotFormik.errors.username}</span>}
                <br />
                <button type="submit" className="submitBtn" >Confirm</button>
              </form>
              <div className="links">
                <a onClick={closeForgotPass}>Cancel</a>
              </div>

            </div>
            :
            <div className="form">
              <form onSubmit={formik.handleSubmit}>
                <label className="label">EMAIL</label>
                <br />
                <input type="text" name="username" className="input" {...formik.getFieldProps("username")} />
                <br />
                {formik.touched.username && formik.errors.username &&
                  <span style={{ color: "red" }}>{formik.errors.username}</span>}
                <br />
                <label className="label">PASSWORD</label>
                <br />
                <input type={isPassword ? "password" : "text"} name="password" className="input" {...formik.getFieldProps("password")} /> <Icon name={isPassword ? "eye" : "eye slash"} onClick={showPassword} />
                <br />
                {formik.touched.password && formik.errors.password &&
                  <span style={{ color: "red" }}>{formik.errors.password}</span>}
                <br />

                <button type="submit" className="submitBtn" >Log In</button>

              </form>
              <div className="links">
                <Link to="/authentication/register">
                  <p style={{ color: "#14213D" }}>Create Account</p>
                </Link>
                <p style={{ color: "#14213D", fontWeight: "bold", cursor: "pointer" }} onClick={openForgotPass}>Forgot Password?</p>
              </div>
            </div>) :
        <div className="back">
          <h2>{`Welcome Back ${user.displayName} !`}</h2>
          <Link to="/Redirect">
            <button>Get Back In</button>
          </Link>
        </div>}



    </div>
  );

}
