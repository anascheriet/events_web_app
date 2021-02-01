import React, { useEffect, useState } from 'react'
import { Button, Icon, Table } from 'semantic-ui-react'
import { Form, Input, Modal, Select, Tag } from 'antd';
import axios from 'axios';
import { adminDataUrl, lockUnlockAdminUrl, registerUrl } from '../redux/api';
import { successToast } from '../common/Notifications';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useFormik } from 'formik';

export const AdminList = () => {

    const [adminData, setAdminData] = useState([]);

    const getAdminData = async () => {
        const response = await axios.get(adminDataUrl);
        setAdminData(response.data);
    }



    const lockUnlockAdmin = (id) => {
        axios.get(lockUnlockAdminUrl(id)).then((resp) => {
            successToast(resp.data);
            getAdminData();
        }, (error) => {
            console.log(error);
            toast.error(error.data);
        })
    }


    //populate country dropdown

    const [CountryData, setCountryData] = useState([]);




    //Admin Attributes
    const myInitialValues = {
        displayName: "",
        email: "",
        gender: "",
        country: "",
        age: null
    }

    //clear form Attributes
    const clearValues = () => {
        formik.values.email = "";
        formik.values.country = "";
        formik.values.gender = "";
        formik.values.displayName = "";
        formik.values.age = null;
    }

    //Set up admin add Modal

    const [isModalVisible, setIsModalVisible] = useState(false);

    const openModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        clearValues();
    };

    //Set up object validation
    const myValidationSchema = new Yup.ObjectSchema({
        displayName: Yup.string().required(),
        email: Yup.string().email().required(),
        country: Yup.string().required(),
        gender: Yup.string().required(),
        country: Yup.string().required(),
        age: Yup.number().required()
    })

    //Submit method
    const addAdminHandler = async (values) => {
        try {
            const response = await axios.post(registerUrl, values);
            if (response) {
                successToast(response.data);
                closeModal();

            }
        } catch (error) {
            toast.error(error.data);
        }
        /*    axios.post(registerUrl, values).then((resp) => {
               successToast(resp.data);
               console.log(resp);
               closeModal();
           }, (error) => {
               console.log(error);
               toast.error(error.data);
           }) */
    }

    //Set up formik object to handle the form
    const formik = useFormik({
        validationSchema: myValidationSchema,
        initialValues: myInitialValues,

    })


    useEffect(() => {
        getAdminData();

        const fetchCountryAPI = async () => {
            let response = await axios.get("https://countriesnow.space/api/v0.1/countries");
            setCountryData(response.data.data);
        }
        fetchCountryAPI();
    }, [])


    return (
        <div style={{ padding: "0.7rem" }}>
            <a onClick={openModal} href="#" className="border-2 border-indigo-700 rounded-full float-right font-bold text-indigo-700 px-4 py-3 transition duration-300 ease-in-out hover:bg-indigo-700 hover:text-white mr-6">
                New Admin</a>
            <br />
            <br />
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Age</Table.HeaderCell>
                        <Table.HeaderCell>Country</Table.HeaderCell>
                        <Table.HeaderCell>Total revenue</Table.HeaderCell>
                        <Table.HeaderCell>Lock/Unlock account</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {adminData?.map(item => {
                        return <Table.Row key={item.id}>
                            <Table.Cell>{item.id}</Table.Cell>
                            <Table.Cell>{item.displayName}</Table.Cell>
                            <Table.Cell>{item.email}</Table.Cell>
                            <Table.Cell>{item.age}</Table.Cell>
                            <Table.Cell>{item.country}</Table.Cell>
                            <Table.Cell> <Tag color="volcano">${item.totalRevenue}</Tag> </Table.Cell>
                            <Table.Cell> <Icon onClick={() => lockUnlockAdmin(item.id)} color={`${item.isAccNonLocked ? "green" : "red"}`} name={`${item.isAccNonLocked ? "lock open" : "lock"}`} /></Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>
            </Table>

            {/* Add Admin modal  */}
            <Modal title="Add an Admin"
                visible={isModalVisible}
                onCancel={closeModal}
                footer={[
                    <Button onClick={closeModal}>
                        Cancel
                </Button>,
                    <Button
                        /*  disabled={Object.keys(formik.errors).length !== 0} */
                        /* onClick={() => editMode ? editHandler() : submitHandler(formik.values)} */
                        onClick={() => addAdminHandler(formik.values)}
                        color="purple">
                        Add
                    </Button>,
                ]}>
                <Form layout="vertical">
                    <Form.Item label="Email">
                        <Input name='email' {...formik.getFieldProps('email')} />
                        {formik.touched.email && formik.errors.email &&
                            <pre style={{ color: "red", marginTop: "0.1rem" }}>{formik.errors.email}</pre>}
                    </Form.Item>
                    <Form.Item
                        label="Display Name">
                        <Input name='displayName' {...formik.getFieldProps('displayName')} />
                        {formik.touched.displayName && formik.errors.displayName &&
                            <pre style={{ color: "red", marginTop: "0.1rem" }}>{formik.errors.displayName}</pre>}
                    </Form.Item>

                    <Form.Item
                        label="Age">
                        <Input name='age' {...formik.getFieldProps('age')} />
                        {formik.touched.age && formik.errors.age &&
                            <pre style={{ color: "red", marginTop: "0.1rem" }}>{formik.errors.age}</pre>}
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
                        {formik.touched.gender && formik.errors.gender &&
                            <pre style={{ color: "red", marginTop: "0.1rem" }}>{formik.errors.gender}</pre>}
                    </Form.Item>
                    <Form.Item
                        label="Country">
                        <Select
                            name='country'
                            onChange={country => formik.setFieldValue('country', country)}
                            value={formik.values.country}>
                            {CountryData.map(c => {
                                return <Select.Option key={c.country} value={c.country}>{c.country}</Select.Option>
                            })}
                        </Select>
                        {formik.touched.country && formik.values.country === "" && console.log(formik.errors.country)}
                    </Form.Item>
                </Form>
            </Modal>
        </div>



    )
}
