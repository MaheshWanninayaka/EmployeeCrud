import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

export default function Employee() {

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false); 

    const posts = [
        { id: 1, name: 'Hello World', address: 'Welcome to learning React!' },
        { id: 2, name: 'Installation', address: 'You can install React from npm.' }
    ];

    const [data, setData] = useState([]);

    console.log("data", data)

    useEffect(() => {

      fetchEmployeeData();
       
    }, []);

    function handleEdit(id) {
        alert(id)
    }

    function handleDelete(id) {
        alert(id)
    }

    function handleSave() {

        const model = {
            Name: name,
            Address: address,
            Id: 0,
        }

        SaveEmployee(model)

    }

    async function SaveEmployee(saveModel) {


        const url = `http://localhost:44461/api/employee/SaveEmployeeAsync`;

        try {
            const response = await axios.post(url, saveModel);
            console.log("response", response.data);
            setData(response.data);

        } catch (error) {
            // Handle any errors
            console.error('Error:', error);
            throw error;
        }
    }

    async function fetchEmployeeData() {
        try {
            setLoading(true); // Set loading state to true
            const response = await axios.get("http://localhost:44461/api/employee/GetEmployeesAsync");
            setData(response.data);
        } catch (error) {
            // Handle any errors here
            console.error("Error:", error);
        } finally {
            setLoading(false); // Set loading state to false when done
        }
    }

    return (
        <Fragment>
            <h1> Employee Card</h1>
            <div>
                <div>
                    <label>Name :</label>
                    <input type="text" name="name" value={name} onChange={((e) => setName(e.target.value))} />
                </div>

                <div>
                    <label>Address :</label>
                    <input type="text" name="address" value={address} onChange={((e) => setAddress(e.target.value))} />
                </div>
                <div>
                    <button onClick={(() => handleSave())}>Save</button>
                </div>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button onClick={(() => handleEdit(item.id))}>Edit</button> &nbsp;
                                            <button onClick={(() => handleDelete(item.id))}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}

                    </tbody>

                </table>
            </div>

        </Fragment>

    );
}