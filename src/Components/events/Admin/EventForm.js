import React, { useState } from 'react'
import {
    Form,
    Input,
    Select,
    DatePicker,
    InputNumber,
    Upload,
    Button as AntdButton
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import "./eventform.scss"
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux';
import { createEventAction } from '../../../redux/actions/eventActions/eventAction'
import { errorToast, successToast } from '../../../common/Notifications';
import axios from 'axios';
import { uploadImageUrl } from '../../../redux/api';
import { loadUserInfo } from '../../../redux/actions/Users/loadUserInfo';

//Set up object validation
export const myValidationSchema = new Yup.ObjectSchema({
    eventName: Yup.string().required(),
    description: Yup.string().required(),
    country: Yup.string().required(),
    city: Yup.string().required(),
    availabletickets: Yup.number().required().positive().integer(),
    ticketprice: Yup.number().required().positive(),
    eventtypeid: Yup.number().required(),
    eventDate: Yup.string().required()
})

export const EventForm = ({ closeDrawer, }) => {


    //set uo the dispatcher for different actions
    const dispatch = useDispatch();

    //retrieve event types array from evTypes reducer
    const { eventTypes } = useSelector(state => state.eventTypesState);

    //retrieve countries array
    const { countries } = useSelector(state => state.userState);

    //Country / City Dropdown logic
    const [Cities, setCities] = useState([]);

    //Set up Event Object
    const initialValues = {
        eventName: '',
        description: '',
        country: '',
        city: '',
        availabletickets: null,
        ticketprice: null,
        eventtypeid: null,
        eventDate: '',
        image: ''
    }


    //Set up formik object to handle the form
    const formik = useFormik({
        validationSchema: myValidationSchema,
        initialValues: initialValues,
    })

    //get events so we can add to them
    const { user } = useSelector(state => state.userState);


    const clearInputs = () => {
        formik.values.eventName = '';
        formik.values.description = '';
        formik.values.country = '';
        formik.values.city = '';
        formik.values.availabletickets = null;
        formik.values.ticketprice = null;
        formik.values.eventtypeid = null;
        formik.values.eventDate = '';
        formik.values.image = null;
    }


    //Submit method
    const submitHandler = (event) => {
        try {
            dispatch(createEventAction(event));
            setTimeout(() => {
                dispatch(loadUserInfo());
            }, 1000);
            closeDrawer();
            clearInputs();
        } catch (error) {
            errorToast(error.data);
        }

    }


    //Image upload logic
    const eventImageUpload = async (file) => {
        let formData = new FormData();
        formData.append('file', file);
        let response = await axios.post(uploadImageUrl, formData);
        //Assign response to image path
        formik.values.image = response.data;
    }

    return (
        <Form
            className="eventForm"
            wrapperCol={{ span: 26 }}
            layout="vertical"
            onFinish={() => submitHandler(formik.values)}
        >
            <Form.Item label="Event Name">
                <Input name='eventName' {...formik.getFieldProps('eventName')} />
                {formik.touched.eventName && formik.errors.eventName &&
                    <pre style={{ color: "red", marginTop: "0.1rem" }}>{formik.errors.eventName}</pre>}
            </Form.Item>
            <Form.Item label="Event Type">
                <Select
                    name='eventtypeid'
                    onChange={evtype => formik.setFieldValue('eventtypeid', evtype)}
                    value={formik.values.eventtypeid}>
                    {eventTypes?.map(eType => {
                        return <Select.Option value={eType.id}>{eType.name}</Select.Option>
                    })}
                </Select>
                {formik.touched.eventtypeid && formik.errors.eventtypeid &&
                    <pre style={{ color: "red", marginTop: "0.1rem" }}>{formik.errors.eventtypeid}</pre>}
            </Form.Item>
            <Form.Item label="Country">
                <Select
                    name='country'
                    onChange={country => formik.setFieldValue('country', country)}
                    onSelect={country => ((setCities(countries.filter(x => x.country === country)[0].cities), formik.setFieldValue('country', country)))}
                    value={formik.values.country}>
                    {countries.map(c => {
                        return <Select.Option value={c.country}>{c.country}</Select.Option>
                    })}
                </Select>
                {formik.touched.country && formik.values.country === "" && console.log(formik.errors.country)}
            </Form.Item>
            <Form.Item label="City">
                <Select
                    name='city'
                    onChange={city => (formik.setFieldValue('city', city))}
                    value={formik.values.city}>
                    {Cities.map((c, index) => {
                        return <Select.Option key={index} value={c}>{c}</Select.Option>
                    })}

                </Select>
                {formik.touched.city && formik.errors.city &&
                    <pre style={{ color: "red", marginTop: "0.1rem" }}>{formik.errors.city}</pre>}
            </Form.Item>
            <Form.Item label="Description">
                <Input.TextArea name='description' {...formik.getFieldProps('description')} />
                {formik.touched.description && formik.errors.description &&
                    <pre style={{ color: "red", marginTop: "0.1rem" }}>{formik.errors.description}</pre>}
            </Form.Item>
            <Form.Item label="Event Date">
                <DatePicker
                    name='eventDate'
                    onChange={date => (formik.setFieldValue('eventDate', date))}
                    value={formik.values.eventDate}
                    className="input"
                    showTime
                    format="YYYY-MM-DD HH:mm:ss" />
                {formik.touched.eventDate && formik.errors.eventDate &&
                    <pre style={{ color: "red", marginTop: "0.1rem" }}>{formik.errors.eventDate}</pre>}
            </Form.Item>
            <Form.Item label="Ticket Price">
                <InputNumber
                    name='ticketprice'
                    onChange={price => formik.setFieldValue('ticketprice', price)}
                    value={formik.values.ticketprice}
                    style={{ width: "25.2rem" }} />
                {formik.touched.ticketprice && formik.errors.ticketprice &&
                    <pre style={{ color: "red", marginTop: "0.1rem" }}>{formik.errors.ticketprice}</pre>}
            </Form.Item>
            <Form.Item label="No of available tickets">
                <Input
                    name='availabletickets'
                    /* onChange={tickets => formik.setFieldValue('availabletickets', tickets)} */
                    {...formik.getFieldProps('availabletickets')}
                    value={formik.values.availabletickets}
                    style={{ width: "25.2rem" }} />
                {formik.touched.availabletickets && formik.errors.availabletickets &&
                    <pre style={{ color: "red", marginTop: "0.1rem" }}>{formik.errors.availabletickets}</pre>}
            </Form.Item>
            <Form.Item label="Event Image">
                <Upload name='image' action={eventImageUpload}>
                    <AntdButton icon={<UploadOutlined />}>Click to Upload</AntdButton>
                </Upload>
            </Form.Item>
            <Form.Item >
                <Button color="green" disabled={Object.keys(formik.errors).length !== 0} type="submit">Submit</Button>
                <Button color="grey" type="button" onClick={closeDrawer}>Cancel</Button>
            </Form.Item>
        </Form>
    )


}


