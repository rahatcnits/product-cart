import React, {useEffect, useState} from 'react';
import axios from "axios";
import Helper from "../utility/Helper.jsx";
import toast from "react-hot-toast";
import FullScreenLoader from "./FullScreenLoader.jsx";

const CarList = () => {
    let [data, setData] = useState(null);
    let [loader, setLoader] = useState(false);

    useEffect(() => {
        (async () => {
            await CallCartList();
        })()
    }, [])

    const CallCartList = async () => {
        try {
            let res = await axios.get(`${Helper.API_BASE}/cart-list`, Helper.tokenHeader());
            let productList = res.data["data"];
            setData(productList);
        } catch (err) {
            Helper.unauthorized(err.response.status);
        }
    }

    const RemoveCart = async (id) => {
        try {
            setLoader(true);
            let res = await axios.get(`${Helper.API_BASE}/remove-cart/${id}`, Helper.tokenHeader());
            setLoader(false)
            if (res.data["msg"] === "success") {
                toast.success("Request Completed");
                CallCartList();
            } else {
                toast.error("Request Fail");
            }
        } catch (err) {
            Helper.unauthorized(err.response.status);
        }
    }

    return (
        <div>
            {
                data==null || loader ? (<FullScreenLoader/>) : (
                    <div className="container">
                        <div className="row d-flex justify-content-center">
                            {
                                data.map((item, i) => {
                                    return (
                                        <div className="col-md-6 col-lg-3">
                                            <div className="card p-3 mt-4">
                                                <img className="w-100" src={item["product"]["image"]} />
                                                <h5>
                                                    PRICE: $
                                                    {
                                                        item["product"]["discount"]===0 ? (<span>{item["product"]["price"]}</span>) : (<span><strike>{item["product"]["price"]}</strike> {item["product"]["discount_price"]}</span>)
                                                    }
                                                </h5>
                                                <p>{item["product"]["title"]}</p>

                                                <button onClick={() => {RemoveCart(item["product"]["id"])}} type="button" className="btn btn-outline-danger">Remove Cart</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default CarList;