import { Divider } from 'antd'
import React from 'react'
import {
    Form,
    Input,
    Button,
    Select,
    DatePicker,
    InputNumber,
} from 'antd';
import "./eventform.scss"
import * as Yup from 'yup';
import { useFormik } from 'formik';

export const EventForm = () => {

    //Set up Event Object
    const initialValues = {
        eventName: '',
        description: '',
        country: '',
        city: '',
        availabletickets: 0,
        ticketprice: 0,
        eventtypeid: 0,
        eventDate: ''
    }

    //Set up object validation
    const myValidationSchema = new Yup.object({
        eventName: Yup.string().required(),
        description: Yup.string().required(),
        country: Yup.string().required(),
        city: Yup.string().required(),
        availabletickets: Yup.number().required(),
        ticketprice: Yup.number().required(),
        eventtypeid: Yup.number().required(),
        eventDate: Yup.string().required()
    })

    //Submit method
    const submitHandler = () => {
        formik.values.eventDate = new Date(formik.values.eventDate._d).toISOString();
        console.log(formik.values);
    }

    //Set up formik object to handle the form
    const formik = useFormik({
        onSubmit: submitHandler,
        validationSchema: myValidationSchema,
        initialValues: initialValues,
    })

    return (
        <Form
            className="eventForm"
            wrapperCol={{ span: 26 }}
            layout="vertical"
            onFinish={()=> submitHandler(formik.values)}
        >
            <Form.Item label="Event Name">
                <Input name='eventName' {...formik.getFieldProps('eventName')} />
            </Form.Item>
            <Form.Item label="Event Type">
                <Select
                    name='eventtypeid'
                    onChange={evtype => formik.setFieldValue('eventtypeid', evtype)}
                    value={formik.values.eventtypeid}>
                    <Select.Option value="1">Sport</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Country">
                <Select
                    name='country'
                    onChange={country => formik.setFieldValue('country', country)}
                    value={formik.values.country}>
                    <Select.Option value="France">France</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="City">
                <Select
                    name='city'
                    onChange={city => formik.setFieldValue('city', city)}
                    value={formik.values.city}>
                    <Select.Option value="Paris">Paris</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Description">
                <Input.TextArea name='description' {...formik.getFieldProps('description')} />
            </Form.Item>
            <Form.Item label="Event Date">
                <DatePicker
                    name='eventDate'
                    onChange={date => formik.setFieldValue('eventDate', date)}
                    value={formik.values.eventDate}
                    className="input"
                    showTime
                    format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
            <Form.Item label="Ticket Price">
                <InputNumber
                    name='ticketprice'
                    onChange={price => formik.setFieldValue('ticketprice', price)}
                    value={formik.values.ticketprice}
                    style={{ width: "25.2rem" }} />
            </Form.Item>
            <Form.Item label="No of available tickets">
                <InputNumber
                    name='availabletickets'
                    onChange={tickets => formik.setFieldValue('availabletickets', tickets)}
                    value={formik.values.availabletickets}
                    style={{ width: "25.2rem" }} />
            </Form.Item>
            <Form.Item >
                <Button htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
    )
}
