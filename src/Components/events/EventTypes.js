import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Header, Icon, Table, Menu, Divider, IconGroup } from 'semantic-ui-react'
import { getAllEventTypes } from '../../redux/actions/eventTypes/getTypesAction';
import { Tag, Modal, Form, Input, Space } from 'antd';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { createEventTypeAction } from '../../redux/actions/eventTypes/eventTypeCUD';
import { toast } from 'react-toastify';
import { successToast } from '../../Notifications';
import { ExclamationCircleOutlined } from '@ant-design/icons';


//TODO load event type data to delete and edit models

export const EventTypes = () => {

    const { eventTypes } = useSelector(state => state.eventTypesState);
    const { user } = useSelector(state => state.userState);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllEventTypes());
    }, [])

    //Add event type modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    const openModal = () => {
        setIsModalVisible(true);
    };

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
    const [getEvType, setGetEvtType] = useState({ id: 0, name: "" });

    const loadEType = (id) => {
        const newObject = eventTypes.find(item => item.id === 10);
        setGetEvtType(                   // object that we want to update
            ...getEvType,    // keep all other key-value pairs
            newObject    // update the value of specific key
        );
        openDModal();
    }
    //Form handling 

    //Initial Values
    const myInitialValues = {
        name: '',
    }

    //Validation
    const myValidationSchema = new Yup.object({
        name: Yup.string().required(),
    })

    //Form handler
    const formik = useFormik({
        validationSchema: myValidationSchema,
        initialValues: myInitialValues
    })

    //Submit eType handler
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
                <Button onClick={openModal} color="green"><Icon name="calendar" /> Create new Event Type</Button>
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
                                <Icon name="edit" title="Edit" color="blue" size="large" />
                                &nbsp;&nbsp;
                                <Icon size="large" title="Delete" name="trash" color="red" /></Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>
            </Table>


            {/* Add Event type modal  */}
            <Modal title="Add an Event Type"
                visible={isModalVisible}
                onCancel={closeModal}
                footer={[
                    <Button onClick={closeModal}>
                        Cancel
                </Button>,
                    <Button
                        disabled={Object.keys(formik.errors).length !== 0}
                        onClick={() => submitHandler(formik.values)}
                        color="green">
                        Create
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
            <Modal title={`Delete event type ${getEvType.id}`}
                visible={isDModalVisible}
                onCancel={closeDModal}
                footer={[
                    <Button onClick={closeDModal}>
                        Cancel
                </Button>,
                    <Button
                        color="red">
                        Delete
                </Button>,
                ]}>
            </Modal>

        </>
    )
}
