import React, {useState} from 'react';
import ButtonSpinner from "./ButtonSpinner.jsx";
import Helper from "../utility/Helper.jsx";
import toast from "react-hot-toast";
import axios from "axios";

const VerifyForm = () => {
    let [Submit, SetSubmit] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        let otp = formData.get("otp");


        if (Helper.isEmpty(otp)) {
            toast.error("Verification Code Required!");
        } else {
            let email = sessionStorage.getItem("email");
            SetSubmit(true)
            let res = await axios.post(`${Helper.API_BASE}/verify-login`, {UserEmail: email, OTP: otp});
            SetSubmit(false);
            if (res.data["msg"]==="success") {
                sessionStorage.removeItem("email");
                sessionStorage.setItem("token", res.data["data"]);
                window.location.href = ("/");
            } else {
                toast.error("Request Fail!");
            }


        }
    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card">
                        <form onSubmit={onSubmit} className="p-4">
                            <label className="mb-1 form-label">Verification Code: </label>
                            <input className="form-control mt-2" name="otp" type="text"/>
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

export default VerifyForm;