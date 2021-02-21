import { Form, Input, Modal, Select } from 'antd';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Divider, Header, Icon } from 'semantic-ui-react';
import * as Yup from "yup";
import { errorToast, successToast } from '../common/Notifications';
import { loadUserInfo } from '../redux/actions/Users/loadUserInfo';
import { logoutAction } from '../redux/actions/Users/logoutAction';
import { authUrls } from '../redux/api';

export const EditProfile = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    //get user amd countries array
    const { user, countries } = useSelector(state => state.userState);


    //set up form field values
    const myInitiaValues = {
        displayName: user.displayName,
        email: user.email,
        gender: user.gender,
        country: user.country
    }

    //set up validation
    const myValidationSchema = new Yup.ObjectSchema({
        displayName: Yup.string().required(),
        email: Yup.string().email().required(),
        gender: Yup.string().required(),
        country: Yup.string().required(),
    });

    //Set up formik form handler 
    const formik = useFormik({
        initialValues: myInitiaValues,
        validationSchema: myValidationSchema
    })


    //Horizontal form layout w/ same start for inputs
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };


    const updateProfileHandler = async (values) => {
        try {
            const resp = await axios.patch(authUrls.updateProfile, values);
            successToast(resp.data);
            dispatch(loadUserInfo());
        } catch (error) {
            errorToast(error.data);
        }
    }


    //update password modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    const closeModal = () => {
        setIsModalVisible(false);
    }


    //
    const passInitialValues = {
        password: "",
        confirmPassword: ""
    }

    const passValidationSchema = new Yup.ObjectSchema({
        password: Yup.string().required().min(6),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], "Passwords do not match")
            .required('Password confirm is required')
    })

    const passFormik = useFormik({
        initialValues: passInitialValues,
        validationSchema: passValidationSchema
    })

    const updatePasswordHandler = async (values) => {
        try {
            //change the password/ log out and redirect the user to login page
            const resp = await axios.patch(authUrls.updatePassword, values);
            successToast(resp.data);
            dispatch(logoutAction());
            history.push("/");
        } catch (error) {
            errorToast(error.data);
        }
    }

    const [passVisible, setPassVisible] = useState(false);

    const showHidePass = () => {
        setPassVisible(!passVisible);
    }


    const [confPassVisible, setConfPassVisible] = useState(false);

    const showHideConfPass = () => {
        setConfPassVisible(!confPassVisible);
    }

    return (
        <div>
            <div className="header">
                <Header as='h2'>
                    <Icon name='user' />
                    <Header.Content>
                        Profile
      <Header.Subheader>Update your account information </Header.Subheader>
                    </Header.Content>
                </Header>
            </div>
            <Divider />
            <div className="my-4 mr-48 ml-12 flex flex-col align-middle">
                <Form  {...layout}>
                    <Form.Item label="Display Name">
                        <Input name='displayName' {...formik.getFieldProps("displayName")} />
                        {formik.touched.displayName && formik.errors.displayName &&
                            <pre style={{ color: "red", marginTop: "0.1rem" }}>{formik.errors.displayName}</pre>}
                    </Form.Item>
                    <Form.Item label="Email">
                        <Input name='email' {...formik.getFieldProps("email")} />
                        {formik.touched.email && formik.errors.email &&
                            <pre style={{ color: "red", marginTop: "0.1rem" }}>{formik.errors.email}</pre>}
                    </Form.Item>
                    <Form.Item label="Country">
                        <Select
                            name='country'
                            onChange={(country => formik.setFieldValue("country", country))}
                            value={formik.values.country}>
                            {countries.map(c => {
                                return (
                                    <Select.Option key={c.country} value={c.country}>
                                        {c.country}
                                    </Select.Option>)
                            })}
                        </Select>
                        {formik.touched.country && formik.errors.country &&
                            <pre style={{ color: "red", marginTop: "0.1rem" }}>{formik.errors.country}</pre>}
                    </Form.Item>
                    {/*  <Form.Item label="Age">
                        <Input name='age' {...formik.getFieldProps("age")} />
                    </Form.Item> */}
                    <Form.Item
                        label="Gender">
                        <Select name='gender'
                            onChange={gender => formik.setFieldValue('gender', gender)}
                            value={formik.values.gender} >
                            <Select.Option value="Male">Male</Select.Option>
                            <Select.Option value="Female">Female</Select.Option>
                            <Select.Option value="Other">Other</Select.Option>
                        </Select>
                    </Form.Item>
                    {/*  <Form.Item label="Password">
                        <Input name='password' type="password" {...formik.getFieldProps("password")} />
                     
                    </Form.Item> */}
                    <Form.Item style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "1rem" }}>
                        <Button disabled={Object.keys(formik.errors).length !== 0} onClick={() => updateProfileHandler(formik.values)} color="blue" type="submit"><Icon name="check" />Update</Button>
                        <Button onClick={() => setIsModalVisible(true)}><Icon name="lock" /> Change Password</Button>
                        <Button color="grey" onClick={() => history.push("/Home")}><Icon name="cancel" />Cancel</Button>
                    </Form.Item>
                </Form>
            </div>


            {/* Delete evType Modal */}
            <Modal title='Update Password'
                visible={isModalVisible}
                onCancel={closeModal}
                footer={[
                    <Button onClick={closeModal}>
                        Cancel
                </Button>,
                    <Button
                        onClick={() => updatePasswordHandler(passFormik.values)}
                        disabled={Object.keys(passFormik.errors).length !== 0}
                        color="blue">
                        Submit
                </Button>,
                ]}>
                <Form layout="vertical">
                    <Form.Item label="Password">
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <Input style={{ marginRight: "0.5rem" }} type={passVisible ? "text" : "password"} name="password" {...passFormik.getFieldProps("password")} />
                            <Icon name={passVisible ? "eye slash" : "eye"} onClick={showHidePass} />
                        </div>
                        {passFormik.touched.password && passFormik.errors.password &&
                            <pre style={{ color: "red", marginTop: "0.1rem" }}>{passFormik.errors.password}</pre>}
                    </Form.Item>
                    <Form.Item label="Confirm Password">
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <Input style={{ marginRight: "0.5rem" }} type={confPassVisible ? "text" : "password"} name="confirmPassword" {...passFormik.getFieldProps("confirmPassword")} />
                            <Icon name={confPassVisible ? "eye slash" : "eye"} onClick={showHideConfPass} />
                        </div>
                        {passFormik.touched.confirmPassword && passFormik.errors.confirmPassword &&
                            <pre style={{ color: "red", marginTop: "0.1rem" }}>{passFormik.errors.confirmPassword}</pre>}
                    </Form.Item>
                </Form>
            </Modal>
        </div>

    )
}
