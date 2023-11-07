import React, { Fragment, useEffect, useState } from 'react';

export default function Employee() {

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");

    const posts = [
        { id: 1, name: 'Hello World', address: 'Welcome to learning React!' },
        { id: 2, name: 'Installation', address: 'You can install React from npm.' }
    ];

    const [data, setData] = useState([]);

    useEffect(() => {
        setData(posts);
    }, []);

    function handleEdit(id) {
        alert(id)
    }

    function handleDelete(id) {
        alert(id)
    }

    function handleSave(id) {
        alert(id)
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
                    <button onClick={(()=>handleSave()) }>Save</button>
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