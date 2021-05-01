import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./test.scss"

export const Test = () => {

    const [data, setData] = useState([]);
    const getData = async () => {
        const resp = await axios.get("http://localhost:8080/tests/");
        setData(resp.data);
        console.log(data);
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="allcards">
            {data.map(item => {
                return (
                    <div className="card" style={{ border: `1px ${item.color} solid` }}>
                        <span style={{ color: `${item.color}`, fontSize: "1.7rem" }}> {item.color} Team Size</span>
                        <div className="cardinfo">
                            <p>Dev Members</p>
                            <span>{item.teamMembers}</span>
                        </div>
                    </div>)
            })}
        </div>

    )
}
