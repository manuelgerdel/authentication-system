import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

const initialValue = {
    email: "",
    password: "",
};

export const Register = () => {
    const { store, actions } = useContext(Context);
    const [registerInfo, setRegisterInfo] = useState(initialValue);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value })
    };

    const handleSend = () => {
        const result = actions.registerUser(registerInfo);
        if (result) return navigate("/login")
        alert("Invalid log, try again")
    }

    return (


        <div className="container d-flex justify-content-center mt-5">
            <div className="card mt-5 w-50 h-25 bg-primary-subtle p-5 border border-1 rounded-3 border border-dark-subtle" >
                <li className="list-group-item text-center fw-bold  border border-0 fs-3 title">Sign up</li>
                <input type="email" className="form-control border-success mt-4" id="exampleFormControlInput1" placeholder="Email" name="email" onChange={handleChange}></input>
                <input type="password" className="form-control border-success mt-3" id="exampleFormControlInput2" placeholder="Password" name="password" onChange={handleChange}></input>
                <div className="d-flex justify-content-center mt-5">
                    <button type="button" className="btn btn-warning" onClick={handleSend}>Register</button>
                </div>
            </div>
        </div>
    );
};
