import React, {useEffect, useState} from 'react';
import axios from "axios";
import Helper from "../utility/Helper.jsx";
import FullScreenLoader from "./FullScreenLoader.jsx";
import toast from "react-hot-toast";

const ProductList = () => {
    let [data, setData] = useState(null);
    let [loader, setLoader] = useState(false);

    useEffect(() => {
        (async () => {
            await CallProductList();
        })()
    }, [])

    const CallProductList = async () => {
        let res = await axios.get(`${Helper.API_BASE}/product-list`);
        let productList = res.data["data"];
        setData(productList);
    }

    const AddToCart = async (id) => {
        try {
            setLoader(true);
            let res = await axios.get(`${Helper.API_BASE}/create-cart/${id}`, Helper.tokenHeader());
            setLoader(false)
            if (res.data["msg"] === "success") {
                toast.success("Request Completed");
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
                                                <img className="w-100" src={item["image"]} />
                                                <h5>
                                                    PRICE: $
                                                    {
                                                        item["discount"]===0 ? (<span>{item["price"]}</span>) : (<span><strike>{item["price"]}</strike> {item["discount_price"]}</span>)
                                                    }
                                                </h5>
                                                <p>{item["title"]}</p>

                                                <button onClick={() => {AddToCart(item["id"])}} type="button" className="btn btn-outline-danger">Add To Cart</button>
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

export default ProductList;