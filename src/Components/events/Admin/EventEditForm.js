import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { myValidationSchema } from './EventForm';
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
import { Button } from 'semantic-ui-react';
import { eventsUrls, uploadImageUrl } from '../../../redux/api';
import axios from 'axios';
import { editToast } from '../../../common/Notifications';

export const EventEditForm = ({ closeEDrawer }) => {


    //retrieve event types array from evTypes reducer
    const { eventTypes } = useSelector(state => state.eventTypesState);
    const { event } = useSelector(state => state.eventState);

    useEffect(() => {
     
        console.log(event);
    }, [])


    //Set up Event Object to object
    const initialValues = {
        eventName: event.eventName,
        description: event.description,
        country: event.country,
        city: event.city,
        availabletickets: event.availableTickets,
        ticketprice: event.ticketPrice,
        eventtypeid: event.eventType.id,
        eventDate: null,
        image: event.imagePath,
    }

    //Set up formik object to handle the form
    const formik = useFormik({
        validationSchema: myValidationSchema,
        initialValues: initialValues,
    })

    //Image upload logic
    const eventImageUpload = async (file) => {
        let formData = new FormData();
        formData.append('file', file);
        let response = await axios.post(uploadImageUrl, formData);
        //Assign response to image path
        formik.values.image = response.data;
    }


    //Country / City Dropdown logic
    const [CountryCity, setCountryCity] = useState([]);
    const [Cities, setCities] = useState([]);

    //fetch event types for form event type dropdown from the api on component load
    useEffect(() => {
        const fetchCountryAPI = async () => {
            let response = await axios.get("https://countriesnow.space/api/v0.1/countries");
            setCountryCity(response.data.data);
        }
        fetchCountryAPI();
    }, [])

    const submitHandler = async (ev) => {
        console.log(ev);
        await axios.patch(eventsUrls.edit(event.id), ev)
        closeEDrawer();
        editToast("The event Has been Updated! ✅");
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
                    {eventTypes.map(eType => {
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
                    onSelect={country => ((setCities(CountryCity.filter(x => x.country === country)[0].cities), formik.setFieldValue('country', country)))}
                    value={formik.values.country}>
                    {CountryCity.map(c => {
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
                <Button color="blue" disabled={Object.keys(formik.errors).length > 1} htmlType="submit">Update</Button>
                <Button color="grey" type="button" onClick={closeEDrawer}>Cancel</Button>
            </Form.Item>
        </Form>
    )
}
