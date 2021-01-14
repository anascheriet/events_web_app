import { motion } from 'framer-motion';
import React from 'react'
import "./login.scss"
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/Users/loginAction';

export const Login = () => {

  //need a dispatcher that executes the action !!!!!!!!!!:D
  const dispatch = useDispatch();

  const initialValues = {
    username: '',
    password: ''
  }

  const ValidationSchema = new Yup.ObjectSchema({
    username: Yup.string().required(),
    password: Yup.string().required()
    /* password: Yup.string().matches("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$") */
  })

  const submitHandler = (values) => {
    console.log(values);
    dispatch(login(values));
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ValidationSchema,
    onSubmit: submitHandler
  })


  return (
    <div className="container">
      <motion.div
        className="logo-container"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ ease: "backOut", duration: 1 }}>
        <div className="name">
          <h2>eventor</h2>
        </div>
        <div className="description">
          <h2>EVENT PLANNING.</h2>
        </div>

      </motion.div>


      <div className="form">
        <form onSubmit={formik.handleSubmit}>
          <label className="label">USERNAME</label>
          <br />
          <input type="text" name="username" className="input" {...formik.getFieldProps("username")} />
          <br />
          {formik.touched.username && formik.errors.username &&
            <span>{formik.errors.username}</span>}
          <br />
          <label className="label">PASSWORD</label>
          <br />
          <input type="password" name="password" className="input" {...formik.getFieldProps("password")} />
          <br />
          {formik.touched.password && formik.errors.password &&
            <span>{formik.errors.password}</span>}
          <br />

          <button type="submit" className="submitBtn" >Log In</button>

        </form>
        <div className="links">
          <a >Create Account</a>
          <a >Forgot Password?</a>
        </div>
      </div>

    </div>
  );

}
