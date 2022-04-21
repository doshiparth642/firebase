import React, { useEffect, useState } from "react";
import fireDb from '../firebase';
import { useParams, Link } from 'react-router-dom';
import './View.css';
//import "./AddEdit.css";

const View = () => {
    const [user, setuser] = useState({});

    const { id } = useParams();

    useEffect(() => {
        fireDb.child(`contacts/${id}`).get().then((snapshot) => {
            if (snapshot.exists()) {
                setuser({ ...snapshot.val() });
            } else {
                setuser({})
            }
        });
    }, [id])

    console.log("user", user)
    return (

        <div style={{ marginTop: "150px" }}>
            <div className="card">
                <div className="card-header">
                    <p>User Contact Detail</p>
                </div>
                <div className="container">
                    <strong>ID: </strong>
                    <span>{id}</span>
                    <br />
                    <br />
                    <strong>Name: </strong>
                    <span>{user.name}</span>
                    <br />
                    <br />
                    <strong>Email: </strong>
                    <span>{user.email}</span>
                    <br />
                    <br />
                    <strong>Contact: </strong>
                    <span>{user.contact}</span>
                    <br />
                    <br />
                    <Link to='/'>
                        <button>Go Back</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default View