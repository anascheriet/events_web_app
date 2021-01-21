import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Header, Icon, Table, Divider } from 'semantic-ui-react'
import { Tag, Modal, Form, Input  } from 'antd';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { eventTypesUrls } from '../../../redux/api'
import { editToast, successToast } from '../../../common/Notifications';
import { getAllEventTypes } from '../../../redux/actions/eventTypes/getTypesAction';
import { createEventTypeAction } from '../../../redux/actions/eventTypes/eventTypeCUD'

export const EventTypes = () => {

    const { eventTypes } = useSelector(state => state.eventTypesState);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllEventTypes());
    }, [eventTypes]);

    const [editMode, setEditMode] = useState(false);

    //Add event type modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    const openModalforAdd = () => {
        setEditMode(false);
        setIsModalVisible(true);
        formik.values.name = "";
        formik.values.id = 0;
    };



    const openModalforEdit = async (id) => {
        const eventT = await axios.get(eventTypesUrls.details(id));
        formik.values.name = eventT.data.name;
        formik.values.id = eventT.data.id;
        setEditMode(true);
        setIsModalVisible(true);
    };

    //Edit Submit Handler
    const editHandler = async () => {
        await axios.put(eventTypesUrls.edit(formik.values.id), formik.values);
        setIsModalVisible(false);
        editToast("Event Type updated ! ✅");
    }


    const closeModal = () => {
        setIsModalVisible(false);
    };

    //Delete Modal
    const [isDModalVisible, setIsDModalVisible] = useState(false);
    const openDModal = () => {
        setIsDModalVisible(true);
    };

    const closeDModal = () => {
        setIsDModalVisible(false);
    };

    //Load event Type
    const [getEvType, setGetEvType] = useState({})

    const loadEType = async (id) => {
        const eventT = await axios.get(eventTypesUrls.details(id));
        setGetEvType({ ...getEvType, ...eventT.data });
        console.log(getEvType);
        openDModal();
    }

    const deleteETypeHandle = async (id) => {
        await axios.delete(eventTypesUrls.delete(id));
    }



    //Form handling 

    //Initial Values
    const myInitialValues = { name: '' };

    //Validation
    const myValidationSchema = new Yup.object({
        name: Yup.string().required(),
    })

    //Form handler
    const formik = useFormik({
        validationSchema: myValidationSchema,
        initialValues: myInitialValues
    })

    //Create Submit eType handler
    const submitHandler = (eType) => {
        eType.id = eventTypes[eventTypes.length - 1].id + 1;
        dispatch(createEventTypeAction(eType));
        eventTypes.push(eType);
        setIsModalVisible(false);
        successToast("Event Type has been Added ! 👌");
    }


    return (
        <>
            <div className="header">
                <Header as='h2'>
                    <Icon name='fas fa-list' />
                    <Header.Content>
                        Event Types List
                        <Header.Subheader>Manage event categories</Header.Subheader>
                    </Header.Content>
                </Header>
                <Button onClick={openModalforAdd} color="green"><Icon name="calendar" /> Create new Event Type</Button>
            </div>
            <Divider />
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Category Id</Table.HeaderCell>
                        <Table.HeaderCell>Category Name</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {eventTypes.map(item => {
                        return <Table.Row key={item.id}>
                            <Table.Cell>{item.id}</Table.Cell>
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>
                                <Icon onClick={() => openModalforEdit(item.id)} name="edit" title="Edit" color="blue" size="large" />
                                &nbsp;&nbsp;
                                <Icon onClick={() => loadEType(item.id)} style={{ cursor: 'pointer' }} size="large" title="Delete" name="trash" color="red" /></Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>
            </Table>


            {/* Add Event type modal  */}
            <Modal title={editMode ? "Update Event" : "Add an Event Type"}
                visible={isModalVisible}
                onCancel={closeModal}
                footer={[
                    <Button onClick={closeModal}>
                        Cancel
                </Button>,
                    <Button
                        disabled={Object.keys(formik.errors).length !== 0}
                        onClick={() => editMode ? editHandler() : submitHandler(formik.values)}
                        color={editMode ? "blue" : "green"}>
                        {editMode ? "Update" : "Create"}
                    </Button>,
                ]}>
                <Form layout="vertical">
                    <Form.Item
                        label="Type Name">
                        <Input name='name' {...formik.getFieldProps('name')} />
                        {formik.touched.name && formik.errors.name && <pre style={{ color: "red", marginTop: "0.1rem" }}>{formik.errors.name}</pre>}
                    </Form.Item>
                </Form>
            </Modal>


            {/* Delete evType Modal */}
            <Modal title='Delete Event Type'
                visible={isDModalVisible}
                onCancel={closeDModal}
                footer={[
                    <Button onClick={closeDModal}>
                        Cancel
                </Button>,
                    <Button
                        onClick={() => deleteETypeHandle(getEvType.id)}
                        color="red">
                        Delete
                </Button>,
                ]}>
                <h3>Are you sure you want to delete Event Type: <Tag style={{ fontSize: "20px" }} color="red">{getEvType.name}</Tag></h3>
            </Modal>

        </>
    )
}
