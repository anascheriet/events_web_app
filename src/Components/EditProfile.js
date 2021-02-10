import { Form, Input, Select } from 'antd';
import { useFormik } from 'formik';
import React from 'react'
import { useSelector } from 'react-redux';
import { Button, Divider, Header, Icon } from 'semantic-ui-react';
import * as Yup from "yup";

export const EditProfile = () => {

    //get user
    const { user } = useSelector(state => state.userState);


    //set up form field values
    const myInitiaValues = {
        displayName: user.displayName,
        email: user.email,
        gender: user.gender,
        country: user.country,
        age: user.age,
        password: user.password
    }

    //set up validation

    const myValidationSchema = new Yup.ObjectSchema({
        displayName: Yup.string().required(),
        email: Yup.string().email().required(),
        gender: Yup.string().required(),
        country: Yup.string().required(),
        age: Yup.number().required(),
        password: Yup.string().required(),
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
                        {/*  {formik.touched.eventName && formik.errors.eventName &&
                    <pre style={{ color: "red", marginTop: "0.1rem" }}>{formik.errors.eventName}</pre>} */}
                    </Form.Item>

                    <Form.Item label="Email">
                        <Input name='email' {...formik.getFieldProps("email")} />
                        {/*  {formik.touched.eventName && formik.errors.eventName &&
                    <pre style={{ color: "red", marginTop: "0.1rem" }}>{formik.errors.eventName}</pre>} */}
                    </Form.Item>
                    <Form.Item label="Country">
                        <Input name='country' {...formik.getFieldProps("country")} />
                        {/*  {formik.touched.eventName && formik.errors.eventName &&
                    <pre style={{ color: "red", marginTop: "0.1rem" }}>{formik.errors.eventName}</pre>} */}
                    </Form.Item>
                    <Form.Item label="Age">
                        <Input name='age' {...formik.getFieldProps("age")} />
                        {/*  {formik.touched.eventName && formik.errors.eventName &&
                    <pre style={{ color: "red", marginTop: "0.1rem" }}>{formik.errors.eventName}</pre>} */}
                    </Form.Item>
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
                    <Form.Item label="Password">
                        <Input name='password' type="password" {...formik.getFieldProps("password")} />
                        {/*  {formik.touched.eventName && formik.errors.eventName &&
                    <pre style={{ color: "red", marginTop: "0.1rem" }}>{formik.errors.eventName}</pre>} */}
                    </Form.Item>
                    <Form.Item className="align-middle">
                        <Button color="green" htmlType="submit">Submit</Button>
                        <Button color="grey">Cancel</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>

    )
}
