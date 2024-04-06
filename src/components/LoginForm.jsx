import React, {useState} from 'react';
import Helper from "../utility/Helper.jsx";
import toast from "react-hot-toast";
import axios from "axios";
import ButtonSpinner from "./ButtonSpinner.jsx";
import {useNavigate} from "react-router-dom";

const LoginForm = () => {
    let [Submit, SetSubmit] = useState(false);
    let navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        let email = formData.get("email");

        if (Helper.isEmpty(email)) {
            toast.error("Email Required!")
        } else {
            SetSubmit(true)
            let res = await axios.post(`${Helper.API_BASE}/user-login`, {UserEmail: email});
            if (res.data["msg"]==="success") {
                toast.success(res.data["data"]);
                sessionStorage.setItem("email", email);
                navigate("/verify")
            } else {
                SetSubmit(false)
            }


        }
    }


    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card">
                        <form onSubmit={onSubmit} className="p-4">
                            <label className="mb-1 form-label">Your Email Address: </label>
                            <input className="form-control mt-2" name="email" type="email"/>
                            <button disabled={Submit} type="submit" className="w-100 btn btn-danger mt-3">
                                {
                                    Submit ? (<ButtonSpinner/>) : ("Submit")
                                }
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;