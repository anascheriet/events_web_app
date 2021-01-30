import React, { useEffect, useState } from 'react'
import { Icon, Table } from 'semantic-ui-react'
import { Tag } from 'antd';
import axios from 'axios';
import { adminDataUrl, lockUnlockAdminUrl } from '../redux/api';
import { successToast } from '../common/Notifications';
import { toast } from 'react-toastify';

export const AdminList = () => {

    const [adminData, setAdminData] = useState([]);

    const getAdminData = async () => {
        const response = await axios.get(adminDataUrl);
        setAdminData(response.data);
    }

    useEffect(() => {
        getAdminData();
    }, [])

    const lockUnlockAdmin = (id) => {
        axios.get(lockUnlockAdminUrl(id)).then((resp) => {
            successToast(resp.data);
            getAdminData();
        }, (error) => {
            console.log(error);
            toast.error(error.data);
        })
    }


    return (
        <div style={{ padding: "1rem" }}>
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
        </div>
    )
}
