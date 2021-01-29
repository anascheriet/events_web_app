import React from 'react'
import { Icon, Table } from 'semantic-ui-react'
import { Tag } from 'antd';

export const AdminList = () => {

    const admins = [{
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
    },
    {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
    },
    ];

    return (
        <div style={{ padding: "1rem" }}>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Age</Table.HeaderCell>
                        <Table.HeaderCell>Address</Table.HeaderCell>
                        <Table.HeaderCell>Monthly Income</Table.HeaderCell>
                        <Table.HeaderCell>Lock/Unlock</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {admins?.map(item => {
                        return <Table.Row key={item.key}>
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>{item.age}</Table.Cell>
                            <Table.Cell>{item.address}</Table.Cell>
                            <Table.Cell> <Tag color="volcano">{Math.random()}</Tag> </Table.Cell>
                            <Table.Cell> <Icon color="red" name="lock" /></Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}
